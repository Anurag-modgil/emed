import { BsSearch } from "react-icons/bs";
import debounce from "lodash.debounce";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar = ({ onSearch }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    searchParams.set("search", query);
    navigate(`/search/${query}`);
  };
  // Debounce the handleSearch function with a 300ms delay
  // const debouncedSearch = debounce(handleSearch, 300);

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    // debouncedSearch(newQuery);
  };

  return (
    <>
      <div className="ml-40 mr-1 w-[80%] sm:w-[90%] relative flex flex-col items-center search-container">
        <form method="" className="bg-[#f0f5ff] relative w-full rounded-md ">
          <div className="flex items-center h-[40px] ">
            <div className=" flex items-center px-2">
              <button type="submit">
                <figure className=" text-slate-500 bg-transparent">
                  <BsSearch onClick={handleSearch} />
                </figure>
              </button>
            </div>
            <div className="w-[100%]">
              <input
                type="text"
                title="Search for Products, Brands and More"
                placeholder="Search for Products, Brands and More"
                autoComplete="off"
                className=" bg-transparent w-[100%] border-none outline-none text-[14px] md:text-[16px] p-1 placeholder-gray-600 "
                onChange={handleInputChange}
                value={query}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
