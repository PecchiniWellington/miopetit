const Hero = ({
  description,
  title,
}: {
  description: string;
  title: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 py-20 text-center text-white">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="mt-4 max-w-2xl text-lg">{description}</p>
    </div>
  );
};

export default Hero;
