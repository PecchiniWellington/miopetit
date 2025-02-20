const brandImages = [
  "https://rqtqmmtupkjdpvpv.public.blob.vercel-storage.com/brands/brand-1-YRIuNhBsMqUgrUAgKkK6WInWWut6VS.avif",
  "https://rqtqmmtupkjdpvpv.public.blob.vercel-storage.com/brands/brand-2-WUdIPqacjyPDRiQY27cf2fKVt8VD5r.avif",
  "https://rqtqmmtupkjdpvpv.public.blob.vercel-storage.com/brands/brand-3-96ZUyiObwdP5ZZWvXpbtteCvmfrVDb.avif",
  "https://rqtqmmtupkjdpvpv.public.blob.vercel-storage.com/brands/brand-4-2KDAWwVEJ4O8bF7bghLSz38iLpJBls.avif",
  "https://rqtqmmtupkjdpvpv.public.blob.vercel-storage.com/brands/brand-5-v7VAJWlzCEFFRzsxlcJFABoxCetyTW.avif",
  "https://rqtqmmtupkjdpvpv.public.blob.vercel-storage.com/brands/brand-6-6o0sTZh4keQmrd0vBa7oTeC7kI6Pif.avif",
  "https://rqtqmmtupkjdpvpv.public.blob.vercel-storage.com/brands/brand-7-SgmMvfWM8QUt4k1q8cv1o7YMO9OohA.avif",
];

const getRandomImage = () =>
  brandImages[Math.floor(Math.random() * brandImages.length)];

const productBrand = [
  { name: "Royal Canin", slug: "royal-canin", image: getRandomImage() },
  {
    name: "Hill’s Science Diet",
    slug: "hills-science-diet",
    image: getRandomImage(),
  },
  { name: "Purina Pro Plan", slug: "purina-pro-plan", image: getRandomImage() },
  { name: "Acana", slug: "acana", image: getRandomImage() },
  { name: "Orijen", slug: "orijen", image: getRandomImage() },
  { name: "Farmina N&D", slug: "farmina-nd", image: getRandomImage() },
  {
    name: "Taste of the Wild",
    slug: "taste-of-the-wild",
    image: getRandomImage(),
  },
  { name: "Edgard & Cooper", slug: "edgard-cooper", image: getRandomImage() },
  { name: "Monge", slug: "monge", image: getRandomImage() },
  { name: "Almo Nature", slug: "almo-nature", image: getRandomImage() },
  { name: "Carnilove", slug: "carnilove", image: getRandomImage() },
  { name: "Brit Care", slug: "brit-care", image: getRandomImage() },
  { name: "Natural Trainer", slug: "natural-trainer", image: getRandomImage() },
  { name: "Schesir", slug: "schesir", image: getRandomImage() },
  { name: "Lily’s Kitchen", slug: "lilys-kitchen", image: getRandomImage() },
  { name: "Josera", slug: "josera", image: getRandomImage() },
  {
    name: "Simpsons Premium",
    slug: "simpsons-premium",
    image: getRandomImage(),
  },
  { name: "Eukanuba", slug: "eukanuba", image: getRandomImage() },
  { name: "Animonda", slug: "animonda", image: getRandomImage() },
  { name: "Ziwipeak", slug: "ziwipeak", image: getRandomImage() },
];

export default productBrand;
