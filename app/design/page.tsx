"use client";
import { useContext, useState } from "react";
import FileContext from "../store/filecontext";
import generateAndDownload from "./generateAndDownload";
export default function Design() {
    const fileContext = useContext(FileContext);
    const [nwh, setNWH] = useState({width: 0, height: 0});
    enum Dimension {
        width = "w",
        height = "h"
    }
    const [desiredDimension, setDesiredDimension] = useState(Dimension.width);
    const [size, setSize] = useState<number>(0);
    return (
        <>
            <h1>I want my image to be <input
                type="number"
                value={size === 0 ? "" : size}
                onChange={e => setSize(e.target.value === "" ? 0 : Number(e.target.value))}
                /> cm <select onChange={e => setDesiredDimension(e.target.value as Dimension)} value={desiredDimension}>
                <option value={Dimension.width}>wide</option>
                <option value={Dimension.height}>tall</option>
                </select></h1>
                <button onClick={() => {
                    generateAndDownload(desiredDimension, size, nwh, fileContext.file!);
                }} className="mt-10 right-0.5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                    Engineer away!
                </button>
            
            <img onLoad={(e)=>{
                const img = e.currentTarget;
                const w = img.naturalWidth;
                const h = img.naturalHeight;
                setNWH({width: w, height: h});
            }} src={fileContext.file ? URL.createObjectURL(fileContext.file) : ''} alt="Uploaded Sticker" className="max-w-full h-auto hidden" />
        </>
    );
}