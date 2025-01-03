import React from 'react';
import { JobPost } from '../types/JobPostTypes';
import { format } from 'date-fns';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


interface JobPostCardProps {
  jobPost: JobPost;
}

export const JobPostCard: React.FC<JobPostCardProps> = ({ jobPost }) => {

    const navigate = useNavigate();

    const handleApplyClick = (jobPostId: number, jobPost: JobPost) => {
        navigate(`/apply/${jobPostId}`, { state: { jobPost } });
    };

  return (
    <div className="flex justify-center px-8">
      <div className="border rounded-lg shadow p-6 mb-6 bg-zinc-50 w-[50rem] h-auto overflow-hidden">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{jobPost.title}</h2>
          <div>
            <button
                type="button"
                className="py-2 px-4 text-sm text-white bg-green-600 hover:bg-green-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => handleApplyClick(jobPost.id, jobPost)}
                >
                Apply
            </button>
          </div>
        </div>
        <div className="text-gray-700 mb-6">
          <p className="text-base leading-relaxed">{jobPost.description}</p>
        </div>
        <div className="text-base text-gray-600">
          <div className="flex flex-wrap mb-2">
            <span className="mr-6 mb-2">
              <strong>Job Type:</strong> {jobPost.jobType}
            </span>
            <span className="mr-6 mb-2">
              <strong>Location:</strong> {jobPost.location}
            </span>
            <span className="mr-6 mb-2">
              <strong>Company:</strong> {jobPost.company}
            </span>
          </div>
          <div>
            <span>
              <strong>Posted:</strong> {format(new Date(jobPost.createdAt), 'PPP')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};



export const EmployerJobsCard: React.FC<JobPostCardProps> = ({ jobPost }) => {

    const navigate = useNavigate();
    
    const handleEdit = () => {
        navigate(`/job-post/edit/${jobPost.id}`, { state: { jobPost } });
    };
    

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this job post?")) {
            try {
                const token = localStorage.getItem("token");

                await axios.delete(`${BACKEND_URL}/job-post/delete/${jobPost.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                alert("Job post deleted successfully.");
                navigate("/home")

            } catch (err) {
                console.error("Error deleting job post:", err);
                alert("Failed to delete the job post.");
            }
        }
    };

    const handleApplications = () => {
        navigate(`/job-post/applications/${jobPost.id}`, { state: { jobPost } });

    };

    return (
        <div className="flex justify-center px-4">
            <div className="border rounded-lg shadow p-6 mb-6 bg-zinc-50 w-full max-w-2xl">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold">{jobPost.title}</h2>
                    <div className="flex flex-col2 justify-end">
                        <div className="flex pr-4 pb-5">
                            <button
                                type="button"
                                className="py-2 px-5 text-sm text-white bg-blue-600 hover:bg-blue-800 rounded-full"
                                onClick={handleEdit}
                            >
                                Edit
                            </button>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="py-2 px-4 text-sm text-white bg-red-600 hover:bg-red-800 rounded-full"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                <p className="text-gray-700 mb-6">{jobPost.description}</p>
                <div className="text-base text-gray-600">
                    <div className="mb-2">
                        <strong>Job Type:</strong> {jobPost.jobType}
                    </div>
                    <div className="mb-2">
                        <strong>Location:</strong> {jobPost.location}
                    </div>
                    <div>
                        <strong>Posted:</strong> {new Date(jobPost.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="py-2 px-4 text-sm text-white bg-slate-600 hover:bg-slate-900 rounded-full"
                            onClick={handleApplications}
                        >
                            Applications
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export const EMployeeCard = () => {
    
}