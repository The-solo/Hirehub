import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EditProfileSkeleton, ProfileCardError } from "./Skeletons";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface Profile {
    name: string;
    email: string;
    description?: string;
    education?: string;
    role: string;
}

const EditProfileComponent: React.FC = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const navigate = useNavigate();

    // State variables for form inputs
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [education, setEducation] = useState<string>("");
    const [role, setRole] = useState<string>("EMPLOYEE"); // Default role

    // Fetch current profile data
    const fetchProfile = async () => {
        try {
            setIsLoading(true);
            setError(false);
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/signin");
                return;
            }
            
            const response = await axios.get(`${BACKEND_URL}/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(profile);
            setProfile(response.data.profile);

            // Pre-filling form inputs with current profile values
            setName(response.data.profile.name || "");
            setEmail(response.data.profile.email || "");
            setDescription(response.data.profile.description || "");
            setEducation(response.data.profile.education || "");
            setRole(response.data.profile.role || "EMPLOYEE");

        } catch (err: any) {
            console.error("Error while fetching the profile:", err);

            setError(true);
        } finally {
            
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    // Form submission handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (name.trim() === "" || email.trim() === "") {
            setSubmitError("Name and Email are required.");
            return;
        }

        // Prepare data to send
        const data: any = {};

        if (name.trim() !== "") data.name = name.trim();
        if (email.trim() !== "") data.email = email.trim();
        if (password.trim() !== "") data.password = password.trim();
        if (description.trim() !== "") data.description = description.trim();
        if (education.trim() !== "") data.education = education.trim();
        if (role.trim() !== "") data.role = role.trim();

        try {
            setIsSubmitting(true);
            setSubmitError(null);
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/signin");
                return;
            }

            const requestURL = `${BACKEND_URL}/user/profile/update`;
            console.log("Sending PUT request to:", requestURL);
            console.log("Data:", data);

            const response = await axios.put(requestURL, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            console.log("Profile updated:", response.data.message);
            navigate("/profile");

        } catch (err: any) {
            console.error("Error while updating the profile:", err);

        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <EditProfileSkeleton />;

    } else if (error) {
        return <ProfileCardError />;

    } else {
        return (
            <div className="bg-white flex items-center justify-center px-4 pt-20">
                <div className="bg-slate-100 shadow-lg rounded-lg w-full max-w-3xl">
                    <div className="bg-indigo-500 text-white px-4 py-2 rounded-t-lg">
                        <h2 className="text-xl font-semibold">Edit Profile</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="px-4 py-4 flex flex-col">
                        {submitError && (
                            <div className="mb-2 text-red-600 text-center">
                                {submitError}
                            </div>
                        )}
                        <div className="flex flex-wrap -mx-2">
                            <div className="w-1/2 px-2 mb-2">
                                <label className="block text-gray-700 mb-1" htmlFor="name">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="w-1/2 px-2 mb-2">
                                <label className="block text-gray-700 mb-1" htmlFor="email">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="w-1/2 px-2 mb-2">
                                <label className="block text-gray-700 mb-1" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Leave blank to keep current password"
                                />
                            </div>
                            <div className="w-1/2 px-2 mb-2">
                                <label className="block text-gray-700 mb-1" htmlFor="education">
                                    Education
                                </label>
                                <input
                                    id="education"
                                    type="text"
                                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={education}
                                    onChange={(e) => setEducation(e.target.value)}
                                    placeholder="Your highest education level"
                                />
                            </div>
                            <div className="w-full px-2 mb-2">
                                <label className="block text-gray-700 mb-1" htmlFor="description">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Tell us something about yourself"
                                    rows={3}
                                ></textarea>
                            </div>
                            <div className="w-1/2 px-2 mb-4">
                                <label className="block text-gray-700 mb-1" htmlFor="role">
                                    Role <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="role"
                                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                >
                                    <option value="EMPLOYEE">Employee</option>
                                    <option value="EMPLOYER">Employer</option>
                                </select>
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
                                {isSubmitting ? "Updating..." : "Update Profile"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
};

export default EditProfileComponent;
