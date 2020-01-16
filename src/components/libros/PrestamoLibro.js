import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";

class PrestamoLibro extends Component {
    render() {

        const {libro} = this.props;

        if(!libro) return <Spinner/>;

        /**TODO: Pendiente de buscar y realizar una reserva */

        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={"/libros"}
                          className="btn btn-secondary "><i className="fa fa-arrow-circle-left"></i> {' '}
                        Volver al Listado</Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fa fa-user"></i>{''} Solicitar Prestamo : {libro.titulo}
                    </h2>

                    <div className="row justify-content-center mt-5">
                        <div className="col-md-8">
                            <form>
                                <legend className="color-primary text-center">
                                    Busca el Suscriptor por Código
                                </legend>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="busqueda"
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <input type="submit" className="btn btn-success btn-block" value="Buscar Alumno"/>

                            </form>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

PrestamoLibro.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [{
        collection: 'libros',
        storeAs: 'libro',
        doc: props.match.params.id
    }]),
    connect(({firestore: {ordered}}, props) => ({
        libro: ordered.libro && ordered.libro[0]
    }))
)(PrestamoLibro);