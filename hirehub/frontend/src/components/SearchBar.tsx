

export const SearchBar = () => {
    return <div>
        <div className="flex border-2 border-blue-200 rounded-full overflow-hidden max-w-full font-normal">
            <input type="string" placeholder="Search Something..."
                className="w-full bg-white text-gray-700 text-sm px-12 py-3 rounded-full"/>
            <button type='button' className="flex items-center justify-center bg-black px-5 text-sm text-white rounded-full">
                Search
            </button>
      </div>
    </div>
}

export default SearchBar;