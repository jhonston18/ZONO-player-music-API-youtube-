"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import { useDataMusicStore, Musica } from "../store/dataMusicStore";

import { Geist, Montserrat, DM_Sans, Outfit } from "next/font/google";
import GET_DATA_MUSIC from "../api/data-content/dataContent";


const montserrat = Outfit({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
})

interface CancionData {
    musicaData: Musica
}



export default function BoxMusic({ musicaData }: CancionData) {


    const { setCancionActual } = useDataMusicStore()





    return (

        <div className={`snap-start shrink-0`} onClick={() => setCancionActual(musicaData)}> {/**me mandas los datos de este box si se hace click para reproducir la musica */}
            <div className="relative w-full min-h-50">
                <Image
                    src={`https://img.youtube.com/vi/${musicaData.idMusica}/maxresdefault.jpg`}
                    alt='image music'
                    fill // Hace que la imagen ocupe el 100% de su contenedor padre inmediato
                    sizes="(max-width: 768px) 100vw, 33vw" // Optimiza la descarga según la pantalla
                    className="object-cover rounded-xl"

                />
            </div>

            <div className={`w-50 mt-2 text-gray-500 ${montserrat.className} text-xl`}>
                <span className="block whitespace-nowrap overflow-hidden text-ellipsis">{musicaData?.nombreMusica || 'Título no disponible'}</span>
                <p className="whitespace-nowrap overflow-hidden text-ellipsis">'Artista no disponible por falta de joins'</p>
            </div>
        </div>

    )
}