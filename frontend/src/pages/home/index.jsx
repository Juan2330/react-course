import { useContext } from 'react';
import Layout from '../../components/layout';
import Card from '../../components/card';
import ProductDetail from '../../components/productDetail';
import { ShoppingCartContext } from '../../context';

function Home() {
  const context = useContext(ShoppingCartContext);

  const renderView = () => {
    const hasSearch = context.searchByTitle?.length > 0 || context.searchByCategory?.length > 0;
  
    if (hasSearch) {
      if (context.filteredItems?.length > 0) {
        return context.filteredItems?.map(item => (
          <Card key={item.id} data={item} />
        ));
      } else {
        return (
          <div className='flex flex-col justify-center items-center h-full w-full'>
            <img 
              className='object-cover rounded-lg' 
              src='/frontend/public/cry.jpg'
              alt='No products found'
            />
            <div className='flex items-center justify-center relative w-80'>
              <h1 className='font-medium text-xl dark:text-white'>
                We don&apos;t have anything
              </h1>
            </div>
          </div>
        );
      }
    } else {
      return context.items
        ?.filter((item) =>
          ['electronics', 'jewelery', "men's clothing", "women's clothing"].includes(item.category?.name)
        )
        .map((item) => <Card key={item.id} data={item} />) || [];
    }
  };

  const view = renderView();
  const viewLength = Array.isArray(view) ? view.length : 0;
  
  return (
    <Layout>
      <div className='flex items-center justify-center relative w-80 mb-4'>
        <h1 className='font-medium text-xl dark:text-white'>Exclusive products</h1>
      </div>
      <input 
        type='text' 
        placeholder='Search a product'
        className='rounded-lg border border-black dark:border-gray-600 w-80 p-4 mb-12 focus:outline-none bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
        onChange={(event) => context.setSearchByTitle(event.target.value)}
      />
      <div className={`grid gap-12 w-full max-w-screen-lg ${
        viewLength === 0 ? 'grid-cols-1' : 'grid-cols-4'
      }`}>
        {view}
      </div>
      <ProductDetail />
    </Layout>
  );
}

export default Home;