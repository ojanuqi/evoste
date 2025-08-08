export interface Product {
  productId: number;
  slug: string;
  name: string;
  descriptionShort: string;
  ingredients: {
    top_notes: string[];
    middle_notes: string[];
    base_notes: string[];
  };
  sizes: { size: string; price: number }[];
  image: string;
}

const products: Product[] = [
  {
    productId: 1,
    slug: "midnight-cherry",
    name: "Midnight Cherry",
    descriptionShort:
      "A seductive fruity fragrance with the rich sweetness of black cherry and the warmth of vanilla and patchouli.",
    ingredients: {
      top_notes: ["Black Cherry", "Cherry Liqueur", "Bitter Almond", "Bergamot"],
      middle_notes: ["Orange Blossom", "Jasmine Sambac", "Cinnamon"],
      base_notes: ["Vanilla", "Tonka Bean", "Patchouli"],
    },
    sizes: [
      { size: "30ml", price: 199000 },
      { size: "50ml", price: 299000 },
    ],
    image: "/parfum/Midnight Cherry.png",
  },
  {
    productId: 2,
    slug: "ivory-bloom",
    name: "Ivory Bloom",
    descriptionShort:
      "A soft floral fragrance with a touch of lychee and vanilla, perfect for daytime elegance.",
    ingredients: {
      top_notes: ["Lychee", "Rhubarb", "Bergamot", "Saffron"],
      middle_notes: ["Turkish Rose", "Jasmine"],
      base_notes: ["Vanilla", "Musk"],
    },
    sizes: [
      { size: "30ml", price: 199000 },
      { size: "50ml", price: 299000 },
    ],
    image: "/parfum/Ivory Bloom.png",
  },
  {
    productId: 3,
    slug: "citrine-flame",
    name: "Citrine Flame",
    descriptionShort:
      "A vibrant citrus scent with energizing bergamot and a woody amber finish.",
    ingredients: {
      top_notes: ["Bergamot", "Apple", "Aromatic", "Bouquet"],
      middle_notes: ["Plum", "Cedarwood", "Geranium"],
      base_notes: ["Vetiver", "Chocolate", "Woody Ambery"],
    },
    sizes: [
      { size: "30ml", price: 199000 },
      { size: "50ml", price: 299000 },
    ],
    image: "/parfum/Citrine Flame.png",
  },
  {
    productId: 4,
    slug: "oud-legendaire",
    name: "Oud Legendaire",
    descriptionShort:
      "A luxurious woody fragrance with hints of pineapple and rich oud, made for formal occasions.",
    ingredients: {
      top_notes: ["Passionfruit", "Fruity", "Bergamot"],
      middle_notes: ["Woody", "Pineapple", "Mango"],
      base_notes: ["Woody Notes", "Patchouli", "Agarwood (Oud)", "Amber"],
    },
    sizes: [
      { size: "30ml", price: 199000 },
      { size: "50ml", price: 299000 },
    ],
    image: "/parfum/Oud Legendaire.png",
  },
  {
    productId: 5,
    slug: "or-du-soir",
    name: "Or du Soir",
    descriptionShort:
      "A sensual gourmand fragrance with roasted coffee, caramel, and sweet tonka bean.",
    ingredients: {
      top_notes: ["Amaretto", "Black Pepper"],
      middle_notes: ["Ice Cream", "Caramel", "Roasted Coffee"],
      base_notes: ["Bourbon Vanilla", "Brown Sugar", "Tonka Bean", "Suede"],
    },
    sizes: [
      { size: "30ml", price: 199000 },
      { size: "50ml", price: 299000 },
    ],
    image: "/parfum/Or du Soir.png",
  },
];

export default products;
