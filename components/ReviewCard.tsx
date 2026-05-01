import Link from 'next/link'
import type { Review } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function ReviewCard({ review }: { review: Review }) {
  const customerName = getMetafieldValue(review.metadata?.customer_name)
  const rating = typeof review.metadata?.rating === 'number' ? review.metadata.rating : 0
  const reviewText = getMetafieldValue(review.metadata?.review_text)
  const product = review.metadata?.product

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-brand-pink flex items-center justify-center text-white font-bold">
          {customerName ? customerName.charAt(0).toUpperCase() : '?'}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm">{customerName || 'Anonymous'}</p>
          <div className="flex items-center text-yellow-400 text-sm">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>{i < rating ? '★' : '☆'}</span>
            ))}
          </div>
        </div>
      </div>
      {reviewText && (
        <p className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-4">
          "{reviewText}"
        </p>
      )}
      {product && (
        <Link
          href={`/products/${product.slug}`}
          className="inline-flex items-center text-xs font-semibold text-brand-pink hover:text-brand-pink-dark"
        >
          View Product →
        </Link>
      )}
    </div>
  )
}