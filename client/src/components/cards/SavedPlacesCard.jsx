
export const SavedPlacesCard = () => {
  return (
    <div className="rounded-2xl border border-[#E2E4EC] bg-white p-6 shadow-sm">

    <h2 className="text-2xl font-semibold text-[#11131A]">
        Apollo Hospital
    </h2>

    <p className="mt-2 font-medium text-[#1D4ED8]">
        ★ 4.8
    </p>

    <p className="mt-3 text-[#6B7280]">
        2 KM Away • Ahmedabad
    </p>

    <button className="mt-6 w-full rounded-xl bg-[#1D4ED8] py-3 font-medium text-white transition hover:bg-[#15359E]">
        View Details
    </button>

    <button className="mt-3 w-full rounded-xl border border-red-500 py-3 font-medium text-red-500 transition hover:bg-red-50">
        Remove
    </button>

</div>
  )
}
