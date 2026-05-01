import { getAllReviews } from '@/lib/cosmic'
import ReviewCard from '@/components/ReviewCard'

export default async function ReviewsPage() {
  const reviews = await getAllReviews()

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + (typeof r.metadata?.rating === 'number' ? r.metadata.rating : 0), 0) / reviews.length
    : 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <p className="text-sm font-semibold text-brand-pink tracking-widest uppercase mb-2">Loved by Customers</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold">Customer Reviews</h1>
        {reviews.length > 0 && (
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex text-yellow-400 text-2xl">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>{i < Math.round(avgRating) ? '★' : '☆'}</span>
              ))}
            </div>
            <span className="text-gray-600">
              {avgRating.toFixed(1)} from {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </span>
          </div>
        )}
      </div>

      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
        </div>
      )}
    </div>
  )
}