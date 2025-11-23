# JavaScript-Frameworks-ca

JavaScript Frameworks course assignment – Online Shop built with **Next.js** and **TypeScript**.

This project is a small demo e-commerce frontend that consumes the **Noroff Online Shop API**, with product listing, product details, cart, checkout success page, and demo-only authentication.

---

## Tech Stack

- **Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) (cart + auth)
- **Styling:** Tailwind CSS (utility classes)
- **HTTP:** Native `fetch` with a small typed wrapper in `lib/api.ts`
- **Notifications:** `react-hot-toast`
- **Images:** `next/image`

---

## Features

### Products

- Fetches product list from the Noroff Online Shop API.
- Home page with:
  - Search box (instant filter + suggestion dropdown).
  - Sort select (price ascending/descending, name A–Z / Z–A).
  - Responsive product grid.
- Product card:
  - Product image, title and price.
  - Discount badge showing percentage saved.
  - “Add to cart” icon button.

### Product Details

- Dynamic route: `/product/[id]`.
- Server-side fetch with `getProduct(id)` from `lib/api.ts`.
- Shows:
  - Title, description.
  - Full-sized image.
  - Price + discounted price (if applicable).
  - “Add to cart” button.

### Cart

- Route: `/cart`.
- Uses a global `useCart` store with Zustand.
- Features:
  - Cart line items with image, title, unit price, and line total.
  - Quantity stepper for each item.
  - Remove item button.
  - Cart total.
  - “Order now” button that:
    - Checks if user is logged in.
    - Saves a demo `Order` object to `sessionStorage`.
    - Clears the cart.
    - Redirects to `/checkout/success`.

### Checkout Success

- Route: `/checkout/success`.
- Reads `lastOrder` from `sessionStorage`.
- If found, shows:
  - Order id.
  - Email.
  - Created date/time.
  - List of items and totals.
- If not found, shows a “No recent order found.” message.
- Includes a “Back to shop” link.

---

## API

The app consumes the **Noroff Online Shop API**:

- Base URL: `https://v2.api.noroff.dev/online-shop`

Helpers in `src/lib/api.ts`:

- `listProducts(): Promise<Product[]>`
- `getProduct(id: string): Promise<Product>`

Response types are defined in `src/lib/types.ts`:

- `Product`
- `ApiListResponse<T>`
- `ApiItemResponse<T>`

Error handling is done in `getJson<T>()`, which logs the response body and throws an error with the HTTP status code. 404s are handled on the product page by routing to `notFound()`.

---

## How to Use (For Marker)

A quick guide for testing the flow:

1. **Start the app**

   - Run `npm install` and then `npm run dev`.
   - Open `http://localhost:3000` in your browser.

2. **Browse products**

   - On the home page:
     - Use the **search box** to filter products by title or tags.
     - Use the **sort select** to sort by price or name.
     - Click on any product card to open the **product detail page**.

3. **Add items to cart**

   - On a product detail page, click **“Add to Cart”**.
   - Or use the small cart icon on the product card to quickly add items.
   - Open the cart via the cart icon in the header or go to `/cart`.

4. **Register a demo account**

   - Before placing an order, go to `/auth/register` or click any “login/register” link if present.
   - Use a **dummy email and password**, e.g.:
     - Email: `test@example.com`
     - Password: `password123`
   - After registering, you’ll be logged in automatically.

5. **Place an order**

   - Go to `/cart`.
   - Adjust quantities or remove items as needed.
   - Click **“Order now”** (or “Place order”, depending on your final label).
   - The app:
     - Verifies you’re logged in.
     - Saves a demo order in `sessionStorage` (`lastOrder`).
     - Clears the cart.
     - Redirects to `/checkout/success`.

6. **View the order confirmation**
   - On `/checkout/success` you’ll see:
     - Order ID.
     - Email used.
     - Date/time.
     - Items and totals.
   - If there is no `lastOrder` in `sessionStorage`, you’ll see “No recent order found.”

---

**Important: This is for coursework only and NOT secure.**

- Email/password auth is implemented with **Zustand** and `localStorage`.
- Accounts are stored per-browser, not on a server.
- Do not enter real passwords. Use a dummy email like `test@example.com`.

Auth is managed in:

- `src/store/auth.store.ts` – `useAuth` store with:
  - `user: { email } | null`
  - `register(email, password)`
  - `login(email, password)`
  - `logout()`

The cart page `/cart` requires a logged-in user to place an order; otherwise the user is redirected to `/auth/login`.

---

## 1. Install dependencies

```bash
npm install
# or
yarn install

```

## 2. Run the development server

```bash
npm run dev

```

Then open:

http://localhost:3000 in your browser.

---

## 3. Run tests

This project uses Vitest and React Testing Library.
To run the tests:

```bash
npm test

```

### Notes & Limitations

This is a course assignment, not a production-ready store.

- Authentication is client-only and insecure:

- Credentials are stored in localStorage.

- There is no backend or real session.

- sessionStorage is used only to pass the last order to the success page.

- \*\*Do not use real credentials on this site.
