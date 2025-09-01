'use client';

import { useState } from 'react';
import { FileText, Download, Upload, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import toast from 'react-hot-toast';

interface Document {
  id: string;
  name: string;
  description: string;
  url: string;
  size?: string;
  uploadedAt: string;
}

const initialDocuments: Document[] = [
  {
    id: '1',
    name: 'Roadmaps.pdf',
    description: 'Strategic roadmap from MVP to global scale',
    url: '/Users/martinkawalski/Documents/GitHub/ZOE/Roadmaps.pdf',
    size: '93 KB',
    uploadedAt: '2025-08-30'
  },
  {
    id: '2',
    name: 'ZOE Values.pdf',
    description: 'Core company values and principles',
    url: '/Users/martinkawalski/Documents/GitHub/ZOE/ZOE Values.pdf',
    size: '43 KB',
    uploadedAt: '2025-08-30'
  },
  {
    id: '3',
    name: 'ZOE One Sentence.pdf',
    description: 'Mission statement and vision',
    url: '/Users/martinkawalski/Documents/GitHub/ZOE/ZOE one sentence.pdf',
    size: '19 KB',
    uploadedAt: '2025-08-30'
  },
  {
    id: '4',
    name: "Zoe's Strength and Unique Positioning.pdf",
    description: 'Competitive advantages and market position',
    url: "/Users/martinkawalski/Documents/GitHub/ZOE/Zoe's strength and unique positioning.pdf",
    size: '62 KB',
    uploadedAt: '2025-08-30'
  },
  {
    id: '5',
    name: 'Business Model & Pricing.pdf',
    description: 'Tiered pricing and business strategy',
    url: '/Users/martinkawalski/Documents/GitHub/ZOE/Zoe Wiki – Business Model & Pricing.pdf',
    size: '45 KB',
    uploadedAt: '2025-09-01'
  },
  {
    id: '6',
    name: 'Product & Technology Architecture.pdf',
    description: 'Technical architecture and product design',
    url: '/Users/martinkawalski/Documents/GitHub/ZOE/Zoe Wiki – Product & Technology Architecture.pdf',
    size: '52 KB',
    uploadedAt: '2025-09-01'
  }
];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [isDragging, setIsDragging] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleFileUpload = (files: FileList | null) => {
    if (!files || !isAuthenticated) return;

    Array.from(files).forEach(file => {
      if (file.type === 'application/pdf') {
        const newDoc: Document = {
          id: Date.now().toString(),
          name: file.name,
          description: 'Newly uploaded document',
          url: URL.createObjectURL(file),
          size: `${Math.round(file.size / 1024)} KB`,
          uploadedAt: new Date().toISOString().split('T')[0]
        };
        setDocuments(prev => [...prev, newDoc]);
        toast.success(`Uploaded ${file.name}`);
      } else {
        toast.error(`${file.name} is not a PDF file`);
      }
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(prev => prev.filter(doc => doc.id !== id));
      toast.success('Document deleted');
    }
  };

  const handleDownload = (doc: Document) => {
    // In a real app, this would download the actual file
    toast.success(`Downloading ${doc.name}`);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-amber-500" />
            <h1 className="text-4xl font-bold text-gray-800">Company Documents</h1>
          </div>
          <p className="text-gray-600">
            All source documents that power the ZOE Wiki
          </p>
        </div>

        {/* Upload Area (only for authenticated users) */}
        {isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 border-2 border-dashed rounded-xl p-8 text-center transition-all ${
              isDragging 
                ? 'border-orange-500 bg-orange-50' 
                : 'border-gray-300 bg-white hover:border-orange-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Upload New Documents
            </h3>
            <p className="text-gray-500 mb-4">
              Drag and drop PDF files here, or click to browse
            </p>
            <label className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg cursor-pointer hover:shadow-lg transition-all">
              <Plus className="w-4 h-4" />
              Select Files
              <input
                type="file"
                accept=".pdf"
                multiple
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
            </label>
          </motion.div>
        )}

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gradient-to-r from-orange-100 to-amber-100 rounded-lg">
                  <FileText className="w-6 h-6 text-orange-600" />
                </div>
                {isAuthenticated && (
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                {doc.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {doc.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>{doc.size}</span>
                <span>{doc.uploadedAt}</span>
              </div>
              
              <button
                onClick={() => handleDownload(doc)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
