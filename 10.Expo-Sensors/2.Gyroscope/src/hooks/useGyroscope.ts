import React, { useEffect, useState } from 'react'
import { Gyroscope } from 'expo-sensors'

const useGyroscope = () => {
    const [available, setAvailable] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);

  useEffect(() => {
    let subscription: any;
    (async () => {
      const isAvailable = await Gyroscope.isAvailableAsync();
      setAvailable(isAvailable);

      if (!isAvailable) return;

      Gyroscope.setUpdateInterval(50);

      subscription = Gyroscope.addListener((data) => {
        setX(data.x);
        setY(data.y);
        setZ(data.z);
      });
    })();

    return () => subscription?.remove();
  }, []);

  return { available, x, y, z };
}

export default useGyroscope