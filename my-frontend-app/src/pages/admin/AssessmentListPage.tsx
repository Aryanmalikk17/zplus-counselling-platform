import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assessmentService from '../../services/adminAssessmentApi';
import { AdminLayout } from './AdminDashboard';
import { Plus, Edit, Trash2, Eye, Search, Filter } from 'lucide-react';

const AssessmentListPage: React.FC = () => {
  const [assessments, setAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadAssessments();
  }, []);

  const loadAssessments = async () => {
    try {
      const response: any = await assessmentService.getAll();
      console.log('[AssessmentListPage] API Response:', response);
      
      // Handle ApiResponse wrapper
      const data = response?.data || response;
      const assessmentsArray = Array.isArray(data) ? data : (data?.content || []);
      
      setAssessments(assessmentsArray);
    } catch (error) {
      console.error('Failed to load assessments', error);
      setError('Failed to load assessments. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('WARNING: Are you sure you want to delete this assessment? This action cannot be undone.')) {
      try {
        await assessmentService.delete(id);
        loadAssessments();
      } catch (error) {
        alert('Delete failed: ' + (error as Error).message);
      }
    }
  };

  return (
    <AdminLayout title="Assessment Management">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <p className="text-gray-500 font-medium">Manage and monitor all psychological tests in your platform.</p>
        </div>
        <button
          onClick={() => navigate('/admin/assessments/new')}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary-200 transition-all active:scale-95"
        >
          <Plus className="h-5 w-5" />
          Create New Test
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search assessments by title or category..."
            className="w-full bg-gray-50 border-0 focus:ring-2 focus:ring-primary-500 rounded-xl py-3 pl-12 pr-4 text-sm font-medium"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-600 font-bold rounded-xl hover:bg-gray-100 transition-all text-sm">
          <Filter className="h-4 w-4" /> Filters
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
          <div className="animate-spin h-10 w-10 border-4 border-primary-500/30 border-t-primary-500 rounded-full mb-4"></div>
          <p className="text-gray-500 font-bold">Synchronizing database...</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Assessment Detail</th>
                  <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Config</th>
                  <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {Array.isArray(assessments) && assessments.length > 0 ? (
                  assessments.map((assessment) => (
                    <tr key={assessment.id} className="hover:bg-primary-50/10 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 font-bold shrink-0">
                            {assessment.title?.charAt(0)}
                          </div>
                          <div>
                            <p className="text-base font-bold text-gray-900 group-hover:text-primary-700 transition-colors">{assessment.title}</p>
                            <p className="text-sm text-gray-500 font-medium line-clamp-1">{assessment.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-bold text-gray-900">{assessment.questions?.length || 0} Questions</span>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{assessment.testType || 'Dynamic'}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg ${
                          assessment.isActive 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {assessment.isActive ? 'Active' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigate(`/admin/assessments/${assessment.id}`)}
                            className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                            title="Edit"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => assessment.id && handleDelete(assessment.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                            title="Delete"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : null}
              </tbody>
            </table>
          </div>
          {assessments.length === 0 && (
            <div className="text-center py-20 px-4">
              <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-300" />
              </div>
              <p className="text-gray-500 font-bold">No assessments found.</p>
              <button 
                onClick={() => navigate('/admin/assessments/new')}
                className="mt-4 text-primary-600 font-black hover:underline"
              >
                Create your first test template
              </button>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
};

export default AssessmentListPage;
