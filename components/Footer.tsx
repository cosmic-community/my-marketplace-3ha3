import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-brand-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🛍️</span>
              <span className="text-xl font-extrabold">
                My<span className="text-brand-pink">Marketplace</span>
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Shop bold. Wear bold. Live bold.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/products" className="hover:text-brand-pink transition-colors">All Products</Link></li>
              <li><Link href="/categories" className="hover:text-brand-pink transition-colors">Categories</Link></li>
              <li><Link href="/sellers" className="hover:text-brand-pink transition-colors">Sellers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Community</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/reviews" className="hover:text-brand-pink transition-colors">Reviews</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Get In Touch</h4>
            <p className="text-sm text-gray-400">
              Questions? We're here to help you find the perfect products.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} My Marketplace. All rights reserved.
        </div>
      </div>
    </footer>
  )
}