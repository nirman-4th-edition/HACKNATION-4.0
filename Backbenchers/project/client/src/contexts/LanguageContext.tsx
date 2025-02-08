import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'hi' | 'or';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Common
    'app.name': 'MitraVitt',
    'app.tagline': 'Your Financial Friend',
    'nav.dashboard': 'Dashboard',
    'nav.learn': 'Learn',
    'nav.budget': 'Budget',
    'nav.assistant': 'AI Assistant',
    'nav.profile': 'Profile',
    'nav.schemes': 'Scheme Recommendations',
    'button.logout': 'Logout',
    'button.sync': 'Sync Data',
    'nav.expenseopt': 'Budgeting Insights',
    
    // Categories
    'category.essentialNeeds': 'Essential Needs',
    'category.housing': 'Housing & Rent',
    'category.utilities': 'Utilities',
    'category.groceries': 'Groceries',
    'category.healthcare': 'Healthcare',
    'category.education': 'Education',
    'category.transportation': 'Transportation',
    'category.savings': 'Savings',
    'category.entertainment': 'Entertainment',
    'category.shopping': 'Shopping',
    'category.insurance': 'Insurance',
    'category.emergencyFund': 'Emergency Fund',
    'category.investment': 'Investment',
    'category.business': 'Business',
    'category.salary': 'Salary',
    'category.farming': 'Farming Income',
    'category.pension': 'Pension',
    'category.rent': 'Rental Income',
    'category.other': 'Other',
    
    // Budget
    'budget.title': 'Budget Planner',
    'budget.monthlyIncome': 'Monthly Income',
    'budget.enterIncome': 'Enter your monthly income',
    'budget.getAiSuggestions': 'Get AI Suggestions',
    'budget.aiSuggestions': 'AI Budget Suggestions',
    'budget.basedOnIncome': 'Based on your monthly income of ₹{income}, here\'s a recommended budget allocation:',
    'budget.applySuggestions': 'Apply Suggestions',
    'budget.cancel': 'Cancel',
    'budget.newCategory': 'New category name',
    'budget.totalAllocation': 'Total Allocation: {total}%',
    'budget.shouldEqual': '(Should equal 100%)',
    'budget.savePlan': 'Save Budget Plan',
    'budget.monthlyBreakdown': 'Monthly Breakdown',

    // Dashboard
    'dashboard.totalBalance': 'Total Balance',
    'dashboard.monthlySavings': 'Monthly Savings',
    'dashboard.totalTransactions': 'Total Transactions',
    'dashboard.activeBudgets': 'Active Budgets',
    'dashboard.recentTransactions': 'Recent Transactions',
    'dashboard.budgetOverview': 'Budget Overview',
    'dashboard.addTransaction': 'Add Transaction',
    'dashboard.addNewTransaction': 'Add New Transaction',
    'dashboard.transactionType': 'Transaction Type',
    'dashboard.income': 'Income',
    'dashboard.expense': 'Expense',
    'dashboard.amount': 'Amount',
    'dashboard.description': 'Description',
    'dashboard.category': 'Category',
    'dashboard.selectCategory': 'Select Category',
    'dashboard.save': 'Save',
    'dashboard.cancel': 'Cancel',

    // Assistant
    'assistant.title': 'Financial Assistant',
    'assistant.placeholder': 'Ask about investments, budgeting, or connect with mentors...',
    'assistant.investmentSuggestions': 'Here are some low-risk investment options suitable for you:',
    'assistant.budgetAdvice': 'I can help you create a personalized budget. Would you like to see AI-powered suggestions based on your income and expenses?',
    'assistant.mentorConnect': 'I can connect you with financial experts and mentors in your area. Would you like to see available mentors?',
    'assistant.generalResponse': 'I understand you\'re asking about finances. How can I help you today?',

    // Investment
    'investment.mutualFund': 'Index Fund',
    'investment.ppf': 'Public Provident Fund (PPF)',
    'investment.rd': 'Recurring Deposit',
    'investment.type.mutual': 'Mutual Fund',
    'investment.type.government': 'Government Scheme',
    'investment.type.bank': 'Bank Product',
    'investment.minAmount': 'Minimum Investment',
    'investment.expectedReturns': 'Expected Returns',
    'investment.riskLevel': 'Risk Level'
  },
  hi: {
    // Common
    'app.name': 'मित्रवित्त',
    'app.tagline': 'आपका वित्तीय मित्र',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.learn': 'सीखें',
    'nav.budget': 'बजट',
    'nav.assistant': 'एआई सहायक',
    'button.logout': 'लॉग आउट',
    'button.sync': 'डेटा सिंक करें',
    'nav.expenseopt':'बजट अंतर्दृष्टि',
    'nav.schemes': 'योजना सिफारिश',
    'nav.profile':'प्रोफ़ाइल',
    
    // Categories
    'category.essentialNeeds': 'आवश्यक जरूरतें',
    'category.housing': 'आवास और किराया',
    'category.utilities': 'उपयोगिताएं',
    'category.groceries': 'किराना',
    'category.healthcare': 'स्वास्थ्य देखभाल',
    'category.education': 'शिक्षा',
    'category.transportation': 'परिवहन',
    'category.savings': 'बचत',
    'category.entertainment': 'मनोरंजन',
    'category.shopping': 'खरीदारी',
    'category.insurance': 'बीमा',
    'category.emergencyFund': 'आपातकालीन कोष',
    'category.investment': 'निवेश',
    'category.business': 'व्यवसाय',
    'category.salary': 'वेतन',
    'category.farming': 'कृषि आय',
    'category.pension': 'पेंशन',
    'category.rent': 'किराये की आय',
    'category.other': 'अन्य',
    
    // Budget
    'budget.title': 'बजट प्लानर',
    'budget.monthlyIncome': 'मासिक आय',
    'budget.enterIncome': 'अपनी मासिक आय दर्ज करें',
    'budget.getAiSuggestions': 'एआई सुझाव प्राप्त करें',
    'budget.aiSuggestions': 'एआई बजट सुझाव',
    'budget.basedOnIncome': 'आपकी ₹{income} की मासिक आय के आधार पर, यहाँ अनुशंसित बजट आवंटन है:',
    'budget.applySuggestions': 'सुझाव लागू करें',
    'budget.cancel': 'रद्द करें',
    'budget.newCategory': 'नई श्रेणी का नाम',
    'budget.totalAllocation': 'कुल आवंटन: {total}%',
    'budget.shouldEqual': '(100% होना चाहिए)',
    'budget.savePlan': 'बजट योजना सहेजें',
    'budget.monthlyBreakdown': 'मासिक विभाजन',

    // Dashboard
    'dashboard.totalBalance': 'कुल बैलेंस',
    'dashboard.monthlySavings': 'मासिक बचत',
    'dashboard.totalTransactions': 'कुल लेनदेन',
    'dashboard.activeBudgets': 'सक्रिय बजट',
    'dashboard.recentTransactions': 'हाल के लेनदेन',
    'dashboard.budgetOverview': 'बजट अवलोकन',
    'dashboard.addTransaction': 'लेनदेन जोड़ें',
    'dashboard.addNewTransaction': 'नया लेनदेन जोड़ें',
    'dashboard.transactionType': 'लेनदेन का प्रकार',
    'dashboard.income': 'आय',
    'dashboard.expense': 'व्यय',
    'dashboard.amount': 'राशि',
    'dashboard.description': 'विवरण',
    'dashboard.category': 'श्रेणी',
    'dashboard.selectCategory': 'श्रेणी चुनें',
    'dashboard.save': 'सहेजें',
    'dashboard.cancel': 'रद्द करें',

    // Assistant
    'assistant.title': 'वित्तीय सहायक',
    'assistant.placeholder': 'निवेश, बजट, या सलाहकारों से जुड़ने के बारे में पूछें...',
    'assistant.investmentSuggestions': 'यहाँ आपके लिए कुछ कम जोखिम वाले निवेश विकल्प हैं:',
    'assistant.budgetAdvice': 'मैं आपके लिए एक व्यक्तिगत बजट बनाने में मदद कर सकता हूं। क्या आप अपनी आय और खर्चों के आधार पर AI-संचालित सुझाव देखना चाहेंगे?',
    'assistant.mentorConnect': 'मैं आपको आपके क्षेत्र के वित्तीय विशेषज्ञों और सलाहकारों से जोड़ सकता हूं। क्या आप उपलब्ध सलाहकारों को देखना चाहेंगे?',
    'assistant.generalResponse': 'मैं समझता हूं कि आप वित्त के बारे में पूछ रहे हैं। मैं आज आपकी कैसे मदद कर सकता हूं?',

    // Investment
    'investment.mutualFund': 'इंडेक्स फंड',
    'investment.ppf': 'पब्लिक प्रोविडेंट फंड (PPF)',
    'investment.rd': 'आवर्ती जमा',
    'investment.type.mutual': 'म्यूचुअल फंड',
    'investment.type.government': 'सरकारी योजना',
    'investment.type.bank': 'बैंक उत्पाद',
    'investment.minAmount': 'न्यूनतम निवेश',
    'investment.expectedReturns': 'अपेक्षित रिटर्न',
    'investment.riskLevel': 'जोखिम स्तर'
  },
  or: {
    // Common
    'app.name': 'ମିତ୍ରବିତ୍ତ',
    'app.tagline': 'ଆପଣଙ୍କର ଆର୍ଥିକ ସାଥୀ',
    'nav.dashboard': 'ଡ୍ୟାସବୋର୍ଡ',
    'nav.learn': 'ଶିଖନ୍ତୁ',
    'nav.budget': 'ବଜେଟ',
    'nav.assistant': 'ଏଆଇ ସହାୟକ',
    'button.logout': 'ଲଗଆଉଟ',
    'button.sync': 'ଡାଟା ସିଙ୍କ',
    'nav.expenseopt': 'ବଜେଟିଂ ଜ୍ଞାନ',
    'nav.schemes': ' ଯୋଜନା ସୁପାରିଶ',
    'nav.profile':'ପ୍ରୋଫାଇଲ୍',
    
    // Categories
    'category.essentialNeeds': 'ମୌଳିକ ଆବଶ୍ୟକତା',
    'category.housing': 'ଗୃହ ଏବଂ ଭଡା',
    'category.utilities': 'ଉପଯୋଗିତା',
    'category.groceries': 'କିରାଣା',
    'category.healthcare': 'ସ୍ୱାସ୍ଥ୍ୟସେବା',
    'category.education': 'ଶିକ୍ଷା',
    'category.transportation': 'ପରିବହନ',
    'category.savings': 'ସଞ୍ଚୟ',
    'category.entertainment': 'ମନୋରଞ୍ଜନ',
    'category.shopping': 'କିଣାକିଣି',
    'category.insurance': 'ବୀମା',
    'category.emergencyFund': 'ଜରୁରୀକାଳୀନ ପାଣ୍ଠି',
    'category.investment': 'ନିବେଶ',
    'category.business': 'ବ୍ୟବସାୟ',
    'category.salary': 'ଦରମା',
    'category.farming': 'କୃଷି ଆୟ',
    'category.pension': 'ପେନସନ',
    'category.rent': 'ଭଡା ଆୟ',
    'category.other': 'ଅନ୍ୟାନ୍ୟ',
    
    // Budget
    'budget.title': 'ବଜେଟ ପ୍ଲାନର',
    'budget.monthlyIncome': 'ମାସିକ ଆୟ',
    'budget.enterIncome': 'ଆପଣଙ୍କର ମାସିକ ଆୟ ପ୍ରବେଶ କରନ୍ତୁ',
    'budget.getAiSuggestions': 'ଏଆଇ ପରାମର୍ଶ ପାଆନ୍ତୁ',
    'budget.aiSuggestions': 'ଏଆଇ ବଜେଟ ପରାମର୍ଶ',
    'budget.basedOnIncome': 'ଆପଣଙ୍କର ₹{income} ମାସିକ ଆୟ ଆଧାରରେ, ଏଠାରେ ସୁପାରିଶ କରାଯାଇଥିବା ବଜେଟ ବଣ୍ଟନ:',
    'budget.applySuggestions': 'ପରାମର୍ଶ ପ୍ରୟୋଗ କରନ୍ତୁ',
    'budget.cancel': 'ବାତିଲ',
    'budget.newCategory': 'ନୂତନ ବର୍ଗର ନାମ',
    'budget.totalAllocation': 'ମୋଟ ବଣ୍ଟନ: {total}%',
    'budget.shouldEqual': '(100% ହେବା ଆବଶ୍ୟକ)',
    'budget.savePlan': 'ବଜେଟ ଯୋଜନା ସଞ୍ଚୟ କରନ୍ତୁ',
    'budget.monthlyBreakdown': 'ମାସିକ ବିଶ୍ଳେଷଣ',

    // Dashboard
    'dashboard.totalBalance': 'ମୋଟ ବ୍ୟାଲାନ୍ସ',
    'dashboard.monthlySavings': 'ମାସିକ ସଞ୍ଚୟ',
    'dashboard.totalTransactions': 'ମୋଟ କାରବାର',
    'dashboard.activeBudgets': 'ସକ୍ରିୟ ବଜେଟ',
    'dashboard.recentTransactions': 'ସାମ୍ପ୍ରତିକ କାରବାର',
    'dashboard.budgetOverview': 'ବଜେଟ ଅବଲୋକନ',
    'dashboard.addTransaction': 'କାରବାର ଯୋଡନ୍ତୁ',
    'dashboard.addNewTransaction': 'ନୂଆ କାରବାର ଯୋଡନ୍ତୁ',
    'dashboard.transactionType': 'କାରବାର ପ୍ରକାର',
    'dashboard.income': 'ଆୟ',
    'dashboard.expense': 'ଖର୍ଚ୍ଚ',
    'dashboard.amount': 'ପରିମାଣ',
    'dashboard.description': 'ବିବରଣୀ',
    'dashboard.category': 'ବର୍ଗ',
    'dashboard.selectCategory': 'ବର୍ଗ ବାଛନ୍ତୁ',
    'dashboard.save': 'ସଞ୍ଚୟ କରନ୍ତୁ',
    'dashboard.cancel': 'ବାତିଲ କରନ୍ତୁ',

    // Assistant
    'assistant.title': 'ଆର୍ଥିକ ସହାୟକ',
    'assistant.placeholder': 'ନିବେଶ, ବଜେଟ, କିମ୍ବା ପରାମର୍ଶଦାତାଙ୍କ ସହ ଯୋଗାଯୋଗ ବିଷୟରେ ପଚାରନ୍ତୁ...',
    'assistant.investmentSuggestions': 'ଏଠାରେ ଆପଣଙ୍କ ପାଇଁ କିଛି କମ୍ ରିସ୍କ ନିବେଶ ବିକଳ୍ପ ଅଛି:',
    'assistant.budgetAdvice': 'ମୁଁ ଆପଣଙ୍କ ପାଇଁ ଏକ ବ୍ୟକ୍ତିଗତ ବଜେଟ୍ ତିଆରି କରିବାରେ ସାହାଯ୍ୟ କରିପାରିବି। ଆପଣ AI-ଚାଳିତ ପରାମର୍ଶ ଦେଖିବାକୁ ଚାହାଁନ୍ତି କି?',
    'assistant.mentorConnect': 'ମୁଁ ଆପଣଙ୍କୁ ଆପଣଙ୍କ ଅଞ୍ଚଳର ଆର୍ଥିକ ବିଶେଷଜ୍ଞ ଏବଂ ପରାମର୍ଶଦାତାଙ୍କ ସହ ଯୋଗାଯୋଗ କରିପାରିବି। ଆପଣ ଉପଲବ୍ଧ ପରାମର୍ଶଦାତାମାନଙ୍କୁ ଦେଖିବାକୁ ଚାହାଁନ୍ତି କି?',
    'assistant.generalResponse': 'ମୁଁ ବୁଝିପାରୁଛି ଯେ ଆପଣ ଆର୍ଥିକ ବିଷୟରେ ପଚାରୁଛନ୍ତି। ମୁଁ ଆଜି ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?',

    // Investment
    'investment.mutualFund': 'ଇଣ୍ଡେକ୍ସ ଫଣ୍ଡ',
    'investment.ppf': 'ପବ୍ଲିକ ପ୍ରୋଭିଡେଣ୍ଟ ଫଣ୍ଡ (PPF)',
    'investment.rd': 'ଆବର୍ତ୍ତି ଜମା',
    'investment.type.mutual': 'ମ୍ୟୁଚୁଆଲ ଫଣ୍ଡ',
    'investment.type.government': 'ସରକାରୀ ଯୋଜନା',
    'investment.type.bank': 'ବ୍ୟାଙ୍କ ଉତ୍ପାଦ',
    'investment.minAmount': 'ସର୍ବନିମ୍ନ ନିବେଶ',
    'investment.expectedReturns': 'ଆଶାକୃତ ରିଟର୍ନ',
    'investment.riskLevel': 'ରିସ୍କ ସ୍ତର'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string, params: Record<string, string | number> = {}) => {
    let text = translations[language][key] || key;
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(`{${param}}`, value.toString());
    });
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}