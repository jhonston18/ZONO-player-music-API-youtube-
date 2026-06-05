


export default async function GET_DATA_MUSIC(id) {

    const ID_VIDEO = 'EdgkWykbvpw'; // Reemplaza con el ID de tu video de YouTube

    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;

    console.log("estamos en DataContent - Esta es la url que se va a llamar a la api de oEmbed:", url); // Para verificar que la URL es correcta antes de hacer la petición

    try {
        
        const res = await fetch(url, {

            next: { revalidate: 86400 } // Cachear por 24 horas está perfecto para videos de YouTube
        });

        if (!res.ok) {
            throw new Error('Error al obtener los datos de YouTube');
        }

        const data = await res.json();
        console.log("estamos en DataContent - Datos obtenidos de YouTube oEmbed:", data); // Para verificar la estructura de la respuesta

        return data;
    } catch (error) {
        console.error("estamos en DataContent - Error en oEmbed fetch:", error);
        return null;
    }

   
}

// export function GET_MUSIC_FOR_CATEGORY(){


//     const ALBUM = [
//         {id: 1, title: "¿Que sera", author_name: "Artista 1", ID_VIDEO: "EdgkWykbvpw", category: "rock"},
//         {id: 2, title: "", author_name: "Artista 2", ID_VIDEO: "EdgkWykbvpw", category: "rock"},
//         {id: 3, title: "Album 3", author_name: "Artista 3", ID_VIDEO: "EdgkWykbvpw", category: "rock"},
//         {id: 4, title: "Album 4", author_name: "Artista 3", ID_VIDEO: "EdgkWykbvpw", category: "rock"},
//         {id: 5, title: "Album 4", author_name: "Artista 4", ID_VIDEO: "EdgkWykbvpw", category: "classical"},
//         {id: 6, title: "Album 4", author_name: "Artista 4", ID_VIDEO: "EdgkWykbvpw", category: "classical"},
//         {id: 7, title: "Album 4", author_name: "Artista 4", ID_VIDEO: "EdgkWykbvpw", category: "classical"},
//         {id: 8, title: "Album 4", author_name: "Artista 4", ID_VIDEO: "EdgkWykbvpw", category: "classical"},
//         {id: 9, title: "Album 5", author_name: "Artista 5", ID_VIDEO: "EdgkWykbvpw", category: "Jazz"},
//         {id: 10, title: "Album 5", author_name: "Artista 5", ID_VIDEO: "EdgkWykbvpw", category: "Jazz"},
//         {id: 11, title: "Album 5", author_name: "Artista 5", ID_VIDEO: "EdgkWykbvpw", category: "Jazz"},
//         {id: 12, title: "Album 5", author_name: "Artista 5", ID_VIDEO: "EdgkWykbvpw", category: "Jazz"},
       
//     ]


// }







