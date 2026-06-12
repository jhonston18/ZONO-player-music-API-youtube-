
import axios from 'axios'
import DBLocal from "db-local";
import { NextResponse } from 'next/server';
import path from "path";


// process.cwd() apunta a la raíz de tu proyecto Next.js
const dbPath = path.join(process.cwd(), 'src', 'app', 'api', 'data-content', 'db');

const { Schema } = new DBLocal({ path: dbPath });



function getSchemas() {

    // creando las tablas
    const Musicas = Schema('Musicas', {
        idMusica: { type: String, require: true },
        nombreMusica: { type: String, require: true },
        idCategoria: { type: Number, require: true },
        duration: { type: Number, require: true },
        idArtista: { type: Number, require: true }
    })

    const Categorias = Schema('Categorias', {
        idCategoria: { type: Number, require: true },
        nombreCategoria: { type: String, require: true }
    })

    const Artistas = Schema('Artistas', {
        idArtista: { type: Number, require: true },
        nombreArtista: { type: String, require: true }
    })

    const MusicasArtistas = Schema('MusicasArtistas', {
        idMusica: { type: String, require: true }, //foreign key
        idArtista: { type: Number, require: true } //foreign key
    })


    return { Musicas, Categorias, Artistas, MusicasArtistas }
}


export async function GET_DATA_VIDEO(videoId) {
    console.log("Esto es el id que se pasa a la funcion: ", videoId)
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`

    console.log("Esto es la url: ", url )

    // Me brinda el nombre (title) y el canal de youtube (author_name)
    try {
        const res = await axios.get(url)
        console.log("Este es la respuesta de la peticion: ", res)
        
        if (res.status !== 200) throw new Error('Error al obtener los datos: ', res.statusText)

        //const data = await res.json()
        return {
            title: res.data.title,
            authorName: res.data.author_name
        }
    } catch (err) {
        console.error("Error: ",err)
        throw err
    }
}


let musicas;
let categorias;
let artistas;
let musicaArtistas;


export function ADD_CATEGORY(idCategoria, nombreCategoria) {
    const { Categorias } = getSchemas()
    categorias = Categorias.create({
        idCategoria: Number(idCategoria),
        nombreCategoria: nombreCategoria
    }).save()
}

export function ADD_ARTISTAS(idArtista, nombreArtista) {
    const { Artistas } = getSchemas()
    artistas = Artistas.create({
        idArtista: Number(idArtista),
        nombreArtista: nombreArtista
    }).save()
}

export function ADD_MUSICA(idMusica, idCategoria, duration, idArtista, nombreMusica) {
    const { Musicas } = getSchemas()
    musicas = Musicas.create({
        idMusica: idMusica,
        nombreMusica: nombreMusica,
        idCategoria: Number(idCategoria),
        duration: Number(duration),
        idArtista: Number(idArtista)
    }).save()
}



export function ADD_MUSICA_ARTISTAS(idMusica, idArtista) {
    const { MusicasArtistas } = getSchemas()
    musicaArtistas = MusicasArtistas.create({
        idMusica: idMusica,
        idArtista: Number(idArtista)
    }).save()
}

export async function SAVE_MUSIC_ENTRY({
    videoId,
    idCategoria,
    nombreCategoria,
    idArtista,
    duration
}) {
    try {
        const metadata = await GET_DATA_VIDEO(videoId)
        ADD_CATEGORY(idCategoria, nombreCategoria)
        ADD_ARTISTAS(idArtista, metadata.authorName)
        ADD_MUSICA(videoId, idCategoria, duration, idArtista, metadata.title)
        ADD_MUSICA_ARTISTAS(videoId, idArtista)
        console.log("Funciones ejecutadas")
        return {
            idMusica: videoId,
            nombreMusica: metadata.title,
            artista: metadata.authorName,
            idCategoria: Number(idCategoria),
            nombreCategoria,
            idArtista: Number(idArtista),
            duration: Number(duration)
        }
    } catch (err) {
        console.error(err)
        throw err
    }
}


export function DELETE_MUSIC(idMusica){

    console.log("Este es le valor de id de DELETE_MUSICA: ", idMusica)

    if(!idMusica) NextResponse.error({"Error: ": "El parametro idMusica es undefined"})

    const { Musicas } = getSchemas()

    const existe = Musicas.find({idMusica: idMusica})
    console.log("Este es  el valor de existe: ", existe)

    if(!existe || existe.length === 0) return NextResponse.json({message: "Musica no existe en la base de datos"}, {status: 400})

    Musicas.remove({idMusica: idMusica})

    return NextResponse.json({message: "Musica eliminado correctamente"}, {status: 200})
}









/*
// creando las tablas
const Musicas = Schema('Musicas', {
    idMusica: { type: String, require: true },
    nombreMusica: { type: String, require: true },
    idCategoria: { type: Number, require: true },
    duration: { type: Number, require: true },
    idArtista: { type: Number, require: true }
})

const Categorias = Schema('Categorias', {
    idCategoria: { type: Number, require: true },
    nombreCategoria: { type: String, require: true }
})

const Artistas = Schema('Artistas', {
    idArtista: { type: Number, require: true },
    nombreArtista: { type: String, require: true }
})

const MusicasArtistas = Schema('MusicasArtistas', {
    idMusica: { type: String, require: true }, //foreign key
    idArtista: { type: Number, require: true } //foreign key
})

//categorias
Categorias.create({
    idCategoria: 1,
    nombreCategoria: 'Reguetón'
}).save()

Categorias.create({
    idCategoria: 2,
    nombreCategoria: 'Cumbia'
}).save()


Categorias.create({
    idCategoria: 3,
    nombreCategoria: 'Salsa'
}).save()


Categorias.create({
    idCategoria: 4,
    nombreCategoria: 'Jazz'
}).save()

Categorias.create({
    idCategoria: 5,
    nombreCategoria: 'Pop'
}).save()

//artistas
Artistas.create({
    idArtista: 1,
    nombreArtista: "Bad Bunny"//regueton
}).save()

Artistas.create({
    idArtista: 2,
    nombreArtista: "Marisol" //cumbia
}).save()

Artistas.create({
    idArtista: 3,
    nombreArtista: "Héctor Lavoe" //salsa
}).save()

Artistas.create({
    idArtista: 4,
    nombreArtista: "Louis Armstrong" //jazz
}).save()

Artistas.create({
    idArtista: 5,
    nombreArtista: "Bruno Mars" //pop
}).save()

//musicas
Musicas.create({
    idMusica: 'gjvTQTGogUM',
    nombreMusica: 'Andrea',
    idCategoria: 1,
    duration: 339,//5:39 minutos
    idArtista: 1
}).save()

Musicas.create({
    idMusica: 'LNlN7Q83xwc',
    nombreMusica: 'Yo lo quería', //marisol
    idCategoria: 2,
    duration: 269,//4:29 minutos
    idArtista: 2
}).save()


Musicas.create({
    idMusica: 'LXExea8k57M',
    nombreMusica: 'El Día de Mi Suerte', //hector lovoe
    idCategoria: 3,
    duration: 324,//5:24 minutos
    idArtista: 3
}).save()


Musicas.create({
    idMusica: 'CaCSuzR4DwM',
    nombreMusica: 'What A Wonderful World',//Louis Armstrong
    idCategoria: 4,
    duration: 145,//2:25 minutos
    idArtista: 4
}).save()


Musicas.create({
    idMusica: 'bwuUarZDeyA',
    nombreMusica: 'Bruno Mars', //Bruno Mars
    idCategoria: 5,
    duration: 204,//3:24 minutos
    idArtista: 5
}).save()

//musicas artistas
MusicasArtistas.create({
    idMusica: 'gjvTQTGogUM', //foreign key
    idArtista: 1 //foreign key
}).save()

MusicasArtistas.create({
    idMusica: 'LNlN7Q83xwc', //foreign key
    idArtista: 2 //foreign key
}).save()

MusicasArtistas.create({
    idMusica: 'LXExea8k57M', //foreign key
    idArtista: 3 //foreign key
}).save()


MusicasArtistas.create({
    idMusica: 'CaCSuzR4DwM', //foreign key
    idArtista: 4 //foreign key
}).save()

MusicasArtistas.create({
    idMusica: 'bwuUarZDeyA', //foreign key
    idArtista: 5 //foreign key
}).save()

*/






