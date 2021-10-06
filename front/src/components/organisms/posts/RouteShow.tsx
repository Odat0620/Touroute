import { VFC, useState, useCallback, useRef, memo } from "react";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  useLoadScript,
} from "@react-google-maps/api";
import { Flex, Heading } from "@chakra-ui/react";

import { mapStyles } from "../../../theme/mapStyles";
import { latLngType } from "../../../types/api/posts/latLngType";

const mapContainerStyle = {
  height: "60vh",
  width: "70vw",
};

// propsの型定義
type Props = {
  origin: latLngType | undefined;
  destination: latLngType | undefined;
};

export const RouteShow: VFC<Props> = memo((props) => {
  const { origin, destination } = props;

  const [currentDirection, setCurrentDirection] = useState<any>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GMAP_API_KEY || "",
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const directionsCallback = useCallback(
    (googleResponse) => {
      if (googleResponse) {
        if (currentDirection) {
          if (
            googleResponse.status === "OK" &&
            googleResponse.geocoded_waypoints.length !==
              currentDirection.geocoded_waypoints.length
          ) {
            console.log("ルートが変更されたのでstateを更新する");
            setCurrentDirection(googleResponse);
          } else {
            console.log("前回と同じルートのためstateを更新しない");
          }
        } else {
          if (googleResponse.status === "OK") {
            console.log("初めてルートが設定されたため、stateを更新する");
            console.log(googleResponse);
            setCurrentDirection(googleResponse);
          } else {
            console.log("前回と同じルートのためstateを更新しない");
          }
        }
      }
    },
    [currentDirection]
  );

  return (
    <>
      {loadError ? (
        <h1>Error</h1>
      ) : !isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Flex my={8} py={8} align="center" flexDirection="column">
            <Heading as="h2" fontSize="x-large" color="gray.700" mb={3}>
              ルート
            </Heading>

            <GoogleMap
              id="map"
              mapContainerStyle={mapContainerStyle}
              zoom={8}
              options={{ styles: mapStyles }}
              onLoad={onMapLoad}
            >
              <DirectionsService
                options={{ origin, destination, travelMode: "DRIVING" }}
                callback={directionsCallback}
              />
              {currentDirection !== null && (
                <DirectionsRenderer
                  options={{ directions: currentDirection }}
                />
              )}
            </GoogleMap>
          </Flex>
        </>
      )}
    </>
  );
});
