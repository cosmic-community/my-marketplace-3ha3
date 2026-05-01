import Link from 'next/link'
import type { Product } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function ProductCard({ product }: { product: Product }) {
  const title = getMetafieldValue(product.metadata?.product_title) || product.title
  const price = product.metadata?.price
  const salePrice = product.metadata?.sale_price
  const image = product.metadata?.main_image
  const stockStatus = getMetafieldValue(product.metadata?.stock_status)
  const featured = product.metadata?.featured
  const category = product.metadata?.category

  const hasSale = typeof salePrice === 'number' && typeof price === 'number' && salePrice < price
  const discount = hasSale && price ? Math.round(((price - salePrice!) / price) * 100) : 0

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {image && (
          <img
            src={`${image.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={title}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        {hasSale && (
          <div className="absolute top-2 left-2 bg-brand-pink text-white text-xs font-bold px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}
        {featured && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
            ⭐ FEATURED
          </div>
        )}
        {stockStatus && stockStatus.toLowerCase().includes('out') && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">OUT OF STOCK</span>
          </div>
        )}
      </div>
      <div className="p-3 sm:p-4">
        {category && (
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
            {getMetafieldValue(category.metadata?.name) || category.title}
          </p>
        )}
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-brand-pink transition-colors line-clamp-2 mb-2">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          {hasSale ? (
            <>
              <span className="text-base sm:text-lg font-bold text-brand-pink">
                ${salePrice?.toFixed(2)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ${price?.toFixed(2)}
              </span>
            </>
          ) : (
            price !== undefined && (
              <span className="text-base sm:text-lg font-bold text-gray-900">
                ${price.toFixed(2)}
              </span>
            )
          )}
        </div>
      </div>
    </Link>
  )
}