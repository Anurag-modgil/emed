import React from "react";
import "./HomeSectionCard.css";
import { useNavigate } from "react-router-dom";

const HomeSectionCard = ({ product }) => {
  const { title, brand, imageUrl,price, discountPersent, discountedPrice } = product;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/${product?._id}`)
    window.scrollTo(0, 0);
  };

  return (
    <div
      onClick={handleNavigate}
      className="productCard cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-xl w-[15rem] h-[20rem] overflow-hidden mx-3 border border-blue-300"
    >
      <div className="h-[10rem] w-full overflow-hidden">
        <img
          className="object-cover object-top w-full h-full"
          src={imageUrl}
          alt=""
        />
      </div>

      <div className="textPart bg-white p-3 ">
        <p className="">{title}</p>
        <p className=" text-gray-400">{brand}</p>
        
        <div className="flex space-x-2 items-center">
          <p className="font-semibold">₹{discountedPrice}</p>
          <p className="opacity-50 line-through">₹{price}</p>
          <p className="text-green-600 font-semibold">{discountPersent}%off</p>
        </div>
      </div>
    </div>
  );
};

export default HomeSectionCard;
