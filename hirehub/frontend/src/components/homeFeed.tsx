// src/components/HomeFeed.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import JobPostCard from "./JobPost";
import { JobPost } from "../types/JobPostTypes";
import { JobSkeleton, NoJobsAvailable } from "./Skeletons";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const HomeFeed: React.FC = () => {
  const [feed, setFeed] = useState<JobPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendRequest = async () => {

    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');

      const response = await axios.get(`${BACKEND_URL}/home/feed`, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });

      setFeed(response.data.jobPostings);
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
            <JobSkeleton/>
            <JobSkeleton/>
            <JobSkeleton/>
            <JobSkeleton/>
            <JobSkeleton/>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {feed.length > 0 ? (
        feed.map((job) => (
          <JobPostCard key={job.id} jobPost={job} />
        ))
      ) : (
        <div className="text-center text-gray-600">
            <NoJobsAvailable/>
        </div>
      )}
    </div>
  );
};

export default HomeFeed;
