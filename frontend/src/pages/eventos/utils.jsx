const moment = require('moment')
/*Funciones para los meses*/
const initialAnio=moment().format('YYYY')
const initialmes=moment().format('MM')
export const daysOfAnioMes=(anio=initialAnio,mes=initialmes)=>{
    let cantDaysMonth=moment(anio+"-"+mes, "YYYY-MM").daysInMonth();
    let initialDay = moment(anio+"-"+mes, "YYYY-MM").startOf('month').format('DD');
    let nameInitialDay=moment(anio+"-"+mes, "YYYY-MM").startOf('month').format('dddd')
    let numberInitialDay=moment(anio+"-"+mes, "YYYY-MM").startOf('month').format('d')
    let finishDay = moment(anio+"-"+mes, "YYYY-MM").endOf('month').format('DD');
    return {cantDaysMonth,initialDay,nameInitialDay,numberInitialDay,finishDay};
}
