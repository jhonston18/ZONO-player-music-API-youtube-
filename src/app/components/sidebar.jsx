"use client"

import {
    TextAlignJustify,
    ListMusic,
    AudioWaveform,
    Settings,
    X
} from "lucide-react";


export default function SideBar({isOpen, onClose}) {
   



    return (


        <div className={`fixed inset-y-0 left-0 z-30 flex transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            
            <aside className="flex flex-col w-72 h-screen p-3 text-white text-2xl bg-blue-500 overflow-y-auto">
                {/* Botón de cerrar */}
                <button 
                    onClick={onClose}
                    className="mb-4 p-2 hover:bg-blue-600 rounded-md transition-colors duration-200 self-end"
                >
                    <X className="size-6" />
                </button>

                <div className="flex gap-3 p-5 border-b-2 border-gray-800">
                    <AudioWaveform />
                    <span>Mi musica</span>
                </div>


                <div className="flex gap-3 p-5 border-b-2 border-gray-800">
                    <ListMusic />
                    <span>Mis albums</span>
                </div>

                <div className="flex gap-3 p-5 border-b-2 border-gray-800">
                    <Settings />
                    <span>Configuracion</span>
                </div>

            </aside>

            
        </div>


    )
}