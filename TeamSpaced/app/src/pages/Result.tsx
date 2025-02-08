import React from "react";
import { Sprout, Droplets, Mountain } from "lucide-react";
import { Button } from "konsta/react";
import { NavLink } from "react-router";

const Result = () => {
  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen p-5">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Mountain className="w-8 h-8 text-gray-700" />
          <h1 className="text-3xl font-bold text-center">BLACK SOIL</h1>
        </div>

        <p className="text-gray-700 text-center mb-6 leading-relaxed">
          Black soil, also known as Regur soil or Black Cotton Soil, is highly
          fertile and excellent for growing cotton. It is formed from the
          solidification of basic lava spread over large areas of the Deccan
          Plateau during volcanic activity. The soil is dark in color due to the
          presence of iron and organic matter.
        </p>

        <div className="bg-gray-50 p-6 rounded-xl mb-6 border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <Sprout className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-semibold">Suitable Crops</h2>
          </div>
          <ul className="grid grid-cols-2 gap-2 pl-5">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Cotton
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Wheat
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Millets
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Oilseeds
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Rice
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-green-50 p-4 rounded-xl text-center">
            <h3 className="font-bold text-gray-700 mb-2">pH Level</h3>
            <p className="text-2xl font-semibold text-green-600">6.5 - 7.5</p>
          </div>
          <div className="bg-green-50 p-4 rounded-xl text-center">
            <h3 className="font-bold text-gray-700 mb-2">Key Properties</h3>
            <div className="flex items-center justify-center gap-2">
              <Droplets className="w-5 h-5 text-blue-500" />
              <p className="text-sm">High Water Retention</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Mineral Composition</h2>
          <div className="space-y-3">
            <div className="relative pt-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-semibold">Nitrogen (N)</span>
                <span className="text-sm font-semibold">0.02 - 0.04%</span>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div className="w-[40%] bg-green-500"></div>
              </div>
            </div>
            <div className="relative pt-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-semibold">Phosphorus (P)</span>
                <span className="text-sm font-semibold">0.005 - 0.02%</span>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div className="w-[20%] bg-blue-500"></div>
              </div>
            </div>
            <div className="relative pt-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-semibold">Potassium (K)</span>
                <span className="text-sm font-semibold">0.05 - 0.8%</span>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div className="w-[80%] bg-purple-500"></div>
              </div>
            </div>
          </div>
        </div>

        <Button className="bg-main-800">
          <NavLink to={"/home"} prefetch={"render"}>
            Home
          </NavLink>
        </Button>
      </div>
    </div>
  );
};

export default Result;
