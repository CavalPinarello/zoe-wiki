'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronDown, ChevronRight, Plus, Save, Download, Upload, Edit2, Check, X, Trash2 } from 'lucide-react';

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

type TimeScale = 'week' | 'month' | 'quarter' | 'year' | '2-years';

interface InteractiveRoadmapProps {
  initialData?: RoadmapNode[];
}

// EditableRoadmapNode component embedded in the same file for simplicity
function EditableRoadmapNode({
  node,
  depth = 0,
  onUpdate,
  onDelete,
  onAddChild
}: {
  node: RoadmapNode;
  depth?: number;
  onUpdate: (nodeId: string, updates: Partial<RoadmapNode>) => void;
  onDelete: (nodeId: string) => void;
  onAddChild: (parentId: string, child: RoadmapNode) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(depth === 0);
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
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
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
                  <span>{new Date(node.startDate).toLocaleDateString()}</span>
                  <span>→</span>
                  <span>{new Date(node.endDate).toLocaleDateString()}</span>
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
                <button
                  onClick={() => onDelete(node.id)}
                  className="p-1.5 text-red-600 hover:bg-red-100 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
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

export default function InteractiveRoadmap({ initialData = [] }: InteractiveRoadmapProps) {
  const [timeScale, setTimeScale] = useState<TimeScale>('quarter');
  const [roadmapData, setRoadmapData] = useState<RoadmapNode[]>(initialData);
  const [filteredData, setFilteredData] = useState<RoadmapNode[]>(roadmapData);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Load saved data from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('zoe-roadmap-data');
      if (savedData && (!initialData || initialData.length === 0)) {
        try {
          const parsedData = JSON.parse(savedData);
          setRoadmapData(parsedData);
        } catch (e) {
          console.error('Failed to load saved roadmap data:', e);
        }
      }
    }
  }, []);

  // Update filtered data when roadmapData changes
  useEffect(() => {
    setFilteredData(roadmapData);
  }, [roadmapData]);

  // Calculate date range based on time scale
  useEffect(() => {
    const now = new Date();
    let start = new Date();
    let end = new Date();

    switch (timeScale) {
      case 'week':
        end.setDate(now.getDate() + 7);
        break;
      case 'month':
        end.setMonth(now.getMonth() + 1);
        break;
      case 'quarter':
        end.setMonth(now.getMonth() + 3);
        break;
      case 'year':
        end.setFullYear(now.getFullYear() + 1);
        break;
      case '2-years':
        end.setFullYear(now.getFullYear() + 2);
        break;
    }

    setDateRange({
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0]
    });
  }, [timeScale]);

  // Filter data based on category and date range
  useEffect(() => {
    let filtered = [...roadmapData];

    if (selectedCategory !== 'all') {
      filtered = filterByCategory(filtered, selectedCategory);
    }

    if (dateRange.start && dateRange.end) {
      filtered = filterByDateRange(filtered, dateRange.start, dateRange.end);
    }

    setFilteredData(filtered);
  }, [roadmapData, selectedCategory, dateRange]);

  const filterByCategory = (nodes: RoadmapNode[], category: string): RoadmapNode[] => {
    return nodes.reduce((acc: RoadmapNode[], node) => {
      if (node.category === category) {
        acc.push(node);
      } else if (node.children) {
        const filteredChildren = filterByCategory(node.children, category);
        if (filteredChildren.length > 0) {
          acc.push({ ...node, children: filteredChildren });
        }
      }
      return acc;
    }, []);
  };

  const filterByDateRange = (nodes: RoadmapNode[], start: string, end: string): RoadmapNode[] => {
    return nodes.filter(node => {
      const nodeStart = new Date(node.startDate);
      const nodeEnd = new Date(node.endDate);
      const rangeStart = new Date(start);
      const rangeEnd = new Date(end);
      
      return (nodeStart <= rangeEnd && nodeEnd >= rangeStart);
    }).map(node => {
      if (node.children) {
        return { ...node, children: filterByDateRange(node.children, start, end) };
      }
      return node;
    });
  };

  const updateNode = (nodeId: string, updates: Partial<RoadmapNode>, nodes: RoadmapNode[] = roadmapData): RoadmapNode[] => {
    return nodes.map(node => {
      if (node.id === nodeId) {
        return { ...node, ...updates };
      }
      if (node.children) {
        return { ...node, children: updateNode(nodeId, updates, node.children) };
      }
      return node;
    });
  };

  const handleNodeUpdate = (nodeId: string, updates: Partial<RoadmapNode>) => {
    setRoadmapData(prevData => updateNode(nodeId, updates, prevData));
    setHasUnsavedChanges(true);
  };

  const deleteNode = (nodeId: string, nodes: RoadmapNode[]): RoadmapNode[] => {
    return nodes.filter(node => node.id !== nodeId).map(node => {
      if (node.children) {
        return { ...node, children: deleteNode(nodeId, node.children) };
      }
      return node;
    });
  };

  const handleNodeDelete = (nodeId: string) => {
    setRoadmapData(prevData => deleteNode(nodeId, prevData));
    setHasUnsavedChanges(true);
  };

  const addChildNode = (parentId: string, child: RoadmapNode, nodes: RoadmapNode[] = roadmapData): RoadmapNode[] => {
    return nodes.map(node => {
      if (node.id === parentId) {
        return {
          ...node,
          children: [...(node.children || []), child]
        };
      }
      if (node.children) {
        return { ...node, children: addChildNode(parentId, child, node.children) };
      }
      return node;
    });
  };

  const handleAddChild = (parentId: string, child: RoadmapNode) => {
    setRoadmapData(prevData => addChildNode(parentId, child, prevData));
    setHasUnsavedChanges(true);
  };

  const handleAddRootNode = () => {
    const newNode: RoadmapNode = {
      id: `node-${Date.now()}`,
      title: 'New Initiative',
      description: 'Click to edit this item',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'planned',
      category: 'Product'
    };
    setRoadmapData([...roadmapData, newNode]);
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('zoe-roadmap-data', JSON.stringify(roadmapData));
      setHasUnsavedChanges(false);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(roadmapData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `zoe-roadmap-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          setRoadmapData(data);
          setHasUnsavedChanges(true);
        } catch (error) {
          alert('Failed to import roadmap data. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const timeScaleOptions: { value: TimeScale; label: string; description: string }[] = [
    { value: 'week', label: '1 Week', description: 'Daily view' },
    { value: 'month', label: '1 Month', description: 'Weekly view' },
    { value: 'quarter', label: '3 Months', description: 'Monthly view' },
    { value: 'year', label: '1 Year', description: 'Quarterly view' },
    { value: '2-years', label: '2 Years', description: 'Strategic view' }
  ];

  const categories = ['all', 'Technology', 'Market', 'Product', 'Team', 'Finance', 'Operations'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header Controls */}
      <div className="sticky top-0 z-10 bg-white border-b border-amber-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Interactive Roadmap</h1>
              {hasUnsavedChanges && (
                <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                  Unsaved changes
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              {/* Time Scale Selector */}
              <div className="flex items-center gap-2 bg-amber-50 rounded-lg p-1">
                <Clock className="w-4 h-4 text-amber-600 ml-2" />
                {timeScaleOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setTimeScale(option.value)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      timeScale === option.value
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-amber-100'
                    }`}
                    title={option.description}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleAddRootNode}
                  className="px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
                
                <button
                  onClick={handleSave}
                  className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1 ${
                    hasUnsavedChanges 
                      ? 'bg-amber-600 text-white hover:bg-amber-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!hasUnsavedChanges}
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>

                <button
                  onClick={handleExport}
                  className="px-3 py-2 border border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors flex items-center gap-1"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>

                <label className="px-3 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors flex items-center gap-1 cursor-pointer">
                  <Upload className="w-4 h-4" />
                  Import
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Date Range Display */}
          {dateRange.start && dateRange.end && (
            <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>
                Showing: {new Date(dateRange.start).toLocaleDateString()} - {new Date(dateRange.end).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Roadmap Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {filteredData.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
              <Calendar className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No roadmap items</h3>
            <p className="text-gray-600 mb-4">
              {selectedCategory !== 'all' 
                ? `No items found in the ${selectedCategory} category for this time range.`
                : 'Get started by adding your first roadmap item.'}
            </p>
            <button
              onClick={handleAddRootNode}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add First Item
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredData.map(node => (
              <EditableRoadmapNode
                key={node.id}
                node={node}
                onUpdate={handleNodeUpdate}
                onDelete={handleNodeDelete}
                onAddChild={handleAddChild}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
