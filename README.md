# 🌿 SpiceBridge - Indian Spice & Agro Export Portal

> **React College Project** — A full-featured B2B export catalog and inquiry management web application designed for Indian agricultural commodities, whole spices, ground spices, and grains.

---

## 📌 Project Overview
**SpiceBridge** bridges the gap between Indian farmers/producers and global food importers. It allows international buyers to explore certified agro-commodities, review quality certifications (FSSAI, Spices Board, ISO 22000, APEDA), inspect technical specifications, submit bulk sourcing inquiries, and track issued commercial quotations.

The project features role-based access control (Admin, Buyer, Sales), a responsive Bootstrap 5 interface, detailed commodity specification pages, a Buyer Dashboard, and a complete Admin Management Suite.

---

## ✨ Key Features

### 🛒 1. Public Sourcing & Catalog
- **Interactive Catalog (`/products`)**: Browse whole spices, ground spices, pulses, and grains with instant live search and category filters.
- **Detailed Specification Sheet (`/products/:id`)**: Comprehensive technical data for each spice — Origin, ASTA grade, moisture limits, MOQ, standard export packaging, and related products.
- **Quality & Certifications (`/quality`)**: Information on mandatory export compliance, pesticide residue screening (GC-MS), microbiological testing, and lab reports.
- **Global Shipping Guide (`/export-info`)**: Destination ports (Jebel Ali, Hamburg, New York, etc.), container loading, and packaging options.

### 📝 2. Sourcing Enquiry Flow
- **Product Prefill (`/enquiry?productId=p1`)**: Clicking "Request Quotation" from any spice automatically pre-selects that commodity in the inquiry form.
- **Buyer Autofill**: Automatically populates buyer name and email address when logged in.
- **Specification Inputs**: Quantity, units (KG / MT / TON), custom packaging, destination notes.

### 📊 3. Buyer Dashboard (`/dashboard`)
- **My Inquiries**: Track all submitted sourcing requests in real-time with status indicators (`New`, `Contacted`, `Quoted`, `Closed`).
- **Commercial Quotations**: Review FOB/CIF price quotes issued by the export team with validity periods and terms.

### 👑 4. Admin Management Suite (`/admin`)
- **Product Management (`/admin/products`)**: Add, edit, and delete catalog items with image previews, category mapping, and featured tags.
- **Enquiry Administration (`/admin/enquiries`)**: Review incoming buyer leads, update status, and convert any inquiry into a commercial quotation with one click!
- **Quotation Generator (`/admin/quotations`)**: Create, update, and manage official price quotations with validity and currency settings.

### 🔐 5. Authentication & Quick-Fill Demo
- **Role-Based Protected Routes**: Restricts admin controls to authorized personnel while allowing buyers access to their personal dashboard.
- **One-Click Demo Fill**: Convenient quick-fill buttons on the login page for rapid project demonstration during college viva/evaluations.

### ⚡ 6. Dual-Mode Resilient Storage Engine
- **Hybrid API**: Seamlessly connects to JSON-Server on port 5000 when active.
- **Zero-Crash Local Fallback**: Automatically and transparently falls back to local storage if evaluated without starting the backend, guaranteeing 100% functionality out-of-the-box!

---

## 🔑 Demo Login Credentials

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **👑 Admin** | `admin@spicebridge.com` | `admin123` | Full admin management (Products, Inquiries, Quotes) |
| **🛒 Buyer** | `buyer@spicebridge.com` | `buyer123` | Browse catalog, submit inquiries, view dashboard |
| **💼 Sales** | `sales@spicebridge.com` | `sales123` | Commercial sales overview |

> *Tip: You can also use the one-click demo fill buttons on the `/login` screen!*

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm`

### Installation & Run

1. **Extract or clone the project folder**:
   ```bash
   cd SpiceBridge
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the Project**:

   **Option A — All-in-One (Recommended)**:
   Runs both the JSON-Server backend (port 5000) and the Vite frontend (port 5173) together:
   ```bash
   npm start
   ```

   **Option B — Frontend Only (Works 100% with local demo fallback)**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Visit [http://localhost:5173](http://localhost:5173)

---

## 🛠️ Available NPM Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `npm start` | `concurrently ...` | Runs both JSON Server (5000) and Vite frontend (5173) |
| `npm run dev` | `vite` | Starts the Vite development server |
| `npm run server` | `json-server -p 5000 backend/db.json` | Starts the mock REST API backend on port 5000 |
| `npm run build` | `vite build` | Compiles production assets into `dist/` |
| `npm run lint` | `oxlint` | High-speed lint validation |
| `npm run preview` | `vite preview` | Previews the production build locally |

---

## 📁 Project Structure

```text
SpiceBridge/
├── backend/
│   ├── db.json               # Mock database (Users, Categories, Products, Inquiries, Quotes)
│   └── package.json          # Backend package config
├── public/
│   ├── favicon.svg           # Brand favicon
│   └── icons.svg             # SVG icon bundle
├── src/
│   ├── assets/               # Image assets (hero banners, spice previews)
│   ├── components/
│   │   ├── Footer.jsx        # Common footer with links & status
│   │   ├── Navbar.jsx        # Responsive navigation with role indicators
│   │   └── ProtectedRoute.jsx# Role-based route guard
│   ├── context/
│   │   └── AuthContext.jsx   # Authentication context & session state
│   ├── pages/
│   │   ├── About.jsx         # Company background, vision & sourcing network
│   │   ├── AdminDashboard.jsx# Centralized admin metrics & recent leads
│   │   ├── AdminEnquiries.jsx# Inquiry management & quotation generation
│   │   ├── AdminProducts.jsx # Full CRUD for product catalog
│   │   ├── AdminQuotations.jsx# Quotation creation and status updates
│   │   ├── Contact.jsx       # Direct contact form & office locations
│   │   ├── Dashboard.jsx     # Buyer dashboard & inquiry tracking
│   │   ├── Enquiry.jsx       # Sourcing inquiry form with product pre-selection
│   │   ├── ExportInfo.jsx    # Port logistics, packaging, and shipping info
│   │   ├── Home.jsx          # Landing page with hero banner & featured items
│   │   ├── Login.jsx         # Sign-in with quick-fill demo buttons
│   │   ├── NotFound.jsx      # 404 page
│   │   ├── ProductDetails.jsx# Detailed specification sheet & quote trigger
│   │   ├── Products.jsx      # Searchable, filterable spice catalog
│   │   ├── Quality.jsx       # Quality testing, ISO standards & lab reports
│   │   └── Register.jsx      # New buyer account registration
│   ├── services/
│   │   └── api.js            # Dual-mode hybrid REST API & offline fallback
│   ├── App.jsx               # Route definitions
│   ├── index.css             # Custom utility styling & cards
│   └── main.jsx              # Application bootstrap & providers
├── index.html                # HTML entry point with metadata
├── package.json              # Project dependencies and run scripts
├── vite.config.js            # Vite configuration
└── README.md                 # Complete documentation
```

---

## 🧰 Technology Stack

- **Frontend Library**: React 19
- **Build Tool**: Vite 8
- **Routing**: React Router DOM 7
- **UI Framework**: Bootstrap 5.3 + Bootstrap Icons
- **Mock REST Server**: JSON-Server
- **Concurrent Task Runner**: Concurrently
- **Linter**: Oxlint

---

## 🎓 College Viva & Evaluation Notes

1. **Why is dual-mode storage implemented?**
   It allows the application to demonstrate authentic REST API interactions with JSON-Server, while offering complete resilience via LocalStorage so examiners can review the project without configuring servers.
2. **How does inquiry preselection work?**
   Clicking "Enquire" on a product card or "Request Quotation" from the product detail page appends `?productId=...` to the URL. The `Enquiry` component detects this query parameter and pre-selects that spice.
3. **How does authentication protection work?**
   `ProtectedRoute` checks the `AuthContext` state. If a guest tries to access `/dashboard` or an unauthorized user attempts to open `/admin`, they are redirected safely to login or the home page.
