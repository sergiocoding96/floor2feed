'use client'

import { SerializedEditorState } from 'lexical'
import {
  JSXConvertersFunction,
  RichText as PayloadRichText,
} from '@payloadcms/richtext-lexical/react'

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
})

interface RichTextProps {
  data: SerializedEditorState
  className?: string
}

export function RichText({ data, className = '' }: RichTextProps) {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <style jsx global>{`
        .prose h1 {
          @apply text-3xl md:text-4xl font-bold text-midnight mb-6 mt-12 first:mt-0;
        }
        .prose h2 {
          @apply text-2xl md:text-3xl font-semibold text-midnight mb-4 mt-10;
        }
        .prose h3 {
          @apply text-xl md:text-2xl font-semibold text-midnight mb-3 mt-8;
        }
        .prose p {
          @apply text-gray-700 leading-relaxed mb-6;
        }
        .prose a {
          @apply text-gold hover:text-bronze underline transition-colors;
        }
        .prose ul,
        .prose ol {
          @apply mb-6 pl-6;
        }
        .prose li {
          @apply text-gray-700 mb-2;
        }
        .prose blockquote {
          @apply border-l-4 border-gold pl-6 italic text-gray-600 my-8;
        }
        .prose img {
          @apply rounded-xl my-8;
        }
        .prose pre {
          @apply bg-midnight text-white rounded-xl p-6 overflow-x-auto my-8;
        }
        .prose code {
          @apply bg-silver text-midnight px-2 py-1 rounded text-sm;
        }
        .prose pre code {
          @apply bg-transparent text-white p-0;
        }
      `}</style>
      <PayloadRichText data={data} converters={jsxConverters} />
    </div>
  )
}
