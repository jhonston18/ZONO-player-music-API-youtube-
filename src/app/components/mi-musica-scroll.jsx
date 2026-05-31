import Image from "next/image";
import { Geist, Montserrat, DM_Sans, Outfit } from "next/font/google";

const montserrat = Outfit({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})


export default function MiMusicaScroll({ album }) {
 

  return (

    <div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">album.title</h2>
      </div>
      <div className="flex snap-x snap-mandatory overflow-x-auto w-full gap-3 py-4 [&::-webkit-scrollbar]:hidden">

        <div className="w-50 h-75 snap-start shrink-0 ">

          <Image
            src='https://i1-e.pinimg.com/1200x/aa/53/8f/aa538fb499dc42e4727b63f19e32525c.jpg'
            alt='image music'
            width={200}
            height={200}
            className="object-cover rounded-xl"

          />

          
          <div className={`mt-2 text-gray-500 ${montserrat.className} text-xl`}>
            <span >Nombre de la musica</span>
            <p>nombre del artista o los artistas</p>
          </div>
        </div>

        <div className="w-50 h-75 snap-start shrink-0 ">

          <Image
            src='https://i1-e.pinimg.com/1200x/aa/53/8f/aa538fb499dc42e4727b63f19e32525c.jpg'
            alt='image music'
            width={200}
            height={200}
            className="object-cover rounded-xl"

          />
          <div className={`mt-2 text-gray-500 ${montserrat.className} text-xl`}>
            <span >Nombre de la musica</span>
            <p>nombre del artista o los artistas</p>
          </div>
        </div>


        <div className="w-50 h-75 snap-start shrink-0">

          <Image
            src='https://i1-e.pinimg.com/1200x/aa/53/8f/aa538fb499dc42e4727b63f19e32525c.jpg'
            alt='image music'
            width={200}
            height={200}
            className="object-cover rounded-xl"

          />
          <div className={`mt-2 text-gray-500 ${montserrat.className} text-xl`}>
            <span >Nombre de la musica</span>
            <p>nombre del artista o los artistas</p>
          </div>
        </div>



      </div>

    </div>

  )
}


