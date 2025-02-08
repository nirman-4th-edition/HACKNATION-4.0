/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import image1 from "/src/assets/William-Barnes.png";
import image2 from "/src/assets/review2.png";
import image3 from "/src/assets/review3.png";
import image4 from "/src/assets/review4.png";
import image5 from "/src/assets/review5.png";

import image3_2 from "/src/assets/fireLogo.png";
import { MdArrowOutward } from "react-icons/md";

const Reviews = () => {
  const [showClientDetails, setShowClientDetails] = useState(
    Array(5).fill(false) // Adjust the array size based on the number of clients
  );

  const objOfItems = [
    {
      workName: "FireSafe Corp",
      clientName: "Alex Johnson",
      image: image1,
      buttons: ["360° Fire Detection", "IoT Integration"],
      desc: "The team at Bug Busters delivered a state-of-the-art fire detection system that has significantly enhanced our safety protocols. Their attention to detail and innovative approach ensured that the system was both efficient and reliable. The integration with our existing infrastructure was seamless, and the real-time notifications have proven to be invaluable."
    },
    {
      workName: "SecureHomes",
      clientName: "Samantha Lee",
      image: image2,
      buttons:["Automated Suppression", "Real-Time Notifications", "Scalable Design"],
      desc: "Bug Busters transformed our fire safety approach with their automated suppression system. The team’s expertise and dedication to creating a scalable solution have made a lasting impact on our operations. Their commitment to compliance and eco-friendly design sets them apart in the industry."
    },
    {
      workName: "GreenTech Innovations",
      clientName: "Michael Ross",
      image: image3,
      buttons: ["Eco-Friendly", "Innovative Technology"],
      desc: "Working with Bug Busters has been a game-changer for our fire safety initiatives. Their eco-friendly system aligns perfectly with our sustainability goals, and their innovative use of technology has ensured that our facilities are protected with the highest standards. The process was smooth, and the final product exceeded our expectations."
    },
    {
      workName: "SafeSpace Solutions",
      clientName: "Jennifer Adams",
      image: image5,
      buttons: ["Compliance Ready", "Customizable Integration"],
      desc: "Bug Busters provided us with a fire suppression system that not only met all regulatory requirements but also integrated seamlessly with our existing infrastructure. Their ability to customize the solution to our specific needs was particularly impressive. We now feel more confident in our safety measures than ever before."
    },
    {
      workName: "SmartCity Ventures",
      clientName: "David Green",
      image: image4,
      buttons: ["Scalable Design", "360° Fire Detection"],
      desc: "The scalable design provided by Bug Busters has allowed us to implement a fire detection system that grows with our city’s needs. Their innovative approach and use of 360° cameras have given us a level of safety we never thought possible. We’re excited to continue this partnership as our city expands."
    }
  ];

  const toggleClientDetails = (index) => {
    const newShowClientDetails = Array(objOfItems.length).fill(false);
    newShowClientDetails[index] = true;
    setShowClientDetails(newShowClientDetails);
  };

  return (
    <div data-scroll data-scroll-section data-scroll-speed="-.1" className="h-auto w-full bg-whites py-20 pb-0">
      <h1 className="text-7xl font-neuemontreal border-b-[1px] px-16 border-[#7777] pb-10">
        Clients&apos; reviews
      </h1>
      <div className="reviews w-full h-auto">
        {objOfItems.map((items, index) => (
          <div
            className="single-client px-16 py-5 h-auto w-full border-b-[1px] border-[#7777] pb-5"
            key={index}
          >
            <div className="items flex items-center justify-between">
              <h1 className="text-[2.2vh] w-full font-medium tracking-wide font-neuemontreal">
                {items.workName}
              </h1>
              {showClientDetails[index] && (
                <h1 className="text-[2.2vh] w-full font-medium tracking-wide font-neuemontreal capitalize">
                  services:
                </h1>
              )}
              <h1 className="text-[2.2vh] w-full font-medium tracking-wide font-neuemontreal">
                {items.clientName}
              </h1>
              <h1
                className="text-[2.2vh] font-medium tracking-wide font-neuemontreal cursor-pointer"
                onClick={() => toggleClientDetails(index)}
              >
                READ
              </h1>
            </div>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: showClientDetails[index] ? "auto" : 0 }}
              transition={{ duration: 0.5 }}
              className="clientDetails"
            >
              {showClientDetails[index] && (
                <div className="client flex items-center">
                  <div className="clientProfile w-3/4 relative left-[30%]">
                    {items.buttons?.map((Item, index) => (
                      <div
                        className="py-2 group flex gap-3 items-center w-fit"
                        key={index}
                      >
                        <button className="button1 py-3 text-black font-neuemontreal border-[1px] border-[#000] text-[1rem] w-fit rounded-full px-10 hover:bg-black hover:text-white duration-500 ease-in-out">
                          {Item}
                        </button>
                        <MdArrowOutward className="h-10 w-10 opacity-0 bg-black border-[1px] rounded-full text-white p-2 group-hover:opacity-100 duration-700 ease-in-out" />
                      </div>
                    ))}
                  </div>
                  <div className="w-1/2 h-auto px-20 overflow-hidden py-10">
                    <img
                      src={items.image}
                      alt="reviews"
                      className="h-32 w-32 object-cover rounded-xl object-center"
                    />
                    <div className="desc py-10">
                      <p className="text-xl">{items.desc}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        ))}
      </div>
      <div className="w-full h-screen bg-whites flex items-center gap-5 pb-20 px-16">
        <div className="cardcontainer w-1/2">
          <div className="card relative w-full flex items-center justify-center h-[50vh] bg-[#004C42] rounded-xl">
            <h1 className="text-4xl text-[#CDEA68] uppercase">Eco Friendly</h1>
          </div>
        </div>
        <div className="cardcontainer flex w-1/2 gap-5">
          <div className="card relative w-1/2 flex items-center justify-center h-[50vh] bg-[#202120] rounded-xl">
            <h1 className="text-4xl text-[#CDEA68] uppercase tracking-wider">Sustainable</h1>
          </div>
          <div className="card relative w-1/2 h-[50vh] bg-[#202120] rounded-xl">
            <img
              width="102"
              height="104"
              src={image3_2}
              alt="logo"
              className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
