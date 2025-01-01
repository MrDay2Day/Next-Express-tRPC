"use client";
import Map from "react-map-gl/maplibre";
import { ImmutableLike } from "react-map-gl/dist/esm/types";

import { useEffect } from "react";

import * as style from "./dark.json";

import "maplibre-gl/dist/maplibre-gl.css";
import { StyleSpecification } from "maplibre-gl";

export default function MapElement() {
  useEffect(() => {
    console.log({ style });
  }, []);
  return (
    <>
      <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{
          maxWidth: 1200,
          width: "100%",
          height: 400,
          borderRadius: 20,
          marginLeft: "auto",
          marginRight: "auto",
        }}
        mapStyle={
          style as
            | string
            | StyleSpecification
            | ImmutableLike<StyleSpecification>
            | undefined
        }
      />
    </>
  );
}
