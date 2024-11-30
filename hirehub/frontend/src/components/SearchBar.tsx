

export const SearchBar = () => {
    return <div className="">
        <div className="flex border-2 border-blue-200 rounded-full overflow-hidden max-w-full font-normal text-gray-500">
            <input type="string" placeholder="Search for people here...."
                className="w-96 bg-white text-gray-700 text-sm px-12 py-3  rounded-full"/>
            <button type='button' className="flex items-center justify-center bg-black hover:bg-gray-700 px-6 text-sm text-white rounded-full outline-gray-600 ocus:outline-none focus:ring-2 focus:ring-gray-500">
                Search
            </button>
      </div>
    </div>
}

export default SearchBar;