import React from "react";

export const JobSkeleton: React.FC = () => {
    return (
      <div className="flex justify-center px-6 py-2">
        <div className="border rounded-lg shadow p-6 mb-4 bg-gray-50 animate-pulse">
          <div className="grid grid-cols-2">
            <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-4"></div>
            <div className="flex justify-end mt-2">
              <div className="w-24 h-4 bg-gray-300 rounded-full"></div>
            </div>
          </div>
          <div className="h-4 bg-gray-200 rounded-md w-full mb-6"></div>
          <div className="h-4 bg-gray-200 rounded-md w-5/6 mb-4"></div>
          <div className="flex flex-wrap text-sm">
            <div className="h-4 bg-gray-300 rounded-md w-32 mr-4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded-md w-32 mr-4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded-md w-32 mr-4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded-md w-32 mb-2"></div>
          </div>
        </div>
      </div>
    );
  };

  
  export const NoJobsAvailable: React.FC = () => {
    return (
      <div className="flex justify-center items-center h-80">
        <div className="border rounded-lg shadow-lg p-12 bg-gray-50 max-w-md w-full text-center">
         
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center animate-bounce">
              <svg
                className="w-6 h-6 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9V6.75a3.75 3.75 0 117.5 0V9m-10.5 0h14.5M6.75 12.5v7.75M17.25 12.5v7.75m-9.5-7.75h9.5"
                />
              </svg>
            </div>
          </div>
        <h2 className="text-2xl font-extrabold text-red-600 mb-2">Error!</h2>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Couldn't fetch the data, Try refreshing.
          </h2>
        </div>
      </div>
    );
  };
  

  export const ProfileCardSkeleton: React.FC = () => {
    return (
      <div className="pt-8 flex items-center justify-center bg-white">
        <div className="w-full max-w-md bg-indigo-100 py-10 px-6 rounded-lg shadow-md flex flex-col items-center relative">
          <div className="absolute top-4 right-4 h-8 w-8 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse mb-6 border-4 border-gray-300"></div>
          <div className="h-8 bg-gray-200 rounded-md w-3/4 animate-pulse mb-4"></div>
          <div className="h-6 bg-gray-200 rounded-md w-2/3 animate-pulse mb-6"></div>
          <div className="w-full">
            <div className="h-5 bg-gray-200 rounded-md w-1/2 animate-pulse mb-3"></div>
            <div className="h-5 bg-gray-200 rounded-md w-full animate-pulse mb-3"></div>
            <div className="h-5 bg-gray-200 rounded-md w-3/4 animate-pulse"></div>
          </div>
          <div className="mt-6 w-full">
            <div className="h-5 bg-gray-200 rounded-md w-1/3 animate-pulse mb-3"></div>
            <div className="h-5 bg-gray-200 rounded-md w-4/5 animate-pulse"></div>
          </div>
          <div className="my-6 w-full border-t border-gray-300"></div>
        </div>
      </div>
    );
  };
  

  
  

  export const ProfileCardError: React.FC = () => {
    return (
      <div className="flex justify-center pt-20">
        <div className="w-full max-w-md py-8 px-6 rounded-lg shadow-md flex flex-col items-center text-center">
          
          <div className="w-24 h-24 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="w-24 h-24 animate-bounce text-gray-400"
            >
              <circle
                cx="32"
                cy="32"
                r="30"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                d="M32 20a6 6 0 11-6 6 6 6 0 016-6zm0 14c-6.075 0-12 3.447-12 6v2h24v-2c0-2.553-5.925-6-12-6z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
  
          <h2 className="font-bold text-2xl text-red-600 mb-2">No User Found!</h2>
          <p className="text-gray-700 font-semibold text-xl">
            No profile data available. Please try again or add a user.
          </p>
        </div>
      </div>
    );
  };


  interface SignInErrorProps {
    message: string;
  }
  
  export const SignInError: React.FC<SignInErrorProps> = ({ message }) => {
    return (
      <div
        className="fixed top-0 left-0 w-full bg-red-500 text-white text-center py-4 z-50 shadow-md"
        role="alert"
        aria-live="assertive"
      >
        <div className="container mx-auto px-4 flex items-center justify-center">
          <div className="flex items-center">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
            </svg>
            <p className="font-semibold text-lg">Error: {message}</p>
          </div>
        </div>
      </div>
    );
  };
  
  
export const EditProfileSkeleton: React.FC = () => {
  return (
    <div className="bg-white flex items-center justify-center px-4 py-10">
      <div className="bg-slate-100 shadow-lg rounded-lg w-full max-w-3xl animate-pulse">
        <div className="bg-indigo-500 text-white px-4 py-2 rounded-t-lg">
          <div className="h-6 w-1/3 bg-indigo-300 rounded"></div>
        </div>
        <div className="px-4 py-4">
          <div className="flex flex-wrap -mx-2">

            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className={`w-${index === 4 ? "full" : "1/2"} px-2 mb-4`}
              >
                <div className="h-4 w-1/2 bg-gray-300 mb-2 rounded"></div>
                <div className="h-10 w-full bg-gray-200 rounded"></div>
              </div>
            ))}
            <div className="w-full px-2 mb-4">
              <div className="h-4 w-1/3 bg-gray-300 mb-2 rounded"></div>
              <div className="h-20 w-full bg-gray-200 rounded"></div>
            </div>
            <div className="w-1/2 px-2 mb-4">
              <div className="h-4 w-1/2 bg-gray-300 mb-2 rounded"></div>
              <div className="h-10 w-full bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="w-full px-2">
            <div className="h-12 w-full bg-indigo-400 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};


export const JobPostLoadingSkeleton: React.FC = () => {
  return (
    <div className="bg-white flex items-center justify-center px-4 py-10">
      <div className="bg-slate-100 shadow-lg rounded-lg w-full max-w-3xl animate-pulse">
        <div className="bg-indigo-300 text-white px-4 py-2 rounded-t-lg h-10 w-1/3"></div>
        <div className="px-4 py-4">
          <div className="flex flex-wrap -mx-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="w-full px-2 mb-4">
                <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
            <div className="w-full px-2 mb-4">
              <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
              <div className="h-20 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
          <div className="w-full px-2">
            <div className="h-12 bg-indigo-400 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};



