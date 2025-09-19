"use client";
import { useRef, useContext, useState } from "react";
import FileContext from "../store/filecontext";
import { useRouter } from "next/navigation";
import { sticker } from "../store/filecontext";


export default function Upload() {
    const [files, setFiles] = useState<sticker[]>([]);


    const {setFile} = useContext(FileContext);
    const router = useRouter();
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const cleaned = files.filter(f => f.file !== null);
        if (cleaned.length === 0) {
            alert("Please upload at least one file.");
            return;
        }else{
            setFile(files);
            router.push("/design");
        }
    }

    return (
        <form onSubmit={submitHandler} action={"/design"} className="font-sans items-center flex flex-col justify-items-center min-h-screen p-8 pb-20 gap-4 sm:p-20">
            <h1>Get started by uploading an image of your sticker, cropped so that there are no margins around it!</h1>
            {
                files.length > 0 && Array.from({length: files.length}).map((_, index) => (
                    <input key={index} onChange={(event)=>{
                        let tempFile: sticker = files[index];
                        tempFile.file = (event.target as HTMLInputElement).files?.[0] || null;
                        setFiles(prev => prev.map((item, i) => i === index ? tempFile : item));
                    }} type="file" accept="image/*" className="p-1.5 bg-teal-300" />
                ))
            }
            <button type="button" className="mt-10 right-0.5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" onClick={()=> {
                let newFile: sticker = {file: new File([], ""), desiredDimension: "w", size: 0, nwh: {width: 0, height: 0}, amount: 1};
                setFiles(prev => [...prev, newFile]);
            }}>+ add sticker</button>
            <button type="submit" className="mt-10 right-0.5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                Upload
            </button>
        </form>
    );
}