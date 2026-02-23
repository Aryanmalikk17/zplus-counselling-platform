import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import adminService, { AssessmentTemplate } from '../../services/adminService';

const AssessmentListPage: React.FC = () => {
  const [assessments, setAssessments] = useState<AssessmentTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadAssessments();
  }, []);

  const loadAssessments = async () => {
    try {
      const data = await adminService.getAllAssessments();
      setAssessments(data);
    } catch (error) {
      console.error('Failed to load assessments', error);
      setError('Failed to load assessments. You may not have permission to view this page.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this assessment?')) {
      try {
        await adminService.deleteAssessment(id);
        loadAssessments();
      } catch (error) {
        console.error('Failed to delete assessment', error);
      }
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Login as Admin
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition duration-300"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Assessment Management</h1>
        <button
          onClick={() => navigate('/admin/assessments/new')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Create New Assessment
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assessments.map((assessment) => (
                <tr key={assessment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{assessment.title}</div>
                    <div className="text-sm text-gray-500">{assessment.description?.substring(0, 50)}...</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assessment.testType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assessment.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      assessment.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {assessment.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => navigate(`/admin/assessments/${assessment.id}`)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => assessment.id && handleDelete(assessment.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {assessments.length === 0 && (
            <div className="text-center py-10 text-gray-500">No assessments found. Create one to get started.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AssessmentListPage;
