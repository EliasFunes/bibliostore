import React, {Component, useRef} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";

class EditarLibro extends Component {

    tituloRef = React.createRef();
    ISBNRef = React.createRef();
    editorialRef = React.createRef();
    existenciaRef = React.createRef();

    handleSubmit = e => {
        e.preventDefault();

        //construir el nuevo objeto
        const libroActualizado = {
            titulo: this.tituloRef.current.value,
            editorial: this.editorialRef.current.value,
            ISBN: this.ISBNRef.current.value,
            existencia: this.existenciaRef.current.value
        }

        //leer firestore e history
        const {firestore, history, libro} = this.props;

        //actualizar en firestore
        firestore.update({
            collection: 'libros',
            doc: libro.id
        }, libroActualizado)
            .then(history.push("/libros"));
    }

    render() {

        const {libro} = this.props;

        if(!libro) return <Spinner/>;

        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={"/libros"}
                          className="btn btn-secondary "><i className="fa fa-arrow-circle-left"></i> {' '}
                        Volver al Listado</Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fa fa-user"></i>{''} Editar Libro
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
                                        defaultValue={libro.titulo}
                                        ref={this.tituloRef}
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
                                        defaultValue={libro.editorial}
                                        ref={this.editorialRef}
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
                                        defaultValue={libro.ISBN}
                                        ref={this.ISBNRef}
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
                                        defaultValue={libro.existencia}
                                        ref={this.existenciaRef}
                                    />
                                </div>

                                <input type="submit" className="btn btn-success" value="Editar Libro"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

EditarLibro.propTypes = {
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
)(EditarLibro);