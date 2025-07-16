import React from 'react'

const BgStars = () => {
  return (
    <div>
      <div className=" relative group z-30  ">
        <div className="w-full mx-auto">
          <Toaster position="top-center" />
        </div>

        <button
          className={`  group hover:shadow-lg object-cover hover:shadow-white border-none ring-1 ring-blue-400 p-2 text-lg px-4 rounded-lg active:text-blue-400  hover:ring-sky-900 animate-slide-in ${buttonStyle} `}
        >
          <img
            onClick={click}
            src={ig.nebulamodel}
            alt="Nebula"
            width="35px"
            height="35px"
            className="rounded-sm object-contain   "
          />
        </button>

        <div className=" hidden absolute group-hover:flex flex-col  shadow-lg bg-gradient-to-br from-black via-slate-900 to-black  shadow-blue-200 brightness-125    p-2 mt-5 min-w-[180px] text-center rounded-lg gap-1  -ml-10  ">
          <p className="text-sm  font-thin">Planet </p>

          <p className=" text-xs font-light">+1 Simulations per Rotation </p>
          <p className=" text-sm font-light">
            {" "}
            Cost: {parseInt(nebulaCost)} stimulation
          </p>
        </div>
      </div>
    </div>
  )
}

export default BgStars
