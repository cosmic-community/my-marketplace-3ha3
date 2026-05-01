import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🛍️</span>
            <span className="text-xl font-extrabold tracking-tight">
              My<span className="text-brand-pink">Marketplace</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-sm font-semibold hover:text-brand-pink transition-colors">
              Products
            </Link>
            <Link href="/categories" className="text-sm font-semibold hover:text-brand-pink transition-colors">
              Categories
            </Link>
            <Link href="/sellers" className="text-sm font-semibold hover:text-brand-pink transition-colors">
              Sellers
            </Link>
            <Link href="/reviews" className="text-sm font-semibold hover:text-brand-pink transition-colors">
              Reviews
            </Link>
          </nav>
          <Link
            href="/products"
            className="bg-brand-pink hover:bg-brand-pink-dark text-white text-sm font-bold px-4 py-2 rounded-full transition-colors"
          >
            Shop Now
          </Link>
        </div>
        <nav className="md:hidden flex items-center gap-4 pb-3 overflow-x-auto">
          <Link href="/products" className="text-xs font-semibold whitespace-nowrap">Products</Link>
          <Link href="/categories" className="text-xs font-semibold whitespace-nowrap">Categories</Link>
          <Link href="/sellers" className="text-xs font-semibold whitespace-nowrap">Sellers</Link>
          <Link href="/reviews" className="text-xs font-semibold whitespace-nowrap">Reviews</Link>
        </nav>
      </div>
    </header>
  )
}