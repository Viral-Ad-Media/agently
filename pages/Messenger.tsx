
import React, { useState, useEffect, useRef } from 'react';
import { AgentConfig, ChatMessage } from '../types';
import { ICONS } from '../constants';

interface MessengerProps {
  agent: AgentConfig;
  messages: ChatMessage[];
  onSendMessage: (message: string) => Promise<ChatMessage>;
  onResetConversation: () => Promise<void>;
}

const Messenger: React.FC<MessengerProps> = ({ agent, messages, onSendMessage, onResetConversation }) => {
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>(messages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [localMessages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date().toISOString()
    };

    setLocalMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setError('');

    try {
      const aiMsg = await onSendMessage(input);
      setLocalMessages(prev => [...prev, aiMsg]);
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : 'Unable to send that message right now.');
      setLocalMessages(prev => prev.filter(message => message.id !== userMsg.id));
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
            <ICONS.Robot />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">{agent.name} Messenger</h2>
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">AI Powered Chatbot</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => void onResetConversation()}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 transition-all hover:border-indigo-200 hover:text-indigo-600"
          >
            Reset Thread
          </button>
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Live Preview</span>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-slate-50/30"
      >
        {localMessages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
            }`}>
              <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
              <p className={`text-[10px] mt-2 font-bold uppercase tracking-widest ${
                msg.role === 'user' ? 'text-indigo-200' : 'text-slate-400'
              }`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-6 bg-white border-t border-slate-100">
        {error && (
          <div className="mb-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="w-full pl-6 pr-16 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:hover:bg-indigo-600 shadow-lg shadow-indigo-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polyline points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
        <p className="text-[10px] text-center mt-4 font-black text-slate-400 uppercase tracking-widest">
          Powered by Agently AI Engine
        </p>
      </form>
    </div>
  );
};

export default Messenger;
