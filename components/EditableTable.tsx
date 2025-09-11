'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Save, X, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { CustomerSegment } from '@/lib/customer-segments-data';
import { useAuth } from '@/lib/auth-context';
import toast from 'react-hot-toast';

interface EditableTableProps {
  initialData: CustomerSegment[];
  onSave?: (data: CustomerSegment[]) => void;
}

export default function EditableTable({ initialData, onSave }: EditableTableProps) {
  const { isAuthenticated } = useAuth();
  const [segments, setSegments] = useState<CustomerSegment[]>(initialData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedSegment, setEditedSegment] = useState<CustomerSegment | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load saved data from localStorage
    const savedData = localStorage.getItem('customer-segments');
    if (savedData) {
      try {
        setSegments(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to load saved segments:', e);
      }
    }
  }, []);

  const handleEdit = (segment: CustomerSegment) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to edit');
      return;
    }
    setEditingId(segment.id);
    setEditedSegment({ ...segment });
  };

  const handleSave = () => {
    if (editedSegment) {
      const updatedSegments = segments.map(s => 
        s.id === editedSegment.id ? editedSegment : s
      );
      setSegments(updatedSegments);
      localStorage.setItem('customer-segments', JSON.stringify(updatedSegments));
      setEditingId(null);
      setEditedSegment(null);
      toast.success('Segment updated successfully');
      if (onSave) onSave(updatedSegments);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedSegment(null);
  };

  const handleDelete = (id: string) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to delete');
      return;
    }
    const updatedSegments = segments.filter(s => s.id !== id);
    setSegments(updatedSegments);
    localStorage.setItem('customer-segments', JSON.stringify(updatedSegments));
    toast.success('Segment deleted');
    if (onSave) onSave(updatedSegments);
  };

  const handleAddSegment = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to add segments');
      return;
    }
    const newSegment: CustomerSegment = {
      id: Date.now().toString(),
      segment: 'New Segment',
      demographics: ['Add demographics'],
      psychographics: ['Add psychographics'],
      incomeRange: '$0-$0/year',
      currentSpend: '$0/year',
      marketSize: '0 individuals'
    };
    const updatedSegments = [...segments, newSegment];
    setSegments(updatedSegments);
    localStorage.setItem('customer-segments', JSON.stringify(updatedSegments));
    setEditingId(newSegment.id);
    setEditedSegment(newSegment);
  };

  const handleArrayEdit = (field: 'demographics' | 'psychographics', index: number, value: string) => {
    if (!editedSegment) return;
    const updatedArray = [...editedSegment[field]];
    updatedArray[index] = value;
    setEditedSegment({ ...editedSegment, [field]: updatedArray });
  };

  const handleArrayAdd = (field: 'demographics' | 'psychographics') => {
    if (!editedSegment) return;
    setEditedSegment({ 
      ...editedSegment, 
      [field]: [...editedSegment[field], 'New item'] 
    });
  };

  const handleArrayRemove = (field: 'demographics' | 'psychographics', index: number) => {
    if (!editedSegment) return;
    const updatedArray = editedSegment[field].filter((_, i) => i !== index);
    setEditedSegment({ ...editedSegment, [field]: updatedArray });
  };

  const toggleRowExpansion = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Customer Segments</h2>
        {isAuthenticated && (
          <button
            onClick={handleAddSegment}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Segment
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Segment</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Demographics</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Psychographics</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Income Range</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Current Spend</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Market Size</th>
                {isAuthenticated && (
                  <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <AnimatePresence>
                {segments.map((segment, index) => {
                  const isEditing = editingId === segment.id;
                  const isExpanded = expandedRows.has(segment.id);
                  const currentSegment = isEditing ? editedSegment! : segment;

                  return (
                    <motion.tr
                      key={segment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <input
                            type="text"
                            value={currentSegment.segment}
                            onChange={(e) => setEditedSegment({ ...currentSegment, segment: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        ) : (
                          <div className="font-medium text-gray-900">{segment.segment}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          {isEditing ? (
                            <>
                              {currentSegment.demographics.map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => handleArrayEdit('demographics', i, e.target.value)}
                                    className="flex-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                                  />
                                  <button
                                    onClick={() => handleArrayRemove('demographics', i)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                              <button
                                onClick={() => handleArrayAdd('demographics')}
                                className="text-sm text-orange-600 hover:text-orange-700"
                              >
                                + Add item
                              </button>
                            </>
                          ) : (
                            <>
                              {(isExpanded ? segment.demographics : segment.demographics.slice(0, 2)).map((item, i) => (
                                <div key={i} className="text-sm text-gray-600">• {item}</div>
                              ))}
                              {segment.demographics.length > 2 && (
                                <button
                                  onClick={() => toggleRowExpansion(segment.id)}
                                  className="text-xs text-orange-600 hover:text-orange-700 flex items-center gap-1"
                                >
                                  {isExpanded ? (
                                    <>Show less <ChevronUp className="w-3 h-3" /></>
                                  ) : (
                                    <>Show {segment.demographics.length - 2} more <ChevronDown className="w-3 h-3" /></>
                                  )}
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          {isEditing ? (
                            <>
                              {currentSegment.psychographics.map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => handleArrayEdit('psychographics', i, e.target.value)}
                                    className="flex-1 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                                  />
                                  <button
                                    onClick={() => handleArrayRemove('psychographics', i)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                              <button
                                onClick={() => handleArrayAdd('psychographics')}
                                className="text-sm text-orange-600 hover:text-orange-700"
                              >
                                + Add item
                              </button>
                            </>
                          ) : (
                            <>
                              {(isExpanded ? segment.psychographics : segment.psychographics.slice(0, 2)).map((item, i) => (
                                <div key={i} className="text-sm text-gray-600">• {item}</div>
                              ))}
                              {segment.psychographics.length > 2 && !isExpanded && (
                                <div className="text-xs text-gray-500">
                                  +{segment.psychographics.length - 2} more
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <input
                            type="text"
                            value={currentSegment.incomeRange}
                            onChange={(e) => setEditedSegment({ ...currentSegment, incomeRange: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        ) : (
                          <div className="text-sm font-medium text-gray-700">{segment.incomeRange}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <input
                            type="text"
                            value={currentSegment.currentSpend}
                            onChange={(e) => setEditedSegment({ ...currentSegment, currentSpend: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        ) : (
                          <div className="text-sm text-gray-600">{segment.currentSpend}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <input
                            type="text"
                            value={currentSegment.marketSize}
                            onChange={(e) => setEditedSegment({ ...currentSegment, marketSize: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        ) : (
                          <div className="text-sm font-medium text-gray-700">{segment.marketSize}</div>
                        )}
                      </td>
                      {isAuthenticated && (
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            {isEditing ? (
                              <>
                                <button
                                  onClick={handleSave}
                                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  title="Save"
                                >
                                  <Save className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={handleCancel}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Cancel"
                                >
                                  <X className="w-5 h-5" />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleEdit(segment)}
                                  className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                  title="Edit"
                                >
                                  <Edit2 className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => handleDelete(segment.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      )}
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {!isAuthenticated && (
        <div className="mt-4 text-center text-sm text-gray-500">
          Sign in to edit customer segments
        </div>
      )}
    </div>
  );
}