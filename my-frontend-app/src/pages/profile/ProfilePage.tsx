import React, { useState } from 'react';

import { User, Settings, History, Edit, Download, Plus, X, Calendar, MapPin, Phone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { TestHistoryComponent } from '../../components/profile/TestHistoryComponent';
import TestStatsDashboard from '../../components/profile/TestStatsDashboard';
import { UserTestHistory, testHistoryService } from '../../services/testHistoryService';
import { EducationalQualification } from '../../types';

const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'stats' | 'settings'>('overview');
  const [selectedResult, setSelectedResult] = useState<UserTestHistory | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<EducationalQualification | null>(null);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    profession: user?.profession || '',
    experience: user?.experience || '',
    bio: user?.bio || '',
    birthday: user?.birthday || ''
  });
  const [educationForm, setEducationForm] = useState({
    degree: '',
    institution: '',
    fieldOfStudy: '',
    startYear: new Date().getFullYear(),
    endYear: new Date().getFullYear(),
    isCompleted: true,
    grade: '',
    description: ''
  });

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = async () => {
    try {
      await updateProfile(formData);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleAddEducation = () => {
    setEditingEducation(null);
    setEducationForm({
      degree: '',
      institution: '',
      fieldOfStudy: '',
      startYear: new Date().getFullYear(),
      endYear: new Date().getFullYear(),
      isCompleted: true,
      grade: '',
      description: ''
    });
    setIsEducationModalOpen(true);
  };

  const handleEditEducation = (education: EducationalQualification) => {
    setEditingEducation(education);
    setEducationForm({
      degree: education.degree,
      institution: education.institution,
      fieldOfStudy: education.fieldOfStudy,
      startYear: education.startYear,
      endYear: education.endYear || new Date().getFullYear(),
      isCompleted: education.isCompleted,
      grade: education.grade || '',
      description: education.description || ''
    });
    setIsEducationModalOpen(true);
  };

  const handleSaveEducation = async () => {
    try {
      const newEducation: EducationalQualification = {
        id: editingEducation?.id || Date.now().toString(),
        ...educationForm
      };

      const currentEducations = user?.educationalQualifications || [];
      let updatedEducations;

      if (editingEducation) {
        updatedEducations = currentEducations.map(edu =>
          edu.id === editingEducation.id ? newEducation : edu
        );
      } else {
        updatedEducations = [...currentEducations, newEducation];
      }

      await updateProfile({ educationalQualifications: updatedEducations });
      setIsEducationModalOpen(false);
    } catch (error) {
      console.error('Failed to save education:', error);
    }
  };

  const handleDeleteEducation = async (educationId: string) => {
    try {
      const updatedEducations = (user?.educationalQualifications || [])
        .filter(edu => edu.id !== educationId);
      await updateProfile({ educationalQualifications: updatedEducations });
    } catch (error) {
      console.error('Failed to delete education:', error);
    }
  };

  const handleViewResult = (historyItem: UserTestHistory) => {
    setSelectedResult(historyItem);
  };

  const tabs = [
    { id: 'overview', label: 'Profile Overview', icon: User },
    { id: 'history', label: 'Test History', icon: History },
    { id: 'stats', label: 'Statistics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your Profile
            </h1>
            <p className="text-xl text-gray-600">
              Manage your account and view your test results
            </p>
          </div>

          {/* Profile Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-10 w-10 text-primary-500" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{user?.fullName}</h2>
                  <p className="text-gray-600">{user?.email}</p>
                </div>

                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as unknown)}
                        className={`w-full flex items-center px-4 py-2 text-left rounded-lg transition-colors ${activeTab === tab.id
                            ? 'text-primary-600 bg-primary-50'
                            : 'text-gray-600 hover:bg-gray-50'
                          }`}
                      >
                        <Icon className="h-5 w-5 mr-3" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Profile Info */}
                  <div className="card">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900">Profile Information</h3>
                      <button className="btn-secondary" onClick={handleEditProfile}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <p className="text-gray-900">{user?.fullName || 'Not provided'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <p className="text-gray-900">{user?.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <p className="text-gray-600">{user?.location || 'Not provided'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                        <p className="text-gray-600">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                      </div>
                    </div>

                    {user?.bio && (
                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                        <p className="text-gray-600">{user.bio}</p>
                      </div>
                    )}
                  </div>

                  {/* Educational Qualifications */}
                  <div className="card">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center">
                        <GraduationCap className="h-6 w-6 mr-2 text-primary-500" />
                        Educational Qualifications
                      </h3>
                      <button className="btn-secondary" onClick={handleAddEducation}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Education
                      </button>
                    </div>

                    {user?.educationalQualifications && user.educationalQualifications.length > 0 ? (
                      <div className="space-y-4">
                        {user.educationalQualifications.map((education, index) => (
                          <div key={education.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">{education.degree}</h4>
                                <p className="text-gray-700">{education.institution}</p>
                                <p className="text-gray-600 text-sm">{education.fieldOfStudy}</p>
                                <div className="flex items-center mt-2 text-sm text-gray-500">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>
                                    {education.startYear} - {education.isCompleted ? (education.endYear || 'Present') : 'Present'}
                                  </span>
                                  {education.grade && (
                                    <>
                                      <span className="mx-2">•</span>
                                      <span>Grade: {education.grade}</span>
                                    </>
                                  )}
                                </div>
                                {education.description && (
                                  <p className="text-gray-600 text-sm mt-2">{education.description}</p>
                                )}
                              </div>
                              <div className="flex space-x-2 ml-4">
                                <button
                                  onClick={() => handleEditEducation(education)}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteEducation(education.id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <GraduationCap className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">No educational qualifications added</h4>
                        <p className="text-gray-600 mb-4">Add your educational background to complete your profile</p>
                        <button className="btn-primary" onClick={handleAddEducation}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Education
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Professional Information */}
                  <div className="card">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Briefcase className="h-6 w-6 mr-2 text-primary-500" />
                      Professional Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Profession</label>
                        <p className="text-gray-900">{user?.profession || 'Not provided'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                        <p className="text-gray-900">{user?.experience || 'Not provided'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <p className="text-gray-900 flex items-center">
                          {user?.phone ? (
                            <>
                              <Phone className="h-4 w-4 mr-2 text-gray-400" />
                              {user.phone}
                            </>
                          ) : (
                            'Not provided'
                          )}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <p className="text-gray-900 flex items-center">
                          {user?.location ? (
                            <>
                              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                              {user.location}
                            </>
                          ) : (
                            'Not provided'
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="card">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => window.location.href = '/tests'}
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                            <User className="h-5 w-5 text-primary-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Take a Test</h4>
                            <p className="text-gray-600 text-sm">Discover more about yourself</p>
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => setActiveTab('history')}
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                            <History className="h-5 w-5 text-green-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">View Test History</h4>
                            <p className="text-gray-600 text-sm">Review past test results</p>
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => setActiveTab('stats')}
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                            <BarChart3 className="h-5 w-5 text-blue-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">View Statistics</h4>
                            <p className="text-gray-600 text-sm">Analyze your performance</p>
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => setActiveTab('settings')}
                        className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                            <Settings className="h-5 w-5 text-purple-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Account Settings</h4>
                            <p className="text-gray-600 text-sm">Manage your preferences</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <TestHistoryComponent onViewResult={(testId: string) => {
                  if (user?.id) {
                    const historyItem = testHistoryService.getTestResult(user.id, testId);
                    if (historyItem) {
                      setSelectedResult(historyItem);
                    }
                  }
                }} />
              )}

              {activeTab === 'stats' && (
                <TestStatsDashboard />
              )}

              {activeTab === 'settings' && (
                <div className="card">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Notifications</h4>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3" defaultChecked />
                          <span className="text-gray-700">Email notifications for test results</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3" defaultChecked />
                          <span className="text-gray-700">Weekly progress reports</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <span className="text-gray-700">Marketing emails</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Privacy</h4>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3" defaultChecked />
                          <span className="text-gray-700">Make test results private</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <span className="text-gray-700">Allow data sharing for research</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Data Management</h4>
                      <div className="space-y-3">
                        <button className="btn-secondary">
                          <Download className="h-4 w-4 mr-2" />
                          Export All Data
                        </button>
                        <button className="btn-secondary text-red-600 border-red-300 hover:bg-red-50">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Test Result Modal */}
          {selectedResult && (
            <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-elevated-medium border border-white/40 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Test Result Details</h2>
                    <button
                      onClick={() => setSelectedResult(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Test Info */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {selectedResult.testResult.testName}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Score:</span>
                          <span className="font-semibold ml-2">{Math.round(selectedResult.testResult.percentage)}%</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Grade:</span>
                          <span className="font-semibold ml-2">{selectedResult.testResult.grade}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Completed:</span>
                          <span className="font-semibold ml-2">
                            {new Date(selectedResult.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Questions:</span>
                          <span className="font-semibold ml-2">{selectedResult.testResult.totalQuestions}</span>
                        </div>
                      </div>
                    </div>

                    {/* Category Results */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedResult.testResult.categoryBreakdown?.map((category: unknown) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-gray-900 capitalize">
                                {category.category.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                              <span className="font-bold text-blue-600">
                                {Math.round(category.percentage)}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${category.percentage}%` }}
                              />
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              {category.correct} / {category.total} correct
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h4>
                      <ul className="space-y-2">
                        {selectedResult.testResult.recommendations?.map((rec: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{rec}</span>
                          </li>
                        )) || (
                            <li className="text-gray-500">No recommendations available</li>
                          )}
                      </ul>
                    </div>

                    {/* Notes */}
                    {selectedResult.notes && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Notes</h4>
                        <p className="text-gray-700 bg-gray-50 rounded-lg p-3">{selectedResult.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Edit Profile Modal */}
          {isEditModalOpen && (
            <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-elevated-medium border border-white/40 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
                    <button
                      onClick={() => setIsEditModalOpen(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Profession
                        </label>
                        <input
                          type="text"
                          value={formData.profession}
                          onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Experience
                        </label>
                        <input
                          type="text"
                          value={formData.experience}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                          placeholder="e.g., 5 years"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Birthday
                        </label>
                        <input
                          type="date"
                          value={formData.birthday}
                          onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        rows={4}
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        placeholder="Tell us about yourself..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setIsEditModalOpen(false)}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Education Modal */}
          {isEducationModalOpen && (
            <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-elevated-medium border border-white/40 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {editingEducation ? 'Edit Education' : 'Add Education'}
                    </h2>
                    <button
                      onClick={() => setIsEducationModalOpen(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); handleSaveEducation(); }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Degree *
                        </label>
                        <input
                          type="text"
                          required
                          value={educationForm.degree}
                          onChange={(e) => setEducationForm({ ...educationForm, degree: e.target.value })}
                          placeholder="e.g., Bachelor of Science"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Institution *
                        </label>
                        <input
                          type="text"
                          required
                          value={educationForm.institution}
                          onChange={(e) => setEducationForm({ ...educationForm, institution: e.target.value })}
                          placeholder="e.g., University of Delhi"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Field of Study *
                        </label>
                        <input
                          type="text"
                          required
                          value={educationForm.fieldOfStudy}
                          onChange={(e) => setEducationForm({ ...educationForm, fieldOfStudy: e.target.value })}
                          placeholder="e.g., Computer Science"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Grade/CGPA
                        </label>
                        <input
                          type="text"
                          value={educationForm.grade}
                          onChange={(e) => setEducationForm({ ...educationForm, grade: e.target.value })}
                          placeholder="e.g., 8.5 CGPA"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Year *
                        </label>
                        <input
                          type="number"
                          required
                          min="1950"
                          max={new Date().getFullYear() + 10}
                          value={educationForm.startYear}
                          onChange={(e) => setEducationForm({ ...educationForm, startYear: parseInt(e.target.value) })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End Year
                        </label>
                        <input
                          type="number"
                          min="1950"
                          max={new Date().getFullYear() + 10}
                          value={educationForm.endYear}
                          onChange={(e) => setEducationForm({ ...educationForm, endYear: parseInt(e.target.value) })}
                          disabled={!educationForm.isCompleted}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={educationForm.isCompleted}
                          onChange={(e) => setEducationForm({ ...educationForm, isCompleted: e.target.checked })}
                          className="mr-3"
                        />
                        <span className="text-sm font-medium text-gray-700">Completed</span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={educationForm.description}
                        onChange={(e) => setEducationForm({ ...educationForm, description: e.target.value })}
                        placeholder="Additional details about your education..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setIsEducationModalOpen(false)}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn-primary">
                        {editingEducation ? 'Update Education' : 'Add Education'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;