import React, {useState, useEffect} from "react";
import Tabs from "../Tabs";
import {Row as RowForm, Col, Form, Button} from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";
import {Paths, formatPath} from "../paths";
import {useToasts} from "react-toast-notifications";
import {useTable} from "../../../hooks/useTable";
import {useForm} from "../../../hooks/useForm";
import Table from "../../../components/table/Table";
import Pagination from "react-js-pagination";
import TableRow from "./TableRow";
import queryString from 'query-string';
import {
    Control,
    ControlInline,
    TitleForm,
    ContainerButtons
} from "../../../components/forms";
import FormsWrapper from "../../../layouts/FormsWrapper";
import Acciones from "./Acciones";
//Servicios para este formulario
import {getSensors} from "../api"

const Listado = () => {

    //Variables de estado
    const [object, setObject, handleInputChange, reset] = useForm({}, [
        "satelite", "noradid"
    ]);
    let location = useLocation();
    const [
        activePage,
        changePage,
        limit,
        totalItemsCount,
        pageRangeDisplayed,
        items
    ] = useTable();

    const [list, setList] = useState([])
    const {addToast} = useToasts();
    //FUncion que se ejecuta al inicial la pagina
    useEffect(() => {
        async function init() {
            try {
                let result = await getSensors()
                setList(result)
            } catch (err) {
                addToast("Ocurrio un error al cargar los datos:" + err.message, {
                    appearance: "error",
                    autoDismiss: true
                });

            }
        }

        init();
    }, []);

    //Funciones del la Interface
    const handlePageChange = async (pageNumber) => {
        let resultList = [];
        changePage(pageNumber, resultList);
    };
//Funcion de la busqueda
    const handleSerch = async (e) => {
        e.preventDefault();
        try {
            let query = await queryString.stringify(object);
            let result = await getSensors(query, {})
            setList(result)
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


    //Datos para la configuracion de la ccabecera de la tabla
    let columns = [

        {label: "Nº", key: "id"},
        {label: "Nombre", key: "nombre"},
        {label: "Acciones", key: "acciones"},
    ];


    return (
        <>
            <FormsWrapper title="Configuración">
                <Tabs/>
                <TitleForm>Filtros</TitleForm>
                <Form className="form2" onSubmit={handleSerch}>
                    <RowForm className="mb-3">

                        <Col sm={6}>
                            <ControlInline
                                propsLabel={{
                                    sm: 4,
                                    tooltip: "Ingrese el valor de la búsqueda",
                                    label: "Búsqueda"
                                }}
                                propsInput={{
                                    sm: 8,
                                    placeholder: "",
                                    size: "sm",
                                    name: "nombre",
                                    value: object.nombre,
                                    onChange: handleInputChange
                                }}
                            ></ControlInline>
                        </Col>

                        <Col sm={3}>
                            <Button type={"submit"}>
                                <i class="fa fa-search" aria-hidden="true"></i> Buscar{" "}
                            </Button>
                        </Col>


                    </RowForm>
                    <RowForm className="mb-3">
                        <Col sm={12}>
                            <Link
                                className={"btn btn-primary"}
                                to={{
                                    pathname: `${Paths.config_sensor_add}`,
                                    state: {background: location}
                                }}
                            >
                                <i class="fa fa-plus" aria-hidden="true"></i> Agregar
                            </Link>
                        </Col>
                    </RowForm>
                </Form>
                <TitleForm>Listado de Sensores</TitleForm>
                <Table columns={columns}>
                    {list.map((row, i) => (
                        <TableRow
                            data={row}
                            acciones={<Acciones row={row}></Acciones>}
                        ></TableRow>
                    ))}
                </Table>
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={limit}
                    totalItemsCount={totalItemsCount}
                    pageRangeDisplayed={pageRangeDisplayed}
                    onChange={handlePageChange}
                ></Pagination>
            </FormsWrapper>
        </>
    );
};

export default Listado;
