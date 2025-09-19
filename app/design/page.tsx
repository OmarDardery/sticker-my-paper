"use client";
import { useContext, useState } from "react";
import FileContext from "../store/filecontext";
import generateAndDownload from "./generateAndDownload";
import { sticker } from "../store/filecontext";
export default function Design() {
    const {file, setFile} = useContext(FileContext);
    const [done, setDone] = useState<number>(0);
    return (
        <div className="font-sans items-center flex-col justify-items-center min-h-screen p-3 pb-20 gap-16 sm:p-20">
            <h1 className="font-sans items-center flex-col justify-items-center p-2">Design your stickers!</h1>
            {
                (file && file[0] && file[0].file) &&
                    file.map((f, index) => (
                        <div key={index} className="flex flex-col gap-4  border-2 w-fit p-4 m-4 rounded-lg text-center">
                            <h2>Sticker {index + 1}</h2>
                            <div className="flex flex-col justify-center items-center  ">
                                <img
                                onLoad={e => {
                                        const target = e.target as HTMLImageElement;
                                        setFile(prev =>
                                            prev
                                                ? prev.map((item, i) =>
                                                    i === index
                                                        ? { ...item, nwh: { width: target.naturalWidth, height: target.naturalHeight } }
                                                        : item
                                                )
                                                : prev
                                        );
                                    }}
                                 id="sticker1img" src={URL.createObjectURL(f.file as File)} alt={`Sticker ${index + 1}`} className="max-w-xs max-h-96 object-contain" />
                                <div className="grid grid-cols-3 gap-4 grid-rows-2 justify-center items-center">
                                    <div>
                                        <h2>Amount</h2>
                                    </div>
                                    <div>
                                        <h2>Dimension</h2>
                                    </div>
                                    <div>
                                        <h2>Size (cm)</h2>
                                    </div>
                                    <input
                                    type="number"
                                    min={1}
                                    max={1000}
                                    className="p-1.5 bg-teal-300 w-20"
                                    value={f.amount}
                                    onChange={e => {
                                        const newValue = parseInt(e.target.value);
                                        setFile(prev =>
                                        prev
                                            ? prev.map((item, i) =>
                                                i === index ? { ...item, amount: newValue } : item
                                            )
                                            : prev
                                        );
                                    }}
                                    />
                                    <select className="p-1.5 bg-teal-300 w-20" value={f.desiredDimension} onChange={(e) => {
                                        const newValue = e.target.value;
                                        setFile(prev =>
                                            prev
                                                ? prev.map((item, i) =>
                                                    i === index ? { ...item, desiredDimension: newValue } : item
                                                )
                                                : prev
                                        );
                                    }}>
                                        <option value="w">Width</option>
                                        <option value="h">Height</option>
                                    </select>
                                    <input type="number" min={1} max={50} className="p-1.5 bg-teal-300 w-20" value={f.size} onChange={(e) => {
                                        const newValue = parseInt(e.target.value);
                                        if((f.desiredDimension === "w" && newValue >= 20 )|| (f.desiredDimension === "h" && newValue >= 28 )){
                                            alert("For A4 paper, max width is 20cm and max height is 28cm.");
                                        }else{
                                            setFile(prev =>
                                                prev
                                                    ? prev.map((item, i) =>
                                                        i === index ? { ...item, size: newValue } : item
                                                    )
                                                    : prev
                                            );
                                        }
                                    }} />  
                                </div>
                            </div>
                        </div>
                    ))
            }
            <button onClick={async () => {
                if(await generateAndDownload(file as sticker[])){
                    setDone(1);
                    
                }else {
                    alert("Failed to generate PDF. Please ensure all stickers have valid dimensions and sizes.");
                    setDone(2);
                }
                
            }} className={`mt-10 right-1 ${done === 0 ? "bg-blue-500 hover:bg-blue-700" : done === 2 ? "bg-red-500 hover:bg-red-700" : "bg-green-500 hover:bg-green-700"}  text-white font-bold py-2 px-4 rounded cursor-pointer self-end justify-self-end`}>
                {done === 0  ? "Engineer away!": done === 1 ? "done, regenerate" : "error, try again"}
            </button>
        </div>
    );
}