import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { maincarouseldata } from "./MainCarouselData";

const MainCarousel = () => {

    const responsive = {
        0: { items: 1 },
        // 568: { items: 2 },
        1024: { items: 2 },
    }; 
  const items = maincarouseldata.map((item) => (
    <img role="presentation" className="cursor-pointer" src={item.image} alt="" />
  ))

  return (
  <AliceCarousel  
  items={items}
  disableButtonsControls
  autoPlay
  responsive={responsive}
  autoPlayInterval={1100}
  infinite
  disableDotsControls
   />)
};

export default MainCarousel;
