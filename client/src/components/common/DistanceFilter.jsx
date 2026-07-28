import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const filters = {
    Distance: [
        "1 KM",
        "5 KM",
        "10 KM",
        "20 KM",
        "50 KM",
        "100 KM",
        "150 KM",
        "200 KM",
    ],
    Availability: [
        "Available Now",
        "Open 24/7",
        "Emergency",
    ],
    Rating: [
        "4.5+ ⭐",
        "4.0+ ⭐",
        "3.5+ ⭐",
    ],
};

export const DistanceFilter = ({
    selectedFilters,
    setSelectedFilters,
}) => {
    const [open, setOpen] = useState(null);

    const handleClick = (filterName, selectedValue) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [filterName.toLowerCase()]: selectedValue,
        }));

        setOpen(null);
    };

    return (
        <div className="flex flex-wrap gap-4">
            {Object.entries(filters).map(([name, options]) => (
                <div key={name} className="relative">
                    <button
                        onClick={() =>
                            setOpen(open === name ? null : name)
                        }
                        className="
                            flex items-center gap-2 rounded-xl
                            border border-[#E2E4EC] bg-white
                            px-5 py-3 text-sm font-semibold
                            shadow-sm transition
                            hover:border-[#1D4ED8]
                        "
                    >
                        {selectedFilters[name.toLowerCase()]
                            ? selectedFilters[name.toLowerCase()]
                            : name}

                        <FiChevronDown
                            className={`transition duration-200 ${
                                open === name ? "rotate-180" : ""
                            }`}
                        />
                    </button>

                    {open === name && (
                        <div
                            className="
                                absolute z-20 mt-2 w-48 rounded-xl
                                border border-[#E2E4EC]
                                bg-white p-2 shadow-lg
                            "
                        >
                            {options.map((item) => (
                                <button
                                    key={item}
                                    onClick={() =>
                                        handleClick(name, item)
                                    }
                                    className="
                                        w-full rounded-lg px-4 py-2
                                        text-left text-sm text-[#6B7280]
                                        transition
                                        hover:bg-[#E7EDFC]
                                        hover:text-[#1D4ED8]
                                    "
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};