import loader from "@/public/assets/loader-2.gif";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
      <Image src={loader} height={350} width={350} alt="Loading..." priority />
    </div>
  );
};

export default Loading;
