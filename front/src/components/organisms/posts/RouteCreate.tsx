import { VFC, useState, useCallback, useRef, memo } from "react";
import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

import { mapStyles } from "../../../theme/mapStyles";
import { latLngType } from "../../../types/api/posts/latLngType";

const mapContainerStyle = {
  height: "100%",
  width: "100%",
};

// propsの型定義
type Props = {
  origin: latLngType | null;
  setOrigin: React.Dispatch<React.SetStateAction<latLngType | null>>;
  destination: latLngType | null;
  setDestination: React.Dispatch<React.SetStateAction<latLngType | null>>;
};

// デフォルトの座標（東京駅）
const defaultLatLng = {
  lat: 35.6809591,
  lng: 139.7673068,
};

export const RouteCreate: VFC<Props> = memo((props) => {
  const { origin, setOrigin, destination, setDestination } = props;

  const [currentDirection, setCurrentDirection] = useState<any>(null);
  const [center, setCenter] = useState<latLngType>(defaultLatLng);
  const [placeStart, setPlaceStart] = useState<boolean>(false);
  const [placeGoal, setPlaceGoal] = useState<boolean>(false);
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
            console.log(googleResponse);
          }
        }
      }
    },
    [currentDirection],
  );

  const onClickMap = (e: any) => {
    if (placeStart || placeGoal) {
      const latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      if (placeStart) {
        setOrigin(latLng);
        setCenter(latLng);
        setPlaceStart(false);
      } else if (placeGoal) {
        setDestination(latLng);
        setCenter(latLng);
        setPlaceGoal(false);
      }
    }
  };

  // 地点設定を開始する関数
  const onClickPlaceStart = () => {
    setCurrentDirection(null);
    setPlaceGoal(false);
    setOrigin(null);
    setPlaceStart(true);
  };
  const onClickPlaceGoal = () => {
    setCurrentDirection(null);
    setPlaceStart(false);
    setDestination(null);
    setPlaceGoal(true);
  };

  return (
    <>
      {loadError ? (
        <h1>Error</h1>
      ) : !isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Flex align="center" flexDirection="column" w="100%">
            <Heading as="h2" fontSize="x-large" color="gray.600">
              ルートの設定
            </Heading>
            <Text color="gray.600" m="0.5rem">
              距離：{distance ? distance : "--km"}
            </Text>
            <Box pb={1} w="100%" align="center">
              <Button
                bg="green.400"
                color="green.900"
                _hover={{ opacity: 0.8 }}
                mr={2}
                onClick={onClickPlaceStart}
                disabled={placeStart}
              >
                {!placeStart ? "スタート地点" : "設定中..."}
              </Button>
              <Button
                bg="red.300"
                color="red.900"
                _hover={{ opacity: 0.8 }}
                onClick={onClickPlaceGoal}
                disabled={placeGoal}
              >
                {!placeGoal ? "ゴール地点" : "設定中..."}
              </Button>
            </Box>

            <Box h={{ base: "60vh", md: "80vh" }} w="100%">
              <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                options={{ styles: mapStyles }}
                onLoad={onMapLoad}
                onClick={onClickMap}
                center={center}
              >
                {!destination && (
                  <Marker
                    label={{ color: "white", text: "S", fontWeight: "bold" }}
                    position={origin}
                  />
                )}
                {!origin && (
                  <Marker
                    label={{ color: "white", text: "G", fontWeight: "bold" }}
                    position={destination}
                  />
                )}

                {origin && destination && (
                  <DirectionsService
                    options={{ origin, destination, travelMode: "DRIVING" }}
                    callback={directionsCallback}
                  />
                )}
                {currentDirection !== null && (
                  <DirectionsRenderer
                    options={{
                      directions: currentDirection,
                    }}
                  />
                )}
              </GoogleMap>
            </Box>
          </Flex>
        </>
      )}
    </>
  );
});
