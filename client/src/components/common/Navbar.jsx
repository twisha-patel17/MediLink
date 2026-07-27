import { FiPlus } from "react-icons/fi";

export const Navbar = () => {
    return (
        <nav className="border-b border-[#E2E4EC] bg-white shadow-sm">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

                <div className="flex items-center gap-3">

                    <div className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-[#1D4ED8]
                        text-white
                        shadow-sm
                    ">
                        <FiPlus size={26} strokeWidth={3}/>
                    </div>


                    <h1 className="
                        text-3xl
                        font-bold
                        tracking-tight
                        text-[#1D4ED8]
                    ">
                        MediLink
                    </h1>

                </div>

                <div className="flex items-center gap-3">

                    <button className="
                        rounded-xl
                        bg-[#1D4ED8]
                        px-5
                        py-2.5
                        font-medium
                        text-white
                    ">
                        Hospital
                    </button>

                    <button className="
                        rounded-xl
                        px-5
                        py-2.5
                        font-medium
                        text-[#6B7280]
                        hover:bg-[#E7EDFC]
                        hover:text-[#1D4ED8]
                    ">
                        Pharmacy
                    </button>

                    <button className="
                        rounded-xl
                        px-5
                        py-2.5
                        font-medium
                        text-[#6B7280]
                        hover:bg-[#E7EDFC]
                        hover:text-[#1D4ED8]
                    ">
                        Blood Bank
                    </button>

                </div>
                <button className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-[#E7EDFC]
                    text-lg
                    font-semibold
                    text-[#1D4ED8]
                ">
                    T
                </button>


            </div>

        </nav>
    );
};
