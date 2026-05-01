// app/products/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductBySlug, getReviewsByProduct, getMetafieldValue } from '@/lib/cosmic'
import ReviewCard from '@/components/ReviewCard'

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const reviews = await getReviewsByProduct(product.id)

  const title = getMetafieldValue(product.metadata?.product_title) || product.title
  const description = getMetafieldValue(product.metadata?.description)
  const price = product.metadata?.price
  const salePrice = product.metadata?.sale_price
  const mainImage = product.metadata?.main_image
  const gallery = product.metadata?.gallery || []
  const sizes = product.metadata?.sizes || []
  const colors = product.metadata?.colors || []
  const stockStatus = getMetafieldValue(product.metadata?.stock_status)
  const category = product.metadata?.category
  const seller = product.metadata?.seller

  const hasSale = typeof salePrice === 'number' && typeof price === 'number' && salePrice < price
  const discount = hasSale && price ? Math.round(((price - salePrice!) / price) * 100) : 0

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + (typeof r.metadata?.rating === 'number' ? r.metadata.rating : 0), 0) / reviews.length
    : 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand-pink">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-brand-pink">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div>
          {mainImage && (
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img
                src={`${mainImage.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                alt={title}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {gallery.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {gallery.map((img, idx) => (
                <div key={idx} className="aspect-square bg-gray-100 rounded overflow-hidden">
                  <img
                    src={`${img.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                    alt={`${title} ${idx + 1}`}
                    className="w-full h-full object-cover hover:opacity-75 transition-opacity cursor-pointer"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="inline-block text-xs font-semibold text-brand-pink uppercase tracking-widest mb-3 hover:underline"
            >
              {getMetafieldValue(category.metadata?.name) || category.title}
            </Link>
          )}
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">{title}</h1>

          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < Math.round(avgRating) ? '★' : '☆'}</span>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          )}

          <div className="flex items-baseline gap-3 mb-6">
            {hasSale ? (
              <>
                <span className="text-3xl font-bold text-brand-pink">${salePrice?.toFixed(2)}</span>
                <span className="text-xl text-gray-400 line-through">${price?.toFixed(2)}</span>
                <span className="bg-brand-pink text-white text-xs font-bold px-2 py-1 rounded">
                  {discount}% OFF
                </span>
              </>
            ) : (
              price !== undefined && (
                <span className="text-3xl font-bold">${price.toFixed(2)}</span>
              )
            )}
          </div>

          {description && (
            <div className="prose prose-sm mb-6">
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>
          )}

          {/* Sizes */}
          {sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size, idx) => (
                  <button
                    key={idx}
                    className="border-2 border-gray-300 hover:border-brand-pink hover:text-brand-pink min-w-[3rem] px-4 py-2 rounded text-sm font-semibold transition-colors"
                  >
                    {getMetafieldValue(size)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {colors.map((color, idx) => (
                  <button
                    key={idx}
                    className="border-2 border-gray-300 hover:border-brand-pink hover:text-brand-pink px-4 py-2 rounded text-sm font-semibold transition-colors"
                  >
                    {getMetafieldValue(color)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stock */}
          {stockStatus && (
            <p className="text-sm font-semibold mb-6">
              Status: <span className={stockStatus.toLowerCase().includes('out') ? 'text-red-600' : 'text-green-600'}>{stockStatus}</span>
            </p>
          )}

          {/* CTA */}
          <button
            disabled={stockStatus.toLowerCase().includes('out')}
            className="w-full bg-brand-pink hover:bg-brand-pink-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-full transition-colors mb-3"
          >
            {stockStatus.toLowerCase().includes('out') ? 'Out of Stock' : 'Add to Cart'}
          </button>

          {/* Seller */}
          {seller && (
            <div className="border-t border-gray-200 pt-6 mt-6">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Sold by</p>
              <Link
                href={`/sellers/${seller.slug}`}
                className="flex items-center gap-3 hover:text-brand-pink transition-colors"
              >
                {seller.metadata?.logo ? (
                  <img
                    src={`${seller.metadata.logo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={getMetafieldValue(seller.metadata?.name) || seller.title}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-brand-pink flex items-center justify-center text-white font-bold">
                    {(getMetafieldValue(seller.metadata?.name) || seller.title).charAt(0)}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <span className="font-semibold">{getMetafieldValue(seller.metadata?.name) || seller.title}</span>
                  {seller.metadata?.verified && <span className="text-blue-500">✓</span>}
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-8">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}