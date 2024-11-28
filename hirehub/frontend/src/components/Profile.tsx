

export const ProfileCardComponent = () => {
    return(
        <div className='bg-contain h-screen flex flex-col items-center justify-center bg-white'>
            <div className='w-full max-w-md bg-indigo-100 p-20 rounded-lg shadow-lg flex flex-col items-center justify-center'>
                <div>
                    <div>
                        <img className='cursor-pointer w-24 h-24 rounded-full'src=""/>
                    </div>
                </div>
                <div className='h-10'></div>
                <div className='flex flex-row items-center'>
                    <div  className='font-black'>{} </div>  
                    <div className='ml-1'>{}</div>
                </div>
                <div className='flex flex-row font-semibold '>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                    </div>
                    <div>{}</div>
                </div>
                <div className='my-4 w-full border-t border-black text-2xl'></div> 
                <div className='flex flex-row font-black'>
                </div>
            </div>
        </div>  
    )

};

export default ProfileCardComponent;