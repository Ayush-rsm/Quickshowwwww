import { useState } from "react";
import ReactPlayer from "react-player";
import BlurCircle from "./BlurCircle";
import { dummyTrailers } from "../assets/assets";
import { PlayCircleIcon } from "lucide-react";

const TrailerSection = () => {
    const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);
    console.log("VIDEO URL 👉", currentTrailer.videoUrl);

    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden">
            <p className="text-gray-300 font-medium text-lg max-w-240 mx-auto">
                Trailers
            </p>

            <div className="relative mt-6">
                <BlurCircle top="-100px" right="-100px" />
                <ReactPlayer
                    url={currentTrailer.videoUrl}
                    controls
                    playing
                    muted
                    width="100%"
                    height="540px"
                    className="relative z-10 mx-auto"
                />

            </div>



            {/* thumbnails */}
            <div className="flex gap-6 mt-8 flex-wrap">
                {dummyTrailers.map((trailer) => (
                    <div
                        key={trailer.id} // ✅ MUST be here
                        onClick={() => setCurrentTrailer(trailer)}
                        className="relative cursor-pointer hover:-translate-y-1 transition duration-300"
                    >
                        <img
                            src={trailer.image}
                            alt="trailer"
                            className="rounded-lg w-60 h-36 object-cover brightness-75"
                        />

                        <PlayCircleIcon
                            strokeWidth={1.6}
                            className="absolute top-1/2 left-1/2 w-8 h-8 text-white -translate-x-1/2 -translate-y-1/2"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};


export default TrailerSection;
