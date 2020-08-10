import React, { useEffect } from "react";

const GoogleMapsDrawing = (props) => {
  const { apiKey, lat, lng, zoom, polygons, polygonComplete } = props;

  let map = null;
  let drawingManager = null;

  useEffect(() => {
    const existingScript = document.getElementById("googleMapsDrawingScript");

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=drawing`;
      script.id = "googleMapsDrawingScript";
      window.document.body.appendChild(script);

      script.onload = () => {
        init();
        loadEventListeners();
        loadPolygons();
      };
    }

    return () => {
      window.document.body.removeChild(
        window.document.getElementById("googleMapsDrawingScript")
      );
    };

    // eslint-disable-next-line
  }, []);

  const init = () => {
    map = new window.google.maps.Map(
      window.document.getElementById("googleMapsDrawing"),
      {
        center: { lat, lng },
        zoom,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }
    );

    drawingManager = new window.google.maps.drawing.DrawingManager({
      drawingControl: true,
      drawingControlOptions: {
        position: window.google.maps.ControlPosition.BOTTOM_CENTER,
        drawingModes: ["polygon"],
      },
      polygonOptions: {
        fillColor: "#f06d6d",
        fillOpacity: 0.5,
        strokeWeight: 2,
        strokeColor: "#f06d6d",
        clickable: false,
        editable: false,
        zIndex: 999,
      },
    });

    drawingManager.setMap(map);
  };

  const loadPolygons = () => {
    if (polygons && polygons.length > 0) {
      polygons.map((item) => {
        const buildElement = new window.google.maps.Polygon(item);
        return buildElement.setMap(map);
      });
    }
  };

  const loadEventListeners = () => {
    if (!!polygonComplete) {
      window.google.maps.event.addListener(
        drawingManager,
        "polygoncomplete",
        onHandlePolygonComplete
      );
    }
  };

  const onHandlePolygonComplete = (args) => {
    const polygonPaths = args.getPath().getArray();
    const polygonCoordinates = polygonPaths.map((item) => {
      return {
        lat: item.lat(),
        lng: item.lng(),
      };
    });

    polygonComplete({
      ...drawingManager.polygonOptions,
      zIndex: 1,
      paths: polygonCoordinates,
    });

    drawingManager.setOptions({
      drawingMode: null,
    });
  };

  return (
    <div id="googleMapsDrawing" style={{ width: "100%", height: "100%" }} />
  );
};

GoogleMapsDrawing.defaultProps = {
  apiKey: null,
  polygons: [],
  polygonComplete: null,
  lat: 4.7447428,
  lng: -74.0988376,
  zoom: 12,
};

export default GoogleMapsDrawing;
