# Necter

A modern eco-friendly e-commerce platform for sustainable personal care products, focused on performance, animations, and premium UX.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-Animations-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## Live Demo
[View Demo](#)  
`https://e-commerce-ecru-delta.vercel.app/`
---

## Overview
Necter delivers a fast, animation-rich shopping experience using static product data with dynamic cart and order handling powered by Supabase.

**Highlights**
- Instant product browsing
- GPU-accelerated animations
- Responsive mobile-first UI
- Real-time cart/order handling

---

## Features
- Product catalog with filtering & search  
- Animated product cards (GSAP)  
- Slide-out cart with live updates  
- Checkout & order tracking  
- Authenticated order history  
- Smooth page transitions  

---

## Tech Stack
**Frontend**
- Next.js 14
- React / TypeScript
- TailwindCSS
- GSAP
- Zustand

**Backend**
- Supabase (DB, Auth, Storage)

---

## Installation

```bash
git clone https://github.com/yourusername/necter.git
cd necter
npm install
```

Set up environment variables:

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

**Browsing Products**
1. Navigate to Shop or Categories page
2. Filter by category, price range, or search term
3. Click product cards for detailed views

**Managing Cart**
1. Add products to cart from product cards or detail pages
2. Access cart via header icon
3. Adjust quantities or remove items
4. Proceed to checkout (authentication required)

**Placing Orders**
1. Review cart items at checkout
2. Enter shipping address
3. Complete order placement
4. Receive order confirmation with tracking details

**Tracking Orders**
1. Navigate to Track Orders page
2. Enter Order ID or Tracking ID
3. View real-time order status and timeline

## Project Structure

```
necter/
├── app/                       # Next.js App Router pages
│   ├── (pages)/              # Page routes
│   │   ├── shop/
│   │   ├── categories/
│   │   ├── checkout/
│   │   ├── track-orders/
│   │   └── order-success/
│   ├── api/                  # API routes
│   ├── layout.js             # Root layout
│   └── page.js               # Homepage
├── components/               # React components
│   ├── ui/                   # UI components
│   ├── layout/               # Layout components
│   └── animations/           # Animation components
├── lib/                      # Utilities
│   ├── supabase.js          # Supabase client
│   └── store.js             # Zustand store
├── public/                   # Static assets
│   ├── images/
│   └── fonts/
└── styles/                   # Global styles
```

## Configuration

**Supabase Setup**

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the following SQL to set up tables:
          
          `supabase-schema.sql`

3. Add your Supabase URL and anon key to `.env.local`

**Customization Options**
- Modify color scheme in `tailwind.config.js`
- Adjust animation timing in component files
- Update product data in static data files

## Roadmap

**Planned Features**
- Payment gateway integration (Stripe/PayPal)
- Product reviews and ratings
- Wishlist functionality
- Email notifications for order updates
- Admin dashboard for inventory management
- Multi-language support

**Known Limitations**
- Payment processing currently simulated
- Stock updates require manual intervention
- Limited to email/password authentication

## FAQ

**Q: Do I need a Supabase account to run this project?**  
A: Yes, you need a free Supabase account to set up the database and authentication.

**Q: Can I use this for a real e-commerce store?**  
A: The platform is production-ready but requires payment gateway integration for real transactions.

**Q: How do I add new products?**  
A: Currently, products are managed through static data files. For dynamic product management, you'll need to implement an admin dashboard.

**Q: Is the cart data persistent?**  
A: Yes, for authenticated users, cart data is stored in Supabase. For guests, data is stored in localStorage.

**Q: Can I customize the design?**  
A: Absolutely! Modify the TailwindCSS configuration and component styles to match your brand.

**Q: What browsers are supported?**  
A: All modern browsers (Chrome, Firefox, Safari, Edge). IE is not supported.

**Q: How do I deploy this to production?**  
A: Deploy to Vercel, Netlify, or any platform supporting Next.js. See the Deployment section.

## Troubleshooting

**Issue: "Supabase client not initialized"**
- Ensure `.env.local` file exists with correct Supabase credentials
- Verify environment variables are prefixed with `NEXT_PUBLIC_`
- Restart the development server after adding environment variables

**Issue: Products not displaying**
- Check if static product data files are present
- Verify import paths in component files
- Clear browser cache and reload

**Issue: Cart not updating**
- Check browser console for errors
- Verify Zustand store is properly initialized
- Ensure localStorage is not disabled in browser

**Issue: Authentication not working**
- Confirm Supabase Auth is enabled in your project
- Check email/password requirements in Supabase dashboard
- Verify redirect URLs are configured correctly

**Issue: Animations not playing smoothly**
- Ensure GSAP is properly installed
- Check if hardware acceleration is enabled in browser
- Reduce animation complexity on lower-end devices

**Issue: Build errors**
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Check Node.js version (requires v18+)

**Issue: Order tracking not working**
- Verify order ID or tracking ID is correct
- Check if order exists in database
- Ensure user is authenticated for order history

## Deployment

**Vercel (Recommended)**

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables in Vercel settings
4. Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Build the production version:

```bash
npm run build
npm start
```

## Changelog

### [1.0.0] - 2024-01-15

**Added**
- Initial release
- Product catalog with 18 products across 6 categories
- Shopping cart with dual storage system
- User authentication via Supabase
- Order management and tracking
- Responsive design with mobile-first approach
- GSAP animations and smooth scrolling
- Custom loading screen with progress counter

**Features**
- Static data architecture for instant browsing
- Real-time cart updates
- Order status tracking (5 stages)
- Order cancellation functionality
- Advanced product filtering and search
- Horizontal scrolling carousels
- 3D flip animations on product cards

**Technical**
- Next.js 14 App Router implementation
- Supabase integration for backend
- Zustand for state management
- TailwindCSS for styling
- GSAP for animations

### [Unreleased]

**Planned**
- Payment gateway integration
- Product reviews system
- Wishlist functionality
- Admin dashboard
- Email notifications
- Multi-language support

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Code Style**
- Follow existing code formatting
- Use meaningful variable names
- Comment complex logic
- Ensure responsive design

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Your Name**

- GitHub: [@gruks](https://github.com/gruks)
- LinkedIn: [Ayush Kumar](https://linkedin.com/in/ayush-kumar-52a9712b6/)
- Portfolio: [yourportfolio.com](https://yourportfolio.com)
- Email: notastheticallyayush@gmail.com

**Acknowledgements**
- Supabase for backend infrastructure
- GSAP for animation capabilities
- Next.js team for the framework
- TailwindCSS for styling utilities

---

Built with passion for sustainable commerce and exceptional user experience.