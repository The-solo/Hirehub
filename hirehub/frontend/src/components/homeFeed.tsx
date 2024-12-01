import React, { useEffect, useState } from "react";
import axios from "axios";
import JobPostCard from "./JobPost";
import { JobPost } from "../types/JobPostTypes";
import { JobSkeleton, NoJobsAvailable } from "./Skeletons";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const HomeFeed: React.FC = () => {
  const [feed, setFeed] = useState<JobPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  const sendRequest = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.get(`${BACKEND_URL}/home/feed`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFeed(response.data.jobPostings);
      setRole(localStorage.getItem("role")); 

    } catch (err: any) {
      console.error("Error while fetching the feed:", err);
      
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    sendRequest();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-10 flex-col">
        <JobSkeleton />
        <JobSkeleton />
        <JobSkeleton />
        <JobSkeleton />
        <JobSkeleton />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 relative">
      {feed.length > 0 ? (
        feed.map((job) => <JobPostCard key={job.id} jobPost={job} />)
      ) : (
        <div className="text-center text-gray-600">
          <NoJobsAvailable />
        </div>
      )}

      {role === "EMPLOYER" && (
        <div className="fixed bottom-6 right-6 group">
          <button
            onClick={() => navigate("/job-post")}
            className="flex items-center justify-center w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {/* + sign SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>

          {/* + onHover message*/}
          <div className="absolute bottom-16 right-0 bg-black text-white text-sm rounded-md px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Create JobPost
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeFeed;
