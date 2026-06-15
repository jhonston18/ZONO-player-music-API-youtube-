

import BoxMusic from "./box-music";





export default function MiMusicaScroll ({categorys, musicas }) {

  if (!Array.isArray(musicas) || musicas.length === 0) {
  return null;
}

  return (

    <div>

      <div>
        <h2 className="text-2xl font-bold mb-4">{categorys}</h2>
      </div>
      <div className="flex snap-x snap-mandatory overflow-x-auto w-full gap-3 py-4 [&::-webkit-scrollbar]:hidden">
        {musicas.map((item, index) => (
          <BoxMusic key={index} musicaData={item} />
        ))}
      </div>

    </div>

  )
}


