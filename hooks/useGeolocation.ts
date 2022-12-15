// TRACK MOVEMENTS -- Mostly not working
export const watchPosition = (
  maxAge?: number | undefined,
  timeout?: number | undefined,
  highAccuracy?: boolean | undefined,
  destination?: {
    latitude?: number,
    longitude?: number,
  }
) => {
  // https://stackblitz.com/edit/typescript-geolocation?file=index.ts

  const target = destination.latitude && destination.longitude ? destination : undefined;

  let watchID: any = null;
  if (navigator.geolocation) {
    watchID = navigator.geolocation.watchPosition(
      (position: GeolocationPosition) => {
        const crd = position.coords;
        return {
          accuracy: crd.accuracy,
          altitude: crd.altitude,
          altitudeAccuracy: crd.altitudeAccuracy,
          heading: crd.heading,
          latitude: crd.latitude,
          longitude: crd.longitude,
          speed: crd.speed,
        }
      },
      (err: GeolocationPositionError) => {
        console.log(err);
        if(err.code == 1) {
          console.warn("Geolocation Error // Access is denied...");
        } else if( err.code == 2) {
          console.warn("Geolocation Error // Position is unavailable...");
        }
      },
      {
        enableHighAccuracy: highAccuracy === false ? false : true,
        timeout: timeout !== undefined ? timeout : 3000,
        maximumAge: maxAge !== undefined ? maxAge : 60000,
      }
    );
  }
}


export const useGeolocation = (
  maxAge?: number | undefined,
  timeout?: number | undefined,
  highAccuracy?: boolean | undefined,
  // destination?: {
  //   latitude?: number,
  //   longitude?: number,
  // }
) => {

  // const target = destination.latitude && destination.longitude ? destination : undefined;
  
  const getlocation = () => {
    navigator.geolocation.watchPosition(showLoc, error, opts);
  }

  const showLoc = (pos: GeolocationPosition) => {
    const crd = pos.coords;
      return {
        accuracy: crd.accuracy,
        altitude: crd.altitude,
        altitudeAccuracy: crd.altitudeAccuracy,
        heading: crd.heading,
        latitude: crd.latitude,
        longitude: crd.longitude,
        speed: crd.speed,
      }
  }

  const error = (err: GeolocationPositionError) => {
    console.log(err);
    if(err.code == 1) {
      console.warn("Geolocation Error // Access is denied...");
    } else if( err.code == 2) {
      console.warn("Geolocation Error // Position is unavailable...");
    }
  }

  const opts = {
    enableHighAccuracy: highAccuracy === false ? false : true,
    timeout: timeout !== undefined ? timeout : 3000,
    maximumAge: maxAge !== undefined ? maxAge : 60000,
  }

  return getlocation;
}

// export const usePosition = () => {
//   if('geolocation' in navigator) {
//     // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
//     navigator.geolocation.getCurrentPosition(({ coords }) => {
//         const { accuracy, altitude, altitudeAccuracy, latitude, longitude, speed } = coords;
//         return ({ accuracy, altitude, altitudeAccuracy, latitude, longitude, speed });
//     })
//   }
// }

export const getPosition = async(
  highAccuracy?: boolean,
  timeout?: number,
  maxAge?: number
): Promise<GeolocationPosition | void> => {
  const opts = {
    enableHighAccuracy: highAccuracy === false ? false : true,
    timeout: timeout !== undefined ? timeout : 3000,
    maximumAge: maxAge !== undefined ? maxAge : 60000,
  };

  if (navigator.geolocation) {
    try {
      // Wait for the Promise returned by navigator.geolocation.getCurrentPosition() to be resolved or rejected
      const position = await navigator.geolocation.getCurrentPosition(
        (position) => position,
        (error) => { throw error; },
        opts
      );
      // Return the resolved value (the user's GeolocationPosition object)
      return position;
    } catch (error) {
      // Reject the Promise with the error thrown by navigator.geolocation.getCurrentPosition()
      throw error;
    }
  } else {
    // Reject the Promise with an error if geolocation is not supported by the browser
    throw new Error('Geolocation is not supported by this browser.');
  }
}