import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class SignForm extends Component {
  state = { username: '', password: '' };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [ name ]: value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.signFunc(this.state);
  };

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <br />
          <FormGroup>
            <Label for="name">Username</Label>
            <Input name="username" type="text" id="name" onChange={this.onChange} value={username} />
          </FormGroup>
          <FormGroup>
          <Label for="pass">Password</Label>
            <Input name="password" type="password" id="pass" onChange={this.onChange} value={password} />
          </FormGroup>
          <Button type="submit">{this.props.btnText}</Button>
        </Form>
      </div>
    );
  }
};

export default SignForm;
