import React from 'react';
import { JobPost } from '../types/JobPostTypes';
import { format } from 'date-fns';

interface JobPostCardProps {
  jobPost: JobPost;
}

const JobPostCard: React.FC<JobPostCardProps> = ({ jobPost }) => {
  return <div className='flex justify-center px-8'>
    <div className="border rounded-lg shadow p-8 mb-4 bg-zinc-50">
        <div className='grid grid-cols-2'>
            <h2 className="text-2xl font-bold mb-2">{jobPost.title}</h2>
            <div className="flex justify-end mt-2">
                <button type="button" className="w-24 py-2.5 px-2  text-sm text-white bg-green-600 hover:bg-green-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Apply
               </button>                
            </div>
        </div>
      <p className="text-gray-700 mb-4">{jobPost.description}</p>
      <div className="flex flex-wrap text-sm text-gray-600 mb-4">
        <span className="mr-4"><strong>Job:</strong> {jobPost.jobType}</span>
        <span className="mr-4"><strong>Location:</strong> {jobPost.location}</span>
        <span className="mr-4"><strong>Company:</strong> {jobPost.company}</span>
        <span><strong>Posted:</strong> {format(new Date(jobPost.createdAt), 'PPP')}</span>
      </div>
    </div>
  </div>
};

export default JobPostCard;
