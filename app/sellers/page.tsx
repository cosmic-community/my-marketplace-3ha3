import { getAllSellers } from '@/lib/cosmic'
import SellerCard from '@/components/SellerCard'

export default async function SellersPage() {
  const sellers = await getAllSellers()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <p className="text-sm font-semibold text-brand-pink tracking-widest uppercase mb-2">Our Community</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold">Meet Our Sellers</h1>
        <p className="text-gray-600 mt-3">Verified sellers bringing you the best products</p>
      </div>

      {sellers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sellers.map((seller) => (
            <SellerCard key={seller.id} seller={seller} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500">No sellers available yet.</p>
        </div>
      )}
    </div>
  )
}