import { getProducts } from '../lib/api';
import Link from 'next/link';
import ProductGridView from './components/ProductGridView';
import ProductListView from './components/ProductListView';
import { cookies } from 'next/headers';

type ViewType = 'list' | 'grid';

export default async function ProductsPage() {
  const cookieStore = await cookies();
  const viewType = cookieStore.get('view_type')?.value as ViewType;

  const products = await getProducts({ limit: 20 });

  if (!viewType) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Link
        href='/products/new'
        className='inline-block px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition'
      >
        Add Product
      </Link>

      {viewType === 'grid' ? (
        <ProductGridView products={products} />
      ) : (
        <ProductListView products={products} />
      )}
    </main>
  );
}
