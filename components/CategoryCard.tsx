import Link from 'next/link'
import type { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function CategoryCard({ category }: { category: Category }) {
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const image = category.metadata?.category_image

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative block aspect-[4/5] rounded-lg overflow-hidden"
    >
      {image && (
        <img
          src={`${image.imgix_url}?w=600&h=750&fit=crop&auto=format,compress`}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white text-lg sm:text-xl font-extrabold uppercase tracking-wide group-hover:text-brand-pink transition-colors">
          {name}
        </h3>
      </div>
    </Link>
  )
}