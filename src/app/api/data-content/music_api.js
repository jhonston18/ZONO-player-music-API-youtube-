
import {SAVE_MUSIC_ENTRY} from './music-callbacks'
import express from express

const app = express()



app.post('/api/data-content/music_api', (req, res) => {

    const body = req.body()

    const { videoId, idCategoria, nombreCategoria, idArtista, nombreArtista, duration } = body

    const dataMusica = SAVE_MUSIC_ENTRY(videoId, idCategoria, nombreCategoria, idArtista, nombreArtista, duration)
    

})






