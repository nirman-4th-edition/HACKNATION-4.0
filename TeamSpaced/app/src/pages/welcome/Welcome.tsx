import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { Button, Page } from "konsta/react";
import React, { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import bg from "./bg.png";
import plant from "./plant.png";
import plant2 from "./plant2.png";
import plant3 from "./plant3.png";
import "./welcome.css";
import { NavLink } from "react-router";

const Welcome = () => {
  const [isEnd, setEnd] = useState(false);
  const [isStart, setStart] = useState(true);

  return (
    <Page className="overflow-hidden">
      <img
        src={bg}
        alt=""
        width={500}
        height={500}
        className="absolute -right-32 -top-32"
      />
      <img
        src={bg}
        alt=""
        width={500}
        height={500}
        className="absolute -left-32 top-72"
      />

      <Swiper
        slidesPerView={1}
        modules={[Navigation, Pagination]}
        controller={{ by: "container" }}
        navigation={{ nextEl: ".nextArrow", prevEl: ".prevArrow" }}
        pagination={{ clickable: true }}
        className="absolute top-72 h-[400px]"
        onSlideChange={(swiper: SwiperClass) => {
          setStart(swiper.isBeginning);
          setEnd(swiper.isEnd);
        }}
      >
        <div className="flex flex-row gap-3 absolute right-10 top-1/2 pb-6 translate-y-32 z-20">
          <ArrowLeftCircleIcon
            className={`prevArrow w-10 font-thin ${
              isStart ? "text-gray-400" : ""
            }`}
          />
          <ArrowRightCircleIcon
            className={`nextArrow w-10 font-thin ${
              isEnd ? "text-gray-400" : ""
            }`}
          />
        </div>
        <SwiperSlide>
          <div className="w-full h-full">
            <img src={plant} alt="illustration" width={240} height="auto" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full">
            <img src={plant2} alt="illustration" width={240} height="auto" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full">
            <img
              src={plant3}
              alt="illustration"
              width={240}
              height="auto"
              className="relative top-1/2 -translate-y-24 left-10"
            />
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="px-6 absolute bottom-6 w-full">
        <Button
          className="enabled:bg-main-800 text-white enabled:rounded-[80px] disabled:bg-main-200 disabled:rounded-[80px] disabled:text-white text-xl h-16"
          disabled={!isEnd}
        >
          <NavLink to="/location" end prefetch="render">
            Get Started
          </NavLink>
        </Button>
      </div>
    </Page>
  );
};

export default Welcome;
