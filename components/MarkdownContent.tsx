'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-lg max-w-none
        prose-headings:text-gray-800 
        prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-6
        prose-h2:text-3xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4
        prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
        prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
        prose-li:text-gray-600
        prose-strong:text-gray-800
        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic
        prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
        prose-pre:bg-gray-900 prose-pre:text-gray-100">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
