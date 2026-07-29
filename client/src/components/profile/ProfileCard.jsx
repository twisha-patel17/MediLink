import { useCurrentUser } from "../../hooks/useUser";

export const ProfileCard = () => {

    const { data: user, isLoading } = useCurrentUser();
    
    if (isLoading) {
        return (
            <div className="rounded-3xl border border-[#E2E4EC] bg-white p-8 shadow-sm">
                Loading...
            </div>
        );
    }

    const firstLetter =
        user?.name?.charAt(0).toUpperCase();

    const joinedDate = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString(
              "en-US",
              {
                  month: "long",
                  year: "numeric",
              }
          )
        : "";

    return (
        <div className="rounded-3xl border border-[#E2E4EC] bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-[#11131A]">
                Profile
            </h2>

            <div className="mt-8 flex flex-col items-center">

                <div
                    className="
                    flex
                    h-28
                    w-28
                    items-center
                    justify-center
                    rounded-full
                    bg-[#E7EDFC]
                    text-4xl
                    font-bold
                    text-[#1D4ED8]
                    "
                >
                    {firstLetter}
                </div>

                <h3
                    className="
                    mt-5
                    text-2xl
                    font-bold
                    text-[#11131A]
                    "
                >
                    {user?.name}
                </h3>

                <p
                    className="
                    mt-2
                    text-base
                    text-[#6B7280]
                    "
                >
                    {user?.email}
                </p>

                <div
                    className="
                    mt-6
                    rounded-2xl
                    bg-[#F8FAFC]
                    px-5
                    py-3
                    "
                >
                    <p className="text-sm font-medium text-[#6B7280]">
                        Member Since {joinedDate}
                    </p>
                </div>

            </div>

        </div>
    );
};