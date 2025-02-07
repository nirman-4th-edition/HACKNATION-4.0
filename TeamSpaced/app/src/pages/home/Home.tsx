import React, { useEffect, useState } from "react";
import { Page } from "konsta/react";
import NavBar from "./NavBar";
import Hero from "./Hero";
import { Location } from "../location/Location";

const Home = () => {
  const [name, setName] = useState<string>("Loading...");
  const [location, setLocation] = useState<Location | null>();
  const [addressVisible, setAddressVisible] = useState(true);

  useEffect(() => {
    const cachedLocation = localStorage.getItem("location");
    setLocation(cachedLocation ? JSON.parse(cachedLocation) : null);
  });

  return (
    <Page className={`overflow-hidden`}>
      <NavBar
        name={name}
        address={`${location?.address.city.split(" ")[0]}, ${
          location?.address.state_district
        }`}
        addressVisible={addressVisible}
      />
      <Hero
        onHeroChange={(state) => {
          if (state) setAddressVisible(false);
          else setAddressVisible(true);
        }}
      />
    </Page>
  );
};

export default Home;
