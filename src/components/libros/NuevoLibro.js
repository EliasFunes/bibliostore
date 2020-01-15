import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {firestoreConnect} from "react-redux-firebase";
import PropTypes from "prop-types";

class NuevoLibro extends Component {
    state = {
        titulo:'',
        ISBN: '',
        editorial: '',
        existencia: ''
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();

        //tomar copia del state
        const nuevoLibro = {...this.state};

        //agregar un arreglo de prestados
        nuevoLibro.prestados = [];

        //extraer firestore con sus metodos
        const {firestore, history} = this.props;

        //agregar a la base de datos y redireccionar
        firestore.add({collection: 'libros'}, nuevoLibro)
            .then(() => history.push("/libros"));

    }

    render() {
        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={"/libros"} className={"btn btn-secondary"}>
                        <i className="fa fa-arrow-circle-left"></i>{''} Volver al listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fa fa-book"></i>{''} Nuevo Libro
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>Titulo:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="titulo"
                                        placeholder="Titulo o Nombre del Libro"
                                        required
                                        value={this.state.titulo}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Editorial:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="editorial"
                                        placeholder="Editorial del libro"
                                        required
                                        value={this.state.editorial}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>ISBN:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="ISBN"
                                        placeholder="ISBN del libro"
                                        required
                                        value={this.state.ISBN}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Existencia:</label>
                                    <input
                                        type="number"
                                        min="0"
                                        className="form-control"
                                        name="existencia"
                                        placeholder="Cantidad en existencia"
                                        required
                                        value={this.state.existencia}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <input type="submit" className="btn btn-success" value="Agregar Libro"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

NuevoLibro.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(NuevoLibro);