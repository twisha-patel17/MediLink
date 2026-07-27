import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const filters = {
    Distance: ["1 KM", "5 KM", "10 KM", "20 KM", "50 KM"],
    Availability: ["Available Now", "Open 24/7", "Emergency"],
    Rating: ["4.5+ ⭐", "4.0+ ⭐", "3.5+ ⭐"]
};

export const DistanceFilter = () => {
    const [open, setOpen] = useState(null);

    return (
        <div className="flex gap-4 flex-wrap">
            {Object.entries(filters).map(([name, options]) => (
                <div key={name} className="relative">

                    <button
                        onClick={() => setOpen(open === name ? null : name)}
                        className="flex items-center gap-2 rounded-xl border border-[#E2E4EC] bg-white px-5 py-3 text-sm font-semibold shadow-sm hover:border-[#1D4ED8]"
                    >
                        {name}
                        <FiChevronDown className={open === name ? "rotate-180" : ""}/>
                    </button>

                    {open === name && (
                        <div className="absolute z-20 mt-2 w-48 rounded-xl border bg-white p-2 shadow-lg">
                            {options.map(item => (
                                <button
                                    key={item}
                                    className="w-full rounded-lg px-4 py-2 text-left text-sm text-[#6B7280] hover:bg-[#E7EDFC] hover:text-[#1D4ED8]"
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
