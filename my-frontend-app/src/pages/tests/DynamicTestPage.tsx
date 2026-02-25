import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AssessmentTemplate } from '../../services/adminService';
import testService from '../../services/testService';
import { CommonTestComponent } from '../../components/tests/CommonTestComponent';
import { TestConfig, TestResult } from '../../types/testTypes';
import Navbar from '../../components/common/Navbar';

const DynamicTestPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const [testConfig, setTestConfig] = useState<TestConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (testId) {
      loadTest(testId);
    }
  }, [testId]);

  const loadTest = async (id: string) => {
    try {
      const template = await testService.getAssessment(id);
      const config = mapTemplateToConfig(template);
      setTestConfig(config);
    } catch (err: any) {
      setError('Failed to load test configuration');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const mapTemplateToConfig = (template: AssessmentTemplate): TestConfig => {
    return {
      id: template.id || template.testType,
      name: template.title,
      description: template.description,
      duration: `${template.estimatedTimeMinutes} mins`,
      instructions: template.instructions || [],
      categories: [template.category],
      type: template.testType,
      timeLimit: `${template.estimatedTimeMinutes} mins`,
      questions: template.questions.map(q => ({
        id: q.id,
        type: q.type === 'MULTIPLE_CHOICE' ? 'multiple-choice' : 'text-input',
        question: q.text,
        options: q.options?.map(o => ({
          id: o.id,
          text: o.text,
          isCorrect: q.correctAnswer === o.text
        })),
        image: q.image,
        timeLimit: q.timeLimit,
        correctAnswer: q.correctAnswer,
        category: q.category || template.category,
        points: q.points
      }))
    };
  };

  const handleTestComplete = async (result: TestResult) => {
    try {
      if (!result.testType && testConfig?.type) {
        result.testType = testConfig.type;
      }
      await testService.saveTestResult(result);
      console.log('Test Result Saved');
      navigate('/profile');
    } catch (error) {
      console.error('Failed to save test result', error);
      alert('Failed to save test result. Please try again.');
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="text-xl">Loading Test...</div>
      </div>
    </div>
  );

  if (error || !testConfig) return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center text-red-600">
        {error || 'Test not found'}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <CommonTestComponent
        testConfig={testConfig}
        onTestComplete={handleTestComplete}
        onTestExit={() => navigate('/tests')}
      />
    </div>
  );
};

export default DynamicTestPage;
