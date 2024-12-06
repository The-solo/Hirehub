import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ViewApplicationsLoading } from '../components/Skeletons';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface Application {
  id: number;
  resumeUrl: string;
}

export const ApplicationsPage = () => {
  const { state } = useLocation();  //Getting the jobPost ID from the navigation state
  const { jobPost } = state;  //Extracting jobPost from state

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.log("Applications data:", applications);
      setError('No authentication token found');

    } else {
      fetchApplications();
    }
  }, [token, jobPost.id]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/application/${jobPost.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setApplications(response.data.applications || []);

    } catch (err) {
      setError('Error fetching applications');

    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (applicationId: number) => {
    try {
        await axios.delete(`${BACKEND_URL}/application/${applicationId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Remove the deleted application from the list
        setApplications(prev => prev.filter(app => app.id !== applicationId));
    } catch (err) {
        setError('Error deleting application');
    }
  };

  if (loading) {
    return (
      <div>
        <ViewApplicationsLoading />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto lg:px-96 py-20">
      <h1 className="text-2xl font-semibold mb-4">Applications for Job Post: 
            <span className="text-blue-600">{jobPost.title}</span></h1>
        {applications && applications.length === 0 ? (
            <p className="text-gray-500">No applications yet.</p>
        ) : (
        <div className="space-y-4">
         {applications.map((application) => (
            <div key={application.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between">
                <p className="text-gray-800 font-medium">Resume URL:</p>
                <a 
                    href={application.resumeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 hover:underline"
                >
                    View Resume
                </a>
                </div>
                <div className="mt-2 flex justify-end">
                <button
                    onClick={() => handleDelete(application.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Delete
                </button>
                </div>
            </div>
            ))}
        </div>
      )}
    </div>
  );  
};
