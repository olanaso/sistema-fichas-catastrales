import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { Paths, formatPath } from "../paths"

const Acciones = ({ row }) => {
    let location = useLocation();
    return (
        <>
            <ButtonGroup size="sm">
                <Button variant="outline-dark">
                    <Link
                        to={{
                            pathname: `${formatPath(Paths.config_satelite_edit, {
                                id: row.id
                            })}`,
                            state: { background: location }
                        }}
                    >
                        <i class="fa fa-pencil" aria-hidden="true"></i> Editar
                    </Link>
                </Button>
                <Button variant="outline-dark">
                    <Link
                        to={{
                            pathname: `${formatPath(Paths.config_satelite_delete, {
                                id: row.id
                            })}`,
                            state: { background: location }
                        }}
                    >
                        <i class="fa fa-trash" aria-hidden="true"></i> Eliminar
                    </Link>

                </Button>
            </ButtonGroup>
        </>
    );
};

export default Acciones;
