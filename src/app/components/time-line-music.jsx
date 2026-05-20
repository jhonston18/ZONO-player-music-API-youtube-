


export default function TimeLineMusic({ width, onClick}) {
    return (
        <div
            onClick={onClick}
            className="w-full h-2 border rounded-xl shadow-xl overflow-hidden cursor-pointer"
            role="button"
            aria-label="Barra de progreso"
        >
            <div className="h-2 bg-blue-500" style={{ width: width }}></div>
        </div>
    );
}