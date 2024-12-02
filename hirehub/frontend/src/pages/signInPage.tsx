import SignIn from "../components/SignIn";

export const SignInPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-100">
                <div className="flex justify-center items-center">
                    <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md flex flex-col justify-center items-center">
                        <SignIn type="signin" />
                    </div>
                </div>
        </div>
    )
}

export default SignInPage;
