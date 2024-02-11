import React from "react";
import './calculadoraWeb.css';

class CalculadoraWeb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pantalla: "0",
      operacion: null,
      resultado: "",
      numero1: "",
      numero2: "",
      operacionAnterior: "",
    };
    this.handleNumeroClick = this.handleNumeroClick.bind(this);
    this.handleOperacionClick = this.handleOperacionClick.bind(this);
    this.calcular = this.calcular.bind(this);
    this.resetear = this.resetear.bind(this);
  }

  handleNumeroClick(numero) {
    if (numero === "." && this.state.pantalla.includes(".")) {
      return;
    }
    const pantalla = this.state.pantalla === "0" ? numero.toString() : this.state.pantalla + numero;
    this.setState({ pantalla });
  }
  handleSignChange() {
    const currentNumber = parseFloat(this.state.pantalla);
    const newNumber = -currentNumber;
    this.setState({ pantalla: newNumber.toString() });
    // Add a class to the pantalla element to reverse the text direction
    document.querySelector('.calculadora-pantalla').classList.add('reverse');
  }
  

  handleOperacionClick(operacion) {
    const num2 = parseFloat(this.state.pantalla );
    if (this.state.resultado !== "") {
      this.setState({
        numero1: this.state.resultado,
        numero2: num2,
        pantalla: "0",
        operacion,
        resultado: "",
        operacionAnterior: `${this.state.numero1} ${this.state.operacion} ${this.state.numero2}`,
      });
    } else {
      this.setState({
        numero1: this.state.pantalla,
        pantalla: "0",
        operacion,
        operacionAnterior: `${this.state.pantalla} ${operacion}`,
      });
    }
  }

  calcular() {
    const num1 = parseFloat(this.state.numero1 || 0);
    const num2 = parseFloat(this.state.pantalla);
    let nuevoResultado;

    switch (this.state.operacion) {
      case "+":
        nuevoResultado = num1 + num2;
        break;
      case "-":
        nuevoResultado = num1 - num2;
        break;
      case "*":
        nuevoResultado = num1 * num2;
        break;
      case "/":
        if (num2 !== 0) {
          nuevoResultado = num1 / num2;
        } else {
          nuevoResultado = "Error: División por cero";
        }
        break;
      case "%":
        nuevoResultado = num1 * (num2 / 100);
        break;
      default:
        nuevoResultado = num2;
    }

    this.setState({
      resultado: nuevoResultado,
      pantalla: "0",
      numero1: nuevoResultado,
      operacionAnterior: `${this.state.numero1} ${this.state.operacion} ${this.state.pantalla}`,
    });
}

  resetear() {
    this.setState({
      pantalla: "0",
      operacion: null,
      resultado: "",
      numero1: "",
      operacionAnterior: "",
    });
  }

  render() {
    return (
      <div>
        <h1>Abelardo Cruz Leos</h1>
      <div className="calculadora-container">
        <div className="Contenedorpantallas">
          <div className="calculadora-operacion">
            {this.state.operacionAnterior || "\u00a0"} {/* Mostrar la operación anterior */}
          </div>
          <div className="calculadora-pantalla">
            {this.state.resultado !== "" ? this.state.resultado : this.state.pantalla}
          </div>
        </div>
        <h1 className="calculadora-header"></h1>
        <div className="calculadora-botones">
          <button className="clgray" onClick={this.resetear}>AC</button>
          <button className="clgray" onClick={() => this.handleSignChange()}>+/-</button>
          <button className="clgray" onClick={() => this.handleOperacionClick("%")}>%</button>
          <button className="clorange" onClick={() => this.handleOperacionClick("/")}>/</button>
          {[7, 8, 9].map((numero) => (
            <button key={numero} onClick={() => this.handleNumeroClick(numero)}>
              {numero}
            </button>
          ))}
          <button className="clorange" onClick={() => this.handleOperacionClick("*")}>x</button>
          {[4, 5, 6].map((numero) => (
            <button key={numero} onClick={() => this.handleNumeroClick(numero)}>
              {numero}
            </button>
          ))}
          <button className="clorange" onClick={() => this.handleOperacionClick("-")}>-</button>
          {[1, 2, 3].map((numero) => (
            <button key={numero} onClick={() => this.handleNumeroClick(numero)}>
              {numero}
            </button>
          ))}
          <button className="clorange" onClick={() => this.handleOperacionClick("+")}>+</button>
          <button className="double" onClick={() => this.handleNumeroClick(0)}>0</button>
          <button onClick={() => this.handleNumeroClick(".")}>.</button>
          <button className="clorange" onClick={this.calcular}>=</button>
        </div>
      </div>
      </div>
    );
  }
}

export default CalculadoraWeb;