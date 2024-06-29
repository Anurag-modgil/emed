import AliceCarousel from "react-alice-carousel";
import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRef, useState, useEffect } from "react";
import HomeSectionCard from "../homesectioncard/HomeSectionCard";
import { useDispatch, useSelector } from "react-redux";
import { findProductsBySalt } from "../../../Redux/Customers/Product/Action";

const SimilarProductCarousel = ({ salt }) => {
  const dispatch = useDispatch();
  const customersProduct = useSelector((store) => store.customersProduct);
  const [isLoaderOpen, setIsLoaderOpen] = useState(false);
  const carouselRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);


  useEffect(() => {
    if (salt) {
      setIsLoaderOpen(true);
      dispatch(findProductsBySalt(salt))
        .then(() => setIsLoaderOpen(false))
        .catch((error) => {
          setIsLoaderOpen(false);
          console.error("Error fetching products:", error);
        });
    }
  }, [dispatch, salt]);
  
  const slidePrev = () => {
    setActiveIndex((prevIndex) => prevIndex - 1);
    carouselRef.current.slidePrev();
  };

  const slideNext = () => {
    setActiveIndex((prevIndex) => prevIndex + 1);
    carouselRef.current.slideNext();
  };

  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const responsive = {
    0: { items: 2 },
    568: { items: 3 },
    1024: { items: 4 },
  };

  const items = Array.isArray(customersProduct.products?.content)
    ? customersProduct.products.content
        .filter((product) => product.salt === salt)
        .map((item) => <HomeSectionCard key={item.id} product={item} />)
    : [];

  return (
    <div className="relative px-4 sm:px-6 lg:px-8">
      <div className="relative border bg-[#d4e2fa] rounded-xl p-5">
        {isLoaderOpen ? (
          <div>Loading...</div>
        ) : items.length > 0 ? (
          <>
            <AliceCarousel
              ref={carouselRef}
              disableButtonsControls
              disableDotsControls
              mouseTracking
              items={items}
              responsive={responsive}
              onSlideChanged={syncActiveIndex}
            />
            {activeIndex < items.length - responsive[1024].items && (
              <Button
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
              </Button>
            )}
            {activeIndex > 0 && (
              <Button
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
              </Button>
            )}
          </>
        ) : (
          <div>No similar products found.</div>
        )}
      </div>
    </div>
  );
};

export default SimilarProductCarousel;
