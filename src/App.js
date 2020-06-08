import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import './App.css';
import Select from 'react-select';

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

  handleChange3 = (event) => {
    
    console.log("event",event.value);

    //const name = event.target.name;

    /*this.setState({ 
      [name]: event.target.value,
      respuesta: "inicio"
    });*/
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

    const options = [
      { value: 'tarea cuaderno', label: 'tarea cuaderno'},
      { value: 'juego dirigido mañana', label: 'juego dirigido mañana'}  
    ]
    
    return (
      <div className="contenedor" >
        
        <form onSubmit={this.handleSubmit}>
          <p>Terapias de Dante</p>

          <div className="div-dia">
          <label>Dia</label>
          <DatePicker
            className="picker-date"
            selected={this.state.startDate}
            onChange={this.handleChange2}
          />
          </div>
          
          <div className="div-tarea">
            <label>Tarea</label>
            <select name="tarea" value={this.state.tarea} onChange={this.handleChange}>
              <option value="tarea cuaderno">tarea cuaderno</option>
              <option value="juego dirigido mañana">juego dirigido mañana</option>
              <option value="juego dirigido tarde">juego dirigido tarde</option>
              <option value="terapia pc yasna">terapia pc yasna</option>
              <option value="terapia pc paulina">terapia pc paulina</option>
            </select>
            <Select options={options} onChange={this.handleChange3}/>
          </div>
      
          <div className="div-estado">
            <label>Estado</label>
            <select name="estado" value={this.state.estado} onChange={this.handleChange}>
            <option value="insuficiente">Insuficiente</option>
            <option value="suficiente">Suficiente</option>
            <option value="logrado">Logrado</option>
          </select>
          </div>
          


          <button type="submit">Enviar</button>
        </form>
        
        {mensaje}
      </div>
    );
  }
}