import React from "react";
import InputGroup from "../../../components/InputGroup";
import Select from "../../../components/Select";
import Select2 from "../../../components/Select2";
import Button from "../../../components/Button";
import Table from "../../../components/Table";
import TableItemCheck from "../../../components/TableItemCheck";
import Tags from "../../../components/Tags";
import InputCheckbox from "../../../components/InputCheckbox";
import FormsWrapper from "../../../layouts/FormsWrapper";

const SendEmergency = () => {
    const lista = [
        {
            id: '1',
            codigo: '235656',
            titulo: 'POR DESLIZAMIENTO EN EL DISTRITO DE TORATA - MOQUEGUA',
            tipoEmergencia: 'Climatológico',
            tipoSolicitud: 'Temporal'
        },
        {
            id: '2',
            codigo: '235657',
            titulo: 'Temblor de 6.4 - Cañete',
            tipoEmergencia: 'Sísmico',
            tipoSolicitud: 'Temporal'
        }
    ];

    return (<>
            <FormsWrapper title="Envió de la Emergencia">



                    <div className="register-container register-container--send">
                        <p>Datos de la Emergencia</p>
                        <InputGroup type='number' name='datoemergencia' label='Código de la Emergencia'
                                    placeholder='Ejm: 235656' button={{name: 'Buscar', type: 'add'}} required/>

                        <p>Resultados Encontrados</p>
                        <div className="register-results">
                            <Table>
                                {
                                    lista.map((item, i) => <TableItemCheck key={i} id={item.id}
                                                                           items={[item.codigo, item.titulo, item.tipoEmergencia, item.tipoSolicitud]}/>)
                                }
                            </Table>
                        </div>

                        <p>Instituciones Destino</p>
                        <Select2 required name='insti' id='basic-type' label='Institución'
                                 options={['Connida', 'MIT', 'UNSCH']}/>
                        <Select name='direccion' label='Dirección' button={{name: 'Agregar', type: 'add'}}/>

                        <Tags tags={['Municipalidad de Cañete', 'Subregión de Cañete', 'Municipalidad del Callao']}/>

                        <p>Configuración de Envío</p>
                        <InputCheckbox name='envio' label='Envio por Correo' inverted/>
                        <span/>
                        <InputCheckbox name='send-all' label='Enviar a todos los contactos' inverted/>
                        <span/>
                        <InputGroup name='url' label='URL compartido (Drive, Wetransfer y otros)'/>
                        <InputGroup name='otroscorreos' label='Otros correos (Separado por comas)'
                                    placeholder='lmeza@conida.gob.pe, cpasapera@conida.gob.pe'/>
                    </div>
                    <div className="container-buttons">
                        <Button format='link' href='/emergency' name='Cancelar' type='cancel' className='mx-1'/>
                        <Button name='Enviar'/>
                    </div>

            </FormsWrapper>
        </>
    )
}

export default SendEmergency;