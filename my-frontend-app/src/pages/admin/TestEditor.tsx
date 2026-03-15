import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Trash2, 
  MoveUp, 
  MoveDown, 
  Save, 
  ArrowLeft,
  Settings,
  ListFilter,
  Layers,
  HelpCircle
} from 'lucide-react';
import { AdminLayout } from './AdminDashboard';
import assessmentService from '../../services/adminAssessmentApi';
import { motion, Reorder } from 'framer-motion';

interface Option {
  id: string;
  text: string;
  weight: number;
}

interface Question {
  id: string;
  text: string;
  type: string;
  options: Option[];
  dimension?: string;
}

interface Assessment {
  title: string;
  description: string;
  questions: Question[];
}

const TestEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [assessment, setAssessment] = useState<Assessment>({
    title: '',
    description: '',
    questions: []
  });

  useEffect(() => {
    if (id && id !== 'new') {
      fetchAssessment(id);
    }
  }, [id]);

  const fetchAssessment = async (testId: string) => {
    setIsLoading(true);
    try {
      const data: any = await assessmentService.getById(testId);
      setAssessment(data);
    } catch (error) {
      console.error('Failed to fetch assessment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: crypto.randomUUID(),
      text: '',
      type: 'multiple-choice',
      options: [
        { id: crypto.randomUUID(), text: 'Option A', weight: 1 },
        { id: crypto.randomUUID(), text: 'Option B', weight: 0 },
      ]
    };
    setAssessment(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  const removeQuestion = (qId: string) => {
    setAssessment(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== qId)
    }));
  };

  const updateQuestion = (qId: string, fields: Partial<Question>) => {
    setAssessment(prev => ({
      ...prev,
      questions: prev.questions.map(q => q.id === qId ? { ...q, ...fields } : q)
    }));
  };

  const addOption = (qId: string) => {
    setAssessment(prev => ({
      ...prev,
      questions: prev.questions.map(q => {
        if (q.id === qId) {
          return {
            ...q,
            options: [...q.options, { id: crypto.randomUUID(), text: '', weight: 0 }]
          };
        }
        return q;
      })
    }));
  };

  const updateOption = (qId: string, oId: string, fields: Partial<Option>) => {
    setAssessment(prev => ({
      ...prev,
      questions: prev.questions.map(q => {
        if (q.id === qId) {
          return {
            ...q,
            options: q.options.map(o => o.id === oId ? { ...o, ...fields } : o)
          };
        }
        return q;
      })
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      if (id && id !== 'new') {
        await assessmentService.update(id, assessment);
      } else {
        await assessmentService.create(assessment);
      }
      navigate('/admin/assessments');
    } catch (error) {
      alert('Save failed: ' + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout title={id === 'new' ? 'New Assessment' : 'Edit Assessment'}>
      <div className="flex justify-between items-center mb-10">
        <button 
          onClick={() => navigate('/admin/assessments')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold transition-colors"
        >
          <ArrowLeft className="h-5 w-5" /> Back to List
        </button>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary-200 transition-all disabled:opacity-50"
        >
          <Save className="h-5 w-5" />
          {isLoading ? 'Saving...' : 'Publish Assessment'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-8">
          {/* Metadata Section */}
          <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary-500" /> Basic Information
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Test Title</label>
                <input 
                  type="text"
                  value={assessment.title}
                  onChange={e => setAssessment({...assessment, title: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-primary-500 rounded-2xl p-4 transition-all outline-none font-medium text-gray-900"
                  placeholder="e.g. MBTI Personality Test"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Description</label>
                <textarea 
                  rows={3}
                  value={assessment.description}
                  onChange={e => setAssessment({...assessment, description: e.target.value})}
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-primary-500 rounded-2xl p-4 transition-all outline-none font-medium text-gray-900"
                  placeholder="Explain the purpose of this test..."
                />
              </div>
            </div>
          </section>

          {/* Questions Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary-500" /> Assessment Questions
              </h3>
              <span className="text-sm font-bold text-gray-400">{assessment.questions.length} Total</span>
            </div>

            <Reorder.Group axis="y" values={assessment.questions} onReorder={qs => setAssessment({...assessment, questions: qs})} className="space-y-6">
              {assessment.questions.map((q, qIndex) => (
                <Reorder.Item key={q.id} value={q} className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 group">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1 mr-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="h-1 w-4 bg-primary-500 rounded-full"></span>
                        <span className="text-xs font-black text-primary-600 uppercase tracking-widest">Question {qIndex + 1}</span>
                      </div>
                      <input 
                        className="text-xl font-bold text-gray-900 w-full bg-transparent focus:bg-gray-50 rounded-lg p-2 transition-all outline-none border-0"
                        value={q.text}
                        onChange={e => updateQuestion(q.id, { text: e.target.value })}
                        placeholder="Type your question here..."
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => removeQuestion(q.id)} className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Question Configuration (Dimensions) */}
                  <div className="mb-6 flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Dimension / Trait Mapping</label>
                      <div className="relative">
                        <input 
                          type="text"
                          value={q.dimension || ''}
                          onChange={e => updateQuestion(q.id, { dimension: e.target.value })}
                          className="w-full bg-primary-50/30 border border-primary-100 rounded-xl py-2 px-10 text-sm font-bold text-primary-700 outline-none"
                          placeholder="e.g. Extraversion"
                        />
                        <Layers className="h-4 w-4 text-primary-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  </div>

                  {/* Options List */}
                  <div className="space-y-3">
                    {q.options.map((opt, oIndex) => (
                      <div key={opt.id} className="flex items-center gap-4 bg-gray-50/50 p-3 rounded-2xl group/opt border border-transparent hover:border-gray-200 transition-all">
                        <span className="h-8 w-8 bg-white rounded-xl flex items-center justify-center text-xs font-bold text-gray-400 shadow-sm">
                          {String.fromCharCode(65 + oIndex)}
                        </span>
                        <input 
                          className="flex-1 bg-transparent border-0 font-medium text-gray-900 focus:ring-0 outline-none p-0 text-sm"
                          value={opt.text}
                          onChange={e => updateOption(q.id, opt.id, { text: e.target.value })}
                          placeholder="Choice text..."
                        />
                        <div className="flex items-center gap-2 ml-auto">
                          <label className="text-[10px] font-black text-gray-400 uppercase">Weight</label>
                          <input 
                            type="number"
                            value={opt.weight}
                            onChange={e => updateOption(q.id, opt.id, { weight: parseFloat(e.target.value) || 0 })}
                            className="w-16 bg-white border border-gray-200 rounded-lg py-1 px-2 text-center text-xs font-bold text-primary-600 outline-none focus:border-primary-500"
                          />
                        </div>
                      </div>
                    ))}
                    <button 
                      onClick={() => addOption(q.id)}
                      className="mt-2 text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1.5 px-3 py-2 bg-primary-50/50 rounded-xl transition-all"
                    >
                      <Plus className="h-3 w-3" /> Add Choice
                    </button>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>

            <button
              onClick={addQuestion}
              className="w-full py-8 border-2 border-dashed border-gray-200 rounded-[2rem] flex flex-col items-center justify-center gap-3 text-gray-400 hover:text-primary-600 hover:border-primary-200 hover:bg-primary-50/20 transition-all group"
            >
              <div className="h-12 w-12 bg-gray-100 group-hover:bg-primary-100 rounded-full flex items-center justify-center transition-all">
                <Plus className="h-8 w-8 text-gray-400 group-hover:text-primary-600" />
              </div>
              <span className="font-bold">Add Dynamic Question</span>
            </button>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-8">
          <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 sticky top-28">
            <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ListFilter className="h-5 w-5 text-primary-500" /> Editor Tools
            </h4>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl">
                <p className="text-sm font-bold text-blue-800 mb-1">Expert Tip</p>
                <p className="text-xs text-blue-600 font-medium">Dimension mapping allows you to group questions for psychological profiling in the final report.</p>
              </div>
              
              <div className="pt-4 border-t border-gray-50 space-y-3">
                <button 
                  onClick={() => alert('Feature coming soon: Bulk CSV Import')}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 rounded-xl transition-all"
                >
                  <Plus className="h-4 w-4" /> Bulk Import
                </button>
                <button 
                  onClick={() => alert('JSON Preview ready: check console')}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 rounded-xl transition-all"
                >
                  <Layers className="h-4 w-4" /> Export template
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AdminLayout>
  );
};

export default TestEditor;
