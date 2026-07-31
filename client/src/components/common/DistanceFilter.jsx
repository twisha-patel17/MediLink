import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const DISTANCE_OPTIONS = [
    "1 KM",
    "3 KM",
    "5 KM",
    "10 KM",
    "25 KM",
    "50 KM",
];

export const DistanceFilter = ({
    selectedFilters,
    setSelectedFilters,
}) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);

    const [pendingDistance, setPendingDistance] = useState(
        selectedFilters.distance || ""
    );

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPendingDistance(selectedFilters.distance || "");
    }, [selectedFilters.distance]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    // Close on Escape
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    const handleSelect = (value) => {
        setPendingDistance(value);
        setOpen(false);
    };

    const handleApply = () => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            distance: pendingDistance,
        }));
    };

    const handleReset = () => {
        setPendingDistance("");

        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            distance: "",
        }));
    };

    return (
        <div
            ref={containerRef}
            className="flex flex-wrap items-center gap-3"
        >
            <span className="text-sm font-medium text-[#6B7280]">
                Radius: {selectedFilters.distance || "20 KM"}
            </span>

            <div className="relative">
                <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    onClick={() => setOpen((prev) => !prev)}
                    className="
                    flex items-center gap-2
                    rounded-xl border
                    border-[#E2E4EC]
                    bg-white px-5 py-3
                    text-sm font-semibold
                    shadow-sm transition
                    hover:border-[#1D4ED8]
                    "
                >
                    {pendingDistance ? pendingDistance : "Distance"}

                    <FiChevronDown
                        className={`
                        transition duration-200
                        ${open ? "rotate-180" : ""}
                        `}
                    />
                </button>

                {open && (
                    <div
                        role="listbox"
                        className="
                        absolute z-20
                        mt-2 w-40
                        rounded-xl border
                        border-[#E2E4EC]
                        bg-white p-2
                        shadow-lg
                        "
                    >
                        {DISTANCE_OPTIONS.map((item) => {
                            const isSelected =
                                pendingDistance === item;

                            return (
                                <button
                                    key={item}
                                    type="button"
                                    role="option"
                                    aria-selected={isSelected}
                                    onClick={() =>
                                        handleSelect(item)
                                    }
                                    className={`
                                    w-full rounded-lg
                                    px-4 py-2 text-left
                                    text-sm transition
                                    hover:bg-[#E7EDFC]
                                    hover:text-[#1D4ED8]
                                    ${
                                        isSelected
                                            ? "bg-[#E7EDFC] text-[#1D4ED8]"
                                            : "text-[#6B7280]"
                                    }
                                    `}
                                >
                                    {item}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            <button
                type="button"
                onClick={handleApply}
                className="
                rounded-xl
                bg-[#1D4ED8]
                px-5 py-3
                text-sm font-semibold
                text-white
                transition
                hover:bg-[#15359E]
                "
            >
                Apply
            </button>

            <button
                type="button"
                onClick={handleReset}
                className="
                rounded-xl border
                border-[#E2E4EC]
                bg-white px-5 py-3
                text-sm font-semibold
                text-[#6B7280]
                transition
                hover:border-[#1D4ED8]
                hover:text-[#1D4ED8]
                "
            >
                Reset
            </button>
        </div>
    );
};