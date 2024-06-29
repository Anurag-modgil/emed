import React from 'react';
import ProductCard from '../../components/Product/ProductCard';

const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { query: initialQuery } = useParams();
  const { products, loading, error } = useSelector((state) => state.products);
  const [query, setQuery] = useState(initialQuery || '');

  useEffect(() => {
    dispatch(searchProducts(initialQuery));
    setQuery(initialQuery);
  }, [dispatch, initialQuery]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    navigate(`/search?query=${newQuery}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="mb-8">
          <SearchBar query={query} onSearch={handleSearch} />
        </div>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={{
                id: product._id,
                title: product.title,
                description: product.description,
                price: product.price,
                discountedPrice: product.discountedPrice,
                discountPersent: product.discountPersent,
                quantity: product.quantity,
                brand: product.brand,
                imageUrl: product.imageUrl,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;