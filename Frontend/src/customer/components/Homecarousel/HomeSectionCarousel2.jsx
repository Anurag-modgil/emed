import AliceCarousel from "react-alice-carousel";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRef, useState } from "react";
import HomeSectionCard from "../homesectioncard/HomeSectionCard";
// import { medicine } from "../../../data/medicine/medicine";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { findProducts } from "../../../Redux/Customers/Product/Action";


const HomeSectionCarousel2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const param = useParams();
  const { customersProduct } = useSelector((store) => store);
  const location = useLocation();
  const [isLoaderOpen, setIsLoaderOpen] = useState(false);

  const handleLoderClose = () => {
    setIsLoaderOpen(false);
  };

  // const filter = decodeURIComponent(location.search);
  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const price = searchParams.get("price");
  const disccount = searchParams.get("disccout");
  const stock = searchParams.get("stock");

  // console.log("location - ", colorValue, sizeValue,price,disccount);

  useEffect(() => {
    const [minPrice, maxPrice] =
      price === null ? [0, 0] : price.split("-").map(Number);
    const data = {
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 10000,
      minDiscount: disccount || 0,
      stock: stock,
    };
    dispatch(findProducts(data));
  }, [price, disccount, stock]);

  useEffect(() => {
    if (customersProduct.loading) {
      setIsLoaderOpen(true);
    } else {
      setIsLoaderOpen(false);
    }
  }, [customersProduct.loading]);

  const carouselRef = useRef();
  const [activeIndex,setActiveIndex] = useState(0);

  const slidePrev = () => {
    setActiveIndex(activeIndex - 1);
    carouselRef.current.slidePrev();
  };

  const slideNext = () => {
    setActiveIndex(activeIndex + 1)
    carouselRef.current.slideNext();
  };

  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const responsive = {
    0: { items: 2 },
    568: { items: 3 },
    1024: { items: 4 },
  };

  const items = customersProduct.products?.content?.slice(8).map((item) => (
      <HomeSectionCard product={item} />
  ));

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 ">
      <div className="relative border bg-[#d4e2fa] rounded-xl p-5">
        <AliceCarousel
          ref={carouselRef}
          disableButtonsControls
          disableDotsControls
          mouseTracking
          items={items}
          responsive={responsive}
          onSlideChanged={syncActiveIndex}
        />
        {activeIndex !== items-4 && (<Button
          onClick={slideNext}
          variant="contained"
          className="z-50 bg-white rounded-md"
          sx={{
            position: "absolute",
            top: "50%",
            right: "0",
            transform: "translate(50%, -50%) rotate(90deg)",
          }}
          color="secondary"
          aria-label="next"
        >
          <ArrowForwardIosIcon sx={{ transform: "rotate(-90deg)" }} />
        </Button>)}
        {activeIndex !== 0 && (<Button
          onClick={slidePrev}
          variant="contained"
          className="z-50 bg-white"
          color="secondary"
          sx={{
            position: "absolute",
            top: "50%",
            left: "0",
            transform: "translate(-50%, -50%) rotate(90deg)",
          }}
          aria-label="previous"
        >
          <ArrowForwardIosIcon sx={{ transform: "rotate(90deg)" }} />
        </Button>)}
      </div>
    </div>
  );
};

export default HomeSectionCarousel2;
