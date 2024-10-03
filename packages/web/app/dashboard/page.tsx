"use client"

import { useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import Link from 'next/link'
import { IconSend, IconPlus, IconX, IconEdit, IconCode, IconEye, IconPencil } from "@tabler/icons-react"
import { Select } from "@/components/ui/select"
import dynamic from 'next/dynamic'
import ShiftCard from '@/components/ShiftCard'
import Iphone15Pro from '@/components/Iphone15Pro'
import Safari from '@/components/Safari'
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { NotebookGuideStatus } from "@/components/notebook-guide-status";
import { FileTree } from "@/components/ui/file-tree";
import { LampContainer } from "@/components/ui/lamp-effect";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Vortex } from "@/components/ui/vortex";

const NovelEditor = dynamic(() => import('@/components/NovelEditor'), { ssr: false })

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

const suggestions = [
  "What are some of the limitations of NotebookLM?",
  "What are some of the things that can be achieved using the \"Curate and Create\" workflow?",
  "How does NotebookLM use Gemini to help users do their best thinking?"
]

// Add this type definition at the top of your file
type ModelResources = {
  [key: string]: { cpu: number; gpu: number; memory: number; storage: number; bandwidth: number };
};

export default function Dashboard() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'How does NotebookLM use Gemini to help users do their best thinking?' }
  ])
  const [input, setInput] = useState('')
  const [selectedModels, setSelectedModels] = useState<string[]>([models[0]])
  const [showSourceGuide, setShowSourceGuide] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [showArtifacts, setShowArtifacts] = useState(true)
  const [showNotebookGuide, setShowNotebookGuide] = useState(false)
  const [artifactType, setArtifactType] = useState<'mobile' | 'web' | null>(null)
  const [artifactView, setArtifactView] = useState<'code' | 'preview'>('code')
  const [artifactCode, setArtifactCode] = useState('')
  const [artifactPreviewUrl, setArtifactPreviewUrl] = useState('')
  const [modelResources, setModelResources] = useState<ModelResources>({
    "GPT 3.5 Turbo": { cpu: 50, gpu: 30, memory: 16, storage: 250, bandwidth: 100 },
    "Gemini 1.5 Pro": { cpu: 60, gpu: 40, memory: 32, storage: 500, bandwidth: 150 },
    "Claude 3 Haiku": { cpu: 40, gpu: 20, memory: 8, storage: 100, bandwidth: 50 },
    // Add default values for other models
  });
  const [editingCards, setEditingCards] = useState<{[key: string]: boolean}>({});
  const [isAILoading, setIsAILoading] = useState(false);

  const handleSend = useCallback(() => {
    if (input.trim()) {
      setIsAILoading(true);
      setMessages(prev => [...prev, { role: 'user', content: input }])
      setInput('')
      // Simulate AI processing time
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: 'This is a simulated AI response.' }])
        setIsAILoading(false);
      }, 3000);
    }
  }, [input])

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  const closeChat = () => {
    setShowArtifacts(false)
  }

  const toggleNotebookGuide = () => {
    setShowNotebookGuide(!showNotebookGuide)
  }

  const handleModelSelect = (model: string) => {
    setSelectedModels([model]);
    toggleNotebookGuide();
  };

  const handleResourceUpdate = (model: string, resource: string, value: number) => {
    setModelResources(prev => ({
      ...prev,
      [model]: {
        ...prev[model],
        [resource]: value
      }
    }));
  };

  const toggleCardEdit = (cardTitle: string) => {
    setEditingCards(prev => ({
      ...prev,
      [cardTitle]: !prev[cardTitle]
    }));
  };

  const notebookGuideCards = [
    {
      title: "GPT 3.5 Turbo",
      content: "This notebook is designed to help you learn about NotebookLM's features while actually using the product. Start by clicking on this note to read it in its entirety.",
      connectedNodes: 5,
      modelHealth: 'good' as const,
      onSelect: () => handleModelSelect("GPT 3.5 Turbo"),
      resources: modelResources["GPT 3.5 Turbo"],
      onResourceUpdate: (resource: string, value: number) => handleResourceUpdate("GPT 3.5 Turbo", resource, value)
    },
    {
      title: "Gemini 1.5 Pro",
      content: "This is a view-only public notebook, so you are limited to reading the sources and asking questions. You also can't create Notebook Guides like \"Briefing Doc\" or \"FAQ.\"",
      connectedNodes: 3,
      modelHealth: 'average' as const,
      onSelect: () => handleModelSelect("Gemini 1.5 Pro"),
      resources: modelResources["Gemini 1.5 Pro"],
      onResourceUpdate: (resource: string, value: number) => handleResourceUpdate("Gemini 1.5 Pro", resource, value)
    },
    {
      title: "Claude 3 Haiku",
      content: "Because this particular notebook includes sources that describe how NotebookLM works, the AI is skilled at giving you personalized advice about how to use the tool.",
      connectedNodes: 2,
      modelHealth: 'poor' as const,
      onSelect: () => handleModelSelect("Claude 3 Haiku"),
      resources: modelResources["Claude 3 Haiku"],
      onResourceUpdate: (resource: string, value: number) => handleResourceUpdate("Claude 3 Haiku", resource, value)
    }
  ]

  const handleArtifactRun = (type: 'mobile' | 'web') => {
    setArtifactType(type)
    // Here you would typically send the code to be executed and get a preview URL
    // For now, we'll just set a placeholder URL
    setArtifactPreviewUrl('https://example.com')
  }

  const fileTreeElements = [
    {
      name: 'app',
      children: [
        { name: 'page.tsx' },
        { name: 'layout.tsx' },
        {
          name: 'components',
          children: [
            { name: 'ui', children: [
              { name: 'button.tsx' },
              { name: 'input.tsx' },
            ]},
          ],
        },
      ],
    },
    {
      name: 'public',
      children: [
        { name: 'images', children: [
          { name: 'logo.png' },
        ]},
      ],
    },
  ];

  const ParallaxScroll = ({ cards }: { cards: typeof notebookGuideCards }) => {
    const gridRef = useRef<any>(null);
    const { scrollYProgress } = useScroll({
      container: gridRef,
      offset: ["start start", "end start"],
    });
  
    const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);
  
    const third = Math.ceil(cards.length / 3);
    const firstPart = cards.slice(0, third);
    const secondPart = cards.slice(third, 2 * third);
    const thirdPart = cards.slice(2 * third);
  
    return (
      <div
        className="h-[40rem] items-start overflow-y-auto w-full"
        ref={gridRef}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-10 py-40 px-10">
          <CardColumn cards={firstPart} translate={translateFirst} />
          <CardColumn cards={secondPart} translate={translateSecond} />
          <CardColumn cards={thirdPart} translate={translateThird} />
        </div>
      </div>
    );
  };
  
  const CardColumn = ({ cards, translate }: { cards: typeof notebookGuideCards, translate: any }) => (
    <div className="grid gap-10">
      {cards.map((card, idx) => (
        <motion.div style={{ y: translate }} key={`grid-${idx}`}>
          <div className="relative bg-gray-700 rounded-xl p-6 border border-gray-600 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <FlickeringGrid />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{card.content}</p>
              <Button onClick={card.onSelect} className="mb-2 w-full">
                Select Model
              </Button>
              <p className="text-xs text-gray-400 mb-2">{card.connectedNodes} nodes</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleCardEdit(card.title)}
                className="mb-2"
              >
                {editingCards[card.title] ? "Done" : "Edit Resources"}
              </Button>
              {editingCards[card.title] && (
                <div className="mt-4">
                  <NotebookGuideStatus {...card.resources} onUpdate={card.onResourceUpdate} />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <AuroraBackground>
        <CardSpotlight className="flex-grow flex">
          {showSourceGuide && (
            <div className="w-1/3 bg-gray-800 p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Source guide</h2>
                <Button variant="ghost" onClick={() => setShowSourceGuide(false)}>
                  <IconX className="h-5 w-5" />
                </Button>
              </div>
              <FileTree
                initialSelectedId="app/page.tsx"
                indicator
                elements={fileTreeElements}
                onSelect={(file: { name: string; path: string }) => console.log('Selected file:', file)}
              />
              {/* Artifact preview section */}
              {artifactType && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Artifact Preview</h3>
                  <div className="flex mb-2">
                    <Button
                      variant={artifactView === 'code' ? 'default' : 'outline'}
                      onClick={() => setArtifactView('code')}
                      className="mr-2"
                    >
                      <IconCode className="mr-2" /> Code
                    </Button>
                    <Button
                      variant={artifactView === 'preview' ? 'default' : 'outline'}
                      onClick={() => setArtifactView('preview')}
                    >
                      <IconEye className="mr-2" /> Preview
                    </Button>
                  </div>
                  {artifactView === 'code' ? (
                    <pre className="bg-gray-700 p-4 rounded-lg overflow-x-auto">
                      <code>{artifactCode}</code>
                    </pre>
                  ) : (
                    <div className="flex justify-center">
                      {artifactType === 'mobile' ? (
                        <Iphone15Pro src={artifactPreviewUrl} width={216} height={441} />
                      ) : (
                        <Safari url={artifactPreviewUrl} src={artifactPreviewUrl} width={400} height={250} />
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          <div className={`flex-1 flex flex-col ${showSourceGuide ? 'w-2/3' : 'w-full'}`}>
            <div className="mb-4 p-4">
              <Select
                options={models}
                value={selectedModels}
                onChange={setSelectedModels}
                placeholder="Select models"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <div className="px-4 mb-4">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="secondary"
                    className="mr-2 mb-2"
                    onClick={() => setInput(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
              <div className="flex-1 p-4 overflow-y-auto relative">
                {isAILoading && (
                  <Vortex
                    className="absolute inset-0 z-10"
                    backgroundColor="rgba(0,0,0,0.5)"
                    baseHue={220}
                    baseSpeed={0.5}
                    rangeSpeed={1}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-white text-2xl font-bold">AI is thinking...</p>
                    </div>
                  </Vortex>
                )}
                {isEditing ? (
                  <NovelEditor
                    defaultValue={messages.map(msg => `<p><strong>${msg.role}:</strong> ${msg.content}</p>`).join('')}
                    onUpdate={(content) => {
                      console.log('Editor content updated:', content);
                      setArtifactCode(content);
                    }}
                    disableLocalStorage={true}
                  />
                ) : (
                  <>
                    {messages.map((message, index) => (
                      <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                        <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                          {message.content}
                        </span>
                      </div>
                    ))}
                  </>
                )}
                <Button 
                  onClick={toggleEdit} 
                  variant="outline" 
                  className="absolute bottom-2 right-2"
                >
                  <IconEdit className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="p-4 border-t border-gray-700">
              <div className="flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Start typing..."
                  className="flex-grow mr-2 p-2 border rounded-lg bg-gray-800 text-white"
                />
                <Button onClick={handleSend} className="mr-2">
                  <IconSend className="h-5 w-5" />
                </Button>
                <Button onClick={() => handleArtifactRun('mobile')} className="mr-2">
                  Run Mobile
                </Button>
                <Button onClick={() => handleArtifactRun('web')} className="mr-2">
                  Run Web
                </Button>
                {!showSourceGuide && (
                  <Button onClick={() => setShowSourceGuide(true)} variant="outline">
                    <IconPlus className="h-5 w-5 mr-2" />
                    Source Guide
                  </Button>
                )}
              </div>
              <div className="flex justify-between mt-2">
                <Button variant="link" className="text-sm" onClick={closeChat}>
                  Close Chat
                </Button>
                <span className="text-sm text-gray-400">8 sources</span>
                <Button variant="link" className="text-sm" onClick={toggleNotebookGuide}>
                  Notebook guide
                </Button>
              </div>
            </div>
          </div>
        </CardSpotlight>
        {showNotebookGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <LampContainer>
              <div className="relative bg-gray-800 bg-opacity-90 p-6 rounded-xl w-full h-full overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Notebook Guide</h2>
                  <Button variant="ghost" onClick={toggleNotebookGuide}>
                    <IconX className="h-5 w-5" />
                  </Button>
                </div>
                <ParallaxScroll cards={notebookGuideCards} />
              </div>
            </LampContainer>
          </div>
        )}
        {!showArtifacts && (
          <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white text-center py-2">
            NotebookLM may still sometimes give inaccurate responses, so you may want to confirm any facts independently.
          </div>
        )}
      </AuroraBackground>
    </div>
  )
}