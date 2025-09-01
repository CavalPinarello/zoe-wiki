'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

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

interface TimelineProps {
  data: RoadmapNode[];
  onNodeClick?: (node: RoadmapNode) => void;
  selectedNodeId?: string | null;
}

export default function RoadmapTimeline({ data, onNodeClick, selectedNodeId }: TimelineProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Calculate timeline bounds
  const getTimelineBounds = () => {
    let minDate = new Date();
    let maxDate = new Date();
    
    const processNodes = (nodes: RoadmapNode[]) => {
      nodes.forEach(node => {
        const start = new Date(node.startDate);
        const end = new Date(node.endDate);
        if (start < minDate || minDate === null) minDate = start;
        if (end > maxDate || maxDate === null) maxDate = end;
        if (node.children) processNodes(node.children);
      });
    };
    
    if (data.length > 0) {
      minDate = new Date(data[0].startDate);
      maxDate = new Date(data[0].endDate);
      processNodes(data);
    }
    
    // Add padding
    minDate.setMonth(minDate.getMonth() - 1);
    maxDate.setMonth(maxDate.getMonth() + 1);
    
    return { minDate, maxDate };
  };

  const { minDate, maxDate } = getTimelineBounds();
  const timelineWidth = 3000 * zoom; // Base width multiplied by zoom
  
  // Convert date to pixel position
  const dateToPosition = (date: string) => {
    const d = new Date(date);
    const total = maxDate.getTime() - minDate.getTime();
    const current = d.getTime() - minDate.getTime();
    return (current / total) * timelineWidth;
  };

  // Generate month/quarter markers
  const generateTimeMarkers = () => {
    const markers = [];
    const current = new Date(minDate);
    current.setDate(1);
    
    while (current <= maxDate) {
      markers.push({
        date: new Date(current),
        position: dateToPosition(current.toISOString())
      });
      current.setMonth(current.getMonth() + 1);
    }
    
    return markers;
  };

  const timeMarkers = generateTimeMarkers();

  // Status colors
  const statusColors = {
    'planned': 'bg-amber-200 border-amber-400 text-amber-900',
    'in-progress': 'bg-orange-200 border-orange-400 text-orange-900',
    'completed': 'bg-green-200 border-green-400 text-green-900',
    'at-risk': 'bg-red-200 border-red-400 text-red-900'
  };

  const categoryColors = {
    'Technology': 'bg-gradient-to-r from-amber-400 to-amber-500',
    'Market': 'bg-gradient-to-r from-orange-400 to-orange-500',
    'Product': 'bg-gradient-to-r from-amber-500 to-amber-600',
    'Team': 'bg-gradient-to-r from-orange-500 to-orange-600',
    'Finance': 'bg-gradient-to-r from-amber-600 to-amber-700',
    'Operations': 'bg-gradient-to-r from-orange-600 to-orange-700'
  };

  // Handle mouse drag scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Zoom controls
  const handleZoomIn = () => setZoom(Math.min(zoom + 0.25, 3));
  const handleZoomOut = () => setZoom(Math.max(zoom - 0.25, 0.5));
  const handleZoomReset = () => setZoom(1);

  // Flatten nodes for display
  const flattenNodes = (nodes: RoadmapNode[], level: number = 0): Array<RoadmapNode & { level: number }> => {
    const result: Array<RoadmapNode & { level: number }> = [];
    nodes.forEach(node => {
      result.push({ ...node, level });
      if (node.children) {
        result.push(...flattenNodes(node.children, level + 1));
      }
    });
    return result;
  };

  const flatNodes = flattenNodes(data);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      {/* Controls */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Timeline View</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="p-2 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4 text-amber-700" />
          </button>
          <button
            onClick={handleZoomReset}
            className="p-2 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors"
            title="Reset Zoom"
          >
            <Maximize2 className="w-4 h-4 text-amber-700" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4 text-amber-700" />
          </button>
          <span className="ml-2 text-sm text-gray-600">Zoom: {Math.round(zoom * 100)}%</span>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="relative border border-amber-200 rounded-lg overflow-hidden">
        <div
          ref={scrollContainerRef}
          className={`overflow-x-auto overflow-y-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ maxHeight: '600px' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="relative" style={{ width: `${timelineWidth}px`, height: `${Math.max(400, flatNodes.length * 60 + 100)}px` }}>
            {/* Background grid */}
            <div className="absolute inset-0">
              {/* Month/Quarter lines */}
              {timeMarkers.map((marker, index) => (
                <div
                  key={index}
                  className="absolute top-0 bottom-0 border-l border-gray-200"
                  style={{ left: `${marker.position}px` }}
                >
                  <div className="absolute top-0 text-xs text-gray-500 -translate-x-1/2 mt-2">
                    {marker.date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </div>
                </div>
              ))}
              
              {/* Year markers */}
              {timeMarkers
                .filter(m => m.date.getMonth() === 0)
                .map((marker, index) => (
                  <div
                    key={`year-${index}`}
                    className="absolute top-0 bottom-0 border-l-2 border-amber-300"
                    style={{ left: `${marker.position}px` }}
                  >
                    <div className="absolute top-0 text-sm font-bold text-amber-700 -translate-x-1/2 mt-8">
                      {marker.date.getFullYear()}
                    </div>
                  </div>
                ))}
            </div>

            {/* Main timeline arrow */}
            <div className="absolute" style={{ top: '60px', left: '20px', right: '20px' }}>
              <svg width={timelineWidth - 40} height="40">
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon
                      points="0 0, 10 3.5, 0 7"
                      fill="#f59e0b"
                    />
                  </marker>
                </defs>
                <line
                  x1="0"
                  y1="20"
                  x2={timelineWidth - 60}
                  y2="20"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  markerEnd="url(#arrowhead)"
                />
              </svg>
            </div>

            {/* Roadmap items */}
            {flatNodes.map((node, index) => {
              const startPos = dateToPosition(node.startDate);
              const endPos = dateToPosition(node.endDate);
              const width = endPos - startPos;
              const yPosition = 120 + index * 60;
              const isSelected = selectedNodeId === node.id;

              return (
                <div
                  key={node.id}
                  className={`absolute transition-all duration-200 ${isSelected ? 'z-10' : 'z-0'}`}
                  style={{
                    left: `${startPos}px`,
                    top: `${yPosition}px`,
                    width: `${width}px`,
                    marginLeft: `${node.level * 20}px`
                  }}
                >
                  {/* Connection line to timeline */}
                  <svg
                    className="absolute"
                    style={{ top: '-40px', left: '0', width: '100%', height: '40px' }}
                  >
                    <line
                      x1={width / 2}
                      y1="0"
                      x2={width / 2}
                      y2="40"
                      stroke="#fbbf24"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                  </svg>

                  {/* Item bar */}
                  <div
                    className={`
                      relative h-12 rounded-lg border-2 cursor-pointer
                      ${categoryColors[node.category as keyof typeof categoryColors] || 'bg-gray-400'}
                      ${isSelected ? 'ring-4 ring-amber-400 shadow-lg' : 'hover:shadow-md'}
                      transition-all duration-200
                    `}
                    onClick={() => onNodeClick?.(node)}
                  >
                    {/* Arrow at the end */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                      <svg width="20" height="48">
                        <path
                          d="M 0 12 L 10 24 L 0 36 Z"
                          fill="currentColor"
                          className="text-current"
                        />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="h-full flex items-center px-3 text-white">
                      <div className="truncate">
                        <div className="text-xs font-semibold truncate">{node.title}</div>
                        <div className="text-xs opacity-90">
                          {new Date(node.startDate).toLocaleDateString()} - {new Date(node.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Status indicator */}
                    <div className={`absolute -top-2 -right-2 px-2 py-0.5 text-xs rounded-full border ${statusColors[node.status]}`}>
                      {node.status}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Today marker */}
            <div
              className="absolute top-0 bottom-0 border-l-2 border-red-500"
              style={{ left: `${dateToPosition(new Date().toISOString())}px` }}
            >
              <div className="absolute top-12 bg-red-500 text-white text-xs px-2 py-1 rounded -translate-x-1/2">
                Today
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicators */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg hover:bg-amber-50 transition-colors"
          onClick={() => {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollLeft -= 200;
            }
          }}
        >
          <ChevronLeft className="w-5 h-5 text-amber-600" />
        </button>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg hover:bg-amber-50 transition-colors"
          onClick={() => {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollLeft += 200;
            }
          }}
        >
          <ChevronRight className="w-5 h-5 text-amber-600" />
        </button>
      </div>
    </div>
  );
}
