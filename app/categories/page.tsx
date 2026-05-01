import { getAllCategories } from '@/lib/cosmic'
import CategoryCard from '@/components/CategoryCard'

export default async function CategoriesPage() {
  const categories = await getAllCategories()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <p className="text-sm font-semibold text-brand-pink tracking-widest uppercase mb-2">Browse</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold">All Categories</h1>
        <p className="text-gray-600 mt-3">Find your style across our curated categories</p>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500">No categories available yet.</p>
        </div>
      )}
    </div>
  )
}