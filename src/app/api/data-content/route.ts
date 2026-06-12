

import { NextRequest, NextResponse } from "next/server"
import { SAVE_MUSIC_ENTRY, DELETE_MUSIC } from './music-callbacks.js'





export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { videoId, idCategoria, nombreCategoria, idArtista, nombreArtista, duration } = body

    // // importar dinámicamente para evitar problemas de bundling/static analysis
    // const module = await import('./music-callbacks.js')
    // const { SAVE_MUSIC_ENTRY } = module

    const dataMusica = await SAVE_MUSIC_ENTRY({
      videoId,
      idCategoria,
      nombreCategoria,
      idArtista,
      duration
    })

    console.log("Datos de musica: ", dataMusica)

    return NextResponse.json(dataMusica, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Error al guardar la música" }, { status: 500 })
  }
}

interface RouteParams {
  params: Promise<{id: String}>
}

export  function DELETE(request: NextRequest){

  const searchParams = request.nextUrl.searchParams

  const id = searchParams.get('id')

  if(!id) return NextResponse.json(
    {error:"falta el parametro id en la consulta"},
    {status: 400}
  )

  const res = DELETE_MUSIC(id)

  console.log("Esta es la respuesta: ", res)

  return res

}


