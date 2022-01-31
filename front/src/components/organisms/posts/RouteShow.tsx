import { VFC, useState, useCallback, useRef, memo } from "react";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  useLoadScript,
} from "@react-google-maps/api";
import { Box, Heading, HStack, Stack, Tag, Text } from "@chakra-ui/react";

import { mapStyles } from "../../../theme/mapStyles";
import { latLngType } from "../../../types/api/posts/latLngType";

const mapContainerStyle = {
  height: "100%",
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
            setCurrentDirection(googleResponse);
            setDistance(routeDistance);
          } else {
          }
        } else {
          if (googleResponse.status === "OK") {
            setCurrentDirection(googleResponse);
            setDistance(routeDistance);
          } else {
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
          <Stack pt={8} w="full" align="center" flexDirection="column">
            <Heading as="h2" fontSize="x-large" color="gray.700">
              ルート
            </Heading>
            <HStack align="center">
              <Tag fontWeight="bold" colorScheme="blue">
                距離
              </Tag>
              <Text color="gray.600">{distance}</Text>
            </HStack>

            <Box h={{ base: "60vh", md: "80vh" }} w="100%">
              <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                options={{ styles: mapStyles }}
                onLoad={onMapLoad}
              >
                {origin && destination && (
                  <DirectionsService
                    options={{ origin, destination, travelMode: "DRIVING" }}
                    callback={directionsCallback}
                  />
                )}
                {currentDirection !== null && (
                  <DirectionsRenderer options={{ directions: currentDirection }} />
                )}
              </GoogleMap>
            </Box>
          </Stack>
        </>
      )}
    </>
  );
});
