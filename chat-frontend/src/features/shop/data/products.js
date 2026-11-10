export const products = [
  {
    id: "motichoor-laddu",
    name: "Motichoor Laddu",
    category: "Traditional",
    price: 320,
    unit: "500 g box",
    rating: "4.9",
    description:
      "Tiny pearls of golden boondi, gently bound with ghee, cardamom, and a little celebration.",
    emoji: "🟠",
    color: "peach",
    badge: "Bestseller",
  },
  {
    id: "kaju-katli",
    name: "Kaju Katli",
    category: "Traditional",
    price: 480,
    unit: "500 g box",
    rating: "4.8",
    description:
      "Silky cashew diamond slices finished with a delicate layer of edible silver leaf.",
    emoji: "💎",
    color: "sage",
    badge: "Customer favorite",
  },
  {
    id: "rose-pistachio-cake",
    name: "Rose Pistachio Cake",
    category: "Cakes",
    price: 650,
    unit: "1 kg cake",
    rating: "4.9",
    description:
      "Soft, fragrant layers with rose cream and a generous sprinkle of roasted pistachios.",
    emoji: "🍰",
    color: "pink",
    badge: "Made fresh",
  },
  {
    id: "dark-chocolate-bites",
    name: "Dark Chocolate Bites",
    category: "Chocolates",
    price: 290,
    unit: "250 g box",
    rating: "4.7",
    description:
      "Rich, smooth dark chocolate bites with toasted almonds for a little crunch.",
    emoji: "🍫",
    color: "cocoa",
    badge: "",
  },
  {
    id: "badam-halwa",
    name: "Badam Halwa",
    category: "Traditional",
    price: 390,
    unit: "400 g box",
    rating: "4.8",
    description:
      "Slow-cooked almond goodness with ghee and saffron, just like a festive family recipe.",
    emoji: "🥮",
    color: "honey",
    badge: "",
  },
  {
    id: "strawberry-cupcakes",
    name: "Strawberry Cupcakes",
    category: "Cakes",
    price: 360,
    unit: "Box of 4",
    rating: "4.6",
    description:
      "Fluffy vanilla cupcakes crowned with strawberry frosting and real berry pieces.",
    emoji: "🧁",
    color: "berry",
    badge: "Small batch",
  },
  {
    id: "assorted-truffles",
    name: "Assorted Truffles",
    category: "Chocolates",
    price: 420,
    unit: "Box of 8",
    rating: "4.9",
    description:
      "A little box of cocoa-dusted, melt-in-your-mouth truffles in four lovely flavors.",
    emoji: "🍬",
    color: "lavender",
    badge: "",
  },
  {
    id: "ghee-mysore-pak",
    name: "Ghee Mysore Pak",
    category: "Traditional",
    price: 350,
    unit: "500 g box",
    rating: "4.8",
    description:
      "A soft, buttery classic made with gram flour, sugar, and plenty of pure ghee.",
    emoji: "🟨",
    color: "lemon",
    badge: "Traditional recipe",
  },
];

export function getProduct(productId) {
  return products.find((product) => product.id === productId);
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}
