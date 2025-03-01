const product = [
  {
    id: "a5334315-5f68-474d-b2a9-7016680415c6",
    name: "Cibo secco",
    slug: "cibo-secco",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id voluptate sunt quam harum molestiae magni non voluptates dicta ab necessitatibus cupiditate ducimus placeat modi, architecto blanditiis consectetur ex dolore illum!",
    price: 19.99,
    numReviews: 120,
    rating: parseFloat((Math.random() * 5).toFixed(1)),

    stock: Math.floor(Math.random() * 100) + 1,
    createdAt: "2025-02-10T09:26:23.964Z",
    updatedAt: "2025-02-10T09:26:23.964Z",
    percentageDiscount: Math.floor(Math.random() * 11) + 5,
  },
  {
    id: "1711cdd0-d117-45dc-b875-2ccc57babc4e",
    name: "Cibo umido",
    slug: "cibo-umido",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id voluptate sunt quam harum molestiae magni non voluptates dicta ab necessitatibus cupiditate ducimus placeat modi, architecto blanditiis consectetur ex dolore illum!",
    price: 14.49,
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    stock: Math.floor(Math.random() * 100) + 1,
    numReviews: 85,

    createdAt: "2025-02-10T09:26:23.964Z",
    updatedAt: "2025-02-10T09:26:23.964Z",
    percentageDiscount: Math.floor(Math.random() * 11) + 5,
  },
  {
    id: "68e6987a-0708-4194-86fc-f0b0801b979d",
    name: "Snack",
    slug: "snack",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id voluptate sunt quam harum molestiae magni non voluptates dicta ab necessitatibus cupiditate ducimus placeat modi, architecto blanditiis consectetur ex dolore illum!",
    price: 7.99,

    rating: parseFloat((Math.random() * 5).toFixed(1)),
    stock: Math.floor(Math.random() * 100) + 1,
    numReviews: 45,

    createdAt: "2025-02-10T09:26:23.964Z",
    updatedAt: "2025-02-10T09:26:23.964Z",
    percentageDiscount: Math.floor(Math.random() * 11) + 5,
  },
  {
    id: "066f0fec-5d0c-4a8b-b9c6-c3049eb3d0d7",
    name: "Diete Cibo Umido",
    slug: "diete-cibo-umido",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id voluptate sunt quam harum molestiae magni non voluptates dicta ab necessitatibus cupiditate ducimus placeat modi, architecto blanditiis consectetur ex dolore illum!",
    price: 22.5,

    rating: parseFloat((Math.random() * 5).toFixed(1)),
    stock: Math.floor(Math.random() * 100) + 1,
    numReviews: 60,

    createdAt: "2025-02-10T09:26:23.964Z",
    updatedAt: "2025-02-10T09:26:23.964Z",
    percentageDiscount: Math.floor(Math.random() * 11) + 5,
  },
  {
    id: "7f26b557-9beb-44e9-8785-d08f67356bbb",
    name: "Diete Cibo Secco",
    slug: "diete-cibo-secco",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id voluptate sunt quam harum molestiae magni non voluptates dicta ab necessitatibus cupiditate ducimus placeat modi, architecto blanditiis consectetur ex dolore illum!",
    price: 25.99,
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    stock: Math.floor(Math.random() * 100) + 1,
    numReviews: 75,

    createdAt: "2025-02-10T09:26:23.964Z",
    updatedAt: "2025-02-10T09:26:23.964Z",
    percentageDiscount: Math.floor(Math.random() * 11) + 5,
  },
  {
    id: "a888acf9-6b47-4228-a7a3-565cb9646e08",
    name: "Accessori",
    slug: "accessori",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id voluptate sunt quam harum molestiae magni non voluptates dicta ab necessitatibus cupiditate ducimus placeat modi, architecto blanditiis consectetur ex dolore illum!",
    price: 12.99,
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    stock: Math.floor(Math.random() * 100) + 1,
    numReviews: 30,

    createdAt: "2025-02-10T09:26:23.964Z",
    updatedAt: "2025-02-10T09:26:23.964Z",
    percentageDiscount: Math.floor(Math.random() * 11) + 5,
  },
  {
    id: "d9d97d2a-4379-404d-951f-22d55c52787b",
    name: "Abbigliamento",
    slug: "abbigliamento",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id voluptate sunt quam harum molestiae magni non voluptates dicta ab necessitatibus cupiditate ducimus placeat modi, architecto blanditiis consectetur ex dolore illum!",
    price: 29.99,
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    stock: Math.floor(Math.random() * 100) + 1,
    numReviews: 50,

    createdAt: "2025-02-10T09:26:23.964Z",
    updatedAt: "2025-02-10T09:26:23.964Z",
    percentageDiscount: Math.floor(Math.random() * 11) + 5,
  },
  {
    id: "c2c6a6a8-8925-457c-8213-09e3393ce031",
    name: "Addestramento",
    slug: "addestramento",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id voluptate sunt quam harum molestiae magni non voluptates dicta ab necessitatibus cupiditate ducimus placeat modi, architecto blanditiis consectetur ex dolore illum!",
    price: 18.75,
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    stock: Math.floor(Math.random() * 100) + 1,
    numReviews: 40,

    createdAt: "2025-02-10T09:26:23.964Z",
    updatedAt: "2025-02-10T09:26:23.964Z",
    percentageDiscount: Math.floor(Math.random() * 11) + 5,
  },
  {
    id: "f82f65a0-f996-41d5-b3a2-5f26f6bdc657",
    name: "Contenitori cibo",
    slug: "contenitori-cibo",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id voluptate sunt quam harum molestiae magni non voluptates dicta ab necessitatibus cupiditate ducimus placeat modi, architecto blanditiis consectetur ex dolore illum!",
    price: 15.99,
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    stock: Math.floor(Math.random() * 100) + 1,
    numReviews: 25,

    createdAt: "2025-02-10T09:26:23.964Z",
    updatedAt: "2025-02-10T09:26:23.964Z",
    percentageDiscount: Math.floor(Math.random() * 11) + 5,
  },
  {
    id: "671d7425-894d-4dd1-b643-d5ecefdee982",
    name: "Toelettatura",
    slug: "toelettatura",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id voluptate sunt quam harum molestiae magni non voluptates dicta ab necessitatibus cupiditate ducimus placeat modi, architecto blanditiis consectetur ex dolore illum!",
    price: 20.99,
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    stock: Math.floor(Math.random() * 100) + 1,
    numReviews: 35,

    createdAt: "2025-02-10T09:26:23.964Z",
    updatedAt: "2025-02-10T09:26:23.964Z",
    percentageDiscount: Math.floor(Math.random() * 11) + 5,
  },
  {
    id: "d118e5df-5484-4592-bb33-1adf5b225134",
    name: "Giochi",
    slug: "giochi",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id voluptate sunt quam harum molestiae magni non voluptates dicta ab necessitatibus cupiditate ducimus placeat modi, architecto blanditiis consectetur ex dolore illum!",
    price: 9.99,

    rating: parseFloat((Math.random() * 5).toFixed(1)),
    stock: Math.floor(Math.random() * 100) + 1,
    numReviews: 55,

    createdAt: "2025-02-10T09:26:23.964Z",
    updatedAt: "2025-02-10T09:26:23.964Z",
    percentageDiscount: Math.floor(Math.random() * 11) + 5,
  },
  {
    id: "d1d4558d-dbe7-4846-9829-1d051e1d2972",
    name: "Guinzaglieria",
    slug: "guinzaglieria",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id voluptate sunt quam harum molestiae magni non voluptates dicta ab necessitatibus cupiditate ducimus placeat modi, architecto blanditiis consectetur ex dolore illum!",
    price: 16.49,
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    stock: Math.floor(Math.random() * 100) + 1,
    numReviews: 65,

    createdAt: "2025-02-10T09:26:23.964Z",
    updatedAt: "2025-02-10T09:26:23.964Z",
    percentageDiscount: Math.floor(Math.random() * 11) + 5,
  },
  {
    id: "4958065d-f9e9-4ffa-b4f1-2b5d1cc73319",
    name: "Trasportini e Viaggio",
    slug: "trasportini-e-viaggio",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id voluptate sunt quam harum molestiae magni non voluptates dicta ab necessitatibus cupiditate ducimus placeat modi, architecto blanditiis consectetur ex dolore illum!",
    price: 34.99,
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    stock: Math.floor(Math.random() * 100) + 1,
    numReviews: 70,

    createdAt: "2025-02-10T09:26:23.964Z",
    updatedAt: "2025-02-10T09:26:23.964Z",
    percentageDiscount: Math.floor(Math.random() * 11) + 5,
  },
  {
    id: "452ab482-c50c-47ab-b681-f629a6de5db7",
    name: "Cucce e lettini",
    slug: "cucce-e-lettini",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id voluptate sunt quam harum molestiae magni non voluptates dicta ab necessitatibus cupiditate ducimus placeat modi, architecto blanditiis consectetur ex dolore illum!",
    price: 45.99,
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    stock: Math.floor(Math.random() * 100) + 1,
    numReviews: 80,

    createdAt: "2025-02-10T09:26:23.964Z",
    updatedAt: "2025-02-10T09:26:23.964Z",
    percentageDiscount: Math.floor(Math.random() * 11) + 5,
  },
  {
    id: "09605964-e198-4ed3-85e8-8fd00dc85bc9",
    name: "Igiene",
    slug: "igiene",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id voluptate sunt quam harum molestiae magni non voluptates dicta ab necessitatibus cupiditate ducimus placeat modi, architecto blanditiis consectetur ex dolore illum!",
    price: 11.99,
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    stock: Math.floor(Math.random() * 100) + 1,
    numReviews: 20,

    createdAt: "2025-02-10T09:26:23.964Z",
    updatedAt: "2025-02-10T09:26:23.964Z",
    percentageDiscount: Math.floor(Math.random() * 11) + 5,
  },
  {
    id: "16deab7d-6f54-4da3-a12f-ddef1e646788",
    name: "Igiene manto e cute",
    slug: "igiene-manto-e-cute",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id voluptate sunt quam harum molestiae magni non voluptates dicta ab necessitatibus cupiditate ducimus placeat modi, architecto blanditiis consectetur ex dolore illum!",
    price: 13.49,
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    stock: Math.floor(Math.random() * 100) + 1,
    numReviews: 25,

    createdAt: "2025-02-10T09:26:23.964Z",
    updatedAt: "2025-02-10T09:26:23.964Z",
    percentageDiscount: Math.floor(Math.random() * 11) + 5,
  },
  {
    id: "bc5b9ca8-b585-46be-9834-fcce52437745",
    name: "Pannolini",
    slug: "pannolini",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id voluptate sunt quam harum molestiae magni non voluptates dicta ab necessitatibus cupiditate ducimus placeat modi, architecto blanditiis consectetur ex dolore illum!",
    price: 8.99,

    rating: parseFloat((Math.random() * 5).toFixed(1)),
    stock: Math.floor(Math.random() * 100) + 1,
    numReviews: 15,

    createdAt: "2025-02-10T09:26:23.964Z",
    updatedAt: "2025-02-10T09:26:23.964Z",
    percentageDiscount: Math.floor(Math.random() * 11) + 5,
  },
  {
    id: "b72a0bfe-e212-4aa8-bb72-df758bdd1068",
    name: "Sacchetti igienici",
    slug: "sacchetti-igienici",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id voluptate sunt quam harum molestiae magni non voluptates dicta ab necessitatibus cupiditate ducimus placeat modi, architecto blanditiis consectetur ex dolore illum!",
    price: 5.99,

    rating: parseFloat((Math.random() * 5).toFixed(1)),
    stock: Math.floor(Math.random() * 100) + 1,
    numReviews: 10,

    createdAt: "2025-02-10T09:26:23.964Z",
    updatedAt: "2025-02-10T09:26:23.964Z",
    percentageDiscount: Math.floor(Math.random() * 11) + 5,
  },
  {
    id: "78efdafe-cbe4-494c-9ab1-a567af6fbcb7",
    name: "Porta sacchettini",
    slug: "porta-sacchettini",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id voluptate sunt quam harum molestiae magni non voluptates dicta ab necessitatibus cupiditate ducimus placeat modi, architecto blanditiis consectetur ex dolore illum!",
    price: 6.49,

    rating: parseFloat((Math.random() * 5).toFixed(1)),
    stock: Math.floor(Math.random() * 100) + 1,
    numReviews: 12,

    createdAt: "2025-02-10T09:26:23.964Z",
    updatedAt: "2025-02-10T09:26:23.964Z",
    percentageDiscount: Math.floor(Math.random() * 11) + 5,
  },
  {
    id: "edc6e27d-9bf4-4b89-83d1-b2cd9a55bf55",
    name: "Traversine igieniche",
    slug: "traversine-igieniche",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id voluptate sunt quam harum molestiae magni non voluptates dicta ab necessitatibus cupiditate ducimus placeat modi, architecto blanditiis consectetur ex dolore illum!",
    price: 17.99,
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    stock: Math.floor(Math.random() * 100) + 1,
    numReviews: 18,

    createdAt: "2025-02-10T09:26:23.964Z",
    updatedAt: "2025-02-10T09:26:23.964Z",
    percentageDiscount: Math.floor(Math.random() * 11) + 5,
  },
  {
    id: "a8007da8-8424-4e33-883a-92cb67b0b17a",
    name: "Salviette",
    slug: "salviette",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id voluptate sunt quam harum molestiae magni non voluptates dicta ab necessitatibus cupiditate ducimus placeat modi, architecto blanditiis consectetur ex dolore illum!",
    price: 4.99,

    rating: parseFloat((Math.random() * 5).toFixed(1)),
    stock: Math.floor(Math.random() * 100) + 1,
    numReviews: 8,

    createdAt: "2025-02-10T09:26:23.964Z",
    updatedAt: "2025-02-10T09:26:23.964Z",
    percentageDiscount: Math.floor(Math.random() * 11) + 5,
  },
  {
    id: "d937b5bf-6c97-458f-94fc-8c4177d66b4d",
    name: "Antiparassitari e curativi",
    slug: "antiparassitari-e-curativi",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id voluptate sunt quam harum molestiae magni non voluptates dicta ab necessitatibus cupiditate ducimus placeat modi, architecto blanditiis consectetur ex dolore illum!",
    price: 21.99,
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    stock: Math.floor(Math.random() * 100) + 1,
    numReviews: 22,

    createdAt: "2025-02-10T09:26:23.964Z",
    updatedAt: "2025-02-10T09:26:23.964Z",
    percentageDiscount: Math.floor(Math.random() * 11) + 5,
  },
  {
    id: "376b4c13-68d4-49f0-843a-a8d2f0f5334e",
    name: "Antiparassitari",
    slug: "antiparassitari",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id voluptate sunt quam harum molestiae magni non voluptates dicta ab necessitatibus cupiditate ducimus placeat modi, architecto blanditiis consectetur ex dolore illum!",
    price: 19.49,
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    stock: Math.floor(Math.random() * 100) + 1,
    numReviews: 28,

    createdAt: "2025-02-10T09:26:23.964Z",
    updatedAt: "2025-02-10T09:26:23.964Z",
    percentageDiscount: Math.floor(Math.random() * 11) + 5,
  },
  {
    id: "a41ec06c-bfba-4451-99ca-33da8b04c62e",
    name: "Insettorepellenti",
    slug: "insettorepellenti",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id voluptate sunt quam harum molestiae magni non voluptates dicta ab necessitatibus cupiditate ducimus placeat modi, architecto blanditiis consectetur ex dolore illum!",
    price: 12.49,
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    stock: Math.floor(Math.random() * 100) + 1,
    numReviews: 32,

    createdAt: "2025-02-10T09:26:23.964Z",
    updatedAt: "2025-02-10T09:26:23.964Z",
    percentageDiscount: Math.floor(Math.random() * 11) + 5,
  },
  {
    id: "3654fbd2-ec62-4081-b15d-ffc5a361278f",
    name: "Alimenti complementari",
    slug: "alimenti-complementari",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id voluptate sunt quam harum molestiae magni non voluptates dicta ab necessitatibus cupiditate ducimus placeat modi, architecto blanditiis consectetur ex dolore illum!",
    price: 8.49,

    rating: parseFloat((Math.random() * 5).toFixed(1)),
    stock: Math.floor(Math.random() * 100) + 1,
    numReviews: 14,

    createdAt: "2025-02-10T09:26:23.964Z",
    updatedAt: "2025-02-10T09:26:23.964Z",
    percentageDiscount: Math.floor(Math.random() * 11) + 5,
  },
  {
    id: "944b7192-a04b-4543-b982-072e730a272f",
    name: "Parafarmacia",
    slug: "parafarmacia",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id voluptate sunt quam harum molestiae magni non voluptates dicta ab necessitatibus cupiditate ducimus placeat modi, architecto blanditiis consectetur ex dolore illum!",
    price: 23.99,
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    stock: Math.floor(Math.random() * 100) + 1,
    numReviews: 26,

    createdAt: "2025-02-10T09:26:23.964Z",
    updatedAt: "2025-02-10T09:26:23.964Z",
    percentageDiscount: Math.floor(Math.random() * 11) + 5,
  },
];

export default product;
