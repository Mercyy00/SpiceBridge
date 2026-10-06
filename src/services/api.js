/**
 * SpiceBridge API Service
 * 
 * Supports both:
 * 1. Live JSON-Server (http://localhost:5000) when running.
 * 2. Automatic, seamless offline LocalStorage Fallback if JSON-Server is not started,
 *    guaranteeing that the college project always works flawlessly out-of-the-box!
 */

const API_URL = "http://localhost:5000";

// Fallback initial database
const INITIAL_DATA = {
  users: [
    {
      id: "u1",
      name: "Admin User",
      email: "admin@spicebridge.com",
      password: "admin123",
      role: "admin"
    },
    {
      id: "u2",
      name: "Rahul Sharma",
      email: "buyer@spicebridge.com",
      password: "buyer123",
      role: "buyer"
    },
    {
      id: "u3",
      name: "Sales Executive",
      email: "sales@spicebridge.com",
      password: "sales123",
      role: "sales"
    },
    {
      id: "u-1790712448764",
      name: "Rohit Verma",
      email: "rohit@gmail.com",
      password: "rohit09",
      role: "buyer"
    }
  ],
  categories: [
    {
      id: "c1",
      name: "Whole Spices",
      description: "Premium whole spices direct from certified Indian farms."
    },
    {
      id: "c2",
      name: "Ground Spices",
      description: "Finely ground spices and custom spice powders for international buyers."
    },
    {
      id: "c3",
      name: "Pulses & Grains",
      description: "Export-grade pulses, lentils and long-grain aromatic rice."
    },
    {
      id: "c4",
      name: "Agro Products",
      description: "Selected agricultural commodities, seeds and natural extracts."
    }
  ],
  products: [
    {
      id: "p1",
      name: "Premium Black Pepper",
      categoryId: "c1",
      origin: "Kerala, India",
      grade: "FAQ / ASTA 550 g/l",
      moisture: "Max 12%",
      packaging: "25 kg / 50 kg PP Bags",
      moq: "500 kg",
      priceRange: "$5.20 - $6.10 / kg",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80",
      description: "Malabar black pepper renowned globally for its pungent aroma, rich piperine content and uniform grain size.",
      featured: true
    },
    {
      id: "p2",
      name: "Turmeric Finger",
      categoryId: "c1",
      origin: "Maharashtra & Tamil Nadu, India",
      grade: "Salem / Erode (Curcumin > 3.5%)",
      moisture: "Max 10%",
      packaging: "25 kg / 50 kg Jute Bags",
      moq: "1 MT",
      priceRange: "$2.10 - $2.80 / kg",
      image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=900&q=80",
      description: "High-curcumin sun-dried turmeric fingers carefully polished and graded for food processing and herbal extraction.",
      featured: true
    },
    {
      id: "p3",
      name: "Cumin Seeds (Jeera)",
      categoryId: "c1",
      origin: "Gujarat & Rajasthan, India",
      grade: "Machine Cleaned / Sortex 99.5%",
      moisture: "Max 9%",
      packaging: "25 kg / 50 kg PP Bags",
      moq: "500 kg",
      priceRange: "$3.80 - $4.60 / kg",
      image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=900&q=80",
      description: "Aromatic machine-cleaned cumin seeds with intense essential oil content, zero foreign matter and uniform colour.",
      featured: true
    },
    {
      id: "p4",
      name: "Red Chilli Whole (Teja / S4)",
      categoryId: "c1",
      origin: "Andhra Pradesh (Guntur), India",
      grade: "S4 / S17 Teja Stemless",
      moisture: "Max 11%",
      packaging: "25 kg / 50 kg Gunny Bags",
      moq: "1 MT",
      priceRange: "$2.70 - $3.50 / kg",
      image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=900&q=80",
      description: "World-famous Guntur red dry chillies known for vibrant natural red colour (ASTA 60-120) and potent heat level (SHU 25,000-75,000).",
      featured: true
    },
    {
      id: "p5",
      name: "Basmati Rice (1121 XXL)",
      categoryId: "c3",
      origin: "Punjab & Haryana, India",
      grade: "1121 Steam / Golden Sella",
      moisture: "Max 12.5%",
      packaging: "5 kg / 25 kg / 50 kg Non-Woven Bags",
      moq: "5 MT",
      priceRange: "$1.20 - $1.80 / kg",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80",
      description: "Extra-long slender grain Indian Basmati rice. Elongates over 2x upon cooking with delightful floral aroma and delicate texture.",
      featured: true
    },
    {
      id: "p6",
      name: "Kabuli Chickpeas (Garbanzo)",
      categoryId: "c3",
      origin: "Madhya Pradesh, India",
      grade: "75/80 Count / 8mm-9mm Bold",
      moisture: "Max 10%",
      packaging: "25 kg / 50 kg PP Bags",
      moq: "1 MT",
      priceRange: "$0.90 - $1.40 / kg",
      image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=900&q=80",
      description: "Cleaned, machine-sorted bold chickpeas with uniform cream colour and exceptional protein content for canning and retail.",
      featured: false
    },
    {
      id: "p7",
      name: "Green Cardamom (Elaichi)",
      categoryId: "c1",
      origin: "Idukki, Kerala, India",
      grade: "8mm Bold / Alleppey Green Extra Bold",
      moisture: "Max 10%",
      packaging: "5 kg / 10 kg Export Cartons with Moisture Barrier",
      moq: "100 kg",
      priceRange: "$22.00 - $26.50 / kg",
      image: "https://images.unsplash.com/photo-1608797178974-15b35a60037f?auto=format&fit=crop&w=900&q=80",
      description: "Queen of spices: lush green, plump pods with sweet floral notes and rich natural essential oils from Western Ghats plantations.",
      featured: true
    },
    {
      id: "p8",
      name: "Pure Coriander Powder",
      categoryId: "c2",
      origin: "Rajasthan, India",
      grade: "100% Pure Eagle Grade",
      moisture: "Max 8.5%",
      packaging: "25 kg Multiwall Paper / PP Bags",
      moq: "500 kg",
      priceRange: "$1.80 - $2.40 / kg",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80",
      description: "Freshly milled coriander powder processed from selected whole coriander seeds without fillers or artificial colours.",
      featured: false
    },
    {
      id: "p9",
      name: "Whole Cloves (Laung)",
      categoryId: "c1",
      origin: "Tamil Nadu & Kerala, India",
      grade: "Handpicked Lal Pari / FAQ",
      moisture: "Max 11%",
      packaging: "10 kg / 25 kg Cartons",
      moq: "250 kg",
      priceRange: "$8.50 - $10.20 / kg",
      image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=900&q=80",
      description: "Reddish-brown whole cloves with plump intact heads and high eugenol oil content, carefully hand-selected for export.",
      featured: false
    }
  ],
  certifications: [
    {
      id: "cert1",
      name: "ISO 22000",
      description: "International Food Safety Management System standard certifying hygiene and process control throughout the supply chain."
    },
    {
      id: "cert2",
      name: "HACCP",
      description: "Hazard Analysis Critical Control Point system for rigorous biological, chemical, and physical food safety verification."
    },
    {
      id: "cert3",
      name: "FSSAI Certified",
      description: "Government of India central license ensuring adherence to premier domestic and export manufacturing food standards."
    },
    {
      id: "cert4",
      name: "APEDA Registered",
      description: "Registration under Agricultural and Processed Food Products Export Development Authority (Ministry of Commerce & Industry)."
    },
    {
      id: "cert5",
      name: "Spices Board India",
      description: "Official mandatory export registration and Certificate of Quality conforming to international spice specifications."
    },
    {
      id: "cert6",
      name: "Halal & Kosher",
      description: "Globally recognized religious dietary compliance certificates for Middle Eastern, European and American destination ports."
    }
  ],
  countries: [
    {
      id: "country1",
      name: "United Arab Emirates (Jebel Ali / Dubai)"
    },
    {
      id: "country2",
      name: "Saudi Arabia (Jeddah / Dammam)"
    },
    {
      id: "country3",
      name: "United States (New York / Los Angeles)"
    },
    {
      id: "country4",
      name: "United Kingdom (Felixstowe / London)"
    },
    {
      id: "country5",
      name: "Germany (Hamburg / Bremen)"
    },
    {
      id: "country6",
      name: "Singapore (Port of Singapore)"
    },
    {
      id: "country7",
      name: "Canada (Vancouver / Montreal)"
    },
    {
      id: "country8",
      name: "Australia (Melbourne / Sydney)"
    }
  ],
  packagingOptions: [
    {
      id: "pack1",
      name: "25 kg / 50 kg Polypropylene (PP) Bags with Food-Grade Inner Liner"
    },
    {
      id: "pack2",
      name: "Traditional Heavy-Duty Jute / Gunny Bags for Whole Spices"
    },
    {
      id: "pack3",
      name: "Multiwall Paper Bags with Moisture-Barrier Foil for Ground Spices"
    },
    {
      id: "pack4",
      name: "Corrugated Export Master Cartons with Vacuum Nitrogen Flush"
    },
    {
      id: "pack5",
      name: "Custom Private Label Retail Pouches (100g, 250g, 500g, 1kg)"
    }
  ],
  labReports: [
    {
      id: "lab1",
      name: "Comprehensive Microbiological Analysis",
      description: "Screening for Salmonella, E. Coli, Yeast, and Mould count using ISO accredited methodologies."
    },
    {
      id: "lab2",
      name: "Multi-Residue Pesticide Screening (GC-MS / LC-MS)",
      description: "Detects over 400 agrochemical residues complying strictly with EU and FDA Maximum Residue Limits (MRL)."
    },
    {
      id: "lab3",
      name: "Moisture & Volatile Oil Analysis",
      description: "Standard distillation analysis testing active essential oil percentages, aroma retention and shelf viability."
    },
    {
      id: "lab4",
      name: "Aflatoxin & Mycotoxin Testing (HPLC)",
      description: "High-precision analysis verifying total Aflatoxin (B1, B2, G1, G2) conforms to international food safety thresholds."
    }
  ],
  enquiries: [
    {
      id: "enq-1790712040026",
      name: "Ahmed Al-Mansoor",
      company: "Gulf Spice Trading LLC",
      email: "buyer@spicebridge.com",
      phone: "+971 50 123 4567",
      country: "United Arab Emirates",
      productId: "p1",
      productName: "Premium Black Pepper",
      quantity: "2000",
      unit: "KG",
      packaging: "25 kg PP Bags",
      message: "Need CIF Jebel Ali quotation for 2 MT black pepper ASTA 550. Certificate of Analysis required.",
      status: "Quoted",
      createdAt: "2026-09-29T20:00:40.026Z"
    },
    {
      id: "enq-1790712040027",
      name: "Michael Davies",
      company: "Crown Food Ingredients Ltd",
      email: "m.davies@crownfoods.co.uk",
      phone: "+44 20 7946 0912",
      country: "United Kingdom",
      productId: "p2",
      productName: "Turmeric Finger",
      quantity: "5",
      unit: "TON",
      packaging: "50 kg Jute Bags",
      message: "Looking for Salem turmeric with minimum 3.8% curcumin for UK food manufacturer.",
      status: "Contacted",
      createdAt: "2026-09-30T11:15:00.000Z"
    },
    {
      id: "enq-1790712040028",
      name: "Rahul Sharma",
      company: "Apex Global Food Corp",
      email: "buyer@spicebridge.com",
      phone: "+91 98765 43210",
      country: "Saudi Arabia",
      productId: "p5",
      productName: "Basmati Rice (1121 XXL)",
      quantity: "10",
      unit: "MT",
      packaging: "25 kg Non-Woven Bags",
      message: "Requirement for 1121 Golden Sella Basmati rice for retail hypermarkets in Riyadh.",
      status: "New",
      createdAt: "2026-10-02T14:22:15.000Z"
    }
  ],
  quotations: [
    {
      id: "quotation-1790712500001",
      enquiryId: "enq-1790712040026",
      buyerName: "Ahmed Al-Mansoor",
      productName: "Premium Black Pepper",
      quantity: "2000",
      unit: "KG",
      price: "5.60",
      currency: "USD",
      validity: "20 days",
      status: "Sent",
      notes: "Price includes CIF Jebel Ali port, export fumigation, Certificate of Origin, and APEDA inspection.",
      createdAt: "2026-09-30T09:30:00.000Z"
    }
  ],
  contacts: [
    {
      id: "contact-1790712600001",
      name: "Carlos Gomez",
      email: "cgomez@eurospice.es",
      phone: "+34 91 123 4567",
      subject: "Distributorship for Spain & Portugal",
      message: "We are interested in becoming the sole distributor for SpiceBridge organic spices in Southern Europe.",
      createdAt: "2026-10-01T16:40:00.000Z"
    }
  ]
};

// Local storage key
const STORAGE_KEY = "spicebridge_offline_db";

function getLocalStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }
  // Initialize with clone of INITIAL_DATA
  const cloned = JSON.parse(JSON.stringify(INITIAL_DATA));
  saveLocalStore(cloned);
  return cloned;
}

function saveLocalStore(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

// Track whether backend is reachable
let backendIsReachable = null;

export async function checkBackendStatus() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);
    const res = await fetch(`${API_URL}/products?_limit=1`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    backendIsReachable = res.ok;
  } catch {
    backendIsReachable = false;
  }
  return backendIsReachable;
}

// Generic helper that attempts fetch with fallback
async function requestWithFallback(endpoint, options = {}, fallbackAction) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      backendIsReachable = true;
      if (options.method === "DELETE") {
        return true;
      }
      return await response.json();
    }
  } catch {
    // Server is unreachable or timed out -> silently fallback to localStorage
    backendIsReachable = false;
  }

  // Fallback to local storage
  if (fallbackAction) {
    return fallbackAction();
  }
  throw new Error(`Offline and no fallback handler for ${endpoint}`);
}

// =====================================================
// PRODUCTS
// =====================================================

export async function getProducts() {
  return requestWithFallback("/products", { method: "GET" }, () => {
    const db = getLocalStore();
    return db.products || [];
  });
}

export async function getProduct(id) {
  return requestWithFallback(`/products/${id}`, { method: "GET" }, () => {
    const db = getLocalStore();
    const found = (db.products || []).find((p) => String(p.id) === String(id));
    if (!found) {
      throw new Error("Product not found");
    }
    return found;
  });
}

export async function createProduct(product) {
  return requestWithFallback(
    "/products",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    },
    () => {
      const db = getLocalStore();
      const newProduct = {
        id: product.id || `p-${Date.now()}`,
        ...product
      };
      db.products = [...(db.products || []), newProduct];
      saveLocalStore(db);
      return newProduct;
    }
  );
}

export async function updateProduct(id, product) {
  return requestWithFallback(
    `/products/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    },
    () => {
      const db = getLocalStore();
      let updated = null;
      db.products = (db.products || []).map((p) => {
        if (String(p.id) === String(id)) {
          updated = { ...p, ...product };
          return updated;
        }
        return p;
      });
      saveLocalStore(db);
      return updated || product;
    }
  );
}

export async function deleteProduct(id) {
  return requestWithFallback(
    `/products/${id}`,
    { method: "DELETE" },
    () => {
      const db = getLocalStore();
      db.products = (db.products || []).filter((p) => String(p.id) !== String(id));
      saveLocalStore(db);
      return true;
    }
  );
}

// =====================================================
// CATEGORIES
// =====================================================

export async function getCategories() {
  return requestWithFallback("/categories", { method: "GET" }, () => {
    const db = getLocalStore();
    return db.categories || [];
  });
}

// =====================================================
// CERTIFICATIONS
// =====================================================

export async function getCertifications() {
  return requestWithFallback("/certifications", { method: "GET" }, () => {
    const db = getLocalStore();
    return db.certifications || [];
  });
}

// =====================================================
// COUNTRIES
// =====================================================

export async function getCountries() {
  return requestWithFallback("/countries", { method: "GET" }, () => {
    const db = getLocalStore();
    return db.countries || [];
  });
}

// =====================================================
// PACKAGING OPTIONS
// =====================================================

export async function getPackagingOptions() {
  return requestWithFallback("/packagingOptions", { method: "GET" }, () => {
    const db = getLocalStore();
    return db.packagingOptions || [];
  });
}

// =====================================================
// LAB REPORTS
// =====================================================

export async function getLabReports() {
  return requestWithFallback("/labReports", { method: "GET" }, () => {
    const db = getLocalStore();
    return db.labReports || [];
  });
}

// =====================================================
// ENQUIRIES
// =====================================================

export async function getEnquiries() {
  return requestWithFallback("/enquiries", { method: "GET" }, () => {
    const db = getLocalStore();
    return db.enquiries || [];
  });
}

export async function getEnquiry(id) {
  return requestWithFallback(`/enquiries/${id}`, { method: "GET" }, () => {
    const db = getLocalStore();
    const found = (db.enquiries || []).find((e) => String(e.id) === String(id));
    if (!found) {
      throw new Error("Enquiry not found");
    }
    return found;
  });
}

export async function createEnquiry(enquiry) {
  return requestWithFallback(
    "/enquiries",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enquiry)
    },
    () => {
      const db = getLocalStore();
      const newEnquiry = {
        id: enquiry.id || `enq-${Date.now()}`,
        status: enquiry.status || "New",
        createdAt: enquiry.createdAt || new Date().toISOString(),
        ...enquiry
      };
      db.enquiries = [newEnquiry, ...(db.enquiries || [])];
      saveLocalStore(db);
      return newEnquiry;
    }
  );
}

export async function updateEnquiry(id, enquiry) {
  return requestWithFallback(
    `/enquiries/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enquiry)
    },
    () => {
      const db = getLocalStore();
      let updated = null;
      db.enquiries = (db.enquiries || []).map((e) => {
        if (String(e.id) === String(id)) {
          updated = { ...e, ...enquiry };
          return updated;
        }
        return e;
      });
      saveLocalStore(db);
      return updated || enquiry;
    }
  );
}

export async function deleteEnquiry(id) {
  return requestWithFallback(
    `/enquiries/${id}`,
    { method: "DELETE" },
    () => {
      const db = getLocalStore();
      db.enquiries = (db.enquiries || []).filter((e) => String(e.id) !== String(id));
      saveLocalStore(db);
      return true;
    }
  );
}

// =====================================================
// QUOTATIONS
// =====================================================

export async function getQuotations() {
  return requestWithFallback("/quotations", { method: "GET" }, () => {
    const db = getLocalStore();
    return db.quotations || [];
  });
}

export async function getQuotation(id) {
  return requestWithFallback(`/quotations/${id}`, { method: "GET" }, () => {
    const db = getLocalStore();
    const found = (db.quotations || []).find((q) => String(q.id) === String(id));
    if (!found) {
      throw new Error("Quotation not found");
    }
    return found;
  });
}

export async function createQuotation(quotation) {
  return requestWithFallback(
    "/quotations",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quotation)
    },
    () => {
      const db = getLocalStore();
      const newQuotation = {
        id: quotation.id || `quotation-${Date.now()}`,
        status: quotation.status || "Draft",
        createdAt: quotation.createdAt || new Date().toISOString(),
        ...quotation
      };
      db.quotations = [newQuotation, ...(db.quotations || [])];
      saveLocalStore(db);
      return newQuotation;
    }
  );
}

export async function updateQuotation(id, quotation) {
  return requestWithFallback(
    `/quotations/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quotation)
    },
    () => {
      const db = getLocalStore();
      let updated = null;
      db.quotations = (db.quotations || []).map((q) => {
        if (String(q.id) === String(id)) {
          updated = { ...q, ...quotation };
          return updated;
        }
        return q;
      });
      saveLocalStore(db);
      return updated || quotation;
    }
  );
}

export async function deleteQuotation(id) {
  return requestWithFallback(
    `/quotations/${id}`,
    { method: "DELETE" },
    () => {
      const db = getLocalStore();
      db.quotations = (db.quotations || []).filter((q) => String(q.id) !== String(id));
      saveLocalStore(db);
      return true;
    }
  );
}

// =====================================================
// CONTACT
// =====================================================

export async function getContacts() {
  return requestWithFallback("/contacts", { method: "GET" }, () => {
    const db = getLocalStore();
    return db.contacts || [];
  });
}

export async function createContact(contact) {
  return requestWithFallback(
    "/contacts",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact)
    },
    () => {
      const db = getLocalStore();
      const newContact = {
        id: contact.id || `contact-${Date.now()}`,
        createdAt: contact.createdAt || new Date().toISOString(),
        ...contact
      };
      db.contacts = [newContact, ...(db.contacts || [])];
      saveLocalStore(db);
      return newContact;
    }
  );
}

export async function updateContact(id, contact) {
  return requestWithFallback(
    `/contacts/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact)
    },
    () => {
      const db = getLocalStore();
      let updated = null;
      db.contacts = (db.contacts || []).map((c) => {
        if (String(c.id) === String(id)) {
          updated = { ...c, ...contact };
          return updated;
        }
        return c;
      });
      saveLocalStore(db);
      return updated || contact;
    }
  );
}

export async function deleteContact(id) {
  return requestWithFallback(
    `/contacts/${id}`,
    { method: "DELETE" },
    () => {
      const db = getLocalStore();
      db.contacts = (db.contacts || []).filter((c) => String(c.id) !== String(id));
      saveLocalStore(db);
      return true;
    }
  );
}

// =====================================================
// USERS / AUTHENTICATION
// =====================================================

export async function getUsers() {
  return requestWithFallback("/users", { method: "GET" }, () => {
    const db = getLocalStore();
    return db.users || [];
  });
}

export async function getUser(id) {
  return requestWithFallback(`/users/${id}`, { method: "GET" }, () => {
    const db = getLocalStore();
    const found = (db.users || []).find((u) => String(u.id) === String(id));
    if (!found) {
      throw new Error("User not found");
    }
    return found;
  });
}

export async function loginUser(email, password) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const response = await fetch(
      `${API_URL}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (response.ok) {
      backendIsReachable = true;
      const users = await response.json();
      return users.length > 0 ? users[0] : null;
    }
  } catch {
    backendIsReachable = false;
  }

  // Fallback to local storage
  const db = getLocalStore();
  const found = (db.users || []).find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase().trim() &&
      u.password === password
  );
  return found || null;
}

export async function createUser(user) {
  return requestWithFallback(
    "/users",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    },
    () => {
      const db = getLocalStore();
      const existing = (db.users || []).find(
        (u) => u.email.toLowerCase() === user.email.toLowerCase().trim()
      );
      if (existing) {
        throw new Error("User with this email already exists");
      }
      const newUser = {
        id: user.id || `u-${Date.now()}`,
        role: user.role || "buyer",
        ...user
      };
      db.users = [...(db.users || []), newUser];
      saveLocalStore(db);
      return newUser;
    }
  );
}

export async function updateUser(id, user) {
  return requestWithFallback(
    `/users/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    },
    () => {
      const db = getLocalStore();
      let updated = null;
      db.users = (db.users || []).map((u) => {
        if (String(u.id) === String(id)) {
          updated = { ...u, ...user };
          return updated;
        }
        return u;
      });
      saveLocalStore(db);
      return updated || user;
    }
  );
}

export async function deleteUser(id) {
  return requestWithFallback(
    `/users/${id}`,
    { method: "DELETE" },
    () => {
      const db = getLocalStore();
      db.users = (db.users || []).filter((u) => String(u.id) !== String(id));
      saveLocalStore(db);
      return true;
    }
  );
}