import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ProfileCardSkeleton, ProfileCardError } from "./Skeletons";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const ProfileCardComponent: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const sendRequest = async () => {
    try {
      setIsLoading(true);
      setError(false);
      const response = await axios.get(`${BACKEND_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data.profile);
    } catch (err: any) {
      console.error("Error while fetching the profile:", err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    sendRequest();
  }, []);

  // Dropdown menu handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //Delete profile function.
  const deleteProfile = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/signup");

    } catch (err) {
      console.error("Error deleting profile:", err);
      alert("An error occurred while deleting your account.");
    }
  };


  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  if (isLoading) {
    return <ProfileCardSkeleton />;
  }

  if (error) {
    return <ProfileCardError />;
  }

  return (
    <div className="pt-10 flex items-center bg-white pl-20">
      <div className="w-full max-w-md bg-indigo-100 py-10 px-6 rounded-lg shadow-md flex flex-col items-center relative">
        <div className="absolute top-4 right-4" ref={menuRef}>
          {/* Dropdown button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none rounded-sm"
            aria-label="Profile Options"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 text-gray-600 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-zinc-100 border rounded-md shadow-lg z-10">
              <button
                onClick={handleEditProfile}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition duration-200 rounded-sm"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition duration-200"
              >
                Logout
              </button>
              <button
                onClick={() => setShowConfirmationDialog(true)}
                className="bg-red-700 text-white w-full text-left px-4 py-2 hover:bg-red-900 transition duration-200 rounded-sm"
              >
                Delete account
              </button>
            </div>
          )}
        </div>

        {showConfirmationDialog && (
        <div className="absolute top-0 left-0 flex items-start justify-center w-full h-full bg-black bg-opacity-50 z-20">
            <div className="bg-white rounded-lg p-6 w-80 mt-10">
            <h3 className="text-lg font-semibold mb-4">Are you sure about this?</h3>
            <div className="flex justify-end">
                <button
                onClick={() => setShowConfirmationDialog(false)}
                className="bg-green-500 text-gray-800 py-2 px-4 rounded mr-2 hover:bg-gray-400"
                >
                No
                </button>
                <button
                onClick={deleteProfile}
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                >
                Yes
                </button>
            </div>
            </div>
        </div>
        )}
        
        <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gray-200 border-4 border-indigo-500 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-12 h-12 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 18a7.5 7.5 0 0115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75V18z"
            />
          </svg>
        </div>

        <div className="text-center">
          <div className="font-black text-2xl">{profile.name}</div>
        </div>

        <div className="flex flex-row font-semibold mt-4 text-gray-700 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.6"
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 12l-7.5 4.5L1.5 12m0-6.75l7.5 4.5 7.5-4.5m-7.5 4.5v9"
            />
          </svg>
          <div>{profile.email}</div>
        </div>
        <div className="mt-4 text-gray-700 w-full text-left">
          <h3 className="font-semibold text-lg">About Me:</h3>
          <p>{profile.description || "No description provided."}</p>

          <p className="mt-2 text-sm text-gray-600 font-medium">
            {profile.role === "EMPLOYER" ? "Role: Employer" : "Role: Employee"}
          </p>
        </div>
        <div className="mt-4 text-gray-700 w-full text-left">
          <h3 className="font-semibold text-lg">Education:</h3>
          <p>{profile.education || "No education details provided."}</p>
        </div>
        <div className="my-4 w-full border-t border-gray-300"></div>
        <div className="text-gray-700 text-sm text-center">
          <p>Contact: {profile.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardComponent;
