

import { Music, TextAlignJustify } from "lucide-react";


import MiMusicaScroll from "../components/mi-musica-scroll";




export default function MiMusica() {

    const albumMusic = {
        regueton: {
            title: 'Regueton',
            musics: [
                {
                    id: 1,
                    categorie: 'potcast mas escuchados',
                    title: `Lana del rey - Salvatore (lyrics)`,
                    image: 'https://i1-e.pinimg.com/1200x/aa/53/8f/aa538fb499dc42e4727b63f19e32525c.jpg',
                    audio: '/music/audio1.mp3'
                },
                {
                    id: 2,
                    categorie: 'salsa',
                    title: `Nothing's gonna hurt you baby - Cicarettes (lyrics)`,
                    image: 'https://i1-e.pinimg.com/1200x/aa/53/8f/aa538fb499dc42e4727b63f19e32525c.jpg',
                    audio: '/music/audio2.mp3'
                },
                {
                    id: 3,
                    categorie: 'regueton',
                    title: 'Sweet - Cigarettes (lyrics)',
                    image: 'https://i1-e.pinimg.com/1200x/aa/53/8f/aa538fb499dc42e4727b63f19e32525c.jpg',
                    audio: '/music/audio3.mp3'
                }
            ]
        },

        salsa: {
            title: 'Salsa',
            musics: [
                {
                    id: 1,
                    categorie: 'potcast mas escuchados',
                    title: `Lana del rey - Salvatore (lyrics)`,
                    image: 'https://i1-e.pinimg.com/1200x/aa/53/8f/aa538fb499dc42e4727b63f19e32525c.jpg',
                    audio: '/music/audio1.mp3'
                },
                {
                    id: 2,
                    categorie: 'salsa',
                    title: `Nothing's gonna hurt you baby - Cicarettes (lyrics)`,
                    image: 'https://i1-e.pinimg.com/1200x/aa/53/8f/aa538fb499dc42e4727b63f19e32525c.jpg',
                    audio: '/music/audio2.mp3'
                },
                {
                    id: 3,
                    categorie: 'regueton',
                    title: 'Sweet - Cigarettes (lyrics)',
                    image: 'https://i1-e.pinimg.com/1200x/aa/53/8f/aa538fb499dc42e4727b63f19e32525c.jpg',
                    audio: '/music/audio3.mp3'
                }
            ]
        },

        lonuevo: {
            title: 'Lo nuevo',
            musics: [
                {
                    id: 1,
                    categorie: 'potcast mas escuchados',
                    title: `Lana del rey - Salvatore (lyrics)`,
                    image: 'https://i1-e.pinimg.com/1200x/aa/53/8f/aa538fb499dc42e4727b63f19e32525c.jpg',
                    audio: '/music/audio1.mp3'
                },
                {
                    id: 2,
                    categorie: 'salsa',
                    title: `Nothing's gonna hurt you baby - Cicarettes (lyrics)`,
                    image: 'https://i1-e.pinimg.com/1200x/aa/53/8f/aa538fb499dc42e4727b63f19e32525c.jpg',
                    audio: '/music/audio2.mp3'
                },
                {
                    id: 3,
                    categorie: 'regueton',
                    title: 'Sweet - Cigarettes (lyrics)',
                    image: 'https://i1-e.pinimg.com/1200x/aa/53/8f/aa538fb499dc42e4727b63f19e32525c.jpg',
                    audio: '/music/audio3.mp3'
                }
            ]
        }


    }

    
    return (
        <div className="flex flex-col gap-4 p-5">
            <div className="text-2xl font-bold">
                <h1>Mi Música</h1>
            </div>
            <div>
                <button className="p-2 bg-blue-600 mx-2 rounded-xl">Agregar Link</button>
                <button className="p-2 border border-gray-400 mx-2 rounded-xl">Agregar musica local</button>

            </div>

            <div className="">
                <input className="p-2 w-full border border-gray-400 outline-none rounded-xl" type="text" placeholder="Ingresa el link de youtube de la musica que quieres escuchar" />
            </div>

            <MiMusicaScroll album={'mi musica'} />
            <MiMusicaScroll album={'mi musica'} />
            <MiMusicaScroll album={'music.lonuevo'} />

           
           

        </div>
    )
}