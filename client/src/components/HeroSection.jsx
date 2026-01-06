import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, Calendar1Icon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {

    const navigate = useNavigate();

  return (
    <div className='flex flex-col items-start justify-center gap-4 px-4 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen'>
        <img src={assets.marvelLogo} alt="" className='max-h-11 lg:h-11 mt-20' />
        <h1 className='text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110'>Guardians <br /> of the Galaxy</h1>

        <div className='flex items-center gap-4 text-gray-300'>
            <span>Action | Adventure | Sci-Fi</span>
            <div className='flex items-centergap-1'>
                <Calendar1Icon className='w-4.5 h-4.5' /> 2018
            </div>
            <div className='flex items-centergap-1'>
                <ClockIcon className='w-4.5 h-4.5' /> 2h 8m
            </div>
            <p className='max-w-md text-gray-300'>In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.</p>
            <button onClick={() => navigate('/movies')} className='flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg:primary-dull transition rounded-full font-medium cursor-pointer'>
                Explore Movies 
                <ArrowRight className='w-5 h-5' />
            </button>

        </div>
    </div>
  )
}

export default HeroSection

// import React from 'react'
// import { assets } from '../assets/assets'
// import { ArrowRight, Calendar1Icon, ClockIcon } from 'lucide-react'
// import { useNavigate } from 'react-router-dom'

// const HeroSection = () => {
//   const navigate = useNavigate()

//   return (
//     <div className='flex flex-col items-start justify-center gap-4 px-4 md:px-16 lg:px-36 bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen'>
      
//       <img src={assets.marvelLogo} alt="" className='max-h-11 lg:h-11 mt-20' />

//       <h1 className='text-5xl md:text-[70px] md:leading-[4.5rem] font-semibold max-w-[440px]'>
//         Guardians <br /> of the Galaxy
//       </h1>

//       {/* GENRE */}
//       <span className='text-gray-300'>
//         Action | Adventure | Sci-Fi
//       </span>

//       {/* DATE + DURATION */}
//       <div className='flex items-center gap-6 text-gray-300'>
//         <div className='flex items-center gap-1'>
//           <Calendar1Icon className='w-4 h-4' />
//           <span>2018</span>
//         </div>

//         <div className='flex items-center gap-1'>
//           <ClockIcon className='w-4 h-4' />
//           <span>2h 8m</span>
//         </div>
//       </div>

//       {/* DESCRIPTION */}
//       <p className='max-w-md text-gray-300'>
//         In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.
//       </p>

//       {/* CTA BUTTON */}
//       <button
//         onClick={() => navigate('/movies')}
//         className='flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'
//       >
//         Explore Movies
//         <ArrowRight className='w-5 h-5' />
//       </button>

//     </div>
//   )
// }

// export default HeroSection
