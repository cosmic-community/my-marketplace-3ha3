import { getAllProducts } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'

export default async function ProductsPage() {
  const products = await getAllProducts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <p className="text-sm font-semibold text-brand-pink tracking-widest uppercase mb-2">All Products</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold">Shop the Collection</h1>
        <p className="text-gray-600 mt-3">Discover {products.length} amazing products from verified sellers</p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500">No products available yet. Check back soon!</p>
        </div>
      )}
    </div>
  )
}