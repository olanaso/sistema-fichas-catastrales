import React, {useLayoutEffect, useRef, useState} from 'react';
import ButtonToggle from "../../../components/ButtonToggle";
import InputCheckbox from "../../../components/InputCheckbox";
import InputRadio from "../../../components/InputRadio";
import Button from "../../../components/Button";
import L from "../../../config/leaflet";


const MapProbabilidad = () => {


    const ref = useRef()
    /**
     * State for Map object
     */
    const [map, setMap] = useState(null)

    useLayoutEffect(() => {

        var m = L.map(ref.current).setView([-12,-72], 6);


        var OpenTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
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
                    <ButtonToggle name='Mapa de Probabilidad' type='light'>
                        <InputCheckbox name='depar2' label='Departamento'/>
                        <InputCheckbox name='prov2' label='Provincia'/>
                        <InputCheckbox name='distri2' label='Distrito'/>
                        <InputCheckbox name='centro2' label='Centro Pob.'/>
                    </ButtonToggle>

                    <ButtonToggle icon='angle-down' name='Capas' type='light'>
                        <InputCheckbox name='nub' label='Prob. Nubosidad Aqua 2002-2020'/>
                        <div className="mx-4">
                            <InputCheckbox name='enero' label='Enero'/>
                            <InputCheckbox name='febrero' label='Febrero'/>
                            <InputCheckbox name='marzo' label='Marzo'/>
                            <InputCheckbox name='abril' label='Abril'/>
                            <InputCheckbox name='mayo' label='Mayo'/>
                            <InputCheckbox name='junio' label='Junio'/>
                            <InputCheckbox name='julio' label='Julio'/>
                        </div>
                        <InputCheckbox name='terra' label='Prob. Nubosidad Terra 2003-2020'/>
                    </ButtonToggle>
                </div>
            </div>
        </>
    );
};

export default MapProbabilidad;