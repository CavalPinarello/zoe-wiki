'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Plus, Edit2, Save, X, Trash2, ZoomIn, ZoomOut, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'planned' | 'in-progress' | 'completed' | 'at-risk';
  category: string;
  yPosition: number; // Track for vertical lanes
  color: string;
}

type TimeScale = 'month' | 'quarter' | 'year' | '2years';

const COLORS = {
  Technology: '#f59e0b',
  Market: '#ea580c',
  Product: '#d97706',
  Team: '#dc2626',
  Finance: '#7c2d12',
  Operations: '#991b1b'
};

const STATUS_STYLES = {
  'planned': 'opacity-60',
  'in-progress': 'ring-2 ring-offset-2 ring-orange-400',
  'completed': 'opacity-80 bg-green-600',
  'at-risk': 'ring-2 ring-offset-2 ring-red-400 animate-pulse'
};

export default function HorizontalRoadmap({ initialData = [] }: { initialData?: RoadmapNode[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<RoadmapNode[]>(initialData);
  const [scale, setScale] = useState<TimeScale>('quarter');
  const [pixelsPerDay, setPixelsPerDay] = useState(2);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [editingNode, setEditingNode] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<RoadmapNode>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 });

  // Calculate timeline range
  const today = new Date();
  const startDate = new Date(today.getFullYear(), 0, 1); // Start of current year
  const endDate = new Date(today.getFullYear() + 2, 11, 31); // End of next year
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const timelineWidth = totalDays * pixelsPerDay;

  // Scale settings
  const scaleSettings = {
    month: { pixelsPerDay: 10, label: 'Month View' },
    quarter: { pixelsPerDay: 3, label: 'Quarter View' },
    year: { pixelsPerDay: 1, label: 'Year View' },
    '2years': { pixelsPerDay: 0.5, label: '2 Year View' }
  };

  useEffect(() => {
    setPixelsPerDay(scaleSettings[scale].pixelsPerDay);
  }, [scale]);

  // Date to pixel conversion
  const dateToPixel = (dateStr: string) => {
    const date = new Date(dateStr);
    const daysDiff = Math.ceil((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff * pixelsPerDay;
  };

  // Generate time markers
  const generateMarkers = () => {
    const markers = [];
    const current = new Date(startDate);
    
    while (current <= endDate) {
      const isYearStart = current.getMonth() === 0;
      const isQuarterStart = current.getMonth() % 3 === 0;
      
      markers.push({
        date: new Date(current),
        position: dateToPixel(current.toISOString()),
        isYear: isYearStart,
        isQuarter: isQuarterStart,
        label: isYearStart 
          ? current.getFullYear().toString()
          : `Q${Math.floor(current.getMonth() / 3) + 1}`
      });
      
      current.setMonth(current.getMonth() + (scale === 'month' ? 1 : 3));
    }
    
    return markers;
  };

  const markers = generateMarkers();

  // Handle dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === timelineRef.current || (e.target as HTMLElement).classList.contains('timeline-bg')) {
      setIsDragging(true);
      setDragStart({
        x: e.pageX,
        scrollLeft: containerRef.current?.scrollLeft || 0
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (dragStart.x - x) * 1.5;
    containerRef.current.scrollLeft = dragStart.scrollLeft + walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add new node
  const addNode = () => {
    const newNode: RoadmapNode = {
      id: `node-${Date.now()}`,
      title: 'New Milestone',
      description: 'Click to edit',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'planned',
      category: 'Product',
      yPosition: nodes.length % 5, // Distribute across 5 lanes
      color: COLORS.Product
    };
    setNodes([...nodes, newNode]);
    setEditingNode(newNode.id);
    setEditData(newNode);
  };

  // Edit node
  const startEdit = (node: RoadmapNode) => {
    setEditingNode(node.id);
    setEditData({ ...node });
  };

  const saveEdit = () => {
    if (editingNode && editData) {
      setNodes(nodes.map(n => 
        n.id === editingNode 
          ? { ...n, ...editData, color: COLORS[editData.category as keyof typeof COLORS] || n.color }
          : n
      ));
      setEditingNode(null);
      setEditData({});
    }
  };

  const cancelEdit = () => {
    setEditingNode(null);
    setEditData({});
  };

  const deleteNode = (id: string) => {
    setNodes(nodes.filter(n => n.id !== id));
  };

  // Scroll to today
  const scrollToToday = () => {
    if (containerRef.current) {
      const todayPosition = dateToPixel(new Date().toISOString());
      containerRef.current.scrollLeft = todayPosition - containerRef.current.clientWidth / 2;
    }
  };

  useEffect(() => {
    scrollToToday();
  }, [pixelsPerDay]);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header Controls */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Roadmap Timeline</h1>
          <button
            onClick={scrollToToday}
            className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
          >
            Today
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Scale selector */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            {Object.entries(scaleSettings).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setScale(key as TimeScale)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  scale === key
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {value.label}
              </button>
            ))}
          </div>

          <button
            onClick={addNode}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Milestone
          </button>
        </div>
      </div>

      {/* Timeline Container */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-x-auto overflow-y-hidden relative"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div 
          ref={timelineRef}
          className="relative timeline-bg"
          style={{ 
            width: `${timelineWidth}px`, 
            height: '100%',
            minHeight: '600px'
          }}
        >
          {/* Grid and markers */}
          <svg className="absolute inset-0 pointer-events-none" width={timelineWidth} height="100%">
            {/* Vertical grid lines */}
            {markers.map((marker, idx) => (
              <g key={idx}>
                <line
                  x1={marker.position}
                  y1="0"
                  x2={marker.position}
                  y2="100%"
                  stroke={marker.isYear ? '#cbd5e1' : '#e2e8f0'}
                  strokeWidth={marker.isYear ? 2 : 1}
                />
                {marker.isYear && (
                  <text
                    x={marker.position + 5}
                    y="20"
                    fill="#475569"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    {marker.label}
                  </text>
                )}
                {marker.isQuarter && !marker.isYear && scale !== '2years' && (
                  <text
                    x={marker.position + 5}
                    y="40"
                    fill="#94a3b8"
                    fontSize="12"
                  >
                    {marker.label}
                  </text>
                )}
              </g>
            ))}

            {/* Horizontal lanes */}
            {[0, 1, 2, 3, 4].map(lane => (
              <line
                key={lane}
                x1="0"
                y1={100 + lane * 100}
                x2={timelineWidth}
                y2={100 + lane * 100}
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
            ))}

            {/* Main timeline arrow */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="5"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ea580c" />
              </marker>
            </defs>
            <line
              x1="20"
              y1="60"
              x2={timelineWidth - 20}
              y2="60"
              stroke="#ea580c"
              strokeWidth="3"
              markerEnd="url(#arrowhead)"
            />
          </svg>

          {/* Today line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
            style={{ left: `${dateToPixel(new Date().toISOString())}px` }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              TODAY
            </div>
          </div>

          {/* Roadmap Nodes */}
          {nodes.map(node => {
            const startX = dateToPixel(node.startDate);
            const endX = dateToPixel(node.endDate);
            const width = Math.max(endX - startX, 100);
            const isEditing = editingNode === node.id;

            return (
              <div
                key={node.id}
                className={`absolute rounded-lg shadow-lg transition-all duration-200 ${
                  STATUS_STYLES[node.status]
                } ${selectedNode === node.id ? 'z-20 scale-105' : 'z-10 hover:z-15 hover:scale-102'}`}
                style={{
                  left: `${startX}px`,
                  top: `${100 + node.yPosition * 100}px`,
                  width: `${width}px`,
                  backgroundColor: node.color || COLORS.Product,
                  height: '80px'
                }}
                onClick={() => !isEditing && setSelectedNode(node.id)}
              >
                {isEditing ? (
                  <div className="p-2 bg-white rounded-lg h-full">
                    <input
                      type="text"
                      value={editData.title || ''}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      className="w-full font-bold text-sm mb-1 px-1 border-b"
                      placeholder="Title"
                    />
                    <input
                      type="text"
                      value={editData.description || ''}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      className="w-full text-xs mb-1 px-1"
                      placeholder="Description"
                    />
                    <div className="flex gap-1">
                      <input
                        type="date"
                        value={editData.startDate || ''}
                        onChange={(e) => setEditData({ ...editData, startDate: e.target.value })}
                        className="text-xs flex-1"
                      />
                      <input
                        type="date"
                        value={editData.endDate || ''}
                        onChange={(e) => setEditData({ ...editData, endDate: e.target.value })}
                        className="text-xs flex-1"
                      />
                    </div>
                    <div className="flex gap-1 mt-1">
                      <select
                        value={editData.category || ''}
                        onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                        className="text-xs flex-1"
                      >
                        {Object.keys(COLORS).map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <select
                        value={editData.status || ''}
                        onChange={(e) => setEditData({ ...editData, status: e.target.value as any })}
                        className="text-xs flex-1"
                      >
                        <option value="planned">Planned</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="at-risk">At Risk</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 text-white h-full flex flex-col justify-between">
                    <div>
                      <div className="font-bold text-sm truncate">{node.title}</div>
                      <div className="text-xs opacity-90 truncate">{node.description}</div>
                    </div>
                    <div className="text-xs opacity-75">
                      {new Date(node.startDate).toLocaleDateString()} - {new Date(node.endDate).toLocaleDateString()}
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="absolute -top-2 -right-2 flex gap-1">
                  {isEditing ? (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); saveEdit(); }}
                        className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        <Save className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); cancelEdit(); }}
                        className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </>
                  ) : selectedNode === node.id && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); startEdit(node); }}
                        className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteNode(node.id); }}
                        className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
