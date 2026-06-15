"use client"

import Reproductor from '@/app/components/reproductor'
import ReproductorMobile from '@/app/components/reproductor-mobile'

import { useDataMusicStore, Musica } from "../store/dataMusicStore";
import { ChevronDown } from "lucide-react";

import { useEffect, useRef, useState } from 'react';





// 1. Tipado estricto para evitar el uso de 'any'
interface YTPlayer {
    playVideo: () => void;
    pauseVideo: () => void;
    seekTo: (seconds: number, allowSeekAhead: boolean) => void;
    getCurrentTime: () => number;
    getDuration: () => number;
    destroy: () => void;
}

interface YTEvent {
    target: YTPlayer;
    data: number;
}

declare global {
    //esto le dice al compilador que la interfaz window ya existe de forma global, como una libreria externa
    interface Window {
        onYouTubeIframeAPIReady?: () => void;
        YT?: {
            Player: new (id: string, config: object) => YTPlayer;
            PlayerState: {
                PLAYING: number;
                PAUSED: number;
                ENDED: number;
            };
        };
    }
}

export default function CustomTimelinePlayer() {

    const cancionActual = useDataMusicStore((state) => state.cancionActual);
    const isPlaying = useDataMusicStore((state) => state.isPlaying);
    const setIsPlaying = useDataMusicStore((state) => state.setIsPlaying);
    const setDuration = useDataMusicStore((state) => state.setDuration);
    const setCurrentTime = useDataMusicStore((state) => state.setCurrentTime);

    const videoId = cancionActual?.id_Video;
    console.log("Este es el videoId: ", videoId)
    console.log("Este es el isPlaying: ", isPlaying)




    // Guardamos la referencia del reproductor con su tipo correcto
    const playerRef = useRef<YTPlayer | null>(null);
    const iframeId = videoId ? `yt-player-${videoId}` : 'yt-player-placeholder';


    const [hiddenVideo, setHiddenVideo] = useState(true); // falso --> video visible, verdadero --> video oculto

    useEffect(() => {
        
        if (!videoId) return;

        console.log("Este es el videoId dentro de primer Effect: ", videoId)
        console.log("Este es el isPlaying dentro de primer Effect: ", isPlaying)
        // Función interna encargada de instanciar el reproductor de forma segura
        const inicializarReproductor = () => {
            if (!window.YT || !window.YT.Player) return;

            playerRef.current = new window.YT.Player(iframeId, {
                videoId: videoId,
                playerVars: {
                    controls: 0,
                    disablekb: 1,
                    modestbranding: 1,
                    rel: 0,
                    enablejsapi: 1,
                    playsinline: 1,
                    autoplay: 0,
                },
                events: {
                    onReady: (event: YTEvent) => {
                        event.target.playVideo();
                        setDuration(event.target.getDuration() || 0);
                    },
                    onStateChange: (event: YTEvent) => {
                        
                        if (!window.YT) return;

                        if (event.data === window.YT.PlayerState.PLAYING) {
                            
                            setIsPlaying(true);
                        } else if (
                            event.data === window.YT.PlayerState.PAUSED ||
                            event.data === window.YT.PlayerState.ENDED
                        ) {
                            setIsPlaying(false);
                        }
                    },
                },
            });
        };

        if (window.YT && window.YT.Player) {
            inicializarReproductor();
        } else {
            if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
                const tag = document.createElement("script");
                tag.src = "https://www.youtube.com/iframe_api";
                const firstScriptTag = document.getElementsByTagName("script")[0];
                firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
            }

            window.onYouTubeIframeAPIReady = () => {
                inicializarReproductor();
            };
        }

        return () => {
            if (playerRef.current && typeof playerRef.current.destroy === "function") {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
    }, [videoId, iframeId]);

    useEffect(() => {
        if (!playerRef.current) return;

        if (isPlaying) {
            if (typeof playerRef.current.playVideo === "function") {
                playerRef.current.playVideo();
            }
        } else {
            if (typeof playerRef.current.pauseVideo === "function") {
                playerRef.current.pauseVideo();
            }
        }
    }, [isPlaying]);


    // const lastSyncRef = useRef<number>(0);
    // useEffect(() => {
    //     let intervalId: NodeJS.Timeout;

    //     if (isPlaying && playerRef.current) {
    //         intervalId = setInterval(() => {
    //             // Verificamos estrictamente que el método exista antes de invocarlo
    //             if (
    //                 playerRef.current &&
    //                 typeof playerRef.current.getCurrentTime === "function"
    //             ) {
    //                 const tiempoActual = playerRef.current.getCurrentTime();
    //                 const now = Date.now();
    //                 // sólo sincronizamos con el store cada 1000ms para evitar re-renders excesivos
    //                 if (now - lastSyncRef.current >= 1000) {
    //                     setCurrentTime(tiempoActual);
    //                     lastSyncRef.current = now;
    //                 }
    //             }
    //         }, 250); // Consulta el progreso cada 250ms para mantener la UI fluida
    //     }

    //     return () => {
    //         if (intervalId) clearInterval(intervalId);
    //     };
    // }, [isPlaying]);

    // Manejadores de eventos de tus controles personalizados
    const handleTogglePlay = (): void => {
        if (!playerRef.current) return;

        if (isPlaying) {
            if (typeof playerRef.current.pauseVideo === "function")
                playerRef.current.pauseVideo();
        } else {
            if (typeof playerRef.current.playVideo === "function")
                playerRef.current.playVideo();
        }
    };

    const handleTimelineChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const nuevoSegundo = parseFloat(e.target.value); //parsefloat: convierte un string a decimal
        setCurrentTime(nuevoSegundo);

        if (playerRef.current && typeof playerRef.current.seekTo === "function") {
            // El segundo parámetro 'true' permite que YouTube cargue el búfer de forma inmediata
            playerRef.current.seekTo(nuevoSegundo, true); //cuando movemos el timeline a un segundo determinado, esto se ejecuta colocando la musica al segundo determinado
        }
    };

    const formatTime = (timeInSeconds: number): string => {//fromatear tiempo
        if (isNaN(timeInSeconds)) return "00:00";
        const mins = Math.floor(timeInSeconds / 60);
        const secs = Math.floor(timeInSeconds % 60);
        return `${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };




    return (

        <div>
            <div className={`${hiddenVideo ? "hidden h-0" : "fixed top-0 min-h-screen min-w-screen overflow-y-hidden"} bg-black bg-opacity-80`}>

                <div className="w-full max-w-2xl mx-auto p-4 bg-gray-900 rounded-xl shadow-lg text-white">
                    <div className='flex justify-between items-center px-4 py-3 text-white'>
                        <button className={`p-2 rounded-md size-8 cursor-pointer`} onClick={() => setHiddenVideo(true)}>
                            <ChevronDown className="size-9 active:text-gray-500" />
                        </button>
                        <h2 className='text-xl font-medium'>My Music</h2>
                        <button className={`p-2 rounded-md size-8 cursor-pointer`}>
                            <ChevronDown className="size-9 active:text-gray-500" />
                        </button>

                    </div>
                    {/* Contenedor del Iframe con protección de clicks nativos */}
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
                        <div id={iframeId} className="w-full h-full pointer-events-none" />
                    </div>

                    {/* Controles y Línea de Tiempo Personalizados */}
                    <Reproductor callbacks={{ formatTime, handleTimelineChange, handleTogglePlay }} />


                </div>


            </div>
            {hiddenVideo && cancionActual?.id_Video ? <div className={`${!hiddenVideo && "hidden h-0"} fixed bottom-0`}><ReproductorMobile handleToggleRepro={handleTogglePlay} hiddenVideo={hiddenVideo} setHiddenVideo={setHiddenVideo} /></div> : ""}
        </div>


    );


}





