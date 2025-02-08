import React, { useEffect, useState } from "react";
import { Geolocation, Position } from "@capacitor/geolocation";
import { Button, Page } from "konsta/react";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { Map, Marker } from "maplibre-gl";
import { NavLink } from "react-router";
import "./location.css";
import Loading from "../../components/Loading";

export interface Location {
  display_name: string;
  address: {
    university: string;
    road: string;
    suburb: string;
    city_district: string;
    city: string;
    county: string;
    state_district: string;
    state: string;
    postcode: string;
    country: string;
    country_code: string;
  };
}

export async function fetchLocation(
  lat: number,
  lon: number
): Promise<Location | undefined> {
  const url = `https://us1.locationiq.com/v1/reverse?key=pk.9cdbea9db7c454cf8533ce829090fc62&lat=${lat}&lon=${lon}&format=json`;
  let address: Location | undefined;

  try {
    const res = await fetch(url);
    const data = (await res.json()) as Location;

    address = data;
  } catch (error) {
    address = undefined;
  }

  return address;
}
const Location = () => {
  const [position, setPosition] = useState<Position>();
  const [location, setLocation] = useState<Location>();
  let map: Map = {} as Map;

  useEffect(() => {
    Geolocation.getCurrentPosition().then((res) => {
      setPosition(res);
    });
    map = new Map({
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [78.9629, 20.5937],
      zoom: 9.5,
      container: "map",
    });
  }, []);

  useEffect(() => {
    const long = position?.coords.longitude;
    const lat = position?.coords.latitude;

    if (long && lat && !Number.isNaN(long)) {
      fetchLocation(lat, long).then((location) => {
        setLocation(() => {
          localStorage.setItem("location", JSON.stringify(location));
          return location;
        });
      });

      localStorage.setItem("lat", lat.toString());
      localStorage.setItem("long", long.toString());

      map = new Map({
        style: "https://tiles.openfreemap.org/styles/liberty",
        center: [long, lat],
        zoom: 10,
        container: "map",
      });

      var el = document.createElement("div");
      el.id = "markerWithExternalCss";

      var markerWithExternalCss = new Marker(el)
        .setLngLat([long, lat])
        .addTo(map);

      var el2 = document.createElement("div");
      el2.className = "marker";
      el2.style.backgroundImage =
        "url(https://tiles.locationiq.com/static/images/marker50px.png)";
      el2.style.width = "50px";
      el2.style.height = "50px";

      new Marker(el2).setLngLat([long, lat]).addTo(map);
    }
  }, [position]);

  const loaded = map.loaded;

  return (
    <Page className="flex flex-col overflow-hidden">
      {!location ? <Loading /> : ""}
      <div className="flex-[10]" id="map"></div>
      <div className="flex-[2.5] flex flex-col gap-3">
        <div className="flex flex-row px-4 pt-4">
          <div className="flex-[3] flex flex-col gap-2">
            <p className="font-medium text-2xl ml-2">Select Location</p>
            <div className="flex flex-row gap-3  ">
              <MapPinIcon className="w-8" />
              <p className="w-72 h-6 overflow-hidden whitespace-nowrap text-ellipsis">
                {location?.display_name}
              </p>
            </div>
          </div>
          <div>
            <PaperAirplaneIcon className="w-8 my-3 -rotate-45 text-slate-700" />
          </div>
        </div>
        <Button
          className="enabled:bg-main-800 disabled:text-white disabled:bg-main-200 text-xl rounded-none flex-[3]"
          disabled={!position}
        >
          <NavLink to="/home" prefetch="render">
            Continue
          </NavLink>
        </Button>
      </div>
    </Page>
  );
};

export default Location;
