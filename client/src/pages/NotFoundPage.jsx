import { Link } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";

export const NotFoundPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-6">

            <div className="w-full max-w-lg rounded-3xl border border-[#E2E4EC] bg-white p-10 text-center shadow-sm">

                <div className="flex justify-center">
                    <div
                        className="
                        flex
                        h-20
                        w-20
                        items-center
                        justify-center
                        rounded-full
                        bg-[#E7EDFC]
                        "
                    >
                        <FiAlertCircle
                            size={42}
                            className="text-[#1D4ED8]"
                        />
                    </div>
                </div>


                <h1 className="mt-6 text-7xl font-bold text-[#1D4ED8]">
                    404
                </h1>


                <h2 className="mt-4 text-3xl font-bold text-[#11131A]">
                    Page Not Found
                </h2>


                <p className="mt-4 text-base leading-7 text-[#6B7280]">
                    The page you're looking for doesn't
                    exist or may have been moved.
                </p>


                <Link
                    to="/hospitals"
                    className="
                    mt-8
                    inline-block
                    rounded-2xl
                    bg-[#1D4ED8]
                    px-8
                    py-4
                    font-semibold
                    text-white
                    transition
                    hover:bg-[#15359E]
                    "
                >
                    Go To Hospitals
                </Link>

            </div>

        </div>
    );
};

export default NotFoundPage;