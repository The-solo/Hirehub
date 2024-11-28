import { Link, useNavigate } from "react-router-dom"
import { LabeledInput } from "../components/Lable"; 
import { signinInput } from '../validation/scheam';
import { useState } from 'react';
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type SigningProps = {
    type: "signup" | "signin";  // Define 'type' prop as a string
}


const SignIn : React.FC<SigningProps> = () => {

    const navigate = useNavigate();
    const [postInputs, setPosstInputs] = useState<signinInput>({
        email : "",
        password : "",
    });

    //sending the backend request.
    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/user/signin`, postInputs); //passing the body.
            const jwt =  response.data.token;
            localStorage.setItem("token", jwt);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("username", response.data.username);
            navigate("/home");
            
        } catch(error) {
            console.log("Error while signing in."+ error);
        }
    }
    
    return (
        <div>
             <Link to="/"
                    className="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>

                </Link>
            <div className="grid bg-white bg-blend-screen justify-center mt-20">
                <div className="text-2xl font-bold text-center ">
                    Let's find you a job!
                </div>
                <div className="flex flex-row mt-6">
                    <div className="text-sm text-slate-700 pl-8">
                            Don't have an account? 
                            <Link to="/" className="text-blue-600 hover:text-blue-500 ml-2 underline">Sign Up</Link>
                        </div>
                    </div> 
                <div>
                    <div className="grid  justify-center mt-10">
                                <LabeledInput label='Email' placeholder='example@email.com' onChange={(e => {
                                    setPosstInputs({
                                        ...postInputs, 
                                        email : e.target.value
                                    });
                            })}/>
                    </div> 
                    <div className="grid  justify-center mt-8">
                                <LabeledInput type="password" label='Password' placeholder='password (at least 6 character)' onChange={(e => {
                                    setPosstInputs({
                                        ...postInputs,
                                        password : e.target.value 
                                    });
                            })}/>
                    </div> 
                </div>
                <div>
                <div className="flex justify-center mt-6">
                        <button onClick={sendRequest} type="button" className="w-full py-2.5 px-6 text-lg text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;