'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Code2, Copy, FileCode } from 'lucide-react';
import { Button } from './ui/button';

interface CodeViewerProps {
  code: {
    html: string;
    css: string;
    javascript: string;
  };
}

const TABS = [
  { id: 'html' as const, label: 'HTML', icon: FileCode, language: 'html' },
  { id: 'css' as const, label: 'CSS', icon: FileCode, language: 'css' },
  { id: 'javascript' as const, label: 'JavaScript', icon: Code2, language: 'javascript' },
];

export default function CodeViewer({ code }: CodeViewerProps) {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'javascript'>('html');
  const [copied, setCopied] = useState(false);

  const active = TABS.find((t) => t.id === activeTab) ?? TABS[0];
  const activeCode = code[active.id] ?? '';

  const handleCopy = async () => {
    if (!activeCode) return;
    try {
      await navigator.clipboard.writeText(activeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[#0b0b10]">
      {/* Tab bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-2 py-2">
        <div className="flex items-center gap-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs transition-colors ${
                activeTab === id
                  ? 'bg-white/10 text-white'
                  : 'text-white/45 hover:bg-white/5 hover:text-white/80'
              }`}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
              {label}
            </button>
          ))}
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          disabled={!activeCode}
          aria-label="Salin kode"
          className="text-white/50 hover:bg-white/10 hover:text-white"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Tersalin
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Salin
            </>
          )}
        </Button>
      </div>

      {/* Code */}
      <div className="max-h-[26rem] overflow-auto">
        {activeCode ? (
          <SyntaxHighlighter
            language={active.language}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: '1.25rem',
              background: 'transparent',
              fontSize: '0.8125rem',
              lineHeight: 1.75,
            }}
            codeTagProps={{ style: { fontFamily: 'var(--font-geist-mono), monospace' } }}
          >
            {activeCode}
          </SyntaxHighlighter>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
            <Code2 className="h-5 w-5 text-white/25" strokeWidth={1.5} />
            <p className="font-mono text-xs text-white/40">
              Belum ada kode untuk tab {active.label}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
