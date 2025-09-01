import EditableContent from '@/components/EditableContent';
import { wikiContent } from '@/lib/wiki-content-actual';
import { Sparkles } from 'lucide-react';

export default function StrengthsPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-purple-500" />
            <h1 className="text-4xl font-bold text-gray-800">Our Strengths</h1>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <EditableContent 
            content={wikiContent.strengths} 
            contentKey="strengths"
            title="Strengths & Positioning"
          />
        </div>
      </div>
    </div>
  );
}
