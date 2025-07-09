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
import EntidadRow from "./EntidadRow";
import queryString from 'query-string';
import {
    Control,
    ControlInline,
    TitleForm,
    ContainerButtons
} from "../../../components/forms";
import {getEntidades} from "../api"
import FormsWrapper from "../../../layouts/FormsWrapper";
import Acciones from "./Acciones";

const Entidad = () => {

    const [entidad, setUser, handleInputChange, reset] = useForm({nombre: ""}, [
        "nombre"
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

    const {addToast} = useToasts();

    const handlePageChange = async (pageNumber) => {
        let resultList = [];
        changePage(pageNumber, resultList);
    };


    const handleSerch = async (e) => {
       e.preventDefault();
      // alert(entidad.nombre)

        let query = await queryString.stringify(entidad);
        let entidades = await getEntidades(query,{})
        setList(entidades.data)
    };


    const [list, setList] = useState([])

    useEffect(() => {
        async function init() {
            try {
                let entidades = await getEntidades()
                setList(entidades)
            } catch (err) {

                addToast("Ocurrio un error al cargar las Entidades:" + (err.message ||err.response.data), {
                    appearance: "error",
                    autoDismiss: false
                });

            }
        }

        init();
    }, []);

    let columns = [

        {label: "Nº", key: "id"},
        {label: "Entidad", key: "nombre"},
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
                                    tooltip: "Codigo de registro del Sistema SIMPAD",
                                    label: "Denominacion de la Entidad"
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
                                    pathname: `${Paths.config_entidad_add}`,
                                    state: {background: location}
                                }}
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

export default Entidad;
