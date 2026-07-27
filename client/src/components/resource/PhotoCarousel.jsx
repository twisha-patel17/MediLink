
export const PhotoCarousel = () => {
  return (
    <div className="rounded-2xl border border-[#E2E4EC] bg-white p-6 shadow-sm">

    <div className="relative">

        <div className="flex h-80 items-center justify-center rounded-2xl bg-[#F8FAFC]">

            Photos Here

        </div>

        <button className="absolute left-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-white shadow-sm">
            {"<"}
        </button>

        <button className="absolute right-4 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-white shadow-sm">
            {">"}
        </button>

    </div>

</div>
  )
}
