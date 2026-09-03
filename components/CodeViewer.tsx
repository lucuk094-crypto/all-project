'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Code2, FileCode } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface CodeViewerProps {
  code: {
    html: string;
    css: string;
    javascript: string;
  };
  theme?: 'light' | 'dark';
}

export default function CodeViewer({ code, theme = 'dark' }: CodeViewerProps) {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'javascript'>('html');
  const [copied, setCopied] = useState(false);

  const tabs = [
    { id: 'html' as const, label: 'HTML', icon: FileCode, code: code.html, language: 'html' },
    { id: 'css' as const, label: 'CSS', icon: FileCode, code: code.css, language: 'css' },
    { id: 'javascript' as const, label: 'JavaScript', icon: Code2, code: code.javascript, language: 'javascript' },
  ];

  const activeCode = tabs.find(tab => tab.id === activeTab);

  const handleCopy = async () => {
    if (activeCode?.code) {
      await navigator.clipboard.writeText(activeCode.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="w-full overflow-hidden border-gray-200">
      <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800 text-white pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Code2 className="w-6 h-6" />
            Source Code
          </CardTitle>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            className="bg-white/10 hover:bg-white/20 text-white border-white/20 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Code
              </>
            )}
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-4 border-b border-white/20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-t-lg ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {activeCode && activeCode.code ? (
          <div className="relative">
            <div className="overflow-x-auto">
              <SyntaxHighlighter
                language={activeCode.language}
                style={theme === 'dark' ? vscDarkPlus : vs}
                customStyle={{
                  margin: 0,
                  padding: '1.5rem',
                  background: theme === 'dark' ? '#1e1e1e' : '#ffffff',
                  fontSize: '14px',
                  lineHeight: '1.6',
                }}
                showLineNumbers
                wrapLines
                lineNumberStyle={{
                  minWidth: '3em',
                  paddingRight: '1em',
                  color: theme === 'dark' ? '#858585' : '#999999',
                  textAlign: 'right',
                  userSelect: 'none',
                }}
              >
                {activeCode.code}
              </SyntaxHighlighter>
            </div>

            {/* Code Stats */}
            <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
              {activeCode.code.split('\n').length} lines
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <FileCode className="w-16 h-16 mb-4 opacity-30" />
            <p className="text-lg font-medium">No code available</p>
            <p className="text-sm">No {activeTab.toUpperCase()} code has been added for this project.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
