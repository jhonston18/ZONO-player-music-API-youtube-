
import { TextAlignJustify, Play, SkipBack, SkipForward, Heart, Repeat, Pause } from "lucide-react";
import TimeLineMusic from '@/app/components/time-line-music'
import { useDataMusicStore, Musica } from "../store/dataMusicStore";

export default function Reproductor({ callbacks }) {

    const {currentTime, duration, isPlaying} = useDataMusicStore()


    const { 
        formatTime,  
        handleTimelineChange, 
        handleTogglePlay,  
    } = callbacks;


    return (


        <div className='flex flex-col gap-5 mx-6 my-6'>
            <div>
                <span className='block text-sm text-gray-300 uppercase tracking-wider font-bold'>Canal</span>
                <p className='text-xl font-semibold'>Lana del rey - Salvatore (lyrics)</p>
            </div>

            <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono">{formatTime(currentTime)}</span>
                  <input
                        type="range"
                        min={0}
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleTimelineChange}
                        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-600"
                    />
                    <span className="text-xs font-mono">{formatTime(duration)}</span>
                </div>

            <div className='flex items-center justify-between mt-4'>
                <Heart className='size-7 cursor-pointer hover:scale-105 transition-transform' /> 
                <div className='flex justify-center items-center gap-8'>
                    <SkipBack className='size-7 cursor-pointer hover:scale-105 transition-transform' /> 
                    {isPlaying ? (
                        <div className="p-4 bg-white text-black rounded-full cursor-pointer hover:scale-105 transition-transform" onClick={handleTogglePlay}>
                            <Pause className='size-6 fill-black' />
                        </div>
                    ) : (
                        <div className="p-4 bg-white text-black rounded-full cursor-pointer hover:scale-105 transition-transform" onClick={handleTogglePlay}>
                            <Play className='size-6 fill-black translate-x-0.5' />
                        </div>
                    )}
                    <SkipForward className='size-7 cursor-pointer hover:scale-105 transition-transform' />
                </div>
                <Repeat className='size-7 cursor-pointer hover:scale-105 transition-transform' />
            </div>
        </div>

    )
}