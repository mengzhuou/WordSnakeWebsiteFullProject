import React, { Component } from 'react';

interface MyComponentProps {
  // add any props here
}

interface MyComponentState {
  // add any state properties here
}

class ClassicMode extends Component<MyComponentProps, MyComponentState> {
  constructor(props: MyComponentProps) {
    super(props);

    this.state = {
      // initialize state here
    };
  }

  componentDidMount() {
    // code to run after the component mounts
  }

  componentDidUpdate(prevProps: MyComponentProps, prevState: MyComponentState) {
    // code to run after the component updates
  }

  componentWillUnmount() {
    // code to run before the component unmounts
  }

  render() {
    return (
      <div>
        // code to render the component goes here
      </div>
    );
  }
}

export default ClassicMode;
