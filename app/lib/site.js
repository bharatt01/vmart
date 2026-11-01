// One place for store details. Edit these and the whole site updates.
export const site = {
  name: "Value Mart",
  shortName: "VMart",
  phone: "+91 98765 43210",
  whatsapp: "919876543210", // country code + number, no + or spaces
  address: "Your street, Your area, Delhi",
  mapQuery: "Your store name, Your area, Delhi", // what Google Maps should search for
  open: 7, // opening hour, 24h clock
  close: 22, // closing hour, 24h clock
  hours: "Open daily, 7:00 am to 10:00 pm",
  nav: [
    { label: "Home", href: "/" },
    { label: "Departments", href: "/departments" },
    { label: "Offers", href: "/offers" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

// 7 -> "7 am", 22 -> "10 pm"
export const hourLabel = (h) => `${h % 12 === 0 ? 12 : h % 12} ${h < 12 ? "am" : "pm"}`;
