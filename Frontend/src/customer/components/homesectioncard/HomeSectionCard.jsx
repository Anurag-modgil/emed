// import React from "react";
// import "./HomeSectionCard.css";
// import { useNavigate } from "react-router-dom";

// const HomeSectionCard = ({ product }) => {
//   const { title, brand, imageUrl,price, discountPersent, discountedPrice } = product;
//   const navigate = useNavigate();

//   const handleNavigate = () => {
//     navigate(`/${product?._id}`)
//     window.scrollTo(0, 0);
//   };

//   return (
//     <div
//       onClick={handleNavigate}
//       className="productCard cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-xl w-[15rem] h-[20rem] overflow-hidden mx-3 border border-blue-300"
//     >
//       <div className="h-[10rem] w-full overflow-hidden">
//         <img
//           className="object-cover object-top w-full h-full"
//           src={imageUrl}
//           alt=""
//         />
//       </div>

//       <div className="textPart bg-white p-3  style={{align-tems:left !important}} ">
//         <p className="">{title}</p>
//         <p className=" text-gray-400">{brand}</p>

//         <div className="flex space-x-2 items-center">
//           <p className="font-semibold">₹{discountedPrice}</p>
//           <p className="opacity-50 line-through">₹{price}</p>
//           <p className="text-green-600 font-semibold">{discountPersent}%off</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeSectionCard;
import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomeSectionCard.css";

const HomeSectionCard = ({ product }) => {
  const {
    title,
    brand,
    imageUrl,
    price,
    discountPersent,
    discountedPrice,
    rating,
  } = product;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/${product?._id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="card" onClick={handleNavigate}>
      {discountPersent && (
        <div className="card-discount">-{discountPersent}% Off</div>
      )}
      <img src={imageUrl} alt={title} className="card-image" />
      <div className="card-content">
        <p className="card-category">{brand}</p>
        <h2 className="card-title">{title}</h2>
        <div className="card-rating">
          {Array.from({ length: Math.round(4) }, (_, index) => (
            <span key={index}>&#9733;</span>
          ))}
        </div>
        <p className="card-price">
          <span className="current-price">₹{discountedPrice}</span>
          {price && <span className="original-price">₹{price}</span>}
        </p>
        <button className="card-button">Add to Cart</button>
      </div>
    </div>
  );
};

export default HomeSectionCard;
