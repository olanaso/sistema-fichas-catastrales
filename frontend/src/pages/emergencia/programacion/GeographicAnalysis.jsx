import React, {useState} from "react";
import MapWrapper from "../../../layouts/MapWrapper";



import { MapContainer , TileLayer,LayersControl, Polyline , Marker, Popup, useMapEvents, MapConsumer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import {getSatelitesCombo, getPrediccion10dias, getOneSatelite} from "../../emergencia/api"
import { useAsync } from "react-async-hook";



import {useToasts} from "react-toast-notifications";

const GeographicAnalysis = () => {
    const position3 = [-9.96885060854611, -75.37277604889371];

    const polyline = [
        [13.518093426774927, -73.99737866236414],
        [-36.24763930046306, -85.41983474671459],
    ];
    const limeOptions = { color: 'lime' }

    const resListaSatelites = useAsync(getSatelitesCombo, []);
    const [map2, setMap2] = useState(null);

    const [dataSatelite, setDataSatelite] = useState(null);
    const [dataPrediccion, setDataPrediccion] = useState([]);
    const {addToast} = useToasts();



  const handleSelectChange = async (e) => {
    e.preventDefault();
    if(e.target.value != ''){
        let satelite = await getOneSatelite(e.target.value);
        setDataSatelite(satelite);
    }
  }
  const onClickPrediccion = async(e) => {
      e.preventDefault();
        try {
            let result = await getPrediccion10dias(dataSatelite.noradid);
            setDataPrediccion(result.passes);
            let array = [];

            console.log(result.passes[0]);
             const point1 = result.passes[1].startAzlonlat;
    array.push([point1.latitud, point1.longitud]);
    const point2 = result.passes[1].endAzlonlat;
    
    array.push([point2.latitud, point2.longitud]);
    console.log(array);
    L.polyline(array, {color: 'red'}).addTo(map2);
    //console.log(result);
            addToast("Operacion Correcta", {
                appearance: "success",
                autoDismiss: true
            });
        }catch (err){
            addToast("Ocurrio un error al cargar los datos:" + err.message, {
                appearance: "error",
                autoDismiss: true
            });
        }
   
    
   

  };

  const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png"
  });

  function MyComponent() {
    const map = useMapEvents({
      click: (e) => {
        console.log(dataPrediccion.passes[0].startAzlonlat);
        const { latitud, longitud } = dataPrediccion.passes[0].startAzlonlat;
        L.marker([latitud, longitud], { icon }).addTo(map);
      }
    });
    return null;
  }

    return (
        <>

<MapWrapper title="Registro de Emergencia">
            <div className="container-maps">
                <section>

                    <MapContainer  style={{ height: "380px" }}
                                   center={position3}
                                   zoom={5}
                                   whenCreated={setMap2}
                    >
                        <MyComponent />
                        <LayersControl position="topright">
                            <LayersControl.BaseLayer checked name="OpenStreetMap">
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                            </LayersControl.BaseLayer>
                            <LayersControl.BaseLayer name="Google Satelite">
                                <TileLayer
                                    url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                                    attribution='<a href="https://www.google.es/maps/preview">Google Maps</a>'
                                    maxZoom='21'
                                    subdomains={['mt0','mt1','mt2','mt3']}
                                />
                            </LayersControl.BaseLayer>
                        </LayersControl>
                        <Polyline pathOptions={limeOptions} positions={polyline} />
                    </MapContainer >
                </section>
                <div className="container-submaps">
                    <section>
                        <MapContainer  style={{ height: "350px" }}
                                       center={position3}
                                       zoom={5}
                        >
                            <LayersControl position="topright">
                                <LayersControl.BaseLayer checked name="OpenStreetMap">
                                    <TileLayer
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                </LayersControl.BaseLayer>
                                <LayersControl.BaseLayer name="Google Satelite">
                                    <TileLayer
                                        url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                                        attribution='<a href="https://www.google.es/maps/preview">Google Maps</a>'
                                        maxZoom='21'
                                        subdomains={['mt0','mt1','mt2','mt3']}
                                    />
                                </LayersControl.BaseLayer>
                            </LayersControl>
                        </MapContainer >
                    </section>
                    <section>
                        <MapContainer  style={{ height: "350px" }}
                                       center={position3}
                                       zoom={5}
                        >
                            <LayersControl position="topright">
                                <LayersControl.BaseLayer checked name="OpenStreetMap">
                                    <TileLayer
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                </LayersControl.BaseLayer>
                                <LayersControl.BaseLayer name="Google Satelite">
                                    <TileLayer
                                        url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                                        attribution='<a href="https://www.google.es/maps/preview">Google Maps</a>'
                                        maxZoom='21'
                                        subdomains={['mt0','mt1','mt2','mt3']}
                                    />
                                </LayersControl.BaseLayer>
                            </LayersControl>
                        </MapContainer >

                    </section>
                </div>

            
            
          </div>
</MapWrapper>

        </>
        
    )
}

export default GeographicAnalysis;