const CardWorking = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 flex   items-center justify-center rounded-xl text-white ">
        <div className="rounded-xl text-2xl font-semibold text-white">
          WORKING...
        </div>
        <div className=" absolute inset-0 rounded-xl bg-red-900 opacity-55"></div>
      </div>
    </div>
  );
};

export default CardWorking;
