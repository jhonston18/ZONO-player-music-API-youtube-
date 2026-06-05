

import { Play, Pause } from "lucide-react";
import Image from 'next/image';
import { Outfit } from "next/font/google";
import { useDataMusicStore, Musica } from "../store/dataMusicStore";


const montserrat = Outfit({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
})

interface ReproductorMobileProps {
    videoId: string;
    handleToggleRepro: () => void;
    isPlaying: boolean;
    setHiddenVideo: (hiddenVideo: boolean) => void;
    hiddenVideo: boolean;
}



export default function ReproductorMobile({handleToggleRepro, hiddenVideo, setHiddenVideo }: ReproductorMobileProps) {

    const { cancionActual, isPlaying } = useDataMusicStore()

    // const id = 'RYr96YYEaZY'; // Reemplaza con el ID de tu video de YouTube


    return (

        <div className="flex items-center justify-between gap-2 w-screen min-h-20 p-2 bg-amber-500" >
            <div onClick={() => setHiddenVideo(!hiddenVideo)} className="flex items-center gap-2 w-full">
                <div className="relative w-19 h-19 border border-yellow-300">
                    <Image
                        src={`https://img.youtube.com/vi/${cancionActual?.idMusica}/maxresdefault.jpg`}
                        alt='image music'
                        fill // Hace que la imagen ocupe el 100% de su contenedor padre inmediato
                        sizes="(width: 30px)" // Optimiza la descarga según la pantalla
                        loading="eager"
                        className="object-cover rounded-xl"
                    />
                </div>
                <div className={`flex flex-col flex-1 text-gray-500 ${montserrat.className} text-lg`}>
                    <span className="block whitespace-nowrap overflow-hidden text-ellipsis">{cancionActual?.nombreMusica}</span>
                    <p className="whitespace-nowrap overflow-hidden text-ellipsis">Nombre del artista</p>
                </div>
            </div>


            <div className="flex items-center p-2">
                {isPlaying ? (
                    <Pause onClick={handleToggleRepro} />
                ) :
                    (<Play onClick={handleToggleRepro} />)}

            </div>

        </div>

    )
}



