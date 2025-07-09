import React from "react";
import MapWrapper from "../../../layouts/MapWrapper";
import InputGroup from "../../../components/InputGroup";
import Button from "../../../components/Button";
import ButtonToggle from "../../../components/ButtonToggle";
import InputRadio from "../../../components/InputRadio";
import InputCheckbox from "../../../components/InputCheckbox";
import ButtonModal from "../../../components/ButtonModal";

import MapWork from './MapWork';
import MapClima from './MapClima';
import MapProbabilidad from './MapProbabilidad';


import { MapContainer , TileLayer,LayersControl, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import Map3 from '../../../assets/images/map3.png';

const GeographicAnalysis = () => {
    const position3 = [-9.96885060854611, -75.37277604889371];

    const polyline = [
        [13.518093426774927, -73.99737866236414],
        [-36.24763930046306, -85.41983474671459],
      ];
    const limeOptions = { color: 'lime' } 

    return (
        <> <MapWrapper title="Registro de Emergencia">
            <div className="container-maps">
                <section>
                    
                    <MapContainer  style={{ height: "400px" }} 
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
                        <Polyline pathOptions={limeOptions} positions={polyline} />
                      </MapContainer >
                </section>
                <div className="container-submaps">
                    <section>
                        <MapContainer  style={{ height: "400px" }} 
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
                        <MapContainer  style={{ height: "400px" }} 
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