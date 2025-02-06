import AnimalAvatar from "../animal-avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const giftsData = [
  {
    name: "Toys, treats & more",
    image: "coccola-tutti.png",
  },
  {
    name: "Regali Cani",
    image: "coccola-cani.png",
  },
  {
    name: "Regali Gatti",
    image: "coccola-gatti.png",
  },
  {
    name: "Regali Piccoli Animali",
    image: "coccola-piccoli-animali.png",
  },
  {
    name: "Regali per te",
    image: "coccola-te.png",
  },
];

const Gifts = () => {
  return (
    <>
      <div className="hidden grid-cols-2 justify-center gap-4 sm:grid md:flex md:grid-cols-3 lg:grid-cols-5">
        {giftsData.map(({ name, image }) => (
          <AnimalAvatar key={name} name={name} image={image} />
        ))}
      </div>
      <div className="block md:hidden">
        <Carousel
          className="mb-12 w-full"
          opts={{
            loop: true,
            startIndex: 0,
            align: "start",
          }}
        >
          <CarouselContent>
            {giftsData.map(({ name, image }) => (
              <CarouselItem key={name} className={`md:basis-1/2 lg:basis-1/4`}>
                <div className="relative mx-auto h-full">
                  <AnimalAvatar key={name} name={name} image={image} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};

export default Gifts;
