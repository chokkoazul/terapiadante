import React, { Component } from 'react';
import './App.css';
import { throws } from 'assert';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dia: '',
      tarea: '',
      estado: '',
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
    });
  }

  handleSubmit = (event) => {
    console.log("submit");
    event.preventDefault();

    fetch('https://dante-terapia-54fegccdcq-uc.a.run.app/tarea', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
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
      mensaje = <div class="alert alert-primary" role="alert">
      A simple primary alert—check it out!
    </div>;
    }

    return (
      <div>
        <form className="App" onSubmit={this.handleSubmit}>
        <div className="form-group">
        <label>Tarea</label>
         <select className="form-control" name="tarea" value={this.state.tarea} onChange={this.handleChange}>
            <option value="tarea cuaderno">tarea cuaderno</option>
            <option value="juego dirigido mañana">juego dirigido mañana</option>
            <option value="juego dirigido tarde">juego dirigido tarde</option>
            <option value="terapia pc yasna">terapia pc yasna</option>
            <option value="terapia pc paulina">terapia pc paulina</option>
          </select>
          </div>
          <div className="form-group">
          <label>Estado</label>
          <select className="form-control" name="estado" value={this.state.estado} onChange={this.handleChange}>
            <option value="insuficiente">Insuficiente</option>
            <option value="suficiente">Suficiente</option>
            <option value="logrado">Logrado</option>
          </select>
          </div>
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
        {mensaje}
      </div>
    );
  }
}