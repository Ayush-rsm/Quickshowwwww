import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, Calendar1Icon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const navigate = useNavigate()

    return (
        <div className='relative flex flex-col items-start justify-center gap-5 px-6 md:px-16 lg:px-36 bg-[url("/backgroundImage.jpg")] bg-cover bg-top bg-no-repeat min-h-screen overflow-hidden'>
            {/* Soft, Lightened Gradient Overlays */}
            <div className='absolute inset-0 bg-gradient-to-r from-black/50 via-black/15 to-transparent pointer-events-none' />
            <div className='absolute inset-0 bg-gradient-to-t from-[#09090B]/70 via-transparent to-transparent pointer-events-none' />

            <div className='relative z-10 flex flex-col items-start gap-4 max-w-xl'>
                <img src={assets.marvelLogo} alt="Marvel Studios" className='max-h-11 lg:h-11 mt-20 drop-shadow-md' />

                <h1 className='text-5xl md:text-[70px] md:leading-[4.5rem] font-bold text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.8)]'>
                    Avengers:<br />Doomsday
                </h1>

                <div className='flex flex-wrap items-center gap-3 text-sm'>
                    <span className='bg-black/30 backdrop-blur-md text-white font-medium px-3.5 py-1 rounded-full border border-white/20 shadow-sm'>
                        Action | Adventure | Sci-Fi
                    </span>
                    <div className='flex items-center gap-1.5 bg-black/30 backdrop-blur-md text-gray-100 px-3 py-1 rounded-full border border-white/15 shadow-sm'>
                        <Calendar1Icon className='w-4 h-4 text-primary' />
                        <span>2026</span>
                    </div>
                    <div className='flex items-center gap-1.5 bg-black/30 backdrop-blur-md text-gray-100 px-3 py-1 rounded-full border border-white/15 shadow-sm'>
                        <ClockIcon className='w-4 h-4 text-primary' />
                        <span>2h 43m</span>
                    </div>
                </div>

                <p className='max-w-md text-gray-100 text-sm md:text-base leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]'>
                    Heroes from three different worlds must unite when they're thrust together to confront a catastrophic danger that could destroy everything they know.
                </p>

                <button
                    onClick={() => navigate('/movies')}
                    className='flex items-center gap-2 px-7 py-3 text-sm bg-primary hover:bg-primary-dull transition-all shadow-lg hover:shadow-primary/30 rounded-full font-semibold cursor-pointer mt-2'
                >
                    Explore Movies
                    <ArrowRight className='w-5 h-5' />
                </button>
            </div>

        </div>
    )
}

export default HeroSection

