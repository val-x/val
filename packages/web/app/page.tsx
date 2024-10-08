"use client"

import Image from 'next/image';
import CodeBlock from './components/CodeBlock';
import { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import { FloatingDock } from "@/components/ui/floating-dock"
import { ThemeToggle } from "@/components/ThemeToggle"
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Timeline } from "@/components/ui/timeline";
import { WavyBackground } from "@/components/ui/wavy-background";
import { TeamSection } from "@/components/ui/team-section";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";
import { IconHome, IconCode, IconServer, IconSend, IconPlus, IconX, IconEdit, IconNetwork } from "@tabler/icons-react";
import Link from 'next/link';
import { Select } from "@/components/ui/select"
import { useRouter } from 'next/navigation'

const PALM_TREE_IMAGE = 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80';

const agentItems = [
  { title: "MacOS", icon: "🍎", href: "#macos" },
  { title: "Windows", icon: "🪟", href: "#windows" },
  { title: "Linux", icon: "🐧", href: "#linux" },
  { title: "Docker", icon: "🐳", href: "#docker" },
];


const sdkItems = [
  { title: "Python", icon: "🐍", href: "#python" },
  { title: "JavaScript", icon: "🟨", href: "#javascript" },
  { title: "React Native", icon: "⚛️", href: "#react-native" },
];


const resourceItems = [
  { title: "CPU", icon: "💻", href: "#cpu" },
  { title: "GPU", icon: "🎮", href: "#gpu" },
  { title: "Memory", icon: "🧠", href: "#memory" },
  { title: "Storage", icon: "💾", href: "#storage" },
  { title: "Bandwidth", icon: "🌐", href: "#bandwidth" },
];


const FeatureItem = ({ title, description, status, guide }: { title: string; description: string; status: 'Free' | 'Premium'; guide: string }) => (
  <CardSpotlight className="h-full">
    <div className="flex justify-between items-start mb-2">
      <Image src={PALM_TREE_IMAGE} alt={title} width={24} height={24} />
      <span className={`text-xs px-2 py-1 rounded ${status === 'Free' ? 'bg-green-500' : 'bg-purple-500'}`}>
        {status}
      </span>
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-400 mb-4">{description}</p>
    <Button variant="link" asChild>
      <Link href={guide}>Learn More</Link>
    </Button>
  </CardSpotlight>
);

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Jane Smith",
    designation: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 3,
    name: "Bob Johnson",
    designation: "Designer",
    image:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 4,
    name: "Alice Williams",
    designation: "Marketing Specialist",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80",
  },
];

export default function Home() {
  const router = useRouter()
  const [backgroundImage, setBackgroundImage] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState("Windows");
  const platforms = ["Windows", "MacOS", "Linux", "Docker"];
  const [input, setInput] = useState('')
  const [showSourceGuide, setShowSourceGuide] = useState(false)

  useEffect(() => {
    setBackgroundImage(PALM_TREE_IMAGE);
  }, []);

  const handlePlatformChange = () => {
    const currentIndex = platforms.indexOf(selectedPlatform);
    const nextIndex = (currentIndex + 1) % platforms.length;
    setSelectedPlatform(platforms[nextIndex]);
  };

  const handleSend = () => {
    // Implementation for handleSend function
  }

  const handleArtifactRun = (type: string) => {
    // Implementation for handleArtifactRun function
  }

  const navigateToTopologyMonitor = () => {
    router.push('/topology-monitor')
  }

  const timelineData = [
    {
      title: "Join the Network",
      content: (
        <CardSpotlight className="mb-8">
          <div className="p-6">
            <p className="text-muted-foreground mb-6">Connect your resources to the Valen network and start contributing</p>
            <div className="bg-secondary p-4 sm:p-6 rounded-lg">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <Image
                    src={PALM_TREE_IMAGE}
                    alt={`${selectedPlatform} Logo`}
                    width={48}
                    height={48}
                  />
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Agent</h3>
                    <h2 className="text-xl font-bold">{selectedPlatform}</h2>
                  </div>
                </div>
                <HoverBorderGradient onClick={handlePlatformChange}>
                  Choose another platform
                </HoverBorderGradient>
              </div>
              
              <h3 className="font-medium mb-2">Installation</h3>
              <div className="mb-4">
                <p className="text-muted-foreground mb-2">Install the Valen client with the following command:</p>
                <CodeBlock code={`winget install valen-client-${selectedPlatform.toLowerCase()}`} />
              </div>
              
              <p className="text-muted-foreground mb-2">Run the following command to connect to the Valen network:</p>
              <CodeBlock code="valen connect" />
              
              <h3 className="font-medium mb-2 mt-6">Start contributing</h3>
              <p className="text-muted-foreground mb-2">To start sharing your resources, run:</p>
              <CodeBlock code="valen start-sharing" />
              
              <p className="text-muted-foreground mt-4">
                Once connected, you can monitor your contributions on the{' '}
                <Button variant="link" asChild>
                  <Link href="/dashboard">dashboard</Link>
                </Button>.
              </p>
            </div>
          </div>
        </CardSpotlight>
      ),
    },
    {
      title: "Explore Valen Features",
      content: (
        <CardSpotlight className="mb-8">
          <div className="p-6">
            <p className="text-muted-foreground mb-6">Discover the benefits of our decentralized AI platform</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <FeatureItem
                title="Resource Sharing"
                description="Share your unused computing resources and earn rewards while contributing to the AI community."
                status="Free"
                guide="#resource-sharing"
              />
              <FeatureItem
                title="AI Model Access"
                description="Get free access to a wide range of AI models, from language processing to image generation."
                status="Free"
                guide="#ai-models"
              />
              <FeatureItem
                title="Privacy-Focused"
                description="Your data remains secure with our decentralized approach to AI computation."
                status="Free"
                guide="#privacy"
              />
              <FeatureItem
                title="Token Rewards"
                description="Earn Valen tokens for sharing your resources, redeemable for premium features or real-world value."
                status="Free"
                guide="#rewards"
              />
              <FeatureItem
                title="Community Governance"
                description="Participate in platform decisions and shape the future of decentralized AI."
                status="Free"
                guide="#governance"
              />
              <FeatureItem
                title="Developer API"
                description="Integrate Valen's decentralized AI capabilities into your own applications and services."
                status="Free"
                guide="#api"
              />
            </div>
          </div>
        </CardSpotlight>
      ),
    },
    {
      title: "Meet Our Team",
      content: (
        <CardSpotlight className="mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground mb-6">The talented individuals behind Valen's success</p>
            <TeamSection people={people} />
          </div>
        </CardSpotlight>
      ),
    },
  ];

  const sidebarLinks = [
    { label: "Home", href: "#", icon: <IconHome className="h-5 w-5" /> },
    { label: "SDKs", href: "#sdks", icon: <IconCode className="h-5 w-5" /> },
    { label: "Resources", href: "#resources", icon: <IconServer className="h-5 w-5" /> },
  ];

  return (
    <Sidebar>
      <WavyBackground className="min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-4">
            <ThemeToggle />
            <SidebarTrigger />
          </div>
          <CardSpotlight>
            <div className="p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row justify-between items-start space-y-8 lg:space-y-0 lg:space-x-8">
                <div className="w-full lg:w-1/2">
                  <TextHoverEffect text="Welcome to Valen" className="h-16 sm:h-24 mb-4 sm:mb-6" />
                  <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
                    Valen is a decentralized AI platform where users share their resources
                    to use AI models for free. Join our community and unlock the power of
                    collaborative artificial intelligence.
                  </p>
                </div>
                <div className="w-full lg:w-1/2 space-y-4">
                  <FloatingDock items={agentItems} className="w-full" label="Agents" />
                  <FloatingDock items={sdkItems} className="w-full" label="SDKs" />
                  <FloatingDock items={resourceItems} className="w-full" label="Resources" />
                </div>
              </div>
              
              {/* Add the Topology Monitor button here */}
              <div className="mt-6">
                <Button onClick={navigateToTopologyMonitor} className="mr-2">
                  <IconNetwork className="h-5 w-5 mr-2" />
                  Topology Monitor
                </Button>
              </div>
            </div>
          </CardSpotlight>
          
          <p className="text-center text-muted-foreground my-8">Ready to explore Valen?</p>
          
          <Timeline data={timelineData} />
        </div>
      </WavyBackground>
      <SidebarContent links={sidebarLinks} />
    </Sidebar>
  );
}