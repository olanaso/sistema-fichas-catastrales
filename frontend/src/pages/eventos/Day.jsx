import React, {useEffect, useState} from "react";
import { useAsync } from "react-async-hook";
import {getRolMes }from "./api"
import queryString from "query-string";

const Day = ({ day,mes ,anio,estado}) => {

    let query = queryString.stringify({dia:day,mes:mes,anio:anio});
    const asyncHero = useAsync(getRolMes, [query]);
    const hoy = Number(day) === new Date().getUTCDate();

    return (
        <div className={`alerts-content__item ${hoy && 'active'}`}>
            {asyncHero.loading && <div>Cargando ...</div>}
            {asyncHero.error && <div></div>}
            {asyncHero.result && (
                <div>
                    <span>{day>9?day:"0"+day}</span>
                    {estado ? <><button className="btn btn-coen" title={asyncHero.result.coen.text}>{asyncHero.result.coen.usuario}</button>
                        <button className="btn btn-digeo" title={asyncHero.result.digeo.text}>{asyncHero.result.digeo.usuario}</button></>: <></> }

                </div>
            )}

        </div>
    )
}

export default Day;