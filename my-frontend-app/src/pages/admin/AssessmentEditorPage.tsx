import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import adminService, { AssessmentTemplate, Question, Option } from '../../services/adminService';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { v4 as uuidv4 } from 'uuid';

const AssessmentEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [template, setTemplate] = useState<AssessmentTemplate>({
    testType: '',
    title: '',
    description: '',
    category: '',
    estimatedTimeMinutes: 0,
    totalQuestions: 0,
    isActive: true,
    instructions: [],
    questions: [],
  });
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode && id) {
      loadAssessment(id);
    }
  }, [id, isEditMode]);

  const loadAssessment = async (assessmentId: string) => {
    try {
      const data = await adminService.getAssessmentById(assessmentId);
      setTemplate(data);
    } catch (err) {
      setError('Failed to load assessment');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setTemplate(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
               type === 'number' ? Number(value) : value
    }));
  };

  const handleQuestionChange = (index: number, field: keyof Question, value: any) => {
    const updatedQuestions = [...template.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setTemplate(prev => ({ ...prev, questions: updatedQuestions }));
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: uuidv4(),
      text: '',
      type: 'MULTIPLE_CHOICE',
      options: [],
      dimension: '',
      required: true,
      category: '',
      points: 1,
    };
    setTemplate(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
      totalQuestions: prev.questions.length + 1
    }));
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = template.questions.filter((_, i) => i !== index);
    setTemplate(prev => ({
      ...prev,
      questions: updatedQuestions,
      totalQuestions: updatedQuestions.length
    }));
  };

  const addOption = (questionIndex: number) => {
    const updatedQuestions = [...template.questions];
    const newOption: Option = {
      id: uuidv4(),
      text: '',
      weights: {}
    };
    if (!updatedQuestions[questionIndex].options) {
        updatedQuestions[questionIndex].options = [];
    }
    updatedQuestions[questionIndex].options.push(newOption);
    setTemplate(prev => ({ ...prev, questions: updatedQuestions }));
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...template.questions];
    updatedQuestions[questionIndex].options[optionIndex].text = value;
    setTemplate(prev => ({ ...prev, questions: updatedQuestions }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode && id) {
        await adminService.updateAssessment(id, template);
      } else {
        await adminService.createAssessment(template);
      }
      navigate('/admin/assessments');
    } catch (err) {
      setError('Failed to save assessment');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{isEditMode ? 'Edit Assessment' : 'Create Assessment'}</h1>
        
        {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Details */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Basic Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={template.title}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Test Type (ID)</label>
                <input
                  type="text"
                  name="testType"
                  value={template.testType}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                  required
                  disabled={isEditMode}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  name="category"
                  value={template.category}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Estimated Time (Minutes)</label>
                <input
                  type="number"
                  name="estimatedTimeMinutes"
                  value={template.estimatedTimeMinutes}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={template.description}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                />
              </div>
              <div className="flex items-center">
                 <input
                    type="checkbox"
                    name="isActive"
                    checked={template.isActive}
                    onChange={(e) => setTemplate(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">Active</label>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Questions</h2>
              <button
                type="button"
                onClick={addQuestion}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Add Question
              </button>
            </div>

            {template.questions.map((question, qIndex) => (
              <div key={question.id} className="border rounded-lg p-4 mb-4 bg-gray-50">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">Question {qIndex + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Question Text"
                    value={question.text}
                    onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                      <select
                        value={question.type}
                        onChange={(e) => handleQuestionChange(qIndex, 'type', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                      >
                        <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                        <option value="TEXT">Text Input</option>
                        <option value="RATING">Rating Scale</option>
                      </select>
                      
                      <input 
                        type="text"
                        placeholder="Image URL (Optional)"
                        value={question.image || ''}
                        onChange={(e) => handleQuestionChange(qIndex, 'image', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                      />

                      <input
                        type="number"
                        placeholder="Time Limit (Seconds)"
                        value={question.timeLimit || ''}
                        onChange={(e) => handleQuestionChange(qIndex, 'timeLimit', Number(e.target.value))}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                      />

                       <input
                        type="text"
                        placeholder="Correct Answer (for auto-grading)"
                        value={question.correctAnswer || ''}
                        onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                      />
                  </div>
                </div>

                {/* Options */}
                {question.type === 'MULTIPLE_CHOICE' && (
                  <div className="ml-4 pl-4 border-l-2 border-gray-200">
                    <h4 className="text-sm font-medium mb-2">Options</h4>
                    {question.options?.map((option, oIndex) => (
                      <div key={option.id} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={option.text}
                          onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                          className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm p-2"
                          placeholder={`Option ${oIndex + 1}`}
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addOption(qIndex)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      + Add Option
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/admin/assessments')}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Save Assessment
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AssessmentEditorPage;
