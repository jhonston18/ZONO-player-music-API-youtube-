"use client"



import TimeLineMusic from '@/app/components/time-line-music'
import SideBar from '@/app/components/sidebar'

import { TextAlignJustify, Play, SkipBack, SkipForward, Heart, Repeat, Pause } from "lucide-react";
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';


export default function Dashboard() {


    const [handlerPlayer, setHandlerPlayer] = useState(false); // manejador de icono player y pause
    const [timeMusicFinish, setTimeMusic] = useState('00:00'); // tiempo final inicial --> 00:00
    const [currentTimeFormatted, setCurrentTimeFormatted] = useState('00:00'); // tiempo de progreso
    const [progressPercentage, setProgressPercentage] = useState('0%');
    const [isOpen, setIsOpen] = useState(false); //false --> cerrado, true --> abierto

    const onClose = () => setIsOpen(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const formatTime = (timeInSeconds: number) => {
        if (isNaN(timeInSeconds)) return '00:00';
        const min = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
        const seg = (Math.floor(timeInSeconds % 60)).toString().padStart(2, '0');

        return `${min}:${seg}`;
    };

    const formatTimeProgress = (clickX: number, barWidth: number) => {
        if (!audioRef.current) return;
        const duration = audioRef.current.duration; //duracion del audio
        if (!duration || isNaN(duration) || barWidth <= 0) return;

        const percentage = Math.min(Math.max((clickX / barWidth) * 100, 0), 100); //calculo del porcentaje basado en la posicion del click
        setProgressPercentage(`${percentage.toFixed(2)}%`);

        const newTime = (percentage / 100) * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTimeFormatted(formatTime(newTime));
    };

    const handleBarClick = (event: MouseEvent<HTMLDivElement>) => {
        const dimensions = event.currentTarget.getBoundingClientRect(); //me brinda las dimensiones del elemento
        const clickX = event.clientX - dimensions.left; //posicion del click dentro de la barra
        const barWidth = dimensions.width; //ancho total de la barra, es decir el div padre
        console.log('ClickX:', clickX, 'BarWidth:', barWidth);
        console.log("Dimensiones: ", dimensions);
        console.log("Event: ", event);
        formatTimeProgress(clickX, barWidth);
    };

    useEffect(() => {
        audioRef.current = new Audio('/music/audio2.mp3');
        const audio = audioRef.current;

        const handleLoadedMetadata = () => {
            setTimeMusic(formatTime(audio.duration));
        };

        const handleTimeUpdate = () => {
            setCurrentTimeFormatted(formatTime(audio.currentTime));
            if (audio.duration) {
                const percentage = (audio.currentTime / audio.duration) * 100;
                setProgressPercentage(`${percentage.toFixed(2)}%`);
            }
        };

        const handleEnded = () => {
            setHandlerPlayer(false);
            setCurrentTimeFormatted('00:00');
            setProgressPercentage('0%');
        };

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.pause();
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    const playerAudio = () => {
        if (!audioRef.current) return;
        setHandlerPlayer(true);
        audioRef.current.play().catch(err => console.log("Error al reproducir:", err));
    };

    const PauseAudio = () => {
        if (!audioRef.current) return;
        setHandlerPlayer(false);
        audioRef.current.pause();
    };






    return (
        <div className="bg-[url('https://i1-e.pinimg.com/1200x/aa/53/8f/aa538fb499dc42e4727b63f19e32525c.jpg')] bg-cover bg-center ">
            
            <div 
                className={`fixed inset-0 z-20 transition-opacity duration-300 ${isOpen ? 'opacity-100 bg-black/40 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            />
            <SideBar isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <div className='min-h-screen backdrop-blur-2xl bg-black/20'>
                <div className='relative'>
                    <div className='flex justify-between items-center px-4 py-3 text-white'>
                        <button className={`p-2 rounded-md size-8 cursor-pointer`} onClick={() => setIsOpen(true)}>
                            <TextAlignJustify className="size-9 active:text-gray-500" />
                        </button>
                        <h2 className='text-xl font-medium'>My Music</h2>
                        <div className='w-10 h-10 rounded-full overflow-hidden relative'>
                            <Image
                                src='https://i1-e.pinimg.com/1200x/23/c3/6b/23c36b997f4facf89386e9674692b445.jpg'
                                alt='Image-profile'
                                fill
                                sizes="40px"
                                className='object-cover'
                                priority
                            />
                        </div>
                    </div>

                    <div className="text-white my-7">
                        <div className='flex flex-col justify-center items-center h-96 p-3 '>
                            <div className="w-79 h-79 relative rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src='https://i1-e.pinimg.com/1200x/aa/53/8f/aa538fb499dc42e4727b63f19e32525c.jpg'
                                    alt='Image-music'
                                    fill
                                    sizes="288px"
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        <div className='flex flex-col gap-5 mx-6 my-6'>
                            <div>
                                <span className='block text-sm text-gray-300 uppercase tracking-wider font-bold'>Canal</span>
                                <p className='text-xl font-semibold'>Lana del rey - Salvatore (lyrics)</p>
                            </div>

                            <div className="my-2">
                                {/* Le pasamos el porcentaje dinamico de actualizacion al componente */}
                                <TimeLineMusic width={progressPercentage} onClick={handleBarClick} />
                                <div className='w-full flex justify-between text-sm text-gray-300 mt-2'>
                                    <span>{currentTimeFormatted}</span>
                                    <span>{timeMusicFinish}</span>
                                </div>
                            </div>

                            <div className='flex items-center justify-between mt-4'>
                                <Heart className='size-7 cursor-pointer hover:scale-105 transition-transform' />
                                <div className='flex justify-center items-center gap-8'>
                                    <SkipBack className='size-7 cursor-pointer hover:scale-105 transition-transform' />
                                    {handlerPlayer ? (
                                        <div className="p-4 bg-white text-black rounded-full cursor-pointer hover:scale-105 transition-transform" onClick={PauseAudio}>
                                            <Pause className='size-6 fill-black' />
                                        </div>
                                    ) : (
                                        <div className="p-4 bg-white text-black rounded-full cursor-pointer hover:scale-105 transition-transform" onClick={playerAudio}>
                                            <Play className='size-6 fill-black translate-x-0.5' />
                                        </div>
                                    )}
                                    <SkipForward className='size-7 cursor-pointer hover:scale-105 transition-transform' />
                                </div>
                                <Repeat className='size-7 cursor-pointer hover:scale-105 transition-transform' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}