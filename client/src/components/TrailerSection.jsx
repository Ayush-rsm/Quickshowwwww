import { useState } from "react";
import ReactPlayer from "react-player";
import BlurCircle from "./BlurCircle";
import { dummyTrailers } from "../assets/assets";
import { PlayCircleIcon } from "lucide-react";

const TrailerSection = () => {
    const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

    return (
        <div className="py-20 overflow-hidden w-full">
            <p className="text-gray-300 font-medium text-lg max-w-5xl mx-auto">
                Trailers
            </p>

            <div className="relative mt-6 max-w-5xl mx-auto">
                <BlurCircle top="-100px" right="-100px" />
                <div className="relative z-10 w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                    <ReactPlayer
                        url={currentTrailer.videoUrl}
                        src={currentTrailer.videoUrl}
                        controls
                        playing
                        width="100%"
                        height="100%"
                        className="w-full h-full"
                    />
                </div>
            </div>

            {/* 4 Thumbnails Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8 max-w-5xl mx-auto">
                {dummyTrailers.slice(0, 4).map((trailer, index) => {
                    const isSelected = currentTrailer.videoUrl === trailer.videoUrl;
                    return (
                        <div
                            key={trailer.videoUrl || index}
                            onClick={() => setCurrentTrailer(trailer)}
                            className={`relative aspect-video cursor-pointer hover:-translate-y-1 transition duration-300 rounded-lg overflow-hidden border-2 ${
                                isSelected
                                    ? "border-primary shadow-lg shadow-primary/40 ring-2 ring-primary/20"
                                    : "border-transparent opacity-75 hover:opacity-100"
                            }`}
                        >
                            <img
                                src={trailer.image}
                                alt="trailer thumbnail"
                                onError={(e) => {
                                    if (e.target.src.includes("maxresdefault.jpg")) {
                                        e.target.src = e.target.src.replace("maxresdefault.jpg", "hqdefault.jpg");
                                    }
                                }}
                                className="w-full h-full object-cover brightness-90 hover:brightness-100 transition"
                            />

                            <PlayCircleIcon
                                strokeWidth={1.6}
                                className={`absolute top-1/2 left-1/2 w-9 h-9 text-white -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] transition ${
                                    isSelected ? "scale-110 text-primary" : ""
                                }`}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TrailerSection;

