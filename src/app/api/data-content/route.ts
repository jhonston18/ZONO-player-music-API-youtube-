






import sql from 'mssql'

import { NextResponse } from 'next/server'

import GET_MUSIC_CATEGORIES from '../data/music-callbacks'


export async function GET() {
  try {
    const music = await GET_MUSIC_CATEGORIES();
    console.log('API /api/data-content response:', music);
    return NextResponse.json(music);
  } catch (error) {
    console.error('Error en route /api/data-content:', error);
    return NextResponse.json({ error: 'Error al obtener datos' }, { status: 500 });
  }
}
