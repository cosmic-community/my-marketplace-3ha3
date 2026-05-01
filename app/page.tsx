import Link from 'next/link'
import { getFeaturedProducts, getAllProducts, getAllCategories, getAllReviews } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import CategoryCard from '@/components/CategoryCard'
import ReviewCard from '@/components/ReviewCard'

export default async function HomePage() {
  const [featuredProducts, allProducts, categories, reviews] = await Promise.all([
    getFeaturedProducts(),
    getAllProducts(),
    getAllCategories(),
    getAllReviews(),
  ])

  const displayFeatured = featuredProducts.length > 0 ? featuredProducts : allProducts.slice(0, 4)
  const newArrivals = allProducts.slice(0, 8)
  const topReviews = reviews.slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-pink via-brand-pink-dark to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32">
          <div className="max-w-2xl">
            <p className="text-sm sm:text-base font-semibold tracking-widest uppercase mb-4 opacity-90">
              New Drops Every Week
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-6">
              Shop Bold.<br />Wear Bold.
            </h1>
            <p className="text-base sm:text-lg mb-8 opacity-90 max-w-lg">
              Discover trendy products from verified sellers. Curated styles that make a statement.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-block bg-white text-brand-pink hover:bg-gray-100 font-bold px-8 py-3 rounded-full transition-colors"
              >
                Shop Now
              </Link>
              <Link
                href="/categories"
                className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand-pink font-bold px-8 py-3 rounded-full transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-sm font-semibold text-brand-pink tracking-widest uppercase mb-2">Explore</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold">Shop by Category</h2>
              </div>
              <Link href="/categories" className="text-sm font-semibold hover:text-brand-pink transition-colors hidden sm:block">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.slice(0, 4).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {displayFeatured.length > 0 && (
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-sm font-semibold text-brand-pink tracking-widest uppercase mb-2">Hot Picks</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold">Featured Products</h2>
              </div>
              <Link href="/products" className="text-sm font-semibold hover:text-brand-pink transition-colors hidden sm:block">
                Shop All →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {displayFeatured.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <p className="text-sm font-semibold text-brand-pink tracking-widest uppercase mb-2">Just In</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold">New Arrivals</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      {topReviews.length > 0 && (
        <section className="py-12 sm:py-16 bg-brand-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <p className="text-sm font-semibold text-brand-pink tracking-widest uppercase mb-2">Loved by Customers</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold">What People Are Saying</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topReviews.map((review) => (
                <div key={review.id} className="text-gray-900">
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}