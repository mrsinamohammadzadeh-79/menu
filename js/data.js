/* ============================================================
   VELOURIA — داده‌های منو
   ------------------------------------------------------------
   تمام اطلاعات منو (دسته‌ها، محصولات، قیمت‌ها، عکس‌ها) در همین
   فایل است. برای تغییر کافیست این فایل را ویرایش کنید.

   مسیر عکس‌ها نسبت به پوشه index.html است:
images/logo/velouria.svg
axx/logo3.png
   images/categories/cake.svg
   images/products/cake-chocolate.svg
   ============================================================ */

const MENU = {
  /* ---------- برند ---------- */
  brand: {
    logo: "   axx/logo3.png",
    englishName: "VELOURIA",
    subtitle: "CAKE & COOKIE",
  },

  /* ---------- راه‌های ارتباط ---------- */
  contact: {
    phoneDisplay: "09919667432",
    phoneHref: "tel:+989919667432",
    instagram: "https://instagram.com/velouriabake.ir",
    instagramHandle: "velouriabake.ir",
    waNumber: "989919667432",
    waText: "سلام، جهت ثبت سفارش در واتساپ پیام می‌دهم.",
  },
  orderNote: "جهت ثبت سفارش یک الی دو روز قبل سفارش خود را ثبت کنید. محصولات برای هر سفارش، به صورت «تازه پخت» ارسال می‌شود.",

  /* ---------- شبکه‌های اجتماعی ---------- */
  social: [
    {
      id: "instagram",
      name: "اینستاگرام",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none"/></svg>',
    },
    {
      id: "whatsapp",
      name: "واتساپ",
      icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>',
    },
    {
      id: "phone",
      name: "تماس",
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l1.5 4.5L8 10a11 11 0 0 0 5 5l1.5-2.5L19 14v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
    },
  ],

  /* ---------- دسته‌بندی‌ها ---------- */
  categories: [
    {
      id: "cake-dessert",
      title: "کیک و دسر",
      englishTitle: "CAKE & DESSERT",
      image: "axx/C.png",
      tagline: "کیک‌ها و دسرهای تازه و دست‌ساز",
      note: "تمام آیتم‌ها در قالب گرد و مربع قابل سفارش است.",
      icon: '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><g stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 22 h20 l-2 18 h-16 z"/><path d="M17 28 h14"/><path d="M24 22 v-6"/><path d="M24 8 c0 3 -2 4 -2 4 0 1.5 2 2.5 2 4 0 1.5 -2 2.5 -2 4"/><path d="M30 8 c0 3 -2 4 -2 4 0 1.5 2 2.5 2 4 0 1.5 -2 2.5 -2 4"/><path d="M18 8 c0 3 -2 4 -2 4 0 1.5 2 2.5 2 4 0 1.5 -2 2.5 -2 4"/><path d="M12 40 h24"/></g></svg>',
      products: [
        {
          id: "cake-chocolate",
          name: "کیک شکلاتی",
          englishName: "Chocolate Cake",
          description: "هنگام سفارش ساده یا با گاناش را ذکر کنید",
          price: 185000,
          image: "axx/best-one-bowl-chocolate-cake.jpg",
          ingredients: ["شکلات", "آرد", "تخم مرغ", "خامه"],
          sizes: [
            { name: "تک نفره", price: 95000 },
            { name: "دو نفره", price: 185000 },
          ],
          featured: true,
        },
        {
          id: "cake-san-sebastian",
          name: "چیز کیک سن سباستین",
          englishName: "San Sebastian",
          description: "چیزکیک پخته کارامل‌گونه با مغز نرم و سطح سوخته",
          price: 210000,
          image: "axx/san-sebastian.png",
          ingredients: ["کرم پنیر", "خامه", "زرده تخم مرغ", "شکر"],
          sizes: [
            { name: "تک نفره", price: 105000 },
            { name: "دو نفره", price: 210000 },
          ],
          featured: true,
        },
        {
          id: "cake-carrot",
          name: "کیک هویج و گردو",
          englishName: "Carrot Walnut Cake",
          description: "کیک هویج با گردوی خرد شده، دارچین و کرم پنیر",
          price: 165000,
          image: "axx/havij.png",
          ingredients: ["هویج", "گردو", "دارچین", "کرم پنیر"],
        },
        {
          id: "cake-vanilla",
          name: "کیک وانیلی",
          englishName: "Vanilla Cake",
          description: "هنگام سفارش ساده یا با گاناش را ذکر کنید",
          price: 155000,
          image: "axx/cake-vanilla.png",
          ingredients: ["وانیل", "آرد", "تخم مرغ", "کره"],
        },
        {
          id: "cake-butter-choc",
          name: "کیک کره‌ای",
          englishName: "Butter Cake",
          description: "هنگام سفارش با شکلات چیپسی یا با گاناش شکلاتی را ذکر کنید",
          price: 195000,
          image: "axx/cake-butter.png",
          ingredients: ["کره", "شکلات", "آرد", "تخم مرغ"],
        },
        {
          id: "cake-yazdi",
          name: "کیک یزدی",
          englishName: "Yazdi Cake",
          description: "اعلا",
          price: 75000,
          image: "axx/Cake-Yazdi-Recipe-683x1024.jpg",
          ingredients: ["ماست", "هل", "بادام", "تخم مرغ"],
        },
        {
          id: "cake-orange",
          name: "کیک پرتقالی",
          englishName: "Orange Cake",
          description: "کیک پرتقالی معطر با رنده پوست پرتقال و شربت",
          price: 160000,
          image: "axx/orange-cake-17-of-18.jpg",
          ingredients: ["پرتقال", "کره", "آرد", "تخم مرغ"],
        },
        {
          id: "dessert-tiramisu",
          name: "تیرامیسو کلاسیک",
          englishName: "Classic Tiramisu",
          description: "قابل سفارش در ابعاد مورد نظر شما (ظرف‌های تک نفره یا ظرف سرو بزرگ)",
          price: 135000,
          image: "axx/Tiramisu-Cups-1.jpg",
          ingredients: ["ماسکارپونه", "اسپرسو", "بیسکویت", "کاکائو"],
          featured: true,
        },
      ],
    },

    {
      id: "cookie-pie",
      title: "کوکی و پای",
      englishTitle: "COOKIE & PIE",
      image: "axx/P.png",
      tagline: "کوکی‌های تازه از فر و پای‌های خانگی",
      icon: '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><g stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="24" cy="24" r="16"/><path d="M17 18 q-3 3 0 6"/><path d="M27 16 q3 1 3 4"/><path d="M30 30 q-2 3 -6 2"/><path d="M16 30 q-1 2 1 3"/><circle cx="24" cy="24" r="1.2" fill="currentColor" stroke="none"/></g></svg>',
      products: [
        {
          id: "cookie-coffee",
          name: "کوکی دونه قهوه",
          englishName: "Coffee Bean Cookie",
          description: "هر عدد ۸ گرمی، مناسب افراد ورزشکار و دارای رژیم. تهیه شده با شکر قهوه‌ای، کم شکر و کم کالری",
          price: 55000,
          image: "axx/Coffee-Bean-Cookies-Recipe-1-1024x806.jpg",
          ingredients: ["قهوه", "کره", "شکر قهوه‌ای"],
          featured: true,
        },
        {
          id: "cookie-ny",
          name: "کوکی نیویورکی کلاسیک",
          englishName: "Classic New York Cookie",
          description: "هر کدام ۶۵ الی ۷۰ گرم همراه با مغزی شکلات تلخ ۶۰ درصد",
          price: 60000,
          image: "axx/Chunky-NYC-Cookies-Recipe-UK.jpeg",
          ingredients: ["شکلات", "کره", "شکر قهوه‌ای", "وانیل"],
          featured: true,
        },
        {
          id: "cookie-double-choc",
          name: "کوکی دبل چاکلت",
          englishName: "Double Chocolate Cookie",
          description: "هر کدام ۶۵ الی ۷۰ گرم",
          price: 65000,
          image: "axx/double-choc.png",
          ingredients: ["کاکائو", "شکلات سفید", "شکلات تلخ", "کره"],
        },
        {
          id: "pie-apple",
          name: "پای سیب",
          englishName: "Apple Pie",
          description: "پای سیب دارچینی با بافت ترد",
          price: 140000,
          image: "axx/pie-apple.png",
          ingredients: ["سیب", "دارچین", "کره", "آرد"],
          featured: true,
        },
      ],
    },

    {
      id: "brownies",
      title: "براونی و بلوندی",
      englishTitle: "BROWNIE & BLONDIE",
      image: "axx/B.png",
      tagline: "براونی‌های خانگی غنی و شکلاتی",
      note: "تمام آیتم‌ها در قالب مربع ۲۰×۲۰ ارائه می‌شود.",
      icon: '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><g stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="11" y="13" width="26" height="25" rx="5"/><path d="M15 26h18"/><path d="M17 20h6"/><circle cx="27" cy="20" r="1.1" fill="currentColor" stroke="none"/><circle cx="19" cy="32" r="1.1" fill="currentColor" stroke="none"/><circle cx="30" cy="32" r="1.1" fill="currentColor" stroke="none"/></g></svg>',
      products: [
        {
          id: "brownie-classic",
          name: "براونی کلاسیک",
          englishName: "Classic Brownie",
          description: "براونی غنی شکلاتی با مغز نرم و سطح براق",
          price: 85000,
          image: "axx/brownie-classic.png",
          ingredients: ["شکلات", "کره", "تخم مرغ", "آرد"],
          featured: true,
        },
        {
          id: "brownie-marble",
          name: "ماربل براونی",
          englishName: "Marble Brownie",
          description: "براونی کلاسیک همراه با رویه پنیری",
          price: 95000,
          image: "axx/brownie-marble.png",
          ingredients: ["شکلات", "کرم پنیر", "کره", "تخم مرغ"],
        },
        {
          id: "brownie-brookie",
          name: "بروکی",
          englishName: "Brookie",
          description: "براونی همراه با کوکی کلاسیک",
          price: 110000,
          image: "axx/brookie.png",
          ingredients: ["شکلات", "خمیر کوکی", "کره", "وانیل"],
        },
      ],
    },
  ],
};

/* ---------- توابع کمکی ---------- */
function formatPrice(price) {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
}

function formatPriceOnly(price) {
  return new Intl.NumberFormat("fa-IR").format(price);
}