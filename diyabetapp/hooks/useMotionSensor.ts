import { useState, useEffect } from "react";
import { Accelerometer } from "expo-sensors";

export const useMotionSensor = () => {
  const [motionData, setMotionData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const subscription = Accelerometer.addListener((data) => {
      setMotionData(data);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return motionData;
};
