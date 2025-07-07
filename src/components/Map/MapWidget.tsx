import {MapContainer, Polyline} from "react-leaflet";
import {Marker} from "react-leaflet";
import {TileLayer} from "react-leaflet";
import {Popup} from "react-leaflet";
import '../styles/mapwidget.css'
import RoutingControl from "./RoutingController.tsx";

const position: [number, number] = [50.9853, 12.9800]

const path: [number,number][] = [
    [50.9853, 12.9800],
    [50.9853, 12.9910]
]

const airtravel: [number,number][] = [
    [52.3650, 13.5010],
    [12.9940, 80.1707]
]

export default function MapWidget () {
    return (

        <MapContainer className="map" center={position} zoom={15} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    Mittweida Town Center <br /> Click here to read more
                </Popup>
            </Marker>

            <Marker position={[52.3650, 13.5010]}>
                <Popup>
                    Berlin Airport
                </Popup>
            </Marker>

            <Marker position={[12.9940, 80.1707]}>
                <Popup>
                    Chennai Airport
                </Popup>
            </Marker>

            <Marker position={[50.9853, 12.9990]} draggable>
                <Popup>
                    DRAGGABLE POPUP
                </Popup>
            </Marker>

            <Polyline positions={airtravel} />

            <RoutingControl waypoints={path}/>
        </MapContainer>
    )
} 