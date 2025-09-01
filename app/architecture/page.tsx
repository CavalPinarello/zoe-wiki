import EditableContent from '@/components/EditableContent';
import { wikiContent } from '@/lib/wiki-content-actual';
import { Cpu } from 'lucide-react';

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Cpu className="w-8 h-8 text-blue-500" />
            <h1 className="text-4xl font-bold text-gray-800">Technology Architecture</h1>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <EditableContent 
            content={wikiContent.architecture} 
            contentKey="architecture"
            title="Product & Technology Architecture"
          />
        </div>
      </div>
    </div>
  );
}
