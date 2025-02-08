import { App as AppComponent, Page } from "konsta/react";
import React, { useEffect, useState } from "react";
import "../App.css";
import Splash from "./splash/splash";
import Welcome from "./welcome/Welcome";
import Location from "./location/Location";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./home/Home";
import Result from "./Result";
import Result1 from "./Result2";

function App() {
  const [splashStatus, setSplashStatus] = useState(true);
  const [progress, setProgress] = useState(0.333);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(progress + 0.333);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setSplashStatus(false);
    }, 3000);
  }, []);

  return (
    <AppComponent theme="material">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Page className="">
                  <Welcome />
                  <Splash progress={progress} status={splashStatus} />
                </Page>
              </>
            }
          ></Route>
          <Route path="/location" element={<Location />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/result0" element={<Result />}></Route>
          <Route path="/result1" element={<Result1 />}></Route>
        </Routes>
      </BrowserRouter>
    </AppComponent>
  );
}

export default App;
