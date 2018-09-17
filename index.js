import { Component, render } from "./framework";
import { Navbar } from "./src/navbar";
import { Container } from "./src/container";
import { Input } from "./src/input";
import { Pokemon } from "./src/pokemon";
import { Loading } from "./src/loading";

// class User extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { name: "Marvin" };
//   }

//   componentDidMount() {
//     console.log("The component has been mounted");
//   }

//   handleClick() {
//     const { name } = this.state;
//     this.setState({ name: name === "Marvin" ? "Enchanté" : "Marvin" });
//   }

//   render() {
//     const { name } = this.state;
//     const className = name === "Marvin" ? "red" : "black";

//     return (
//       <div className={className} onClick={this.handleClick.bind(this)}>
//         Hello {this.state.name}
//         <Text>This is a nested component</Text>
//       </div>
//     );
//   }
// }

class App extends Component {
  constructor(props) {
    super(props);

    this.fetchPokemon = this.fetchPokemon.bind(this);

    this.state = { pokemon: null };
  }

  fetchPokemon(name) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
      .then(res => res.json())
      .then(pokemon => this.setState({ pokemon }));
  }

  componentDidMount() {
    this.fetchPokemon("bulbasaur");
  }

  render() {
    const { pokemon } = this.state;
    return (
      <div>
        <Navbar />
        <Container>
          <Input onEnter={this.fetchPokemon} />
          {pokemon ? <Pokemon detail={pokemon} /> : <Loading />}
        </Container>
      </div>
    );
  }
}

render("#app", <App />);
