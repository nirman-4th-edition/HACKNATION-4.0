import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Mic, Volume2, PieChart, TrendingUp, Users } from 'lucide-react';
import * as tf from '@tensorflow/tfjs';
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

export default function FinancialAssistant() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Speech recognition setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  if (recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;
  }

  useEffect(() => {
    // Load lightweight model for basic financial advice
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadLayersModel('/models/finance-assistant-model.json');
        setModel(loadedModel);
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };
    loadModel();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
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

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' as const };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    // Process the message and generate response
    const lowerInput = input.toLowerCase();
    let response: Message;

    if (lowerInput.includes('invest') || lowerInput.includes('return')) {
      const suggestions = getInvestmentSuggestions();
      response = {
        text: t('assistant.investmentSuggestions'),
        sender: 'assistant',
        type: 'investment'
      };
      setMessages([...newMessages, response]);
      
      // Add investment suggestions
      suggestions.forEach(suggestion => {
        setMessages(prev => [...prev, {
          text: `${suggestion.name}\n${t('investment.minAmount')}: ₹${suggestion.minInvestment}\n${t('investment.expectedReturns')}: ${suggestion.expectedReturns}%\n${t('investment.riskLevel')}: ${suggestion.riskLevel}`,
          sender: 'assistant',
          type: 'investment'
        }]);
      });
    } else if (lowerInput.includes('budget') || lowerInput.includes('spend')) {
      response = {
        text: t('assistant.budgetAdvice'),
        sender: 'assistant',
        type: 'budget'
      };
      setMessages([...newMessages, response]);
    } else if (lowerInput.includes('mentor') || lowerInput.includes('expert')) {
      response = {
        text: t('assistant.mentorConnect'),
        sender: 'assistant',
        type: 'community'
      };
      setMessages([...newMessages, response]);
    } else {
      response = {
        text: t('assistant.generalResponse'),
        sender: 'assistant'
      };
      setMessages([...newMessages, response]);
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
          >
            <Mic size={20} />
          </button>
          <button
            onClick={handleSend}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}