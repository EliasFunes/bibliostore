import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import store from "./store";
import {Provider} from "react-redux";

import Navbar from "./components/layout/Navbar";

/**Suscriptores*/
import Suscriptores from "./components/suscriptores/Suscriptores";
import MostrarSuscriptor from "./components/suscriptores/MostrarSuscriptor";
import NuevoSuscriptor from "./components/suscriptores/NuevoSuscriptor";
import EditarSuscriptor from "./components/suscriptores/EditarSuscriptor";

/**Libros*/
import Libros from "./components/libros/Libros";
import MostrarLibro from "./components/libros/MostrarLibro";
import NuevoLibro from "./components/libros/NuevoLibro";
import EditarLibro from "./components/libros/EditarLibro";
import PrestamoLibro from "./components/libros/PrestamoLibro";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Navbar/>
                <div className="container">
                    <Switch>
                        <Route exact path="/suscriptores" component={Suscriptores}/>
                        <Route exact path="/suscriptores/nuevo" component={NuevoSuscriptor}/>
                        <Route exact path="/suscriptores/editar/:id" component={EditarSuscriptor}/>
                        <Route exact path="/suscriptores/mostrar/:id" component={MostrarSuscriptor}/>

                        <Route exact path="/libros" component={Libros}/>
                        <Route exact path="/libros/nuevo" component={NuevoLibro}/>
                        <Route exact path="/libros/editar/:id" component={EditarLibro}/>
                        <Route exact path="/libros/mostrar/:id" component={MostrarLibro}/>
                        <Route exact path="/libros/prestamo/:id" component={PrestamoLibro}/>

                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
