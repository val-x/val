"use client"

import { useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import Link from 'next/link'
import { IconSend, IconEdit } from "@tabler/icons-react"
import { Select } from "@/components/ui/select"
import dynamic from 'next/dynamic'
import NovelEditor from '@/components/NovelEditor';

// Dynamically import the Novel editor to avoid SSR issues
const models = [
  "GPT 3.5 Turbo",
  "Gemini 1.5 Pro",
  "Gemma 7b",
  "Claude 3 Haiku",
  "Llama 3 8b",
  "Llama 3 70b",
  "Codellama 70b",
  "Mistral 7b",
  "Mixtral 8x7b",
  "DBRX",
  "Firefunction V1"
]

export default function Dashboard() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome to your Valen dashboard. How can I assist you today?' }
  ])
  const [input, setInput] = useState('')
  const [selectedModels, setSelectedModels] = useState<string[]>([models[0]])
  const [isEditing, setIsEditing] = useState(false)

  const handleSend = useCallback(() => {
    if (input.trim()) {
      setMessages(prev => [...prev, { role: 'user', content: input }])
      // Here you would typically send the message to your AI backend
      // and then add the AI's response to the messages
      setInput('')
    }
  }, [input])

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col h-screen">
      <CardSpotlight className="flex-grow flex flex-col">
        <div className="p-6 flex-grow flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Button variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
          <div className="mb-4">
            <Select
              options={models}
              value={selectedModels}
              onChange={setSelectedModels}
              placeholder="Select models"
            />
          </div>
          <div className="flex-grow overflow-y-auto mb-4 border rounded-lg p-4">
            {isEditing ? (
              <NovelEditor
                defaultValue={messages.map(msg => `<p><strong>${msg.role}:</strong> ${msg.content}</p>`).join('')}
                onUpdate={(content) => {
                  console.log('Editor content updated:', content);
                  // Handle the updated content as needed
                }}
                disableLocalStorage={true}
              />
            ) : (
              messages.map((message, index) => (
                <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                    {message.content}
                  </span>
                </div>
              ))
            )}
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message here..."
              className="flex-grow mr-2 p-2 border rounded-lg"
            />
            <Button onClick={handleSend} className="mr-2">
              <IconSend className="h-5 w-5" />
            </Button>
            <Button onClick={toggleEdit} variant="outline">
              <IconEdit className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardSpotlight>
    </div>
  )
}