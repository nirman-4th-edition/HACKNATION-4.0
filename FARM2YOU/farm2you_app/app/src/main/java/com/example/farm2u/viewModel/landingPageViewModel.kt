package com.example.farm2u.viewModel

import androidx.lifecycle.ViewModel
import com.example.farm2u.model.FAQItem

class LandingPageViewModel : ViewModel() {

    // List of FAQs with consistent translations for each language
    val faqItems = listOf(
        FAQItem(
            // English FAQ
            "What is FARM2U?",
            "FARM2U is a platform that connects farmers with consumers directly.",

            // Hindi FAQ
            "FARM2U क्या है?",
            "FARM2U एक ऐसा प्लेटफॉर्म है जो किसानों को सीधे उपभोक्ताओं से जोड़ता है।",

            // Odia FAQ
            "FARM2U କ'ଣ?",
            "FARM2U ଏକ ପ୍ଲାଟଫର୍ମ ଯାହା କୃଷକମାନଙ୍କୁ ପ୍ରତ୍ୟକ୍ଷ ଭାବରେ ଗ୍ରାହକମାନଙ୍କ ସହିତ ସଂଯୋଗ କରେ।"
        ),
        FAQItem(
            // English FAQ
            "How do I sell on FARM2U?",
            "To sell, click on the 'Sell' button and follow the steps to list your products.",

            // Hindi FAQ
            "FARM2U पर मैं कैसे बेचूं?",
            "'Sell' बटन पर क्लिक करें और अपने उत्पाद सूचीबद्ध करने के चरणों का पालन करें।",

            // Odia FAQ
            "FARM2U ରେ କିପରି ବିକ୍ରୟ କରିବେ?",
            "'Sell' ବଟନରେ କ୍ଲିକ୍ କରନ୍ତୁ ଏବଂ ଆପଣଙ୍କର ପଦାର୍ଥ ତାଲିକାଭୁକ୍ତ କରିବା ପାଇଁ ପଦକ୍ଷେପ ଅନୁସରନ କରନ୍ତୁ।"
        ),
        FAQItem(
            // English FAQ
            "Is FARM2U free to use?",
            "Yes, FARM2U is free for farmers and consumers.",

            // Hindi FAQ
            "क्या FARM2U उपयोग करने के लिए मुफ्त है?",
            "हाँ, FARM2U किसानों और उपभोक्ताओं के लिए मुफ्त है।",

            // Odia FAQ
            "FARM2U ବ୍ୟବହାର କରିବା ମାଗଣା କି?",
            "ହଁ, FARM2U କୃଷକମାନଙ୍କ ଏବଂ ଗ୍ରାହକମାନଙ୍କ ପାଇଁ ମାଗଣା।"
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
