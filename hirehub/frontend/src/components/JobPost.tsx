import React from 'react';
import { JobPost } from '../types/JobPostTypes';
import { format } from 'date-fns';

interface JobPostCardProps {
  jobPost: JobPost;
}

const JobPostCard: React.FC<JobPostCardProps> = ({ jobPost }) => {
  return (
    <div className="flex justify-center px-8">
      <div className="border rounded-lg shadow p-6 mb-6 bg-zinc-50 w-[50rem] h-auto overflow-hidden">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{jobPost.title}</h2>
          <button
            type="button"
            className="py-2 px-4 text-sm text-white bg-green-600 hover:bg-green-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Apply
          </button>
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

export default JobPostCard;
