"use client"

import { useState, ChangeEvent } from "react"


export default function AddMusic() {

    const [valueInput, setValueInput] = useState<string>("")


    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueInput(e.target.value)
    }

    const regexLink = /v=([^&]+)/i

    const conincidencia = valueInput.match(regexLink)

    const linkVideo = conincidencia ? conincidencia[1] : ""

    console.log("El link del video desde el input: ", linkVideo)

    //se sube a la base de datos el link y al mismo tiempo en el dashboard se hace una peticion a la base de datos para ver si la seccion
    //Agregadas tiene datos, si los tiene traerlos, y mostrarlos


    return (



        <div className="w-full flex gap-2 ">
            <input className="w-full p-2 border border-gray-400 outline-none rounded-xl"
                type="text"
                placeholder="Ingresa el link de youtube de la musica que quieres escuchar"
                onChange={handleChangeInput}
                value={valueInput}
            />
            <button className="p-2 my-2 bg-blue-600 mx-2 rounded-xl">Agregar</button>
        </div>


    )
}