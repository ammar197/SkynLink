import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Arabic translations
const arTranslations = {
  common: {
    home: "الرئيسية",
    browse: "تصفح السكنات",
    howItWorks: "كيف يعمل",
    help: "المساعدة",
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    logout: "تسجيل الخروج",
    search: "بحث",
    add: "إضافة",
    account: "حسابي",
    all: "الكل",
    viewAll: "عرض الكل",
    price: "السعر",
    location: "الموقع",
    rooms: "غرف",
    bathrooms: "حمام",
    gender: "الجنس",
    save: "حفظ",
    cancel: "إلغاء"
  },
  language: {
    ar: "عربي",
    en: "EN"
  },
  propertyTypes: {
    all: "كل الأنواع",
    fullApartment: "شقة كاملة",
    privateRoom: "غرفة خاصة",
    sharedBed: "سرير مشترك"
  },
  areas: {
    all: "كل المناطق",
    fatih: "الفاتح",
    taksim: "تقسيم",
    besiktas: "بشكتاش",
    sisli: "شيشلي"
  },
  genderTypes: {
    mixed: "مختلط",
    male: "للشباب فقط",
    female: "للبنات فقط"
  },
  home: {
    hero: {
      title: "ابحث عن سكنك المثالي في إسطنبول",
      subtitle: "منصة تربط الطلاب والشباب العرب بأصحاب الشقق والغرف في إسطنبول",
      area: "المنطقة",
      propertyType: "نوع السكن",
      searchButton: "بحث"
    },
    features: {
      housingOptions: {
        title: "خيارات سكن متنوعة",
        description: "شقق كاملة، غرف خاصة، أو أسرّة مشتركة تناسب ميزانيتك"
      },
      strategicLocations: {
        title: "مواقع استراتيجية",
        description: "سكن قريب من الجامعات ووسائل النقل العام"
      },
      trustedCommunication: {
        title: "تواصل موثوق",
        description: "تواصل مباشر مع أصحاب السكن بدون وسطاء"
      }
    },
    featuredProperties: {
      title: "السكنات المميزة",
      monthly: "/ شهرياً"
    },
    neighborhoods: {
      title: "استكشف أحياء إسطنبول"
    },
    howItWorks: {
      title: "كيف يعمل سكنلي؟",
      step1: {
        title: "تصفح السكنات",
        description: "ابحث عن السكن المناسب عبر تصفح الخيارات المتاحة في أحياء إسطنبول المختلفة"
      },
      step2: {
        title: "تواصل مع المالك",
        description: "تواصل مباشرة مع مالك السكن لطرح أسئلتك وترتيب موعد للمعاينة"
      },
      step3: {
        title: "انتقل إلى سكنك الجديد",
        description: "بعد اختيار السكن المناسب، أكمل إجراءات التأجير وانتقل إلى سكنك الجديد"
      },
      startButton: "ابدأ البحث الآن"
    },
    ownerCTA: {
      title: "هل لديك سكن للإيجار؟",
      description: "أعلن عن شقتك أو غرفتك مجاناً وتواصل مع الطلاب والشباب العرب في إسطنبول",
      button: "أضف سكنك الآن"
    },
    testimonials: {
      title: "ماذا يقول مستخدمونا",
      testimonial1: {
        text: "وجدت غرفة مناسبة في منطقة الفاتح خلال أسبوع من وصولي إلى إسطنبول. المنصة سهلت علي التواصل مع صاحب السكن مباشرة دون الحاجة لدفع عمولات للوسطاء.",
        author: "عمار من الجزائر",
        role: "طالب في جامعة إسطنبول"
      },
      testimonial2: {
        text: "كمالك شقة في تقسيم، ساعدني سكنلي على تأجير غرفتي الإضافية بسرعة لطالب سوري. المنصة سهلة الاستخدام والتواصل مع المستأجرين مباشر وواضح.",
        author: "خالد من تركيا",
        role: "مالك شقة في تقسيم"
      }
    }
  },
  auth: {
    login: {
      title: "تسجيل الدخول",
      username: "اسم المستخدم",
      password: "كلمة المرور",
      button: "تسجيل الدخول",
      noAccount: "ليس لديك حساب؟",
      createAccount: "إنشاء حساب"
    },
    register: {
      title: "إنشاء حساب",
      fullName: "الاسم الكامل",
      username: "اسم المستخدم",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      role: "نوع الحساب",
      roles: {
        tenant: "مستأجر",
        owner: "مالك عقار"
      },
      button: "إنشاء حساب",
      hasAccount: "لديك حساب بالفعل؟",
      login: "تسجيل الدخول"
    },
    welcome: {
      title: "أهلاً بك في سكنلي",
      description: "المنصة الأولى لربط الطلاب والشباب العرب بأصحاب السكن في إسطنبول"
    }
  },
  properties: {
    title: "تصفح السكنات",
    filters: {
      title: "الفلاتر",
      area: "المنطقة",
      type: "النوع",
      gender: "مناسب لـ",
      priceRange: "نطاق السعر",
      applyFilters: "تطبيق الفلاتر",
      resetFilters: "إعادة ضبط"
    },
    noResults: "لا توجد نتائج للبحث",
    monthly: "/ شهرياً"
  },
  propertyDetails: {
    contactOwner: "تواصل مع المالك",
    features: "المميزات",
    location: "الموقع",
    description: "الوصف",
    ownerInfo: "معلومات المالك",
    similar: "عقارات مشابهة"
  },
  addProperty: {
    title: "إضافة سكن جديد",
    form: {
      titleAr: "العنوان (بالعربية)",
      titleEn: "العنوان (بالإنجليزية)",
      descriptionAr: "الوصف (بالعربية)",
      descriptionEn: "الوصف (بالإنجليزية)",
      price: "السعر الشهري (₺)",
      locationAr: "الموقع التفصيلي (بالعربية)",
      locationEn: "الموقع التفصيلي (بالإنجليزية)",
      area: "المنطقة",
      type: "نوع السكن",
      gender: "مناسب لـ",
      rooms: "عدد الغرف",
      bathrooms: "عدد الحمامات",
      imageUrl: "رابط الصورة",
      submit: "إضافة السكن",
      reset: "إعادة ضبط"
    }
  },
  footer: {
    description: "منصة تربط الطلاب والشباب العرب بأصحاب السكن في إسطنبول",
    quickLinks: "روابط سريعة",
    areas: "المناطق",
    contact: "تواصل معنا",
    address: "إسطنبول، تركيا",
    rights: "© 2023 سكنلي. جميع الحقوق محفوظة."
  }
};

// English translations
const enTranslations = {
  common: {
    home: "Home",
    browse: "Browse Properties",
    howItWorks: "How It Works",
    help: "Help",
    login: "Login",
    signup: "Sign Up",
    logout: "Logout",
    search: "Search",
    add: "Add",
    account: "Account",
    all: "All",
    viewAll: "View All",
    price: "Price",
    location: "Location",
    rooms: "Rooms",
    bathrooms: "Bathroom",
    gender: "Gender",
    save: "Save",
    cancel: "Cancel"
  },
  language: {
    ar: "Arabic",
    en: "English"
  },
  propertyTypes: {
    all: "All Types",
    fullApartment: "Full Apartment",
    privateRoom: "Private Room",
    sharedBed: "Shared Bed"
  },
  areas: {
    all: "All Areas",
    fatih: "Fatih",
    taksim: "Taksim",
    besiktas: "Beşiktaş",
    sisli: "Şişli"
  },
  genderTypes: {
    mixed: "Mixed",
    male: "Males Only",
    female: "Females Only"
  },
  home: {
    hero: {
      title: "Find Your Perfect Housing in Istanbul",
      subtitle: "A platform connecting Arab students and youth with apartment and room owners in Istanbul",
      area: "Area",
      propertyType: "Property Type",
      searchButton: "Search"
    },
    features: {
      housingOptions: {
        title: "Diverse Housing Options",
        description: "Full apartments, private rooms, or shared beds to fit your budget"
      },
      strategicLocations: {
        title: "Strategic Locations",
        description: "Housing near universities and public transport"
      },
      trustedCommunication: {
        title: "Trusted Communication",
        description: "Direct communication with property owners without intermediaries"
      }
    },
    featuredProperties: {
      title: "Featured Properties",
      monthly: "/ month"
    },
    neighborhoods: {
      title: "Explore Istanbul Neighborhoods"
    },
    howItWorks: {
      title: "How does Sakanli work?",
      step1: {
        title: "Browse Properties",
        description: "Search for suitable housing by browsing available options in different Istanbul neighborhoods"
      },
      step2: {
        title: "Contact the Owner",
        description: "Communicate directly with the property owner to ask questions and arrange a viewing appointment"
      },
      step3: {
        title: "Move to Your New Home",
        description: "After choosing suitable housing, complete rental procedures and move to your new home"
      },
      startButton: "Start Searching Now"
    },
    ownerCTA: {
      title: "Do you have property for rent?",
      description: "Advertise your apartment or room for free and connect with Arab students and youth in Istanbul",
      button: "List Your Property Now"
    },
    testimonials: {
      title: "What Our Users Say",
      testimonial1: {
        text: "I found a suitable room in the Fatih area within a week of arriving in Istanbul. The platform made it easy for me to communicate directly with the landlord without having to pay commissions to intermediaries.",
        author: "Ammar from Algeria",
        role: "Student at Istanbul University"
      },
      testimonial2: {
        text: "As the owner of an apartment in Taksim, Sakanli helped me quickly rent my extra room to a Syrian student. The platform is easy to use and communication with tenants is direct and clear.",
        author: "Khalid from Turkey",
        role: "Apartment owner in Taksim"
      }
    }
  },
  auth: {
    login: {
      title: "Login",
      username: "Username",
      password: "Password",
      button: "Login",
      noAccount: "Don't have an account?",
      createAccount: "Create Account"
    },
    register: {
      title: "Create Account",
      fullName: "Full Name",
      username: "Username",
      email: "Email",
      phone: "Phone Number",
      password: "Password",
      confirmPassword: "Confirm Password",
      role: "Account Type",
      roles: {
        tenant: "Tenant",
        owner: "Property Owner"
      },
      button: "Create Account",
      hasAccount: "Already have an account?",
      login: "Login"
    },
    welcome: {
      title: "Welcome to Sakanli",
      description: "The first platform connecting Arab students and youth with property owners in Istanbul"
    }
  },
  properties: {
    title: "Browse Properties",
    filters: {
      title: "Filters",
      area: "Area",
      type: "Type",
      gender: "Suitable for",
      priceRange: "Price Range",
      applyFilters: "Apply Filters",
      resetFilters: "Reset"
    },
    noResults: "No results found",
    monthly: "/ month"
  },
  propertyDetails: {
    contactOwner: "Contact Owner",
    features: "Features",
    location: "Location",
    description: "Description",
    ownerInfo: "Owner Information",
    similar: "Similar Properties"
  },
  addProperty: {
    title: "Add New Property",
    form: {
      titleAr: "Title (Arabic)",
      titleEn: "Title (English)",
      descriptionAr: "Description (Arabic)",
      descriptionEn: "Description (English)",
      price: "Monthly Price (₺)",
      locationAr: "Detailed Location (Arabic)",
      locationEn: "Detailed Location (English)",
      area: "Area",
      type: "Property Type",
      gender: "Suitable for",
      rooms: "Number of Rooms",
      bathrooms: "Number of Bathrooms",
      imageUrl: "Image URL",
      submit: "Add Property",
      reset: "Reset"
    }
  },
  footer: {
    description: "A platform connecting Arab students and youth with property owners in Istanbul",
    quickLinks: "Quick Links",
    areas: "Areas",
    contact: "Contact Us",
    address: "Istanbul, Turkey",
    rights: "© 2023 Sakanli. All rights reserved."
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: arTranslations },
      en: { translation: enTranslations }
    },
    lng: "ar",
    fallbackLng: "ar",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
