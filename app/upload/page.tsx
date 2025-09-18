"use client";
import { useRef, useContext } from "react";
import FileContext from "../store/filecontext";
import { useRouter } from "next/navigation";


export default function Upload() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {setFile} = useContext(FileContext);
    const router = useRouter();
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const file = fileInputRef.current?.files?.[0];
        if (file) {
            router.push('/design');
            setFile(file);
        } else {
            alert("Please select a file before uploading.");
        }
    };

    return (
        <form onSubmit={submitHandler} action={"/design"} className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <h1>Get started by uploading an image of your sticker, cropped so that there are no margins around it!</h1>
            <input ref={fileInputRef} type="file" accept="image/*" className="p-1.5 bg-amber-300 fill-teal-400" />
            <button type="submit" className="mt-10 right-0.5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                Upload
            </button>
        </form>
    );
}