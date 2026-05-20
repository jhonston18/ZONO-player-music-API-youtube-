import { TextAlignJustify } from "lucide-react";

export default function SideBar() {

    return (
        <>
            {/**Este bloque es del side para ver mas opciones del reproductir*/}
            < div className="w-min-[390px] p-2 border border-yellow-300" >
                <div className="flex flex-col gap-10 text-white text-2xl">
                    <div className="flex justify-between">
                        <label htmlFor="">Menu</label>
                        <TextAlignJustify className="text-5xl border" />
                    </div>
                    <li>Mi musica</li>
                    <li>Playlist</li>
                    <li>Mis albums</li>
                    <li>Configuracion</li>
                </div>

            </ div>
        </>
    )
}