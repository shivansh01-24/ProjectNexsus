'use client'

import { useState } from 'react'
import { Send, Sparkles, Loader2 } from 'lucide-react'

export default function MailSummarizer() {
  const [input, setInput] = useState('')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSummarize = async () => {
    if (!input.trim()) return

    setLoading(true)
    try {
      const res = await fetch('/api/mail-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      })
      const data = await res.json()
      if (data.summary) {
        setSummary(data.summary)
      }
    } catch (error) {
      console.error('Error summarizing:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-900">Mail Summarizer</h3>
          <p className="text-xs text-gray-500 font-medium">Simplify your student life</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste long announcements or emails here..."
          className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none text-sm text-gray-900 placeholder-gray-400"
        />
        
        <button
          onClick={handleSummarize}
          disabled={loading || !input.trim()}
          className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Processing...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" /> Summarize
            </>
          )}
        </button>

        {summary && (
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <h4 className="text-sm font-bold text-purple-900 mb-2 flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> Key Points
            </h4>
            <p className="text-sm text-gray-800 leading-relaxed font-medium">{summary}</p>
          </div>
        )}
      </div>
    </div>
  )
}
