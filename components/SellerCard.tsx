import Link from 'next/link'
import type { Seller } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function SellerCard({ seller }: { seller: Seller }) {
  const name = getMetafieldValue(seller.metadata?.name) || seller.title
  const location = getMetafieldValue(seller.metadata?.location)
  const bio = getMetafieldValue(seller.metadata?.bio)
  const logo = seller.metadata?.logo
  const verified = seller.metadata?.verified

  return (
    <Link
      href={`/sellers/${seller.slug}`}
      className="group block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center gap-4 mb-4">
        {logo ? (
          <img
            src={`${logo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
            alt={name}
            className="w-16 h-16 rounded-full object-cover bg-gray-100"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-brand-pink flex items-center justify-center text-white text-xl font-bold">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg group-hover:text-brand-pink transition-colors truncate">
              {name}
            </h3>
            {verified && (
              <span className="text-blue-500" title="Verified seller">
                ✓
              </span>
            )}
          </div>
          {location && (
            <p className="text-sm text-gray-500 truncate">📍 {location}</p>
          )}
        </div>
      </div>
      {bio && (
        <p className="text-sm text-gray-600 line-clamp-3">{bio}</p>
      )}
    </Link>
  )
}