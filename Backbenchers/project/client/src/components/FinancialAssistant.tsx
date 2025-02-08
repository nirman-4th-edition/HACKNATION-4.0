import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Mic, Volume2, PieChart, TrendingUp, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  text: string;
  sender: 'user' | 'assistant';
  type?: 'text' | 'investment' | 'budget' | 'community';
}

interface InvestmentSuggestion {
  name: string;
  type: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  minInvestment: number;
  expectedReturns: number;
}

// Simple rule-based model for financial advice
const getResponse = (input: string): string => {
  const lowerInput = input.toLowerCase();
  if (lowerInput.includes('invest')) {
    return 'Based on your profile, I recommend considering low-risk investments like recurring deposits or government schemes.';
  } else if (lowerInput.includes('budget')) {
    return 'I can help you create a budget. The 50/30/20 rule is a good starting point - 50% for needs, 30% for wants, and 20% for savings.';
  } else if (lowerInput.includes('save')) {
    return 'Start with small, regular savings. Even ₹100 per day can grow significantly over time.';
  }
  return 'How can I help you with your financial goals today?';
};

export default function FinancialAssistant() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    const initializeSpeechRecognition = () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) return;

      // Create new instance for each initialization
      recognitionRef.current = new SpeechRecognition();
      
      // Configure recognition
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      // Set language based on current app language
      const langMap = {
        en: 'en-US',
        hi: 'hi-IN',
        or: 'or-IN'
      };
      recognitionRef.current.lang = langMap[language] || 'en-US';

      // Event handlers
      recognitionRef.current.onstart = () => {
        setIsListening(true);
        console.log('Speech recognition started');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        console.log('Speech recognition ended');
      };

      recognitionRef.current.onresult = (event: any) => {
        const last = event.results.length - 1;
        const transcript = event.results[last][0].transcript;
        setInput(transcript);
        
        // Auto-send after voice input
        setTimeout(() => {
          setInput(transcript);
          handleSend(transcript);
        }, 100);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.log('Speech recognition error:', event.error);
        setIsListening(false);
        
        switch (event.error) {
          case 'network':
            alert(t('assistant.errors.network'));
            break;
          case 'not-allowed':
            alert(t('assistant.errors.permission'));
            break;
          case 'no-speech':
            // Silent failure - just stop listening
            break;
          default:
            alert(t('assistant.errors.generic'));
        }
      };
    };

    initializeSpeechRecognition();

    // Cleanup
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    };
  }, [language, t]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const startListening = () => {
    if (!recognitionRef.current) {
      alert(t('assistant.errors.notSupported'));
      return;
    }

    try {
      // Always create a new instance to avoid stale state
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      // Reconfigure for new instance
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language === 'en' ? 'en-US' : language === 'hi' ? 'hi-IN' : 'or-IN';
      
      // Reattach event handlers
      recognitionRef.current.onstart = () => setIsListening(true);
      recognitionRef.current.onend = () => setIsListening(false);
      recognitionRef.current.onresult = (event: any) => {
        const last = event.results.length - 1;
        const transcript = event.results[last][0].transcript;
        setInput(transcript);
        setTimeout(() => handleSend(transcript), 100);
      };
      recognitionRef.current.onerror = (event: any) => {
        setIsListening(false);
        console.log('Speech recognition error:', event.error);
      };

      recognitionRef.current.start();
    } catch (error) {
      console.log('Failed to start speech recognition:', error);
      setIsListening(false);
      alert(t('assistant.errors.startFailed'));
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.log('Failed to stop speech recognition:', error);
      }
      setIsListening(false);
    }
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set language for speech synthesis
      const langMap = {
        en: 'en-US',
        hi: 'hi-IN',
        or: 'or-IN'
      };
      utterance.lang = langMap[language] || 'en-US';

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const getInvestmentSuggestions = (): InvestmentSuggestion[] => {
    return [
      {
        name: t('investment.mutualFund'),
        type: t('investment.type.mutual'),
        riskLevel: 'Low',
        minInvestment: 500,
        expectedReturns: 8
      },
      {
        name: t('investment.ppf'),
        type: t('investment.type.government'),
        riskLevel: 'Low',
        minInvestment: 100,
        expectedReturns: 7.1
      },
      {
        name: t('investment.rd'),
        type: t('investment.type.bank'),
        riskLevel: 'Low',
        minInvestment: 100,
        expectedReturns: 6.5
      }
    ];
  };

  const handleSend = async (voiceInput?: string) => {
    const textToSend = voiceInput || input;
    if (!textToSend.trim()) return;

    const userMessage = { text: textToSend, sender: 'user' as const };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    // Process the message and generate response
    const lowerInput = textToSend.toLowerCase();
    let response: Message;

    if (lowerInput.includes('invest') || lowerInput.includes('return')) {
      const suggestions = getInvestmentSuggestions();
      response = {
        text: t('assistant.investmentSuggestions'),
        sender: 'assistant',
        type: 'investment'
      };
      setMessages([...newMessages, response]);
      
      suggestions.forEach(suggestion => {
        const suggestionText = `${suggestion.name}\n${t('investment.minAmount')}: ₹${suggestion.minInvestment}\n${t('investment.expectedReturns')}: ${suggestion.expectedReturns}%\n${t('investment.riskLevel')}: ${suggestion.riskLevel}`;
        setMessages(prev => [...prev, {
          text: suggestionText,
          sender: 'assistant',
          type: 'investment'
        }]);
        
        if (isSpeaking) {
          speakMessage(suggestionText);
        }
      });
    } else if (lowerInput.includes('budget') || lowerInput.includes('spend')) {
      response = {
        text: t('assistant.budgetAdvice'),
        sender: 'assistant',
        type: 'budget'
      };
      setMessages([...newMessages, response]);
      if (isSpeaking) {
        speakMessage(t('assistant.budgetAdvice'));
      }
    } else if (lowerInput.includes('mentor') || lowerInput.includes('expert')) {
      response = {
        text: t('assistant.mentorConnect'),
        sender: 'assistant',
        type: 'community'
      };
      setMessages([...newMessages, response]);
      if (isSpeaking) {
        speakMessage(t('assistant.mentorConnect'));
      }
    } else {
      response = {
        text: getResponse(textToSend),
        sender: 'assistant'
      };
      setMessages([...newMessages, response]);
      if (isSpeaking) {
        speakMessage(response.text);
      }
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white rounded-lg shadow-lg">
      <div className="p-4 bg-blue-600 text-white rounded-t-lg flex items-center justify-between">
        <div className="flex items-center">
          <MessageCircle className="mr-2" />
          <h2 className="text-lg font-semibold">{t('assistant.title')}</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsSpeaking(!isSpeaking)}
            className={`p-2 rounded-full ${isSpeaking ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            title={isSpeaking ? t('assistant.disableVoice') : t('assistant.enableVoice')}
          >
            <Volume2 size={20} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : message.type === 'investment'
                  ? 'bg-green-100 text-gray-800'
                  : message.type === 'budget'
                  ? 'bg-yellow-100 text-gray-800'
                  : message.type === 'community'
                  ? 'bg-purple-100 text-gray-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.type === 'investment' && <TrendingUp className="mb-2" />}
              {message.type === 'budget' && <PieChart className="mb-2" />}
              {message.type === 'community' && <Users className="mb-2" />}
              <div className="whitespace-pre-line">{message.text}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('assistant.placeholder')}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={isListening ? stopListening : startListening}
            className={`p-2 ${
              isListening ? 'bg-red-600' : 'bg-blue-600'
            } text-white rounded-lg hover:opacity-90`}
            title={isListening ? t('assistant.stopListening') : t('assistant.startListening')}
          >
            <Mic size={20} />
          </button>
          <button
            onClick={() => handleSend()}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            title={t('assistant.send')}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}