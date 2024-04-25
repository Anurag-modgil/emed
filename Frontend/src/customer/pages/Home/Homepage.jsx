import React from "react";
import MainCarousel from "../../components/corosel/MainCarousel";
import HomeSectionCarousel from "../../components/Homecarousel/HomeSectionCarousel";
import HomeSectionCarousel2 from "../../components/Homecarousel/HomeSectionCarousel2";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Homepage() {
  return (
    <div>
      <MainCarousel />
      <h1 className=" font-bold text-3xl pt-8 ps-5">Trending Near You</h1>
      <p className=" text-gray-400 ps-6">popular in your city</p>
      <div className=" space-y-3 p-4 flex flex-col justify-center">
        <HomeSectionCarousel />
        <h1 className=" font-bold text-3xl pt-4 ps-5">
          Wellness Essentials of the Week
        </h1>
        <p className=" text-gray-400 ps-5">
          Super charge your immunity with us
        </p>
        <HomeSectionCarousel2 />
        <h1 className=" font-bold text-3xl pt-4 ps-5">Featured Brands</h1>
        <p className=" text-gray-400 ps-6">Pick from our favourite brands</p>
        <HomeSectionCarousel />
      </div>
    </div>
  );
}
