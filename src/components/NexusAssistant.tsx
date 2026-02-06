'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react'

type Message = {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function NexusAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Nexus AI. How can I help you navigate campus today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()
    
    if (lowerInput.includes('menu') || lowerInput.includes('food') || lowerInput.includes('lunch')) {
      return "Today's lunch menu: Rice, Dal, Mixed Veg, and Curd. Dinner will be Chapati, Paneer Butter Masala, and Rice."
    }
    if (lowerInput.includes('lost') || lowerInput.includes('found') || lowerInput.includes('item')) {
      return "You can check the Student Exchange section for lost & found items. Would you like me to open that page for you?"
    }
    if (lowerInput.includes('timetable') || lowerInput.includes('class') || lowerInput.includes('schedule')) {
      return "Your next class is Computer Science at 11:00 AM in Lab 1. Don't be late!"
    }
    if (lowerInput.includes('library') || lowerInput.includes('book')) {
      return "The Central Library is currently OPEN. It closes at 8:00 PM today."
    }
    if (lowerInput.includes('event') || lowerInput.includes('happening')) {
      return "There's a Hackathon happening right now in the Main Auditorium! Good luck with your project."
    }
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return "Hello there! Ready to make your campus life easier?"
    }
    
    return "I'm processing that... I can help with Mess Menu, Timetable, Lost & Found, and Campus Events. Try asking about those!"
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMsg])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI delay
    setTimeout(() => {
      const responseText = generateResponse(userMsg.text)
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMsg])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 mb-4 overflow-hidden border border-gray-100 flex flex-col h-[500px] animate-in slide-in-from-bottom-10 fade-in duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-lg">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Nexus AI Assistant</h3>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-xs text-blue-100">Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-500 p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 text-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3 animate-spin" /> Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask anything..."
                className="w-full pl-4 pr-10 py-2.5 bg-gray-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none text-gray-900 placeholder-gray-500"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="absolute right-2 top-2 p-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all transform hover:scale-105 ${
          isOpen 
            ? 'bg-gray-800 text-white rotate-90' 
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white animate-bounce-slow'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  )
}
