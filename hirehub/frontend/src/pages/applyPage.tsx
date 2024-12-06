import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createApplicationSchema } from "../validation/scheam";

import axios from "axios";
import { ApplicationLoadingSkeleton } from "../components/Skeletons";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const ApplyPage: React.FC = () => {
  const { state } = useLocation(); // Getting job post data passed from the home page
  const jobPost = state?.jobPost;

  const [resumeUrl, setResumeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Handle case where jobPost is undefined
  useEffect(() => {
    if (!jobPost) {
      alert("Something went wrong, please try again.");
      navigate("/home");
    } else {
        setIsLoading(false);
    }
  }, [jobPost, navigate]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResumeUrl(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationResult = createApplicationSchema.safeParse({
      jobPostingId: jobPost.id,
      resumeUrl: resumeUrl,
    });

    if (!validationResult.success) {
      alert("Invalid Inputs, please try again.");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }

      await axios.post(`${BACKEND_URL}/application/new`,{
          jobPostingId: jobPost.id,
          resumeUrl: resumeUrl,
        },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Application submitted successfully!");
      navigate("/home");


      if (isLoading) {
        return <ApplicationLoadingSkeleton />;
      }

    } catch (err) {
      console.error("Error while applying:", err);
      setSubmitError("Error while submitting your application.");

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white flex items-center justify-center px-4 pt-20">
      <div className="bg-slate-100 shadow-lg rounded-lg w-full max-w-3xl">
        <div className="bg-indigo-500 text-white px-4 py-2 rounded-t-lg">
          <h2 className="text-xl font-semibold">Apply for {jobPost.title}</h2>
        </div>
        <form onSubmit={handleSubmit} className="px-4 py-4 flex flex-col">
          {submitError && <div className="mb-2 text-red-600 text-center">{submitError}</div>}

          <div className="mb-4">
            <p className="text-gray-700">Company: {jobPost.company}</p>
            <p className="text-gray-700">Location: {jobPost.location}</p>
            <p className="text-gray-700">Job Type: {jobPost.jobType}</p>
            <p className="text-gray-700 mb-4">Description: {jobPost.description}</p>
          </div>

          <div className="w-full px-2 mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="resumeUrl">
              Resume URL
            </label>
            <input
              id="resumeUrl"
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={resumeUrl}
              onChange={handleInputChange}
              placeholder="Please include the http://"
            />
          </div>

          <div className="w-full px-2">
            <button
              type="submit"
              className={`w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Applying..." : "Apply"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
