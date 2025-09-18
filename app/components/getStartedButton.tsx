"use client";
import { useRouter } from "next/navigation";
export default function GetStartedButton(): React.ReactElement {
    const router = useRouter();
    return (
        <div className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <button onClick={()=>{
            router.push('/upload');
        }} className="mt-10 right-0.5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Get started --&gt;
        </button>
        </div>
    );
}