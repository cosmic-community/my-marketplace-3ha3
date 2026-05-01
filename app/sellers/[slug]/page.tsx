// app/sellers/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSellerBySlug, getProductsBySeller, getMetafieldValue } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'

export default async function SellerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const seller = await getSellerBySlug(slug)

  if (!seller) {
    notFound()
  }

  const products = await getProductsBySeller(seller.id)

  const name = getMetafieldValue(seller.metadata?.name) || seller.title
  const bio = getMetafieldValue(seller.metadata?.bio)
  const location = getMetafieldValue(seller.metadata?.location)
  const logo = seller.metadata?.logo
  const verified = seller.metadata?.verified

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-pink to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="text-sm text-pink-100 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/sellers" className="hover:text-white">Sellers</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{name}</span>
          </nav>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {logo ? (
              <img
                src={`${logo.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
                alt={name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white"
              />
            ) : (
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white text-brand-pink flex items-center justify-center text-4xl font-extrabold border-4 border-white">
                {name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl sm:text-5xl font-extrabold">{name}</h1>
                {verified && (
                  <span className="bg-blue-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                    ✓ Verified
                  </span>
                )}
              </div>
              {location && (
                <p className="text-pink-100 mt-2">📍 {location}</p>
              )}
            </div>
          </div>
          {bio && (
            <p className="text-pink-50 mt-6 max-w-3xl leading-relaxed">{bio}</p>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-6">
          Products by {name} ({products.length})
        </h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500">This seller hasn't listed any products yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}