import { Link, useNavigate } from "react-router-dom"
import { LabeledInput } from "./Lable"; 
import { signupInput } from '../validation/scheam';
import { useState } from 'react';
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


interface SigningProps {
    type: "signup" | "signin";  // Define 'type' prop as a string
}

const SignUp : React.FC<SigningProps> = () => {

    const navigate = useNavigate();
    const [postInputs, setPosstInputs] = useState<signupInput>({
        name : "",
        email : "",
        password : "",
        role : "EMPLOYEE",
        description :  "",
        education : ""
    });

    async function sendRequest(){
        try{
            await axios.post(`${BACKEND_URL}/user/signup`, postInputs, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }); 
            navigate("/signin");
            
        } catch(error) {
            console.log("Error while signing up." + error);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
                {/* Sign Up Form */}
                <div className="flex flex-col gap-4 bg-white p-8 rounded-lg shadow-lg">
                    <div className="text-2xl font-bold text-center mb-2">
                        Sign u now.
                    </div>
                    <div className="flex justify-center mb-4">
                        <div className="text-sm text-slate-700">
                            Already have an account? 
                            <Link to="/signin" className="text-blue-600 hover:text-blue-500 ml-2 underline">Sign In</Link>
                        </div>
                    </div>

                    {/* Form Inputs */}
                    <div className="grid gap-4 text-black">
                        <LabeledInput label='Username' placeholder='Enter your username (optional)' onChange={(e => {
                            setPosstInputs({
                                ...postInputs,
                                name: e.target.value
                            });
                        })} />
                        <LabeledInput label='Email' placeholder='example@email.com' onChange={(e => {
                            setPosstInputs({
                                ...postInputs,
                                email: e.target.value
                            });
                        })} />
                        <LabeledInput type="password" label='Password' placeholder='At least 6 characters' onChange={(e => {
                            setPosstInputs({
                                ...postInputs,
                                password: e.target.value
                            });
                        })} />
                        <div>
                            <label className="font-medium text-sm mb-2">What's your objective?</label>
                            <select
                                value={postInputs.role}
                                onChange={(e) => {
                                    setPosstInputs({
                                        ...postInputs,
                                        role: e.target.value as "EMPLOYEE" | "EMPLOYER",
                                    });
                                }}
                                className="w-full p-2 border rounded-lg"
                            >
                                <option value="EMPLOYEE">Find a job.</option>   
                                <option value="EMPLOYER">To hire people.</option>
                            </select>
                        </div>

                        <LabeledInput type="description" label='Description' placeholder='Describe yourself (optional)' onChange={(e => {
                            setPosstInputs({
                                ...postInputs,
                                description: e.target.value
                            });
                        })} />
                        <LabeledInput type="education" label='Education' placeholder='Education (optional)' onChange={(e => {
                            setPosstInputs({
                                ...postInputs,
                                education: e.target.value
                            });
                        })} />
                    </div>
                    <div className="flex justify-center mt-6">
                        <button onClick={sendRequest} type="button" className="w-full py-2.5 px-6 text-lg text-white bg-blue-600 hover:bg-blue-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Sign Up
                        </button>
                    </div>
                </div>
        </div>
    )
}

export default SignUp;
