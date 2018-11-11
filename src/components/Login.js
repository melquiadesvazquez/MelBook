import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/actionCreator';

class Login extends Component {
  state = {
    username: 'angryostrich988',
    password: 'r2d2',
    dummydata: false,
    errors: {}
  };

  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  }

  handleChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.loginUser(user, this.state.dummydata);
  };

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/users');
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push('/users')
    }

    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    const { username, password, dummydata, errors } = this.state;
    return (
      <div className="box-row">
        <form className="form box-col container" method="POST" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="sr-only">Username</label>
            <input
              className="form-control"
              type="text"
              id="username"
              name="username"
              required
              placeholder="Username"
              onChange={this.handleChange}
              value={username}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              required
              placeholder="Password"
              onChange={this.handleChange}
              value={password}
            />
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              id="dummydata"
              name="dummydata"
              onChange={this.handleChange}
              checked={dummydata}
            /> &nbsp;
            <label htmlFor="dummydata">Load dummy data?</label>
          </div>
          <button type="submit" className="btn">Login</button>
          {errors && (<div className="notice">{errors.msg}</div>)}
        </form>
      </div>
    );
  };
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login);