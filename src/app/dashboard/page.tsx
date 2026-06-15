"use client"
import MiMusicaScroll from "../components/mi-musica-scroll";

import CustomTimelinePlayer from "@/app/components/floating-reproductor";
import axios from 'axios'


import AddMusic from "../components/addMusic"
import { useEffect, useState } from "react";

export default function Dashboard() {

    

    interface Songs {
        
        id_Video: number,
        name_Music: string,
        name_Category: string,
        name_Singer: String

    }

    interface CategoryMusic {
        category: string,
        songs: Songs[]
    }

    type DashboardMusic = CategoryMusic[]

    const [categorys, setCategories] = useState<DashboardMusic>()

    useEffect(() => {
        
        (async () => {
            console.log("Pidiendo datos")

            try {
                let res = await axios.get<DashboardMusic>('/api/data-content');
                setCategories(res.data)

            } catch (err) {
                console.error('Error al traer los datos al dashboard: ', err)
            }
        })()

    }, [])

    






    const datos1 = [
        { idMusica: "EdgkWykbvpw", nombreMusica: "Amor de Dios", idCategoria: "", duracion: "", idArtista: "Hector Rodrigues" },
        { idMusica: "v9T_MGfzq7I", nombreMusica: "Debi tirar mas fotos", idCategoria: "", duracion: "", idArtista: "Bad Bunny" },
        { idMusica: "a1Femq4NPxs", nombreMusica: "Baile inolvidable", idCategoria: "", duracion: "", idArtista: "Bad Bunny" },
        { idMusica: "RYr96YYEaZY", nombreMusica: "Electric love", idCategoria: "", duracion: "", idArtista: "BORNS" }
    ]
    const datos2 = [
        { idMusica: "QI8VrXkffcg", nombreMusica: "Nothing gonna hurt you baby", idCategoria: "", duracion: "", idArtista: "Cigarettes After Sex" },
        { idMusica: "By1D67IzxI4", nombreMusica: "Socorro", idCategoria: "", duracion: "", idArtista: "Corazon" },
        { idMusica: "T1LRsp8qBY0", nombreMusica: "Your ways bette", idCategoria: "", duracion: "", idArtista: "Forrest Frank" },
        { idMusica: "qYAONSDnMrc", nombreMusica: "La mudanza", idCategoria: "", duracion: "", idArtista: "Bad Bunny" }
    ]
    const datos3 = [
        { idMusica: "eDnJNsQP0os", nombreMusica: "Tu hijo soy", idCategoria: "", duracion: "", idArtista: "Barak" },
        { idMusica: "L4sbDxR22z4", nombreMusica: "K.", idCategoria: "", duracion: "", idArtista: "Cigarettes After Sex" },
        { idMusica: "Uc_HxKMKB_E", nombreMusica: "Good day", idCategoria: "", duracion: "", idArtista: "Forrest Frank" },
        { idMusica: "KU5V5WZVcVE", nombreMusica: "Nueva Yol", idCategoria: "", duracion: "", idArtista: "Bad Bunny" }
    ]

    // console.log("estamos en Dashboard - Esta es la data en mimusica: ", data)
    //AQUI TENGO QUE HACER LA PETICION A LA BASE DE DATOS
    //TENGO QUE PASAR LOS DATOS DE LAS 4 PRIMERAS CANCIONES DE CADA GENERO A CADA COMPONENTE MIMUSICASCROLL
    //CUANDO HAGO CLICK EN UN BOX, QUIERO QUE ME ENVIE LOS DATOS DE LA CANCION AL FLOATING-REPRODUCTOR 

    return (
        <div>
            <div className="flex flex-col gap-4 p-5 mb-20">
                <div className="text-2xl font-bold">
                    <h1>Mi Música</h1>
                </div>
                <AddMusic />

                {categorys?.map((category, idx) => (
                    
                    <div key={idx}>
                        <MiMusicaScroll categorys={category.category} musicas={category.songs} />
                    </div>
                ))}



            </div>
            <CustomTimelinePlayer />
        </div>
    )

}