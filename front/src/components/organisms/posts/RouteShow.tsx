import { VFC, useState, useCallback, useRef, memo } from "react";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  useLoadScript,
} from "@react-google-maps/api";
import { Heading, HStack, Stack, Tag, Text } from "@chakra-ui/react";

import { mapStyles } from "../../../theme/mapStyles";
import { latLngType } from "../../../types/api/posts/latLngType";

const mapContainerStyle = {
  height: "60vh",
  width: "100%",
  borderRadius: "8px",
};

// propsの型定義
type Props = {
  origin: latLngType | undefined;
  destination: latLngType | undefined;
};

export const RouteShow: VFC<Props> = memo((props) => {
  const { origin, destination } = props;

  const [currentDirection, setCurrentDirection] = useState<any>(null);
  const [distance, setDistance] = useState<string>("");

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GMAP_API_KEY || "",
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const directionsCallback = useCallback(
    (googleResponse) => {
      const routeDistance: string = googleResponse.routes[0].legs[0].distance.text;

      if (googleResponse) {
        if (currentDirection) {
          if (
            googleResponse.status === "OK" &&
            googleResponse.geocoded_waypoints.length !== currentDirection.geocoded_waypoints.length
          ) {
            console.log("ルートが変更されたのでstateを更新する");
            setCurrentDirection(googleResponse);
            setDistance(routeDistance);
          } else {
            console.log("前回と同じルートのためstateを更新しない");
          }
        } else {
          if (googleResponse.status === "OK") {
            console.log("初めてルートが設定されたため、stateを更新する");
            console.log(googleResponse);
            setCurrentDirection(googleResponse);
            setDistance(routeDistance);
          } else {
            console.log("前回と同じルートのためstateを更新しない");
          }
        }
      }
    },
    [currentDirection],
  );

  return (
    <>
      {loadError ? (
        <h1>Error</h1>
      ) : !isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Stack my={8} py={8} w="full" align="center" flexDirection="column">
            <Heading as="h2" fontSize="x-large" color="gray.700">
              ルート
            </Heading>
            <HStack align="center">
              <Tag fontWeight="bold" colorScheme="blue">
                距離
              </Tag>
              <Text color="gray.600">{distance}</Text>
            </HStack>

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
                <DirectionsRenderer options={{ directions: currentDirection }} />
              )}
            </GoogleMap>
          </Stack>
        </>
      )}
    </>
  );
});
