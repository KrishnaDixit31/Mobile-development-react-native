import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { Accelerometer } from "expo-sensors";

const useAccelerometer = () => {
  const [available, setAvailable] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);

  useEffect(() => {
    let subscription: any;
    (async () => {
      const isAvailable = await Accelerometer.isAvailableAsync();
      setAvailable(isAvailable);

      if (!isAvailable) return;

      Accelerometer.setUpdateInterval(50);

      subscription = Accelerometer.addListener((data) => {
        setX(data.x);
        setY(data.y);
        setZ(data.z);
      });
    })();

    return () => subscription?.remove();
  }, []);

  return { available, x, y, z };
};

export default useAccelerometer;

const styles = StyleSheet.create({});
