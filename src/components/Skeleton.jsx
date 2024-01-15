  // Creating skeletons for loading state
  export const skeletons = Array.from({ length: 20 }, (_, index) => (
    <div
      key={index}
      className="min-w-[47%] animate-pulse  cursor-pointer sm:min-w-[23%] md:min-w-[19%] xl:min-w-[16%]"
    >
      <div className="poster-block h-[206px] rounded-xl bg-blue-950 lg:h-[250px] xl:h-[297px]"></div>
      <div className="text-block">
        <div className="title my-2 mt-6 h-4 w-full bg-blue-950"></div>
        <div className="time h-4 w-full bg-blue-950"></div>
      </div>
    </div>
  ));
