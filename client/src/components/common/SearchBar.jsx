import { FiSearch } from "react-icons/fi";

export const SearchBar = ({
    title,
    description,
    placeholder,
    searchQuery,
    setSearchQuery,
}) => {
    return (
        <div className="rounded-2xl border border-[#E2E4EC] bg-white p-6 shadow-sm">

            <h2 className="text-2xl font-semibold text-[#11131A]">
                {title}
            </h2>

            <p className="mt-2 text-[#6B7280]">
                {description}
            </p>

            <div className="relative mt-5">

                <FiSearch
                    className="
                    absolute
                    left-5
                    top-1/2
                    -translate-y-1/2
                    text-xl
                    text-[#6B7280]
                    "
                />

                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={placeholder}
                    className="
                    w-full
                    rounded-2xl
                    border
                    border-[#E2E4EC]
                    bg-[#F8FAFC]
                    py-4
                    pl-14
                    pr-5
                    text-[#11131A]
                    outline-none
                    transition
                    focus:border-[#1D4ED8]
                    focus:bg-white
                    "
                />

            </div>

        </div>
    );
};

export default SearchBar;
