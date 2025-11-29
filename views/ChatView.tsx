import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, AlertTriangle, ShieldCheck } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { sendMessageToAI, checkSymptomsWithAI } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'model',
      text: 'Hello! I am your DocNow virtual assistant. I can help you book appointments, order medicines, or check symptoms. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState<'chat' | 'symptom'>('chat');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    let aiResponseText = '';

    if (mode === 'symptom') {
      aiResponseText = await checkSymptomsWithAI(userMsg.text);
    } else {
      aiResponseText = await sendMessageToAI(messages, userMsg.text);
    }

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: aiResponseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const toggleMode = (newMode: 'chat' | 'symptom') => {
    setMode(newMode);
    setMessages([]); // Clear chat on mode switch for clarity
    if (newMode === 'symptom') {
       setMessages([{
           id: 'init-sym',
           role: 'model',
           text: "I have entered **Symptom Checker Mode**.\n\nPlease describe your symptoms in detail (e.g., 'Headache for 2 days, slight fever'). \n\n⚠ **NOTE:** I am an AI, not a doctor. This is for informational purposes only.",
           timestamp: new Date()
       }]);
    } else {
        setMessages([{
            id: 'init-chat',
            role: 'model',
            text: "Back to **General Assistant**. How can I help?",
            timestamp: new Date()
        }]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <div className="flex items-center space-x-2">
           <div className={`p-2 rounded-lg ${mode === 'symptom' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
             {mode === 'symptom' ? <ActivityIcon /> : <Bot className="w-5 h-5" />}
           </div>
           <div>
             <h3 className="font-bold text-slate-800">{mode === 'symptom' ? 'Symptom Checker' : 'Health Assistant'}</h3>
             <p className="text-xs text-slate-500">Powered by Gemini 2.5</p>
           </div>
        </div>
        
        <div className="flex bg-white rounded-lg p-1 border border-slate-200">
            <button 
                onClick={() => toggleMode('chat')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition ${mode === 'chat' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
                Chat
            </button>
            <button 
                onClick={() => toggleMode('symptom')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition ${mode === 'symptom' ? 'bg-orange-500 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
                Symptom Check
            </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`
                max-w-[85%] md:max-w-[70%] p-3 rounded-2xl text-sm leading-relaxed
                ${isUser 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                }
              `}>
                {!isUser && mode === 'symptom' && msg.text.includes('Disclaimer') && (
                    <div className="flex items-center gap-2 text-xs font-bold text-orange-600 mb-2 pb-2 border-b border-slate-100">
                        <AlertTriangle className="w-3 h-3" />
                        AI Analysis - Not a Medical Diagnosis
                    </div>
                )}
                
                {isUser ? (
                  msg.text
                ) : (
                  <ReactMarkdown 
                    className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0 text-slate-700"
                    components={{
                      strong: ({node, ...props}) => <span className="font-bold text-slate-900" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc ml-4 space-y-1" {...props} />,
                      li: ({node, ...props}) => <li className="" {...props} />
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          );
        })}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 px-4 py-2 rounded-full rounded-bl-none shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={mode === 'symptom' ? "Describe your symptoms..." : "Ask a question..."}
            className="flex-1 border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        {mode === 'symptom' && (
             <p className="text-[10px] text-slate-400 mt-2 text-center">
                Data is processed by AI. In emergencies, call 108 immediately.
             </p>
        )}
      </div>
    </div>
  );
};

const ActivityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
)

export default ChatView;