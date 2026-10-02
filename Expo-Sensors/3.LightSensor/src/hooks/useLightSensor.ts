import { useEffect, useState } from 'react'
import { LightSensor } from 'expo-sensors'
import { Platform } from 'react-native';

const useGyroscope = () => {
    const [available, setAvailable] = useState(false);
  const [lux, setLux] = useState(0);
  
  useEffect(() => {
    if (Platform.OS !== "android") {
      setAvailable(false);
      return;
    }

    let subscription: any;

    (async () => {
      const isAvailable = await LightSensor.isAvailableAsync();
      setAvailable(isAvailable);

      if (!isAvailable) return;

      LightSensor.setUpdateInterval(100);

      subscription = LightSensor.addListener((data) => {
         setLux(data.illuminance);
      });
    })();

    return () => subscription?.remove();
  }, []);

  return { available,lux };
}

export default useGyroscope