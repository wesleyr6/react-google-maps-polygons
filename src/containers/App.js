import React, { useState } from "react";
import GoogleMapsDrawing from "../components/google-drawing";

const App = () => {
  const [polygon, setPolygon] = useState(null);

  const polygons = [
    {
      fillOpacity: 0.5,
      fillColor: "#f06d6d",
      strokeColor: "#f06d6d",
      strokeWeight: 2,
      zIndex: 1,
      paths: [
        { lat: 4.69718284258643, lng: -74.08750794912109 },
        { lat: 4.682469391496441, lng: -74.00923036123046 },
        { lat: 4.745427092100664, lng: -74.00408051992187 },
        { lat: 4.747137819383974, lng: -74.07034181142578 },
      ],
    },
    {
      fillOpacity: 0.5,
      fillColor: "#cdb23f",
      strokeColor: "#cdb23f",
      strokeWeight: 2,
      zIndex: 1,
      paths: [
        { lat: 4.763560585264009, lng: -74.18981812978515 },
        { lat: 4.698893688862713, lng: -74.14587281728515 },
        { lat: 4.7666398102376295, lng: -74.07274507070312 },
      ],
    },
  ];

  console.log("APP", polygon);

  return (
    <div style={{ width: "100%", height: 500 }}>
      <GoogleMapsDrawing
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        polygons={polygons}
        polygonComplete={(obj) => setPolygon(obj)}
      />
    </div>
  );
};

export default App;
