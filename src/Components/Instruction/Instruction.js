import React, { Component } from "react";

// const Instruction = () => {
//   return <p>information</p>;
// };
// export default Instruction;

class Instruction extends Component {
  state = {
    count: 1,
  };

  componentDidMount() {
    document.title = `You have clicked button ${this.state.count} times`;
  }

  componentDidUpdate() {
    document.title = `You have clicked button ${this.state.count} times`;
  }

  render() {
    return (
      <>
        <p style={{ color: "red" }}>{this.props.children}</p>
        <p>{this.state.count}</p>
        <button
          onClick={() => {
            this.setState({ count: this.state.count + 1 });
          }}
        >
          Click
        </button>
      </>
    );
  }
}

export default Instruction;
