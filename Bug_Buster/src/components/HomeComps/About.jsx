/* eslint-disable no-unused-vars */
import React from "react";
import { MdArrowOutward } from "react-icons/md";

const About = () => {
  return (
    <div
      data-scroll
      data-scroll-section
      data-scroll-speed="-.2"
      className="h-fit w-full py-20 rounded-3xl bg-[#d66b23] relative bottom-0"
    >
      <div className="w-[85%] px-16 py-12">
        <h2 className="w-full font-light text-[#34170c] text-[3vw] tracking-wider font-neuemontreal leading-[3.7vw]">
          <span className="font-bold">PyroGuard</span> is a cutting-edge{" "}
          <span className="underline">fire suppression system</span> that
          combines <span className="underline">AI and IoT</span> to detect and
          extinguish fires with pinpoint accuracy. It targets flames directly,<span className="underline">minimizing damage</span>{" "}
          and <span className="underline">maximizing safety</span>, all while
          offering <span className="underline">real-time monitoring</span> and
          control.
        </h2>
      </div>
      <div className="w-full border-b-[1px] border-[#000] py-5" />
      <div className="texts flex w-full px-16 py-5 justify-arround">
        <div className="heading w-2/4 h-auto ">
          <h1 className="text-xl font-neuemontreal text-[#34170c]">
            What you can expect:
          </h1>
        </div>
        <div className="midText w-1/4 flex flex-col">
          <p className="text-[1.3rem] font-neuemontreal text-[#34170c] font-light text-start p-5 py-0">
            <span className="font-bold"> Automated Fire Suppression</span>: Our
            system uses 360-degree cameras and IoT sensors to detect fires and
            automatically deploy water to suppress them, ensuring rapid response
            and minimal damage.
          </p>
          <p className="text-[1.3rem] font-neuemontreal text-[#34170c] font-light  text-start p-5 py-5">
            <span className="font-bold">Scalable and Sustainable</span>:
            Designed for various environments, from homes to industrial
            settings, our solution is eco-friendly, minimizing water wastage
            while aligning with modern fire safety standards.
          </p>
        </div>
        <div className="endText flex flex-col p-24 px-32">
          <h1 className="text-2xl font-light text-[#2d2d2d] font-neuemontreal ">
            S :
          </h1>
          <ul className="py-3 text-2xl font-neuemontreal text-[#2d2d2d] flex flex-col gap-1 capitalize tracking-wide font-extralight">
            {[
              "Instagram",
              "Behance",
              "Facebook",
              "Linkedin"
            ].map((items, index) =>
              <li className="" key={index}>
                <a href="/">
                  {items}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="w-full border-b-[1px] border-[#000] py-5" />
      <div className="approch flex justify-around">
        <div className="w-2/4 px-16 py-5">
          <h1 className="text-7xl font-neuemontreal">Our approach:</h1>
          <p className="text-2xl p-10 pl-2">
            We use 360° cameras, IoT sensors, and automated water pipes to
            deliver fast, precise fire detection and suppression. Scalable,
            efficient, and eco-friendly, our system adapts to any environment,
            minimizing damage while conserving resources.
          </p>
          <button className="group border px-8 py-2 border-black rounded-full translate-y-5 uppercase bg-zinc-800 hover:bg-black duration-150 ease-in-out text-white text-xl flex gap-6 items-center pr-3">
            <a
              href="https://drive.google.com/uc?export=download&id=1lWJtO1SUsewZhisuYPUAJIZ70tYnDJBa"
              download
            >
              Read More
            </a>

            <span>
              <MdArrowOutward className="h-full w-16 p-4 self-end duration-300 ease-in scale-[.2] bg-white group-hover:bg-white group-hover:text-black group-hover:scale-100 rounded-full" />
            </span>
          </button>
        </div>
        <div className="w-[55vw] h-[70vh] p-10 items-center justify-center pb-0">
          <img
            src="/src/assets/ourApproch.jpg"
            alt="our Arrroach"
            className="w-full h-full rounded-2xl object-cover object-center hover:scale-[1.05] duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
