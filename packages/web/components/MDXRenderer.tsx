import React from 'react'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { IconCopy, IconTerminal2, IconBrandDocker } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

interface CodeBlockProps {
  children: string;
  className?: string;
  onCopy: (code: string) => void;
  onRunCode: (code: string, language: string) => void;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className, onCopy, onRunCode }) => {
  const language = className ? className.replace(/language-/, '') : 'javascript'
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    onCopy(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <SyntaxHighlighter language={language} style={dracula}>
        {children}
      </SyntaxHighlighter>
      <div className="absolute top-2 right-2 flex space-x-2">
        <Button onClick={handleCopy} className="bg-gray-700 hover:bg-gray-600">
          <IconCopy size={16} className="mr-1" />
          {copied ? 'Copied!' : 'Copy'}
        </Button>
        <Button onClick={() => onRunCode(children, language)} className="bg-blue-500 hover:bg-blue-600">
          <IconTerminal2 size={16} className="mr-1" />
          Run Code
        </Button>
      </div>
    </div>
  )
}

interface MDXRendererProps {
  content: string;
  onRunCode: (code: string, language: string) => void;
}

const MDXRenderer: React.FC<MDXRendererProps> = ({ content, onRunCode }) => {
  const [mdxSource, setMdxSource] = React.useState<MDXRemoteSerializeResult | null>(null)

  React.useEffect(() => {
    const renderMDX = async () => {
      const mdxSource = await serialize(content, {
        mdxOptions: {
          remarkPlugins: [remarkMath, remarkGfm],
          rehypePlugins: [rehypeKatex],
        },
      })
      setMdxSource(mdxSource)
    }
    renderMDX()
  }, [content])

  if (!mdxSource) return null

  const components = {
    code: (props: any) => <CodeBlock {...props} onCopy={(code) => navigator.clipboard.writeText(code)} onRunCode={onRunCode} />,
    table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200" {...props} />
      </div>
    ),
    th: (props: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props} />,
    td: (props: React.TdHTMLAttributes<HTMLTableDataCellElement>) => <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" {...props} />,
    inlineMath: ({ value }: { value: string }) => <InlineMath math={value} />,
    math: ({ value }: { value: string }) => <BlockMath math={value} />
  }

  return <MDXRemote {...mdxSource} components={components} />
}

export default MDXRenderer