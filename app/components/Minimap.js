"use client";

import { useEffect, useRef } from "react";
import DottedMap from "@setkernel/dotted-map-next";

export default function MiniMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    // 1. Create dotted map (height jitni badi, utna detailed map)
    const map = new DottedMap({ height: 100, grid: "diagonal" });

    // 2. Add pins
    map.addPin({
      lat: 32.0624, // Faisalabad, PK
      lng: 73.7042,
      svgOptions: { color: "#00BFFF", radius: 0.5 },
    });

    map.addPin({
      lat: 40.73061, // NYC
      lng: -73.935242,
      svgOptions: { color: "#FF5733", radius: 0.5 },
    });

    // 3. Generate SVG
    const svgMap = map.getSVG({
      radius: 0.22,
      color: "#ffffff",
      shape: "circle",
      backgroundColor: "#020300",
    });

    // 4. Render into div
    if (mapRef.current) {
      mapRef.current.innerHTML = svgMap;
    }
  }, []);

  return (
    <div className="map-section flex flex-col items-center ">
      <div
        ref={mapRef}
        className="map w-full max-w-4xl h-[full] cover"
        style={{ borderRadius: "20px", overflow: "hidden" }}
      ></div>

    </div>
  );
}
