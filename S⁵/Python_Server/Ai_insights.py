import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
from datetime import datetime, timedelta
import re
from prophet import Prophet
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
import plotly.graph_objects as go

from transaction_constant import transactions

class AirthFinancialInsights:
    def __init__(self):
        # Enhanced category mapping with more specific patterns
        self.category_patterns = {
            'Food': {
                'Dining Out': r'(?i)(zomato|swiggy|restaurant|cafe|dine|food court)',
                'Groceries': r'(?i)(grocery|supermarket|bigbasket|dmart|vegetables|fruits)',
                'Quick Bites': r'(?i)(burger|pizza|sandwich|snacks|coffee|tea)'
            },
            'Travel': {
                'Ride Hailing': r'(?i)(uber|ola|rapido|taxi)',
                'Public Transit': r'(?i)(metro|bus|train|railway)',
                'Fuel': r'(?i)(petrol|diesel|fuel|gas station)',
                'Travel Booking': r'(?i)(makemytrip|booking\.com|airbnb|hotel)'
            },
            'Shopping': {
                'Online': r'(?i)(amazon|flipkart|myntra|ajio)',
                'Retail': r'(?i)(mall|store|mart|shop|retail)',
                'Electronics': r'(?i)(electronics|gadget|mobile|laptop)'
            },
            'Bills': {
                'Utilities': r'(?i)(electricity|water|gas|internet|broadband)',
                'Rent': r'(?i)(rent|lease|housing)',
                'Maintenance': r'(?i)(maintenance|repair|service)'
            },
            'Subscriptions': {
                'Entertainment': r'(?i)(netflix|prime|spotify|hotstar)',
                'Software': r'(?i)(microsoft|adobe|google|apple)',
                'Other Subscriptions': r'(?i)(subscription|membership)'
            },
            'Health': {
                'Medical': r'(?i)(hospital|clinic|doctor|medicine|pharmacy)',
                'Fitness': r'(?i)(gym|fitness|yoga|sports)'
            }
        }
        
        self.scaler = StandardScaler()

    def process_transactions(self, df):
        """
        Process the transactions DataFrame to prepare it for analysis
        """
        # Create a copy to avoid modifying the original
        processed_df = df.copy()
        
        # Convert date to datetime if it isn't already
        processed_df['date'] = pd.to_datetime(processed_df['date'])
        
        # Add additional time-based features
        processed_df['month'] = processed_df['date'].dt.strftime('%Y-%m')
        processed_df['week'] = processed_df['date'].dt.isocalendar().week
        processed_df['day_of_week'] = processed_df['date'].dt.day_name()
        processed_df['hour'] = processed_df['date'].dt.hour
        
        # Add transaction type based on amount
        processed_df['transaction_type'] = processed_df['amount'].apply(
            lambda x: 'income' if x > 0 else 'expense'
        )
        
        # Convert amounts to absolute values for certain analyses
        processed_df['abs_amount'] = processed_df['amount'].abs()
        
        # Add rolling metrics
        processed_df['rolling_7day_avg'] = processed_df.groupby('category')['amount'].transform(
            lambda x: x.rolling(window=7, min_periods=1).mean()
        )
        processed_df['rolling_30day_avg'] = processed_df.groupby('category')['amount'].transform(
            lambda x: x.rolling(window=30, min_periods=1).mean()
        )
        
        # Standardize amounts for anomaly detection
        processed_df['amount_scaled'] = self.scaler.fit_transform(
            processed_df['amount'].values.reshape(-1, 1)
        )
        
        # Add subcategories based on description patterns
        main_cats = []
        sub_cats = []
        for desc in processed_df['description']:
            main_cat, sub_cat = self.categorize_transaction(desc)
            main_cats.append(main_cat)
            sub_cats.append(sub_cat)
        
        processed_df['main_category'] = main_cats
        processed_df['sub_category'] = sub_cats
        
        return processed_df
        
    def categorize_transaction(self, description):
        """Enhanced transaction categorization with subcategories"""
        for main_category, subcategories in self.category_patterns.items():
            for subcategory, pattern in subcategories.items():
                if re.search(pattern, description):
                    return main_category, subcategory
        return 'Others', 'Miscellaneous'

    def prepare_lstm_data(self, data, lookback=30):
        """Prepare data for LSTM model"""
        X, y = [], []
        values = data['amount'].values
        for i in range(len(values) - lookback):
            X.append(values[i:(i + lookback)])
            y.append(values[i + lookback])
        return np.array(X), np.array(y)

    def build_lstm_model(self, lookback):
        """Build LSTM model for time series prediction"""
        model = Sequential([
            LSTM(50, activation='relu', input_shape=(lookback, 1), return_sequences=True),
            LSTM(50, activation='relu'),
            Dense(1)
        ])
        model.compile(optimizer='adam', loss='mse')
        return model

    def predict_with_prophet(self, df, periods=90):
        """Predict future expenses using Facebook Prophet"""
        # Prepare data for Prophet
        prophet_df = df.groupby('date')['amount'].sum().reset_index()
        prophet_df.columns = ['ds', 'y']
        
        # Initialize and fit Prophet model
        model = Prophet(
            yearly_seasonality=True,
            weekly_seasonality=True,
            daily_seasonality=False,
            changepoint_prior_scale=0.05
        )
        model.fit(prophet_df)
        
        # Make predictions
        future = model.make_future_dataframe(periods=periods)
        forecast = model.predict(future)
        
        return forecast

    def generate_visualizations(self, df):
        """Generate interactive visualizations for the dashboard"""
        visualizations = {}
        
        # 1. Monthly Spending Trends
        monthly_spending = df.groupby(['month', 'category'])['amount'].sum().reset_index()
        fig_monthly = px.line(monthly_spending, 
                            x='month', 
                            y='amount', 
                            color='category',
                            title='Monthly Spending Trends by Category')
        visualizations['monthly_trends'] = fig_monthly.to_json()
        
        # 2. Category Distribution (Pie Chart)
        category_total = df.groupby('category')['amount'].sum()
        fig_pie = px.pie(values=category_total.values, 
                        names=category_total.index,
                        title='Spending Distribution by Category')
        visualizations['category_distribution'] = fig_pie.to_json()
        
        # 3. Weekly Patterns Heatmap
        df['weekday'] = df['date'].dt.day_name()
        df['hour'] = df['date'].dt.hour
        weekly_patterns = df.pivot_table(
            values='amount', 
            index='weekday',
            columns='hour',
            aggfunc='sum'
        )
        fig_heatmap = px.imshow(weekly_patterns,
                               title='Spending Patterns by Day and Hour')
        visualizations['weekly_patterns'] = fig_heatmap.to_json()
        
        # 4. Forecast Visualization
        forecast = self.predict_with_prophet(df)
        fig_forecast = go.Figure()
        fig_forecast.add_trace(go.Scatter(
            x=forecast['ds'],
            y=forecast['yhat'],
            name='Predicted',
            mode='lines'
        ))
        fig_forecast.add_trace(go.Scatter(
            x=forecast['ds'],
            y=forecast['yhat_upper'],
            fill=None,
            mode='lines',
            line_color='rgba(0,100,80,0.2)',
            name='Upper Bound'
        ))
        fig_forecast.add_trace(go.Scatter(
            x=forecast['ds'],
            y=forecast['yhat_lower'],
            fill='tonexty',
            mode='lines',
            line_color='rgba(0,100,80,0.2)',
            name='Lower Bound'
        ))
        fig_forecast.update_layout(title='Expense Forecast with Confidence Intervals')
        visualizations['forecast'] = fig_forecast.to_json()
        
        return visualizations
    
    def generate_monthly_insights(self, df):
        """Generate monthly spending and income insights"""
        monthly_summary = {}
        
        # Group by month and calculate metrics
        monthly_data = df.groupby('month').agg({
            'amount': [
                ('total_income', lambda x: x[x > 0].sum()),
                ('total_expenses', lambda x: abs(x[x < 0].sum())),
                ('net_flow', 'sum'),
                ('transaction_count', 'count')
            ]
        }).round(2)
        
        # Calculate month-over-month changes
        monthly_data['amount', 'mom_expense_change'] = monthly_data['amount']['total_expenses'].pct_change() * 100
        monthly_data['amount', 'mom_income_change'] = monthly_data['amount']['total_income'].pct_change() * 100
        
        # Convert to dictionary for JSON serialization
        for month in monthly_data.index:
            monthly_summary[month] = {
                'total_income': float(monthly_data.loc[month, ('amount', 'total_income')]),
                'total_expenses': float(monthly_data.loc[month, ('amount', 'total_expenses')]),
                'net_flow': float(monthly_data.loc[month, ('amount', 'net_flow')]),
                'transaction_count': int(monthly_data.loc[month, ('amount', 'transaction_count')]),
                'expense_change': float(monthly_data.loc[month, ('amount', 'mom_expense_change')]) if not pd.isna(monthly_data.loc[month, ('amount', 'mom_expense_change')]) else 0,
                'income_change': float(monthly_data.loc[month, ('amount', 'mom_income_change')]) if not pd.isna(monthly_data.loc[month, ('amount', 'mom_income_change')]) else 0
            }
        
        return monthly_summary

    def detect_anomalies(self, df):
        """Detect anomalous transactions using Isolation Forest"""
        # Prepare data for anomaly detection
        features = ['amount_scaled', 'abs_amount']
        X = df[features].values
        
        # Train Isolation Forest
        iso_forest = IsolationForest(contamination=0.1, random_state=42)
        anomalies = iso_forest.fit_predict(X)
        
        # Get anomalous transactions
        anomalous_transactions = df[anomalies == -1].copy()
        
        # Format anomalies for output
        anomalies_list = []
        for _, row in anomalous_transactions.iterrows():
            anomalies_list.append({
                'date': row['date'].strftime('%Y-%m-%d'),
                'description': row['description'],
                'amount': float(row['amount']),
                'category': row['category'],
                'reason': 'Unusual amount for this category' if abs(row['amount_scaled']) > 2 else 'Irregular spending pattern'
            })
        
        return anomalies_list

    def generate_savings_recommendations(self, df):
        """Generate personalized savings recommendations"""
        recommendations = []
        
        # Analyze spending patterns
        category_spending = df[df['amount'] < 0].groupby('category')['amount'].agg(['sum', 'count']).round(2)
        category_spending['average'] = (category_spending['sum'] / category_spending['count']).round(2)
        
        # Look for high-frequency small transactions
        high_freq_categories = category_spending[category_spending['count'] > 5].index
        for category in high_freq_categories:
            recommendations.append({
                'category': category,
                'type': 'frequency',
                'description': f'Consider consolidating multiple small {category} transactions to reduce overall spending',
                'potential_savings': float(abs(category_spending.loc[category, 'average']) * 0.2)  # Estimate 20% savings
            })
        
        # Look for large one-time expenses
        large_transactions = df[df['amount'] < -1000]
        for _, trans in large_transactions.iterrows():
            recommendations.append({
                'category': trans['category'],
                'type': 'large_expense',
                'description': f'Large {trans["category"]} expense on {trans["date"].strftime("%Y-%m-%d")}. Consider planning for similar future expenses',
                'amount': float(trans['amount'])
            })
        
        # Category-specific recommendations
        for category in df['category'].unique():
            category_data = df[df['category'] == category]
            if len(category_data) > 0:
                avg_spend = abs(category_data[category_data['amount'] < 0]['amount'].mean())
                if avg_spend > 500:  # Threshold for high spending
                    recommendations.append({
                        'category': category,
                        'type': 'reduction',
                        'description': f'Your {category} spending is higher than average. Consider setting a budget.',
                        'current_average': float(avg_spend)
                    })
        
        return recommendations

    def generate_complete_insights(self, transactions_df):
        """Generate comprehensive insights with advanced predictions and visualizations"""
        processed_df = self.process_transactions(transactions_df)
        
        # Generate basic insights
        basic_insights = {
            'monthly_trends': self.generate_monthly_insights(processed_df),
            'anomalies': self.detect_anomalies(processed_df),
            'savings_recommendations': self.generate_savings_recommendations(processed_df)
        }
        
        # Generate advanced predictions
        prophet_forecast = self.predict_with_prophet(processed_df)
        
        # Prepare LSTM predictions
        if len(processed_df) >= 30:  # Need at least 30 days of data
            X, y = self.prepare_lstm_data(processed_df)
            lstm_model = self.build_lstm_model(30)
            lstm_model.fit(X.reshape(X.shape[0], X.shape[1], 1), y, epochs=50, batch_size=32, verbose=0)
            lstm_predictions = lstm_model.predict(X[-1:].reshape(1, 30, 1))
        else:
            lstm_predictions = None
        
        # Generate visualizations
        # visualizations = self.generate_visualizations(processed_df)
        
        # Combine all insights
        complete_insights = {
            **basic_insights,
            'prophet_forecast': {
                'predictions': prophet_forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].to_dict('records'),
                # 'components': prophet_forecast[['trend', 'yearly', 'weekly']].to_dict('records')
            },
            # 'lstm_predictions': lstm_predictions.tolist() if lstm_predictions is not None else None,
        }
        
        return complete_insights

trx = pd.DataFrame(transactions)

insights = AirthFinancialInsights().generate_complete_insights(trx)
print(insights)

