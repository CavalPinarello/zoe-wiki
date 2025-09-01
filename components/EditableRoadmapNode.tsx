import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Edit2, Check, X, Plus, Trash2 } from 'lucide-react';

interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'planned' | 'in-progress' | 'completed' | 'at-risk';
  category: string;
  children?: RoadmapNode[];
  details?: string[];
}

interface EditableRoadmapNodeProps {
  node: RoadmapNode;
  depth?: number;
  onUpdate: (nodeId: string, updates: Partial<RoadmapNode>) => void;
  onDelete: (nodeId: string) => void;
  onAddChild: (parentId: string, child: RoadmapNode) => void;
}

export default function EditableRoadmapNode({
  node,
  depth = 0,
  onUpdate,
  onDelete,
  onAddChild
}: EditableRoadmapNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(node);
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [newChildData, setNewChildData] = useState<Partial<RoadmapNode>>({
    title: '',
    description: '',
    status: 'planned',
    category: node.category
  });

  const statusColors = {
    'planned': 'bg-amber-100 text-amber-800 border-amber-300',
    'in-progress': 'bg-orange-100 text-orange-800 border-orange-300',
    'completed': 'bg-green-100 text-green-800 border-green-300',
    'at-risk': 'bg-red-100 text-red-800 border-red-300'
  };

  const categoryColors = {
    'Technology': 'border-l-amber-500',
    'Market': 'border-l-orange-500',
    'Product': 'border-l-amber-600',
    'Team': 'border-l-orange-600',
    'Finance': 'border-l-amber-700',
    'Operations': 'border-l-orange-700'
  };

  const handleSave = () => {
    onUpdate(node.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(node);
    setIsEditing(false);
  };

  const handleAddChild = () => {
    const child: RoadmapNode = {
      id: `node-${Date.now()}`,
      title: newChildData.title || 'New Item',
      description: newChildData.description || '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      status: newChildData.status as RoadmapNode['status'] || 'planned',
      category: newChildData.category || node.category
    };
    onAddChild(node.id, child);
    setIsAddingChild(false);
    setNewChildData({
      title: '',
      description: '',
      status: 'planned',
      category: node.category
    });
    setIsExpanded(true);
  };

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className={`mb-2 ${depth > 0 ? 'ml-6' : ''}`}>
      <div 
        className={`
          border rounded-lg p-3 transition-all duration-200
          ${categoryColors[node.category as keyof typeof categoryColors] || 'border-l-gray-500'}
          border-l-4 hover:shadow-md bg-white
        `}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {(hasChildren || isAddingChild) && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-0.5 hover:bg-amber-100 rounded transition-colors"
                >
                  {isExpanded ? 
                    <ChevronDown className="w-4 h-4 text-amber-600" /> : 
                    <ChevronRight className="w-4 h-4 text-amber-600" />
                  }
                </button>
              )}
              
              {isEditing ? (
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({...editData, title: e.target.value})}
                  className="flex-1 px-2 py-1 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              ) : (
                <h3 className="font-semibold text-gray-900 flex-1">{node.title}</h3>
              )}
              
              <span className={`px-2 py-1 text-xs rounded-full border ${statusColors[node.status]}`}>
                {isEditing ? (
                  <select
                    value={editData.status}
                    onChange={(e) => setEditData({...editData, status: e.target.value as RoadmapNode['status']})}
                    className="bg-transparent outline-none"
                  >
                    <option value="planned">Planned</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="at-risk">At Risk</option>
                  </select>
                ) : (
                  node.status.replace('-', ' ')
                )}
              </span>
            </div>

            {isEditing ? (
              <textarea
                value={editData.description}
                onChange={(e) => setEditData({...editData, description: e.target.value})}
                className="w-full px-2 py-1 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400 mb-2"
                rows={2}
              />
            ) : (
              <p className="text-sm text-gray-600 mb-2">{node.description}</p>
            )}

            <div className="flex items-center gap-4 text-xs text-gray-500">
              {isEditing ? (
                <>
                  <input
                    type="date"
                    value={editData.startDate}
                    onChange={(e) => setEditData({...editData, startDate: e.target.value})}
                    className="px-2 py-1 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <span>to</span>
                  <input
                    type="date"
                    value={editData.endDate}
                    onChange={(e) => setEditData({...editData, endDate: e.target.value})}
                    className="px-2 py-1 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </>
              ) : (
                <>
                  <span>{node.startDate}</span>
                  <span>→</span>
                  <span>{node.endDate}</span>
                </>
              )}
              
              <span className="ml-2 px-2 py-1 bg-amber-50 text-amber-700 rounded">
                {isEditing ? (
                  <select
                    value={editData.category}
                    onChange={(e) => setEditData({...editData, category: e.target.value})}
                    className="bg-transparent outline-none"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Market">Market</option>
                    <option value="Product">Product</option>
                    <option value="Team">Team</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                  </select>
                ) : (
                  node.category
                )}
              </span>
            </div>

            {node.details && node.details.length > 0 && !isEditing && (
              <div className="mt-2 pt-2 border-t border-gray-200">
                <ul className="text-sm text-gray-600 space-y-1">
                  {node.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 ml-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="p-1.5 text-green-600 hover:bg-green-100 rounded transition-colors"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-1.5 text-red-600 hover:bg-red-100 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1.5 text-amber-600 hover:bg-amber-100 rounded transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsAddingChild(true)}
                  className="p-1.5 text-orange-600 hover:bg-orange-100 rounded transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
                {depth > 0 && (
                  <button
                    onClick={() => onDelete(node.id)}
                    className="p-1.5 text-red-600 hover:bg-red-100 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {isAddingChild && (
        <div className="ml-6 mt-2 p-3 border-2 border-dashed border-amber-300 rounded-lg bg-amber-50">
          <h4 className="text-sm font-semibold text-amber-800 mb-2">Add Sub-item</h4>
          <input
            type="text"
            placeholder="Title"
            value={newChildData.title}
            onChange={(e) => setNewChildData({...newChildData, title: e.target.value})}
            className="w-full px-2 py-1 mb-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <textarea
            placeholder="Description"
            value={newChildData.description}
            onChange={(e) => setNewChildData({...newChildData, description: e.target.value})}
            className="w-full px-2 py-1 mb-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
            rows={2}
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddChild}
              className="px-3 py-1 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => {
                setIsAddingChild(false);
                setNewChildData({
                  title: '',
                  description: '',
                  status: 'planned',
                  category: node.category
                });
              }}
              className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {isExpanded && hasChildren && (
        <div className="mt-2">
          {node.children!.map((child) => (
            <EditableRoadmapNode
              key={child.id}
              node={child}
              depth={depth + 1}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onAddChild={onAddChild}
            />
          ))}
        </div>
      )}
    </div>
  );
}
