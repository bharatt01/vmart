// Sample content. Replace with your real products, prices and wording.
// "stickers" / "sticker" use the names from components/Stickers.jsx:
// orange, tomato, carrot, milk, bread, berries, sack, oil, cookie, bottle, peas

// tone = Tailwind classes for the tile. Keep them as full strings.
export const departments = [
  {
    image: "/fruitsandvegetable.png",
    name: "Fruits and vegetables",
    items: "Seasonal fruit, leafy greens, onions, potatoes, tomatoes and everything for the daily sabzi.",
    tone: "bg-brand-orange text-white",
    size: "md:col-span-2 md:row-span-2",
    big: true,
    stickers: ["tomato", "orange", "carrot"],
  },
  { 
    image: "/attarice.jpg",
    name: "Atta, rice and dal", items: "Staples in 1 kg to 25 kg packs.", tone: "bg-brand-blue text-white", stickers: ["sack"] },
  { name: "Dairy and eggs", items: "Milk, curd, paneer, butter, eggs.", tone: "bg-mist text-brand-ink", stickers: ["milk"] },
  { name: "Oil, ghee and masala", items: "Cooking oils, ghee, whole and ground spices.", tone: "bg-sun text-brand-navy", stickers: ["oil"] },
  { name: "Snacks and drinks", items: "Biscuits, namkeen, juices, tea, coffee.", tone: "bg-brand-orange/15 text-brand-ink", stickers: ["cookie"] },
  {
    name: "Household and cleaning",
    items: "Detergent, dishwash, floor cleaner, tissues, bin bags and the rest of the monthly list.",
    tone: "bg-brand-navy text-white",
    size: "md:col-span-2",
    stickers: ["bottle"],
  },
  { name: "Bakery", items: "Bread, buns, rusk and cakes.", tone: "bg-brand-blue/10 text-brand-ink", stickers: ["bread"] },
  { name: "Packaged and frozen", items: "Ready-to-cook, noodles, sauces, frozen peas.", tone: "bg-brand-blue text-white", stickers: ["peas"] },
];

export const offers = [
  { name: "Toor dal", unit: "1 kg", price: 148, mrp: 165, till: "Sunday", sticker: "sack" },
  { name: "Sunflower oil", unit: "1 litre", price: 129, mrp: 145, till: "Sunday", sticker: "oil" },
  { name: "Basmati rice", unit: "5 kg", price: 549, mrp: 620, till: "Sunday", sticker: "sack" },
  { name: "Full cream milk", unit: "1 litre", price: 66, mrp: 70, till: "Sunday", sticker: "milk" },
  { name: "Tea leaves", unit: "500 g", price: 215, mrp: 245, till: "Sunday" },
  { name: "Detergent powder", unit: "2 kg", price: 239, mrp: 280, till: "Sunday", sticker: "bottle" },
  { name: "Atta", unit: "10 kg", price: 389, mrp: 430, till: "Sunday", sticker: "sack" },
  { name: "Family biscuits", unit: "600 g", price: 89, mrp: 110, till: "Sunday", sticker: "cookie" },
];

// A day in the store. Replace the times and details with how your day really runs.
export const day = [
  { time: "6:00 am", title: "Vegetables and milk arrive", text: "Crates come off the truck before the shutters go up, so the shelves are full when you walk in.", sticker: "carrot" },
  { time: "7:00 am", title: "Doors open", text: "Fresh bread on the shelf and the counter ready for early walkers and the school run.", sticker: "bread" },
  { time: "12:00 pm", title: "Midday restock", text: "Fruit and dairy topped up, offers checked, prices re-marked.", sticker: "peas" },
  { time: "6:00 pm", title: "Evening top-up", text: "The busiest hour. Extra hands at the billing counter so nobody waits long.", sticker: "milk" },
  { time: "10:00 pm", title: "Last bill of the day", text: "We close, tidy up and start planning tomorrow morning's order.", sticker: "berries" },
];

export const reasons = [
  {
    title: "Stocked fresh every morning",
    text: "Fruit, vegetables and dairy arrive before we open, so what is on the shelf is what we would buy ourselves.",
    sticker: "tomato",
  },
  {
    title: "Prices marked on every shelf",
    text: "The price you see is the price at the counter. Weekly offers are listed on this site too.",
    sticker: "oil",
  },
  {
    title: "A shop you can talk to",
    text: "Ask for a brand, a pack size or a recipe idea. If we do not stock something, tell us and we will try to.",
    sticker: "orange",
  },
];
