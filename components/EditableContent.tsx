'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Edit3, Save, X, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

interface EditableContentProps {
  content: string;
  contentKey: string;
  title?: string;
}

export default function EditableContent({ content: initialContent, contentKey, title }: EditableContentProps) {
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [isPreview, setIsPreview] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Load saved content from localStorage
    const savedContent = localStorage.getItem(`wiki-content-${contentKey}`);
    if (savedContent) {
      setContent(savedContent);
      setEditedContent(savedContent);
    }
  }, [contentKey]);

  const handleSave = () => {
    // Save to localStorage (in production, this would be an API call)
    localStorage.setItem(`wiki-content-${contentKey}`, editedContent);
    setContent(editedContent);
    setIsEditing(false);
    toast.success('Content saved successfully!');
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset to original content?')) {
      localStorage.removeItem(`wiki-content-${contentKey}`);
      setContent(initialContent);
      setEditedContent(initialContent);
      toast.success('Content reset to original');
    }
  };

  if (isEditing && isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setIsPreview(!isPreview)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                {isPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {isPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors"
              >
                Reset to Original
              </button>
            </div>
          </div>
        )}
        
        <div className={`grid ${isPreview ? 'grid-cols-2 gap-4' : 'grid-cols-1'}`}>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Edit Markdown</label>
              <span className="text-xs text-gray-500">Supports full Markdown syntax</span>
            </div>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full h-[600px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              placeholder="Enter markdown content..."
            />
          </div>
          
          {isPreview && (
            <div>
              <div className="mb-2">
                <label className="text-sm font-medium text-gray-700">Live Preview</label>
              </div>
              <div className="h-[600px] p-4 border border-gray-200 rounded-lg overflow-y-auto bg-gray-50">
                <div className="prose prose-lg max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {editedContent}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
          <button
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative group">
      {isAuthenticated && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-4 right-4 p-2 bg-blue-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-600 flex items-center gap-2 z-10"
        >
          <Edit3 className="w-4 h-4" />
          Edit
        </button>
      )}
      
      <div className="prose prose-lg max-w-none prose-p:whitespace-pre-wrap">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({children}) => <p className="mb-4">{children}</p>,
            h1: ({children}) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
            h2: ({children}) => <h2 className="text-3xl font-semibold mt-6 mb-3">{children}</h2>,
            h3: ({children}) => <h3 className="text-2xl font-semibold mt-4 mb-2">{children}</h3>,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
