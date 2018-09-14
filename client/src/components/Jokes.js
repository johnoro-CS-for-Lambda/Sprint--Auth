import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

class Jokes extends Component {
  state = { jokes: [] };

  componentDidMount() {
    this.props.getJokes()
      .then(({ data }) => {
        this.setState({ jokes: data });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        {this.state.jokes
          .slice()
          .sort((a, b) => a.id - b.id)
          .filter((joke, i, arr) => i ? joke.id !== arr[i - 1].id : true)
          .map(joke => {
            const { id, setup, punchline } = joke;
            return (
              <Card key={id}>
                <CardBody>
                  <CardTitle>{setup}</CardTitle>
                  <CardText>{punchline}</CardText>
                </CardBody>
              </Card>
            );
          })
        }
      </div>
    );
  }
};

export default Jokes;
