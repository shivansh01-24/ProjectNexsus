'use client'

import { useActionState } from 'react'
import { createLostFoundItem } from '@/app/actions/lost-found'
import { Plus, Loader2 } from 'lucide-react'

const initialState = {
  message: '',
  error: '',
  success: false
}

export default function ReportItemForm() {
  const [state, action, isPending] = useActionState(async (prevState: any, formData: FormData) => {
    const result = await createLostFoundItem(formData)
    if (result.error) {
      return { ...prevState, error: result.error, success: false }
    }
    return { ...prevState, message: 'Item reported successfully!', error: '', success: true }
  }, initialState)

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Plus className="w-5 h-5" /> Report Item
      </h2>
      <form action={action} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select name="type" className="w-full p-2 border border-gray-200 rounded-lg">
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input type="text" name="title" required className="w-full p-2 border border-gray-200 rounded-lg" placeholder="Blue Umbrella" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea name="description" required className="w-full p-2 border border-gray-200 rounded-lg h-24" placeholder="Describe the item..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input type="text" name="location" required className="w-full p-2 border border-gray-200 rounded-lg" placeholder="Library" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
          <input type="text" name="contact" required className="w-full p-2 border border-gray-200 rounded-lg" placeholder="Email or Phone" />
        </div>
        
        {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
        {state.success && <p className="text-green-500 text-sm">{state.message}</p>}

        <button 
          type="submit" 
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex justify-center items-center gap-2"
        >
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          Submit Report
        </button>
      </form>
    </div>
  )
}
