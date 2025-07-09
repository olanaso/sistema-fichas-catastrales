import React, {useState, useEffect} from "react";
import { Typeahead,AsyncTypeahead } from 'react-bootstrap-typeahead';

const Autocomplete = ({options,callbackSelect,placeholder='Seleccione'}) => {


    return (
        <>
            <Typeahead
                align="justify"
                id="menu-align-example"
                labelKey="denominacion"
                options={options}
                placeholder={placeholder}
                size="small"
                onChange={selected => {
                        callbackSelect(selected[0])
                }}
            />
        </>
    );
};

export default Autocomplete;