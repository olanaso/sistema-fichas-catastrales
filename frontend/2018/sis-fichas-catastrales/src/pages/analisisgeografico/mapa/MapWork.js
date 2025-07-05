import React, {useLayoutEffect, useRef, useState} from 'react';
import ButtonToggle from "../../../components/ButtonToggle";
import InputRadio from "../../../components/InputRadio";
import Button from "../../../components/Button";
import L from "../../../config/leaflet";

const MapWork = () => {

    const ref = useRef()
    /**
     * State for Map object
     */
    const [map, setMap] = useState(null)

    useLayoutEffect(() => {
        var m = L.map(ref.current).setView([-12,-72], 6);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'CONIDA 2021',
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(m);

        L.marker([51.5, -0.09]).addTo(m)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .openPopup();


        m.on('load', () => {

        })

        // waitForMapLoaded(m,)
        setMap(m)
        return () => {
            if (map) {
                map.remove()
            }
        }
    }, [])


    return (
        <>
            <div style={{minHeight: "400px",}} ref={ref}>
                <div className="container-maps__options container-maps__options--bottom">
                    <span className="buffer"><span>Buffer:</span><span>14 km</span></span>
                    <div>
                        <ButtonToggle icon='angle-down' name='Mapa Base' type='light'>
                            <InputRadio name='google' group='mapa-base' label='Google'/>
                            <InputRadio name='satelite' group='mapa-base' label='Satelite'/>
                            <InputRadio name='connida' group='mapa-base' label='Connida'/>
                            <InputRadio name='osm' group='mapa-base' label='OpenStreetMap'/>
                        </ButtonToggle>
                    </div>
                </div>
            </div>

        </>
    );
};

export default MapWork;