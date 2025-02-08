import { PacmanLoader } from "react-spinners";

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen">
      <PacmanLoader color="#2563EB" size={50} />
    </div>
  );
}
