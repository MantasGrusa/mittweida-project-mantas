import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";





interface RoutingControlProps {
    waypoints: [number, number][];
}

export default function RoutingControl({ waypoints }: RoutingControlProps) {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        const routingControl = (L as any).Routing.control({
            waypoints: waypoints.map(([lat, lng]) => L.latLng(lat, lng)),
            routeWhileDragging: false,
            show: false,
            addWaypoints: false,
            waypointMode: "snap",
            draggableWaypoints: false,
            fitSelectedRoutes: true,
            showAlternatives: true,
        }).addTo(map);

        return () => {
            map.removeControl(routingControl);
        };
    }, [map, waypoints]);

    return null;
}