import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import './App.css';
import { throws } from 'assert';

import "react-datepicker/dist/react-datepicker.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dia: '',
      tarea: 'tarea cuaderno',
      estado: 'insuficiente',
      startDate: new Date(),
      respuesta: 'inicio'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {
    fetch('https://todo-api-london.now.sh/lists', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        list: {
          name: 'my list'
        }
      })
    })
    .then((res) => res.json())
    .then(data => {
      this.setState({
        listId: data.list.id
      });
    });
  }

  handleChange = (event) => {
    
    const name = event.target.name;

    this.setState({ 
      [name]: event.target.value,
      respuesta: "inicio"
    });
  }

  handleChange2 = date => {
    this.setState({
      startDate: date,
      respuesta: "inicio"
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    fetch('https://dante-terapia-54fegccdcq-uc.a.run.app/tarea', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        "dia": this.state.startDate.toLocaleDateString("en-US"),
        "tarea": this.state.tarea,
        "estado": this.state.estado
      })
    })
    .then(data => {
      console.log("data->", data);
      this.setState({
        respuesta: 'ok'
      });
    });
  }

  render() {
    let mensaje;
    if(this.state.respuesta === 'ok'){
      mensaje = <div className="alert alert-success" role="alert">
      La tarea ({this.state.tarea}) con estado ({this.state.estado}) ha sido ingresada!!!
    </div>;
    }
    
    return (
      <div className="container border border-primary p-3 mb-2 bg-info text-white">
        
        <form className="App" onSubmit={this.handleSubmit}>
        

        <div className="form-group">
        
        <div className="row">
          <div className="col-sm">
          <label>Dia</label>
          </div>
          <div className="col-sm">
          <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange2}
        />
          </div>
        </div>
        
        </div>

        <div className="form-group">
        <div className="row">
        
          <div className="col-sm">
          <label>Tarea</label>
          </div>
          <div className="col-sm">
          <select className="form-control" name="tarea" value={this.state.tarea} onChange={this.handleChange}>
            <option value="tarea cuaderno">tarea cuaderno</option>
            <option value="juego dirigido mañana">juego dirigido mañana</option>
            <option value="juego dirigido tarde">juego dirigido tarde</option>
            <option value="terapia pc yasna">terapia pc yasna</option>
            <option value="terapia pc paulina">terapia pc paulina</option>
          </select>
          </div>
          </div>
        </div>
        
        
          <div className="form-group">
          <div className="row">
            <div className="col-sm">
            <label>Estado</label>
            </div>
            <div className="col-sm">
            <select className="form-control" name="estado" value={this.state.estado} onChange={this.handleChange}>
            <option value="insuficiente">Insuficiente</option>
            <option value="suficiente">Suficiente</option>
            <option value="logrado">Logrado</option>
          </select>
          </div>
          </div>
          </div>
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
        
        {mensaje}
      </div>
    );
  }
}