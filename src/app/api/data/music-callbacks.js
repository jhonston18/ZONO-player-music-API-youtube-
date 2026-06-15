
import { NextResponse } from 'next/server';

import { getConnection } from '@/lib/db';



export default async function GET_MUSIC_CATEGORIES() {


  try {
    const pool = await getConnection();

    const result = await pool.request().query(`
      SELECT M.id_Video, M.name_Music, C.name_Category, S.name_Singer
      FROM Music M INNER JOIN SingerMusic SM 
      ON SM.id_Music = M.id_Music
      INNER JOIN Category C
      ON C.id_Category = M.id_Category
      INNER JOIN Singer S
      ON S.id_Singer = SM.id_Singer
    `);

    const categoriesMap = new Map();

    result.recordset.forEach(song => {

      if (!categoriesMap.has(song.name_Category)) {
        categoriesMap.set(song.name_Category, {
          category: song.name_Category,
          songs: []
        });
      }

      categoriesMap.get(song.name_Category).songs.push(song);
    });

    NextResponse.json("Respuesta peticion ", Array.from(categoriesMap.values()))
    return Array.from(categoriesMap.values());

  } catch (error) {
    console.error("Erro en la peticion desde la api: ", error);
    throw error;
  }



}