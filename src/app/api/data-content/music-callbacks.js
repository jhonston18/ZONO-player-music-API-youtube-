

import dbLocal from "db-local"

const { Schema } = new dbLocal({ path: "./db" })


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



export async function GET_DATA_VIDEO(videoId) {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`

    // Me brinda el nombre (title) y el canal de youtube (author_name)
    try {
        const res = await fetch(url)
        if (!res.ok) throw new Error('Error al obtener los datos')

        const data = await res.json()
        return {
            title: data.title,
            authorName: data.author_name
        }
    } catch (err) {
        console.error(err)
        throw err
    }
}

export function ADD_CATEGORY(idCategoria, nombreCategoria) {
    Categorias.create({
        idCategoria: Number(idCategoria),
        nombreCategoria: nombreCategoria
    }).save()
}

export function ADD_ARTISTAS(idArtista, nombreArtista) {

    Artistas.create({
        idArtista: Number(idArtista),
        nombreArtista: nombreArtista
    }).save()

}

export function ADD_MUSICA(idMusica, idCategoria, duration, idArtista, title) {
    Musicas.create({
        idMusica: idMusica,
        nombreMusica: title,
        idCategoria: Number(idCategoria),
        duration: Number(duration),
        idArtista: Number(idArtista)
    }).save()
}



export function ADD_MUSICA_ARTISTAS(idMusica, idArtista) {
    MusicasArtistas.create({
        idMusica: idMusica,
        idArtista: Number(idArtista)
    }).save()
}

export async function SAVE_MUSIC_ENTRY({
    videoId,
    idCategoria,
    nombreCategoria,
    idArtista,
    nombreArtista,
    duration
}) {
    const metadata = await GET_DATA_VIDEO(videoId)
    ADD_CATEGORY(idCategoria, nombreCategoria)
    ADD_ARTISTAS(idArtista, nombreArtista)
    ADD_MUSICA(videoId, idCategoria, duration, idArtista, metadata.title)
    ADD_MUSICA_ARTISTAS(videoId, idArtista)
    return {
        idMusica: videoId,
        nombreMusica: metadata.title,
        autor: metadata.authorName,
        idCategoria: Number(idCategoria),
        nombreCategoria,
        idArtista: Number(idArtista),
        nombreArtista,
        duration: Number(duration)
    }
}








