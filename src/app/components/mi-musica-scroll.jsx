

import BoxMusic from "./box-music";





export default function MiMusicaScroll ({ data }) {

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return (

    <div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Album</h2>
      </div>
      <div className="flex snap-x snap-mandatory overflow-x-auto w-full gap-3 py-4 [&::-webkit-scrollbar]:hidden">
        {data.map((item, index) => (
          <BoxMusic key={item.idMusica ?? index} musicaData={item} />
        ))}
      </div>

    </div>

  )
}


