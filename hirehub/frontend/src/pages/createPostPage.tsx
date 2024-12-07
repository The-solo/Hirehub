import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createJobPostInput } from "../validation/scheam";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CreatePostComponent: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //Preparing input data
    const inputData = {
      title: title.trim(),
      description: description.trim(),
      jobType: jobType.trim(),
      location: location.trim(),
      company: company.trim(),
    };


    //Input validation on frontend.
    const validationResult = createJobPostInput.safeParse(inputData);
    if (!validationResult.success) {
      console.log("Validation Errors:", validationResult.error);
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

      await axios.post(`${BACKEND_URL}/job-post/new`, inputData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      alert("Job-Post created successfully.")
      navigate("/home");
      
    } catch (err: any) {
      console.error("Error while creating the post:", err);
      setSubmitError("Error while creating the post.");

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white flex items-center justify-center px-4 pt-14">
      <div className="bg-slate-100 shadow-lg rounded-lg w-full max-w-3xl">
        <div className="bg-indigo-500 text-white px-4 py-2 rounded-t-lg">
          <h2 className="text-xl font-semibold">Create New Job Post</h2>
        </div>
        <form onSubmit={handleSubmit} className="px-4 py-4 flex flex-col">
          {submitError && (
            <div className="mb-2 text-red-600 text-center">{submitError}</div>
          )}
          <div className="flex flex-wrap -mx-2">
            <div className="w-full px-2 mb-2">
              <label className="block text-gray-700 mb-1" htmlFor="title">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Enter the job title"
              />
            </div>
            <div className="w-full px-2 mb-2">
              <label className="block text-gray-700 mb-1" htmlFor="company">
                Company <span className="text-red-500">*</span>
              </label>
              <input
                id="company"
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                placeholder="Enter the company name"
              />
            </div>
            <div className="w-full px-2 mb-2">
              <label className="block text-gray-700 mb-1" htmlFor="location">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                id="location"
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                placeholder="Enter the job location"
              />
            </div>
            <div className="w-full px-2 mb-2">
              <label className="block text-gray-700 mb-1" htmlFor="jobType">
                Job Type <span className="text-red-500">*</span>
              </label>
              <select
                id="jobType"
                className="w-full border border-gray-300 p-2 rounded"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                required
              >
                <option value="">Select Job Type</option>
                <option value="FULL_TIME">Full time</option>
                <option value="PART_TIME">Part time</option>
                <option value="INTERNSHIP">Intern</option>
              </select>
            </div>
            <div className="w-full px-2 mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="description">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                className="w-full border border-gray-300 p-2 rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Describe the job..."
                rows={4}
              ></textarea>
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
              {isSubmitting ? "Creating..." : "Create Job Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostComponent;
