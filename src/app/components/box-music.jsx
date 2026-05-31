
import Image from "next/image";

export default function BoxMusic({ nombre}) {

    return (

        <div className="min-w-30 flex flex-col items-center gap-2 p-4 border border-gray-700 rounded-lg">
            <div className="overflow-hidden">
                <Image
                    src='https://i1-e.pinimg.com/1200x/aa/53/8f/aa538fb499dc42e4727b63f19e32525c.jpg'
                    alt='Image-music'
                    width={200}
                    height={200}
                    className="object-cover"
                />
            </div>
            <div>
                <h3>{nombre}</h3>
            </div>
        </div>

    )
}