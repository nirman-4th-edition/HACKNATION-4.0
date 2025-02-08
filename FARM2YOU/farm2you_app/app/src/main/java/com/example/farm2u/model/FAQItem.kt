package com.example.farm2u.model

data class FAQItem(
    val question: String,
    val answer: String,
    val questionHindi: String,
    val answerHindi: String,
    val questionOdia: String,
    val answerOdia: String
) {
    // Function to get localized question based on selectedLanguage
    fun getLocalizedQuestion(selectedLanguage: String): String {
        return when (selectedLanguage) {
            "Hindi" -> questionHindi
            "Odia" -> questionOdia
            else -> question
        }
    }

    // Function to get localized answer based on selectedLanguage
    fun getLocalizedAnswer(selectedLanguage: String): String {
        return when (selectedLanguage) {
            "Hindi" -> answerHindi
            "Odia" -> answerOdia
            else -> answer
        }
    }

    companion object {
        // Example static FAQ items
        val FAQItem = listOf(
            FAQItem(
                question = "What is FARM2U?",
                answer = "FARM2U is a platform that connects farmers with consumers directly.",
                questionHindi = "FARM2U क्या है?",
                answerHindi = "FARM2U एक ऐसा मंच है जो किसानों को सीधे उपभोक्ताओं से जोड़ता है।",
                questionOdia = "FARM2U କ’ଣ?",
                answerOdia = "FARM2U ଏକ ମଞ୍ଚ ଯାହା କୃଷକମାନଙ୍କୁ ଗ୍ରାହକମାନଙ୍କ ସହିତ ସିଧା ଭାବେ ଯୋଡ଼େ।"
            ),
            FAQItem(
                question = "How do I sell on FARM2U?",
                answer = "To sell, click on the 'Sell' button and follow the steps to list your products.",
                questionHindi = "FARM2U पर मैं कैसे बेच सकता हूँ?",
                answerHindi = "बेचने के लिए 'बेचें' बटन पर क्लिक करें और अपनी वस्तुओं को सूचीबद्ध करने के चरणों का पालन करें।",
                questionOdia = "FARM2U ରେ ମୁଁ କିପରି ବିକ୍ରି କରିବି?",
                answerOdia = "'ବିକ୍ରି' ବଟନରେ କ୍ଲିକ୍ କରନ୍ତୁ ଏବଂ ଆପଣଙ୍କ ଉତ୍ପାଦଗୁଡ଼ିକୁ ତାଲିକାଭୁକ୍ତ କରିବା ପାଇଁ ପଦକ୍ଷେପଗୁଡ଼ିକୁ ଅନୁସରଣ କରନ୍ତୁ।"
            ),
            FAQItem(
                question = "Is FARM2U free to use?",
                answer = "Yes, FARM2U is free for farmers and consumers.",
                questionHindi = "क्या FARM2U उपयोग करने के लिए मुफ्त है?",
                answerHindi = "हाँ, FARM2U किसानों और उपभोक्ताओं के लिए मुफ्त है।",
                questionOdia = "FARM2U ବ୍ୟବହାର କରିବା ମାଗଣା କି?",
                answerOdia = "ହଁ, FARM2U କୃଷକମାନଙ୍କ ଏବଂ ଗ୍ରାହକମାନଙ୍କ ପାଇଁ ମାଗଣା।"
            ),
            FAQItem(
                question = "How do I contact customer support?",
                answer = "You can contact customer support via the 'Contact Us' section in the app.",
                questionHindi = "मैं ग्राहक सहायता से कैसे संपर्क करूं?",
                answerHindi = "आप ऐप में 'Contact Us' सेक्शन के जरिए ग्राहक सहायता से संपर्क कर सकते हैं।",
                questionOdia = "ମୁଁ କିପରି ସେବା ଜୋଗାଣ ଗୋଷ୍ଠୀ ସହିତ ସମ୍ପର୍କ କରିବି?",
                answerOdia = "ଆପଣ ଆପ୍‌ର 'Contact Us' ବିଭାଗ ଦ୍ଵାରା ସେବା ଜୋଗାଣ ଗୋଷ୍ଠୀ ସହିତ ସମ୍ପର୍କ କରିପାରିବେ।"
            ),
            FAQItem(
                question = "Can I track my orders on FARM2U?",
                answer = "Yes, you can track your orders in the 'Orders' section of the app.",
                questionHindi = "क्या मैं FARM2U पर अपने ऑर्डर ट्रैक कर सकता हूं?",
                answerHindi = "हाँ, आप ऐप के 'Orders' सेक्शन में अपने ऑर्डर ट्रैक कर सकते हैं।",
                questionOdia = "ମୁଁ FARM2U ରେ ମୋର ଅର୍ଡରଗୁଡ଼ିକୁ ଟ୍ରାକ୍ କରିପାରିବି କି?",
                answerOdia = "ହଁ, ଆପଣ ଆପ୍‌ର 'Orders' ବିଭାଗରେ ଆପଣଙ୍କ ଅର୍ଡରଗୁଡ଼ିକୁ ଟ୍ରାକ୍ କରିପାରିବେ।"
            ),
            FAQItem(
                question = "Is my data secure on FARM2U?",
                answer = "Yes, your data is encrypted and securely stored on our servers.",
                questionHindi = "क्या FARM2U पर मेरा डेटा सुरक्षित है?",
                answerHindi = "हाँ, आपका डेटा एन्क्रिप्टेड है और सुरक्षित रूप से हमारे सर्वरों पर संग्रहीत है।",
                questionOdia = "FARM2U ରେ ମୋର ଡାଟା ସୁରକ୍ଷିତ କି?",
                answerOdia = "ହଁ, ଆପଣଙ୍କ ଡାଟା ଏନକ୍ରିପ୍ଟ କରାଯାଇଛି ଏବଂ ସୁରକ୍ଷିତ ଭାବରେ ଆମ ସର୍ଭରରେ ସଂଗ୍ରହ କରାଯାଇଛି।"
            )
        )
    }
}
