import { useState, useRef, useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';

type Location = {
  lat: number;
  long: number;
};

/**
 * This hook return object with a startTrack, stopTrack, isTracking, location, and checkLocationPermission
 * function
 *
 * @param {number} [time=1000] - number = 1000
 * @returns An object with the following properties:
 */
const useTrackLocation = (time: number = 1000) => {
  const [location, setLocation] = useState<Location>({ lat: 0, long: 0 });
  const [permission, setPermission] = useState<string>('undefined');
  const [isTracking, setIsTracking] = useState(false);
  const interval = useRef<ReturnType<typeof setInterval>>();

  const checkLocationPermission = async () => {
    const statusPermission = await Geolocation.requestAuthorization(
      'whenInUse'
    );
    if (statusPermission === 'granted') {
      setPermission('granted');
    }
  };

  useEffect(() => {
    if (permission !== 'granted') {
      checkLocationPermission();
    }
  }, [permission]);

  const startTrack = () => {
    setIsTracking(true);
    interval.current = setInterval(() => {
      Geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setLocation((prevLocation) => {
            if (
              prevLocation.lat !== latitude &&
              prevLocation.long === longitude
            ) {
              return { lat: latitude, long: longitude };
            }

            return { lat: prevLocation.lat, long: prevLocation.long };
          });
        },
        (error) => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true }
      );
    }, time);
  };

  const stopTrack = () => {
    setIsTracking(false);
    setLocation({ lat: 0, long: 0 });
    Geolocation.stopObserving();
    clearInterval(interval.current);
  };

  return {
    startTrack,
    stopTrack,
    isTracking,
    location,
    checkLocationPermission,
  };
};

export default useTrackLocation;
