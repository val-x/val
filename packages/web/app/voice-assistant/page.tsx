"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import { IconMicrophone, IconArrowLeft } from "@tabler/icons-react"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { LampContainer } from "@/components/ui/lamp-effect"
import { Ripple } from "@/components/ui/ripple"
import { useRouter } from 'next/navigation'
import MDXRenderer from '@/components/MDXRenderer'
import { io } from 'socket.io-client';
import styles from './VoiceAssistant.module.css' // We'll create this CSS module file

export default function VoiceAssistantPage() {
  const router = useRouter()
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [assistantResponse, setAssistantResponse] = useState('')
  const [codeOutput, setCodeOutput] = useState('')
  const [executionEnvironment, setExecutionEnvironment] = useState<'docker' | 'cli'>('cli');
  const [sshUrl, setSshUrl] = useState('');
  const [isCliConnected, setIsCliConnected] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:3001');

    socket.on('clientConnected', ({ connectionId }) => {
      if (connectionId === sshUrl.split(' ').pop()) {
        setIsCliConnected(true);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [sshUrl]);

  useEffect(() => {
    // Load MDX example when component mounts
    setAssistantResponse(`
# Welcome to Voice Assistant

This is an example of MDX rendering capabilities.

## Sample Code

Here's a simple Python function:

\`\`\`python
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
\`\`\`

Try running this code using the buttons above!
    `)
  }, [])

  const toggleListening = () => {
    setIsListening(!isListening)
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setTranscript("What can you do?")
        setIsListening(false)
        processVoiceInput()
      }, 3000)
    }
  }

  const processVoiceInput = () => {
    // Simulate AI processing
    setTimeout(() => {
      setAssistantResponse(`
# Voice Assistant Capabilities

I can run code in different environments. Here's an example:

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# Print first 10 Fibonacci numbers
for i in range(10):
    print(fibonacci(i))
\`\`\`

Try running this code using the CLI or Docker buttons!
      `)
    }, 2000)
  }

  const connectCli = async () => {
    try {
      const response = await fetch('http://localhost:3001/generate-connection-command', {
        method: 'POST',
      });
      const data = await response.json();
      if (response.ok && data.command) {
        setSshUrl(data.command);
        console.log('Connection command generated successfully:', data.command);
        copyToClipboard(data.command);
      } else {
        throw new Error(data.error || 'Failed to generate connection command');
      }
    } catch (error) {
      console.error('Error generating connection command:', error);
      setSshUrl('');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('SSH URL copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy SSH URL: ', err);
    });
  };

  const checkConnection = async () => {
    if (!sshUrl) return;
    
    const connectionId = sshUrl.split(' ').pop();
    try {
      const response = await fetch('http://localhost:3001/check-connection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ connectionId }),
      });
      const data = await response.json();
      setIsCliConnected(data.connected);
    } catch (error) {
      console.error('Error checking connection:', error);
      setIsCliConnected(false);
    }
  };

  useEffect(() => {
    if (sshUrl) {
      checkConnection();
      const interval = setInterval(checkConnection, 5000); // Check every 5 seconds
      return () => clearInterval(interval);
    }
  }, [sshUrl]);

  const runCode = async (code: string, language: string) => {
    try {
      let endpoint = 'run-code';
      let body: any = { code, language, environment: executionEnvironment };

      if (executionEnvironment === 'cli') {
        if (!isCliConnected) {
          throw new Error('CLI is not connected. Please connect using the command.');
        }
        body.connectionId = sshUrl.split(' ').pop(); // Extract connectionId from the command
      }

      console.log(`Sending ${executionEnvironment} execution request:`, body);
      const response = await fetch(`http://localhost:3001/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      
      console.log('Received response:', response);
      
      const data = await response.json();
      console.log('Parsed response data:', data);
      
      if (!response.ok) {
        throw new Error(`Error: ${data.error}\n${data.stderr || ''}`);
      }
      
      setCodeOutput(`${executionEnvironment.toUpperCase()} Output:\n${data.output}`);
    } catch (error) {
      console.error('Code execution error:', error);
      setCodeOutput(`${(error as Error).message}`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white overflow-hidden">
      <AuroraBackground className="absolute inset-0">
        <CardSpotlight className="w-full min-h-screen p-4">
          <Button
            onClick={() => router.back()}
            className="absolute top-4 left-4 z-10 bg-gray-700 hover:bg-gray-600"
          >
            <IconArrowLeft className="mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex flex-col lg:flex-row h-full pt-16">
            {/* Left side - Voice Input */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center mb-8 lg:mb-0 lg:pr-8">
              <LampContainer>
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64">
                  <Ripple
                    color={isListening ? "#4CAF50" : "#2196F3"}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                      className={`${styles.siriButton} ${isListening ? styles.listening : ''}`}
                      onClick={toggleListening}
                    >
                      <IconMicrophone className={styles.micIcon} size={24} />
                    </div>
                  </div>
                </div>
              </LampContainer>
              <div className="text-center mt-4">
                <p className="text-lg font-semibold mb-2">
                  {isListening ? "Listening..." : "Tap to speak"}
                </p>
                {transcript && (
                  <p className="text-sm text-gray-300 mb-4">
                    You said: {transcript}
                  </p>
                )}
              </div>
            </div>

            {/* Right side - Assistant Response */}
            <div className="w-full lg:w-1/2 flex flex-col lg:pl-4 lg:border-l lg:border-gray-700">
              <h2 className="text-2xl font-bold mb-4">Assistant Response</h2>
              <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
                <label className="mr-4 mb-2 sm:mb-0">Execution Environment:</label>
                <select
                  value={executionEnvironment}
                  onChange={(e) => setExecutionEnvironment(e.target.value as 'docker' | 'cli')}
                  className="bg-gray-700 text-white p-2 rounded w-full sm:w-auto"
                >
                  <option value="cli">CLI</option>
                  <option value="docker">Docker</option>
                </select>
                {executionEnvironment === 'cli' && (
                  <Button
                    onClick={connectCli}
                    className="ml-2 bg-blue-500 hover:bg-blue-600"
                  >
                    Connect
                  </Button>
                )}
              </div>
              {sshUrl && (
                <div className="mb-4 p-4 bg-gray-700 rounded">
                  <p className="mb-2">Connection command copied to clipboard. Run this in your terminal to connect:</p>
                  <code className="block bg-gray-800 p-2 rounded mb-2">{sshUrl}</code>
                  <p className="mt-2 text-sm">
                    Status: {isCliConnected ? 'Connected' : 'Waiting for connection...'}
                  </p>
                </div>
              )}
              <div className="flex-grow bg-gray-800 rounded-lg p-4 overflow-y-auto max-h-[50vh] lg:max-h-[calc(100vh-250px)]">
                {assistantResponse ? (
                  <MDXRenderer
                    content={assistantResponse}
                    onRunCode={runCode}
                  />
                ) : (
                  <p className="text-gray-400">Waiting for your question...</p>
                )}
                {codeOutput && (
                  <div className="mt-4 p-4 bg-gray-700 rounded">
                    <h4 className="text-lg font-semibold mb-2">Output:</h4>
                    <pre className="whitespace-pre-wrap break-words">{codeOutput}</pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardSpotlight>
      </AuroraBackground>
    </div>
  )
}