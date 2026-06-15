


import { create } from 'zustand'

export interface Musica {
    id_Video: number,
    name_Music: string,
    category: string,
    name_Singer: String

}


export interface ReproductorState {
    cancionActual: Musica | null; //la informacion de la cancion o musica
    isPlaying: boolean //para verificar si esta reproduciendose
    currentTime: number | 0
    duration: number | 0

    setCancionActual: (cancion: Musica) => void
    setIsPlaying: (playing: boolean) => void;//para actualizar el valor (isPlay) de reproduccion
    setPause: (playing: boolean) => void; //para pausar y cambiar el valor de isPlay a false
    togglePlay: () => void
    setCurrentTime: (time: number) => void
    setDuration: (dur: number) => void


}

export const useDataMusicStore = create<ReproductorState>((set) => ({ //set para actualizar y get para obtener datos
    cancionActual: null,
    isPlaying: false, //por defecto no esta reproduciendose
    currentTime: 0,
    duration: 0,

    //actualizamos la cancion
    setCancionActual: (cancion) => set({ cancionActual: cancion, isPlaying: true }),

    //para actualizar el play
    setIsPlaying: (playing) => set({ isPlaying: playing }),
    setPause: (playing) => set({ isPlaying: false }),
    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
    setCurrentTime: (time) => set({ currentTime: time }),
    setDuration: (dur) => set({ duration: dur })


}))


