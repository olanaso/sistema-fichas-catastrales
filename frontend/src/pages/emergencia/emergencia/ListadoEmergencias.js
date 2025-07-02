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
import EntidadRow from "./EmergenciaRow";
import queryString from 'query-string';
import {
    Control,
    ControlInline,
    TitleForm,
    ContainerButtons
} from "../../../components/forms";
import {ListEmergencias} from "../api"
import FormsWrapper from "../../../layouts/FormsWrapper";
import Acciones from "./Acciones";


const ListadoEmergencias = () => {

    const [entidad, setUser, handleInputChange, reset] = useForm({nombre: ""}, [
        "nombre"
    ]);
    const [list, setList] = useState([])
    let location = useLocation();
    const [
        activePage,
        changePage,
        limit,
        totalItemsCount,
        pageRangeDisplayed,
        items
    ] = useTable();

    const {addToast} = useToasts();

    const handlePageChange = async (pageNumber) => {
        let resultList = [];
        changePage(pageNumber, resultList);
    };


    const handleSerch = async (e) => {
        e.preventDefault();
        // alert(entidad.nombre)

        let query = await queryString.stringify(entidad);
        let listadoEmerg = await ListEmergencias(query,{})
        alert(listadoEmerg)
        setList(listadoEmerg)
    };




    useEffect(() => {
        async function init() {
            try {
                let listadoEmerg = await ListEmergencias(null,{})
               // alert(listadoEmerg)
                setList(listadoEmerg)
            } catch (err) {

                addToast("Ocurrio un error al cargar las Entidades:" + (err.message ||err.response.data), {
                    appearance: "error",
                    autoDismiss: false
                });

            }
        }

        init();
    }, []);

    //Colunmas de la tabla del la pagina de emergencia
    let columns = [
        {label: "SINPAD", key: "sinpad"},
        {label: "Titulo", key: "titulo"},
        {label: "Tipo Emergencia", key: "tipoemergencia"},
        {label: "Tipo Solicitud", key: "tiposolicitud"},
        {label: "Acciones", key: "acciones"},
    ];


    return (
        <>
            <FormsWrapper title="Listado de solicitudes de emergencia">


                <TitleForm>Filtros</TitleForm>
                <Form className="form2" onSubmit={handleSerch}>
                    <RowForm className="mb-3">

                        <Col sm={4}>
                            <ControlInline
                                propsLabel={{
                                    sm: 4,
                                    tooltip: "Codigo de registro del Sistema SIMPAD",
                                    label: "SINPAD"
                                }}
                                propsInput={{
                                    sm: 8,
                                    placeholder: "",
                                    size: "sm",

                                    name: "nombre",
                                    value: entidad.nombre,
                                    onChange: handleInputChange
                                }}
                            ></ControlInline>
                        </Col>
                        <Col sm={6}></Col>
                        <Col sm={4}>
                            <ControlInline
                                propsLabel={{
                                    sm: 4,
                                    tooltip: "",
                                    label: "Fecha Inicio"
                                }}
                                propsInput={{
                                    sm: 8,
                                    placeholder: "",
                                    size: "sm",
                                    type: "date",
                                    name: "nombre",
                                    value: entidad.nombre,
                                    onChange: handleInputChange
                                }}
                            ></ControlInline>
                        </Col>
                        <Col sm={4}>
                            <ControlInline
                                propsLabel={{
                                    sm: 4,
                                    tooltip: "",
                                    label: "Fecha Fin"
                                }}
                                propsInput={{
                                    sm: 8,
                                    placeholder: "",
                                    size: "sm",
                                    type: "date",
                                    name: "nombre",
                                    value: entidad.nombre,
                                    onChange: handleInputChange
                                }}
                            ></ControlInline>
                        </Col>
                        <Col sm={11}></Col>
                        <Col sm={1}>
                            <Button type={"submit"}>
                                <i class="fa fa-search" aria-hidden="true"></i> Buscar{" "}
                            </Button>
                        </Col>



                    </RowForm>
                    <RowForm className="mb-3">
                        <Col sm={12}>
                            <Link
                                className={"btn btn-primary"}
                                to={Paths.emergencia_add}
                            >
                                <i class="fa fa-plus" aria-hidden="true"></i> Agregar
                            </Link>
                        </Col>
                    </RowForm>
                </Form>
                <TitleForm>Listado de Entidades</TitleForm>
                <Table columns={columns}>
                    {list.map((row, i) => (
                        <EntidadRow
                            data={row}
                            acciones={<Acciones row={row}></Acciones>}
                        ></EntidadRow>
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

export default ListadoEmergencias;
