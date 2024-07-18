import React, { useState, useEffect } from "react";
import ProductCard from "../../components/Product/ProductCard";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../../../Redux/Customers/Product/Action";
import SearchBar from "../../components/searchbar/SearchBar";

const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryParam = searchParams.get("params");
  const { query: initialQuery } = useParams();
  const query = queryParam || initialQuery;
  const { products, loading, error } = useSelector(
    (state) => state.customersProduct
  );

  useEffect(() => {
    if (query) {
      dispatch(searchProducts(query));
    }
  }, [dispatch, query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products &&
            products?.map((product) => (
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
