import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { updateJobPostInput } from "../validation/scheam";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const EditPostPage: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const { state } = useLocation(); //Used to get access to the current values of the state variables.
  const navigate = useNavigate();

  
  // Current data 
  const [jobPost, setJobPost] = useState({
    title: state?.jobPost?.title || "",
    description: state?.jobPost?.description || "",
    jobType: state?.jobPost?.jobType || "",
    location: state?.jobPost?.location || "",
    company: state?.jobPost?.company || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  //Handlinginput changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setJobPost({ ...jobPost, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the input data
    const isValid = updateJobPostInput.safeParse(jobPost);
    if (!isValid.success) {
      setSubmitError("Please fill out all required fields correctly.");
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

      await axios.put(`${BACKEND_URL}/job-post/update/${id}`, jobPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Job post updated successfully!");
      navigate("/profile"); 

    } catch (err) {
      console.error("Error while updating the job post:", err);
      setSubmitError("Error while updating the job post.");

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white flex items-center justify-center px-4 py-4">
      <div className="bg-slate-100 shadow-lg rounded-lg w-full max-w-3xl">
        <div className="bg-indigo-500 text-white px-4 py-2 rounded-t-lg">
          <h2 className="text-xl font-semibold">Edit Job Post</h2>
        </div>
        <form onSubmit={handleSubmit} className="px-4 py-4 flex flex-col">
          {submitError && <div className="mb-2 text-red-600 text-center">{submitError}</div>}

          <div className="flex flex-wrap -mx-2">
            <div className="w-full px-2 mb-2">
              <label className="block text-gray-700 mb-1" htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
                value={jobPost.title}
                onChange={handleInputChange}
                placeholder="Enter the job title"
              />
            </div>
            <div className="w-full px-2 mb-2">
              <label className="block text-gray-700 mb-1" htmlFor="company">Company</label>
              <input
                id="company"
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
                value={jobPost.company}
                onChange={handleInputChange}
                placeholder="Enter the company name"
              />
            </div>
            <div className="w-full px-2 mb-2">
              <label className="block text-gray-700 mb-1" htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
                value={jobPost.location}
                onChange={handleInputChange}
                placeholder="Enter the job location"
              />
            </div>
            <div className="w-full px-2 mb-2">
              <label className="block text-gray-700 mb-1" htmlFor="jobType">Job Type</label>
              <select
                id="jobType"
                className="w-full border border-gray-300 p-2 rounded"
                value={jobPost.jobType}
                onChange={handleInputChange}
              >
                <option value="">Select Job Type</option>
                <option value="FULL_TIME">FULL_TIME</option>
                <option value="PART_TIME">PART_TIME</option>
                <option value="INTERN">INTERNSHIP</option>
              </select>
            </div>
            <div className="w-full px-2 mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="description">Description</label>
              <textarea
                id="description"
                className="w-full border border-gray-300 p-2 rounded"
                value={jobPost.description}
                onChange={handleInputChange}
                placeholder="Describe the job..."
                rows={6}
              />
            </div>
          </div>

          <div className="w-full px-2">
            <button
              type="submit"
              className={`w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Job Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostPage;
