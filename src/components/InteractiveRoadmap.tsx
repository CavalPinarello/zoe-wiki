import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, Plus, Save, Download, Upload } from 'lucide-react';
import EditableRoadmapNode from './EditableRoadmapNode';

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

export default function InteractiveRoadmap({ initialData }: InteractiveRoadmapProps) {
  const [timeScale, setTimeScale] = useState<TimeScale>('quarter');
  const [roadmapData, setRoadmapData] = useState<RoadmapNode[]>(initialData || []);
  const [filteredData, setFilteredData] = useState<RoadmapNode[]>(roadmapData);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('zoe-roadmap-data');
    if (savedData && !initialData) {
      try {
        setRoadmapData(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to load saved roadmap data:', e);
      }
    }
  }, [initialData]);

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
    return nodes.map(node => {
      if (node.category === category) {
        return node;
      }
      if (node.children) {
        const filteredChildren = filterByCategory(node.children, category);
        if (filteredChildren.length > 0) {
          return { ...node, children: filteredChildren };
        }
      }
      return null;
    }).filter(Boolean) as RoadmapNode[];
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
    localStorage.setItem('zoe-roadmap-data', JSON.stringify(roadmapData));
    setHasUnsavedChanges(false);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(roadmapData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `zoe-roadmap-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
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
                  className="px-3 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-1"
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
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Showing: {new Date(dateRange.start).toLocaleDateString()} - {new Date(dateRange.end).toLocaleDateString()}</span>
          </div>
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
