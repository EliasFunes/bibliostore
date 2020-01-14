import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";

class EditarSuscriptor extends Component {
    // crear los refs
    nombreRef = React.createRef();
    apellidoRef = React.createRef();
    carreraRef = React.createRef();
    codigoRef = React.createRef();

    handleSubmit = e => {
        e.preventDefault();

        //crear el objeto a actualizar
        const suscriptorActualizado = {
            nombre: this.nombreRef.current.value,
            apellido: this.apellidoRef.current.value,
            carrera: this.carreraRef.current.value,
            codigo: this.codigoRef.current.value
        }

        //extraer firestore e history de props
        const {suscriptor, firestore, history} = this.props;

        //almacenar en la base de datos
        firestore.update({
            collection: 'suscriptores',
            doc: suscriptor.id
        }, suscriptorActualizado)
            .then(history.push('/suscriptores'));
    }

    render() {
        const {suscriptor} = this.props;

        if(!suscriptor) return <Spinner/>;

        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={"/suscriptores"}
                          className="btn btn-secondary "><i className="fa fa-arrow-circle-left"></i> {' '}
                        Volver al Listado</Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fa fa-user"></i>{''} Editar Suscriptor
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>Nombre:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nombre"
                                        placeholder="Nombre del suscriptor"
                                        required
                                        ref={this.nombreRef}
                                        defaultValue={suscriptor.nombre}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Apellido:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="apellido"
                                        placeholder="Apellido del suscriptor"
                                        required
                                        ref={this.apellidoRef}
                                        defaultValue={suscriptor.apellido}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Carrera:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="carrera"
                                        placeholder="Carrera del suscriptor"
                                        required
                                        ref={this.carreraRef}
                                        defaultValue={suscriptor.carrera}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Código:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="codigo"
                                        placeholder="Código del suscriptor"
                                        required
                                        ref={this.codigoRef}
                                        defaultValue={suscriptor.codigo}
                                    />
                                </div>
                                <input type="submit"
                                       value="Editar Suscriptor"
                                       className="btn btn-success"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

EditarSuscriptor.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [{
        collection: 'suscriptores',
        storeAs: 'suscriptor',
        doc: props.match.params.id
    }]),
    connect(({firestore: {ordered}}, props) => ({
        suscriptor: ordered.suscriptor && ordered.suscriptor[0]
    }))
)(EditarSuscriptor);