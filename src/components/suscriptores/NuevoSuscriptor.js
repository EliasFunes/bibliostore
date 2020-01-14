import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {firestoreConnect} from "react-redux-firebase";
import PropTypes from "prop-types";

class NuevoSuscriptor extends Component {

    state = {
        nombre: '',
        apellido: '',
        carrera: '',
        codigo: ''
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name] : e.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();

        //extraer valores del state
        const nuevoSuscriptor = {...this.state};

        //extraer firestore de los props
        const {firestore, history} = this.props;

        //guardar en base de datos
        firestore.add({collection: 'suscriptores'}, nuevoSuscriptor)
            .then(() => history.push("/suscriptores"));
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={"/suscriptores"}
                          className="btn btn-secondary "><i className="fa fa-arrow-circle-left"></i> {' '}
                        Volver al Listado</Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fa fa-user-plus"></i>{''} Nuevo Suscriptor
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
                                        onChange={this.handleChange}
                                        value={this.state.nombre}
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
                                        onChange={this.handleChange}
                                        value={this.state.apellido}
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
                                        onChange={this.handleChange}
                                        value={this.state.carrera}
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
                                        onChange={this.handleChange}
                                        value={this.state.codigo}
                                    />
                                </div>
                                <input type="submit"
                                       value="Agregar Suscriptor"
                                       className="btn btn-success"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

NuevoSuscriptor.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(NuevoSuscriptor);
