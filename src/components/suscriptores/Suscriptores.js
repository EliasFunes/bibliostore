import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";

const Suscriptores = ({suscriptores, firestore}) => {

    if (!suscriptores) return (<Spinner/>);

    //eliminar suscriptores
    const eliminarSuscriptor = id => {
        firestore.delete({
            collection: 'suscriptores',
            doc: id
        });
    }

    return (
        <div className="row">
            <div className="col-md-12 mb-4">
                 <Link to={"/suscriptores/nuevo"} className="btn btn-primary">
                     <i className="fa fa-plus"></i> Nuevo suscriptor
                 </Link>
            </div>
            <div className="col-md-8">
                <h2>
                    <i className="fa fa-users"></i> Suscriptores
                </h2>
            </div>
            <table className="table table-striped mt-4">
                <thead className="text-light bg-primary">
                <tr>
                    <th>Nombre</th>
                    <th>Carrera</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {suscriptores.map(suscriptor => (
                    <tr key={suscriptor.id}>
                        <td>{suscriptor.nombre} {suscriptor.apellido}</td>
                        <td>{suscriptor.carrera}</td>
                        <td>
                            <Link to={`/suscriptores/mostrar/${suscriptor.id}`}
                                  className="btn btn-success btn-block">
                                <i className="fa fa-angle-double-right">
                                </i> {' '} Más información
                            </Link>
                            <button className="btn btn-danger btn-block"
                                    onClick={() => eliminarSuscriptor(suscriptor.id)}
                            >
                                <i className="fa fa-trash"></i> {' '} Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};


Suscriptores.propTypes = {
    firestore: PropTypes.object.isRequired,
    suscriptores: PropTypes.array
}

export default compose(
    firestoreConnect([{collection: 'suscriptores'}]),
    connect((state, props) => ({
        suscriptores: state.firestore.ordered.suscriptores
    }))
)(Suscriptores);
