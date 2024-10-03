'use client';

import { useState } from 'react';
import { Button } from "@acme/ui";

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-[#1c1c1c] p-2 rounded-md flex justify-between items-center mb-4">
      <code className="text-white">{code}</code>
      <Button variant="secondary" size="sm" onClick={copyToClipboard}>
        {copied ? 'Copied!' : 'Copy'}
      </Button>
    </div>
  );
};

export default CodeBlock;