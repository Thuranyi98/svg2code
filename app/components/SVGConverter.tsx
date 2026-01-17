'use client'

import { useState, useEffect, useRef } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { xml } from '@codemirror/lang-xml'
import { oneDark } from '@codemirror/theme-one-dark'

export default function SVGConverter() {
  const [code, setCode] = useState('')
  const [svgContent, setSvgContent] = useState('')
  const [previewBg, setPreviewBg] = useState('#e3e3e3')
  const [isCopied, setIsCopied] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Detect dark mode preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkTheme(true)
    }

    // Listen for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkTheme(e.matches)
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const svgDataURL = (svg: SVGElement) => {
    const svgAsXML = new XMLSerializer().serializeToString(svg)
    return 'data:image/svg+xml,' + encodeURIComponent(svgAsXML)
  }

  const readFile = (file: File) => {
    if (!file || !file.type.includes('svg')) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const value = event.target?.result as string
      if (value) {
        setCode(value)
        processSVG(value)
      }
    }
    reader.readAsText(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      readFile(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      readFile(file)
    }
  }

  const processSVG = (value: string) => {
    const fragment = document.createRange().createContextualFragment(value)
    const svgElement = fragment.querySelector('svg')
    
    if (svgElement) {
      setSvgContent(value)
    } else {
      setSvgContent('')
    }
  }

  const handleEditorChange = (value: string) => {
    setCode(value)
    processSVG(value)
  }

  const handleCopy = async () => {
    if (!code) return
    
    try {
      await navigator.clipboard.writeText(code)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleDownload = () => {
    if (!previewRef.current) return
    
    const svg = previewRef.current.querySelector('svg')
    if (!svg) return

    const dataUrl = svgDataURL(svg)
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = 'image.svg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePreviewBgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreviewBg(e.target.value || '#e3e3e3')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="mb-8 text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            SVG2Code
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Convert SVG images to clean, formatted code instantly
          </p>
        </header>

        {/* Ad Banner */}
        <div className="mb-6 text-center">
          <a
            href="https://www.effectivegatecpm.com/bewfiw7m?key=b84960de09b7b935c3d7bbd1fb1c7c55"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          >
            Advertisement
          </a>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          {/* File Upload Section */}
          <div className="mb-6 animate-slide-up">
            <label className="block">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer bg-white dark:bg-slate-800 transition-all duration-300 hover:shadow-lg group ${
                  isDragging
                    ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20 scale-105'
                    : 'border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400'
                }`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className={`w-10 h-10 mb-3 transition-colors ${
                    isDragging
                      ? 'text-blue-500'
                      : 'text-slate-400 group-hover:text-blue-500'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">SVG files only</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".svg"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </label>
          </div>

          {/* Side by Side Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in-delay">
            {/* Code Editor Section */}
            <div className="flex flex-col h-[600px] animate-slide-left">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                  SVG Code
                </h2>
                <button
                  onClick={handleCopy}
                  disabled={!code}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                >
                  {isCopied ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy Code
                    </span>
                  )}
                </button>
              </div>
              <div className="flex-1 border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden shadow-lg bg-white dark:bg-slate-800">
                <CodeMirror
                  value={code}
                  onChange={handleEditorChange}
                  height="100%"
                  extensions={[xml()]}
                  theme={isDarkTheme ? oneDark : undefined}
                  basicSetup={{
                    lineNumbers: true,
                    foldGutter: true,
                    dropCursor: false,
                    allowMultipleSelections: false,
                    indentOnInput: true,
                    bracketMatching: true,
                    closeBrackets: true,
                    autocompletion: true,
                    highlightSelectionMatches: false,
                  }}
                  className="h-full [&_.cm-editor]:h-full [&_.cm-scroller]:h-full"
                />
              </div>
            </div>

            {/* Preview Section */}
            <div className="flex flex-col h-[600px] animate-slide-right">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                  Preview
                </h2>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <span>BG:</span>
                    <input
                      type="color"
                      value={previewBg}
                      onChange={handlePreviewBgChange}
                      className="w-10 h-8 rounded cursor-pointer border border-slate-300 dark:border-slate-600"
                    />
                  </label>
                  <button
                    onClick={handleDownload}
                    disabled={!svgContent}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </span>
                  </button>
                </div>
              </div>
              <div
                className="flex-1 border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden shadow-lg flex items-center justify-center p-8 relative"
                style={{ background: previewBg }}
              >
                {svgContent ? (
                  <div
                    ref={previewRef}
                    className="w-full h-full flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                  />
                ) : code ? (
                  <div className="text-center text-red-500 dark:text-red-400">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg font-medium">Not a valid SVG code</p>
                  </div>
                ) : (
                  <div className="text-center text-slate-400 dark:text-slate-500">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-lg">Upload an SVG file to see preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
