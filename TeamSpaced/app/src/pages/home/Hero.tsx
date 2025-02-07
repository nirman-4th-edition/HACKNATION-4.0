import React, { useEffect, useState } from "react";

interface Props {
  onHeroChange?: (state: boolean) => void;
}

const Hero = ({ onHeroChange }: Props) => {
  const [heroState, setHeroState] = useState<boolean>(false);

  useEffect(() => {
    onHeroChange?.(heroState);
  }, [heroState]);
  let startY = 0;

  function moveEllipseUp(el: HTMLElement) {
    el.style.transform = "translate(-50%, -80%) rotate(90deg)";
    setHeroState(true);
  }

  function moveEllipseDown(el: HTMLElement) {
    el.style.transform = "translate(-50%, -25%) rotate(90deg)";
    setHeroState(false);
  }

  function handleWheelEvent(e: React.WheelEvent<HTMLElement>, el: HTMLElement) {
    if (e.deltaY > 0) {
      moveEllipseUp(el);
    } else {
      moveEllipseDown(el);
    }
  }

  function handleTouchMove(e: React.TouchEvent<HTMLElement>, el: HTMLElement) {
    const currentPos = e.touches[0].clientY;
    console.log(currentPos > startY);
    if (currentPos > startY) {
      moveEllipseDown(el);
    } else {
      moveEllipseUp(el);
    }

    startY = currentPos;
  }

  return (
    <div
      className="flex justify-center items-end w-160 h-160 relative -translate-x-1/2 left-1/2 -translate-y-1/4 rotate-90 rounded-full transition-transform ease-in-out duration-500"
      style={{
        background:
          "linear-gradient(90deg, rgba(126,255,52,1) 0%, rgba(185,229,167,1) 48%, rgba(74,193,19,1) 100%)",
      }}
      onWheel={(e) => handleWheelEvent(e, e.currentTarget)}
      onTouchStart={(e) => {
        startY = e.touches[0].clientY;
      }}
      onTouchMove={(e) => handleTouchMove(e, e.currentTarget)}
    >
      <div
        className="w-20 h-[0.4rem] rounded-md bg-white absolute left-[90%] top-1/2 -rotate-90"
        onWheel={(e) =>
          handleWheelEvent(e, e.currentTarget.parentElement as HTMLDivElement)
        }
        onTouchStart={(e) => {
          startY = e.touches[0].clientY;
        }}
        onTouchMove={(e) =>
          handleTouchMove(e, e.currentTarget.parentElement as HTMLElement)
        }
      ></div>
    </div>
  );
};

export default Hero;
