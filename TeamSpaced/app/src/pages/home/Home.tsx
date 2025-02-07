import React, { useEffect, useState } from "react";
import { Block, Button, Card, Page, Tabbar, TabbarLink } from "konsta/react";
import NavBar from "./NavBar";
import Hero from "./Hero";
import { Location } from "../location/Location";
import { HomeIcon } from "@heroicons/react/24/outline";

const Home = () => {
  const [name, setName] = useState<string>("Loading...");
  const [location, setLocation] = useState<Location | null>();
  const [addressVisible, setAddressVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('tab-1');
  const [isTabbarLabels, setIsTabbarLabels] = useState(true);
  const [isTabbarIcons, setIsTabbarIcons] = useState(false);

  useEffect(() => {
    const cachedLocation = localStorage.getItem("location");
    setLocation(cachedLocation ? JSON.parse(cachedLocation) : null);
  });

  function setRightPanelOpened(arg0: boolean): void {
    throw new Error("Function not implemented.");
  }

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
      
       <Card raised header="Card header" footer="Card footer" >
       <Block
        strongIos
        outlineIos
        className="flex space-x-4 rtl:space-x-reverse"
      >
        <Button rounded onClick={() => setRightPanelOpened(true)}>
          Left Panel
        </Button>
        <Button rounded onClick={() => setRightPanelOpened(true)}>
          Right Panel
        </Button>
      </Block>
      </Card>
      <Tabbar
        labels={isTabbarLabels}
        icons={isTabbarIcons}
        className="left-0 bottom-0 fixed"
      >
        <TabbarLink
          active={activeTab === 'tab-1'}
          onClick={() => setActiveTab('tab-1')}
         
          label={isTabbarLabels && 'Home'}
        />
        <TabbarLink
          active={activeTab === 'tab-2'}
          onClick={() => setActiveTab('tab-2')}
          icon={
            isTabbarIcons && (
              <HomeIcon />
            )
          }
          label={isTabbarLabels && 'Camera'}
        />
        <TabbarLink
          active={activeTab === 'tab-3'}
          onClick={() => setActiveTab('tab-3')}
          // icon={
          //   isTabbarIcons && (
          //     <Icon
          //       ios={<CloudUploadFill className="w-7 h-7" />}
          //       material={<MdFileUpload className="w-6 h-6" />}
          //     />
          //   )
          // }
          label={isTabbarLabels && 'Profile'}
        />
      </Tabbar>
    </Page>
  );
};

export default Home;
