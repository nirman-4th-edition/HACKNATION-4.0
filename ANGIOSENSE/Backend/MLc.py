import numpy as np
import pandas as pd
from scipy import signal
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler

def preprocess_signal(signal_data, fs=1000, reference_voltage=3.3):
    """
    Apply filtering to the signal (ECG or Bioimpedance) and extract features.
    Convert the digital signal (0-4095) to actual voltage (e.g., 0 to 3.3V).
    """
    voltage_signal = (signal_data / 4095.0) * reference_voltage
    
    nyquist = 0.5 * fs
    lowcut = 0.1
    highcut = 10

    b, a = signal.butter(4, [lowcut / nyquist, highcut / nyquist], btype='band')
    
    filtered_signal = signal.filtfilt(b, a, voltage_signal)
    
    rms = np.sqrt(np.mean(filtered_signal**2))
    
    peaks, _ = signal.find_peaks(filtered_signal)

    return rms, len(peaks)

df = pd.read_csv('results (3).csv')

import json

df['payload'] = df['payload'].apply(lambda x: json.loads(x))

df['ecg'] = df['payload'].apply(lambda x: x.get('ecg', {}).get('N', None))
df['temperature'] = df['payload'].apply(lambda x: x.get('temperature', {}).get('N', None))
df['pulse'] = df['payload'].apply(lambda x: x.get('pulse', {}).get('N', None))

df['ecg'] = pd.to_numeric(df['ecg'], errors='coerce')
df['temperature'] = pd.to_numeric(df['temperature'], errors='coerce')
df['pulse'] = pd.to_numeric(df['pulse'], errors='coerce')

df = df.dropna(subset=['ecg', 'temperature', 'pulse'])

ecg = df['ecg'].values
Body_Temperature = df['temperature'].values
pulse = df['pulse'].values

dh = pd.read_csv('health_status.csv')

safe_or_not = dh['Safe_or_Not'].values
needs_checkup = dh['Needs_Checkup'].values
immediate_attention_needed = dh['Immediate_Attention'].values

rms, peak_count = preprocess_signal(ecg)

bioimpedance_rms = rms
bioimpedance_peak_count = peak_count

X = np.column_stack([ecg, Body_Temperature, pulse, [bioimpedance_rms] * len(df), [bioimpedance_peak_count] * len(df)])
y = np.column_stack([safe_or_not, needs_checkup, immediate_attention_needed])

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

classifier_safe = RandomForestClassifier(n_estimators=100, random_state=42)
classifier_checkup = RandomForestClassifier(n_estimators=100, random_state=42)
classifier_attention = RandomForestClassifier(n_estimators=100, random_state=42)

classifier_safe.fit(X_train_scaled, y_train[:, 0])
classifier_checkup.fit(X_train_scaled, y_train[:, 1])
classifier_attention.fit(X_train_scaled, y_train[:, 2])

prob_safe = classifier_safe.predict_proba(X_test_scaled)[:, 1]
prob_checkup = classifier_checkup.predict_proba(X_test_scaled)[:, 1]
prob_attention = classifier_attention.predict_proba(X_test_scaled)[:, 1]

avg_prob_safe = np.mean(prob_safe)
avg_prob_checkup = np.mean(prob_checkup)
avg_prob_attention = np.mean(prob_attention)

print(f"Average Probability (Safe or Not): {avg_prob_safe * 100:.2f}%")
print(f"Average Probability (Needs Checkup): {avg_prob_checkup * 100:.2f}%")
print(f"Average Probability (Immediate Attention Needed): {avg_prob_attention * 100:.2f}%")

def classify_health_status(avg_prob_safe, avg_prob_checkup, avg_prob_attention):
    safe = ''
    checkup = ''
    attention = ''
    if avg_prob_attention > 0.7:
        safe += 'Immediate Attention Needed'
    else :
        safe += 'No Immediate Attention Needed'
    if avg_prob_checkup > 0.6:
        checkup += 'Needs Checkup'
    else :
        checkup += 'Does not need Checkup'
    if avg_prob_safe > 0.7:
        attention += 'Patient is Safe'
    else:
        attention += 'Patient is Not Safe'
    return safe, checkup, attention

health_status = classify_health_status(avg_prob_safe, avg_prob_checkup, avg_prob_attention)

for s in health_status :
    print(s)