import EditableContent from '@/components/EditableContent';
import { wikiContent } from '@/lib/wiki-content-actual';
import { Heart } from 'lucide-react';

export default function ValuesPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-red-500" />
            <h1 className="text-4xl font-bold text-gray-800">Company Values</h1>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <EditableContent 
            content={wikiContent.values} 
            contentKey="values"
            title="ZOE Values"
          />
        </div>
      </div>
    </div>
  );
}
