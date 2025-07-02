import React, {useLayoutEffect, useState, useEffect, useRef} from 'react'
import L from 'leaflet'
    import styled, {useTheme} from 'styled-components'



    const MapContainer = styled.div`
       width: 600px; height: 400px;
       
    `

const Map = () => {
    const ref = useRef()
    /**
     * State for Map object
     */
    const [map, setMap] = useState(null)
    const layersId = ( []).map((l) => l.id)
    const theme = useTheme()

    /**
     * State to toggle base layers
     */
    const [checkMap, setCheckMap] = useState(false)

    /**
     * Main useLayoutEffect to set the map
     */
    useLayoutEffect(() => {

       var m = L.map(ref.current).setView([-12,-72], 6);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(m);

        //L.marker([-72, -0.09]).addTo(m)
          //  .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            //.openPopup();






        m.on('load', () => {

        })

        // waitForMapLoaded(m,)

        return () => {
            if (map) {
                map.remove()
            }
        }
    }, [])

    /**
     *
     * @param {Map} m , map object
     * @param {event} e, event from clicking the map
     * @param {array} dataLayersIds Array of layerdata layers to select
     */

    return (
        <>
            <MapContainer  ref={ref} ></MapContainer>
        </>

    )
};

export default Map;