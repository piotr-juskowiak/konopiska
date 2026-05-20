export function AdBannerHorizontal() {
  return (
    <div className="w-full bg-white py-12">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-slate-100 min-h-[160px] flex flex-col items-center justify-center text-center p-8 transition-colors hover:bg-slate-200 cursor-pointer">
          <div className="absolute inset-0 border-2 border-slate-200/50 rounded-[2rem] m-2 pointer-events-none" />
          
          <div className="space-y-4 md:space-y-0 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 w-full relative z-10">
            <p className="text-sm md:text-base font-black uppercase tracking-[0.2em] text-slate-400">
              Przestrzeń Reklamowa
            </p>
            
            <div className="hidden md:block h-8 w-px bg-slate-300" />
            <div className="md:hidden h-px w-12 bg-slate-300 mx-auto" />
            
            <p className="text-sm md:text-base text-slate-500 font-medium">
              Zarezerwuj to miejsce dla swojej firmy
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
