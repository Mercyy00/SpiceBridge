# 🎓 SpiceBridge — Academic Project Report & Viva Guide

**Project Title:** SpiceBridge — B2B Indian Spice & Agro Export Portal  
**Domain:** Web Development / Full-Stack React Engineering  
**Technology:** React 19, Vite, React Router 7, Bootstrap 5, JSON-Server  
**Target Audience:** College Practical Examination, Viva Voce & Submission  

---

## 1. Abstract
The **SpiceBridge** web application is a digital export portal designed to streamline commercial business-to-business (B2B) trade between Indian agricultural producers and global commodity importers. The portal bridges traditional sourcing bottlenecks by providing an interactive digital catalog with comprehensive laboratory-backed specifications (origin, ASTA grade, moisture content, packaging, and minimum order quantities), a seamless quotation inquiry pipeline, a buyer status tracking dashboard, and an administrative control panel for managing products, inquiries, and quotation lifecycles.

---

## 2. Problem Statement & Objectives
### Problem Statement
Indian agro-export operations traditionally rely on fragmented email communications, outdated PDF price lists, and disconnected spreadsheet records. Buyers struggle to quickly assess certification compliance (APEDA, FSSAI, Spices Board, ISO 22000), while exporters spend significant effort manually managing inbound buyer leads and issuing quotations.

### Objectives
1. **Centralized Digital Catalog:** Provide real-time categorization and searching of whole spices, ground spices, pulses, and grains.
2. **Standardized Specification Sheets:** Display detailed technical metrics (moisture limits, ASTA coloration, origin terroir, packaging options).
3. **Streamlined Inquiry Pipeline:** Allow buyers to specify unit volumes (KG, MT, TON), packaging specifications, and destination requirements with automatic pre-selection from catalog items.
4. **Buyer Self-Service Portal:** Enable buyers to monitor lead statuses (`New`, `Contacted`, `Quoted`, `Closed`) and review issued price quotes.
5. **Administrative Management Suite:** Provide authorized export executives with complete catalog CRUD operations and one-click quotation issuance from buyer inquiries.
6. **Fault-Tolerant Hybrid Architecture:** Support both live REST server communication and transparent local fallback for zero-dependency evaluations.

---

## 3. System Architecture & Modules

### 3.1 Architecture Overview
The system follows a modern Single Page Application (SPA) architecture:
- **Presentation Layer:** Responsive Bootstrap 5 UI styled with CSS variables and Bootstrap Icons.
- **Client Routing Layer:** React Router DOM 7 utilizing declarative URL routing, protected route guards, and query-parameter state passing.
- **State & Context Layer:** `AuthContext` managing authentication tokens, session persistence in `localStorage`, and role-based permissions.
- **Service & Data Layer:** `api.js` implementing a dual-mode communication pattern that tries the live backend (`http://localhost:5000`) and falls back to structured offline storage if the network server is unavailable.

### 3.2 Core Functional Modules

| Module | Route | Key Capabilities |
| :--- | :--- | :--- |
| **Home Landing Page** | `/` | Hero presentation, key statistics, featured products, category shortcuts, export market overview. |
| **Commodity Catalog** | `/products` | Live search, category filtering, responsive card grid, direct links to spec sheets and inquiry forms. |
| **Specification Sheet** | `/products/:id` | Detailed technical specs, FOB price bands, MOQ badges, quality guarantees, and related commodity suggestions. |
| **Sourcing Inquiry** | `/enquiry` | Auto-preselected commodity from query params (`?productId=...`), buyer autofill, quantity and packaging inputs. |
| **Quality & Standards** | `/quality` | Details on ISO 22000, HACCP, FSSAI, APEDA, and laboratory test protocols (Pesticide screening, moisture, microbiology). |
| **Export Logistics** | `/export-info` | Shipping ports (Jebel Ali, Hamburg, New York), container types, packaging specifications, and customs workflows. |
| **Buyer Dashboard** | `/dashboard` | Buyer profile, inquiry history table with real-time status badges, commercial quotations viewer. |
| **Admin Dashboard** | `/admin` | Operational metrics (total products, inquiries, quotes), recent inquiry alerts, shortcuts to management modules. |
| **Product Management** | `/admin/products` | Complete CRUD interface with image preview, grade selection, category association, and featured flag toggle. |
| **Enquiry Administration**| `/admin/enquiries`| Inbound lead management, status updates, and one-click quote generator. |
| **Quotation Management** | `/admin/quotations`| Formal commercial quotation generator with unit pricing, validity dates, currency selection, and customer notes. |
| **Authentication** | `/login`, `/register` | Secure registration, role assignment, and 1-click quick-fill demo buttons for examiners. |

---

## 4. Database Schema (Entities & Relationships)

```text
+----------------+          +-------------------+          +-------------------+
|   Categories   |          |     Products      |          |     Enquiries     |
+----------------+          +-------------------+          +-------------------+
| id (PK)        |<---------| categoryId (FK)   |<---------| productId (FK)    |
| name           |          | id (PK)           |          | id (PK)           |
| description    |          | name              |          | name              |
+----------------+          | origin, grade     |          | email, company    |
                            | moisture, moq     |          | quantity, unit    |
                            | priceRange, image |          | packaging, status |
                            | description       |          +-------------------+
                            | featured          |                    |
                            +-------------------+                    | (converts to)
                                                                     v
+----------------+                                         +-------------------+
|     Users      |                                         |    Quotations     |
+----------------+                                         +-------------------+
| id (PK)        |                                         | id (PK)           |
| name, email    |                                         | enquiryId (FK)    |
| password, role |                                         | buyerName         |
+----------------+                                         | productName       |
                                                           | price, currency   |
                                                           | validity, status  |
                                                           +-------------------+
```

---

## 5. Frequently Asked Viva / Oral Exam Questions

### Q1: What is the benefit of using React for this project?
**Answer:** React uses a component-based architecture and a Virtual DOM. This enables declarative UI development, reusable components (like `Navbar`, `Footer`, `ProtectedRoute`), and instantaneous page transitions without full browser reloads via Single Page Application (SPA) routing.

### Q2: How does the application prevent unauthorized users from accessing the admin panel?
**Answer:** The project implements a `ProtectedRoute` wrapper component that inspects the current user state in `AuthContext`. If an unauthenticated user or a user without the `"admin"` role attempts to navigate to `/admin`, the route guard intercepts the render and redirects them using `<Navigate to="/" replace />`.

### Q3: How is data shared across components without "prop drilling"?
**Answer:** The project leverages the **React Context API** (`AuthContext`). By wrapping the root component tree in `<AuthProvider>`, authentication status, current user profile, and `login`/`logout` actions are accessible across any child component via the custom `useAuth()` hook.

### Q4: How does the Enquiry form know which spice was selected from the catalog?
**Answer:** The catalog buttons append the unique commodity ID as a URL query parameter (e.g., `/enquiry?productId=p1`). The `Enquiry` component utilizes the `useSearchParams` hook from `react-router-dom` to parse the parameter and initialize the `productId` field and banner automatically.

### Q5: How does the hybrid API / dual-mode storage work?
**Answer:** In `api.js`, every API method attempts to communicate with the JSON-Server REST API at `http://localhost:5000` with an abort timeout. If the backend is running, live HTTP requests are processed. If the server is offline (e.g. running standalone `npm run dev`), the service catches the error and executes the query or mutation against a persistent `localStorage` store initialized with export commodities.

---

## 6. Conclusion
SpiceBridge demonstrates a complete, production-grade frontend architecture appropriate for modern web applications. It successfully balances realistic business workflows, responsive design, role-based security, and zero-configuration demonstration resilience.
