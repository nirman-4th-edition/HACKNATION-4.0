"use client"

import IoTMonitor from "@/components/iotmonitor";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  const onClick = () => {
    router.push("/monitor");
  }

  return (
    <IoTMonitor />
  );
}
