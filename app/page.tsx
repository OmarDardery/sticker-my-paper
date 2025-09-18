import GetStartedButton from "./components/getStartedButton";

export default function Home() {
  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <ul>
        <li><h1>Welcome to PaperLab, where you engineer your stickers to be size-perfect when printed on an A4 paper!</h1></li>
        
      </ul>
      <GetStartedButton />
    </div>
  );
}
