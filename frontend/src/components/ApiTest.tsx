import React, { useState, useEffect } from 'react';
import { API_BASE_URL, apiCall } from '../utils/api';

const ApiTest: React.FC = () => {
  const [healthData, setHealthData] = useState<any>(null);
  const [pollsData, setPollsData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const testHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiCall('/health');
      setHealthData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Health check failed');
    }
    setLoading(false);
  };

  const testPolls = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiCall('/api/polls');
      setPollsData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Polls API failed');
    }
    setLoading(false);
  };

  useEffect(() => {
    testHealth();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🔧 API Connection Test</h1>
      
      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f5f5f5' }}>
        <h3>Configuration</h3>
        <p><strong>API Base URL:</strong> {API_BASE_URL}</p>
        <p><strong>Current Host:</strong> {window.location.origin}</p>
        <p><strong>Environment:</strong> {import.meta.env.MODE}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={testHealth} 
          disabled={loading}
          style={{ marginRight: '10px', padding: '10px 20px' }}
        >
          {loading ? 'Testing...' : 'Test Health Check'}
        </button>
        <button 
          onClick={testPolls} 
          disabled={loading}
          style={{ padding: '10px 20px' }}
        >
          {loading ? 'Testing...' : 'Test Polls API'}
        </button>
      </div>

      {error && (
        <div style={{ padding: '10px', backgroundColor: '#ffebee', border: '1px solid #f44336', marginBottom: '20px' }}>
          <h4 style={{ color: '#d32f2f' }}>❌ Error</h4>
          <p>{error}</p>
        </div>
      )}

      {healthData && (
        <div style={{ padding: '10px', backgroundColor: '#e8f5e8', border: '1px solid #4caf50', marginBottom: '20px' }}>
          <h4 style={{ color: '#2e7d32' }}>✅ Health Check Success</h4>
          <pre style={{ fontSize: '12px', overflow: 'auto' }}>
            {JSON.stringify(healthData, null, 2)}
          </pre>
        </div>
      )}

      {pollsData && (
        <div style={{ padding: '10px', backgroundColor: '#e3f2fd', border: '1px solid #2196f3', marginBottom: '20px' }}>
          <h4 style={{ color: '#1976d2' }}>✅ Polls API Success</h4>
          <p>Found {Array.isArray(pollsData) ? pollsData.length : 'unknown'} polls</p>
          <details>
            <summary>View Data</summary>
            <pre style={{ fontSize: '12px', overflow: 'auto', maxHeight: '300px' }}>
              {JSON.stringify(pollsData, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
};

export default ApiTest;