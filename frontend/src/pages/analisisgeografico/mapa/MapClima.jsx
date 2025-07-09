import React, {useLayoutEffect, useRef, useState} from 'react';
import ButtonToggle from "../../../components/ButtonToggle";
import InputCheckbox from "../../../components/InputCheckbox";
import InputRadio from "../../../components/InputRadio";
import L from "../../../config/leaflet";

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

/*
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
    iconUrl: require('leaflet/dist/images/marker-icon.png').default,
    shadowUrl: require('leaflet/dist/images/marker-shadow.png').default
});*/



const MapClima = () => {

    const ref = useRef()
    /**
     * State for Map object
     */
    const [map, setMap] = useState(null)

    useLayoutEffect(() => {

        var m = L.map(ref.current).setView([-12,-72], 6);
        var OpenTopoMap =  L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            maxZoom: 20,
            attribution: 'CONIDA 2021'
        }).addTo(m);
        setMap(m)
        m.on('load', () => {

        })
        // waitForMapLoaded(m,)

        return () => {
            if (map) {
                map.remove()
            }
        }
    }, [])



    return (
        <>
            <div style={{minHeight: "400px",}} ref={ref}>
                <div className="container-maps__options">
                    <ButtonToggle name='Mapas del CLima' type='light'>
                        <InputCheckbox name='depar1' label='Departamento'/>
                        <InputCheckbox name='prov1' label='Provincia'/>
                        <InputCheckbox name='distri1' label='Distrito'/>
                        <InputCheckbox name='centro1' label='Centro Pob.'/>
                    </ButtonToggle>
                </div>
            </div>
        </>
    );
};

export default MapClima;