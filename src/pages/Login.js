import PropTypes from 'prop-types';
import React from 'react';
import { createUser } from '../services/userAPI';

// }
const LETTER = 3;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      // sizeIdex: 0,
      isSaveButtonDisabled: true,
      loginName: '',
      load: false,
    };
  }

  // onechange, chamar no estado que o que eu por vai ser, se eu por um nome, vai ser aquele nome
  // função para o size, validar o size, aula 3.2 form
  // componentDidUpdate(prevProps, prevState) {
  //   // if (prevState >= TRHEE_SECONDS){
  //   this.setState({
  //     sizeIdex: prevState >= TRHEE_SECONDS,
  //   // }
  //   });
  // }
  // handlelETTER() {
  //   this.setState((prev) => ({
  //     sizeIdex: prev.sizeIdex >= LETTER,
  //   }));
  // }

  fucMaior3 = (event) => {
    this.setState({
      load: true,
    });
    if (event.target.value.length >= LETTER) {
      this.setState({ isSaveButtonDisabled: false, loginName: event.target.value });
    }
    this.setState({ loginName: event.target.value });
    this.setState({
      load: false,

    });
    if (event.target.value.length < LETTER) {
      this.setState({ isSaveButtonDisabled: true, loginName: event.target.value });
    }
  };

  validatonButton = async () => {
    const { loginName } = this.state;
    const { history } = this.props;
    this.setState({
      load: true,
    });
    await createUser({ name: loginName });
    this.setState({
      load: false,
    });
    history.push('/search');
    // console.log('bu');
  };

  render() {
    const { isSaveButtonDisabled, load } = this.state;
    return (
      <div className="gif-container">
        <div className="validation">
          <div className="login">
            <div data-testid="page-login">Login</div>

            { load ? (<p>Loading...</p>)
              : (

                <input
                  data-testid="login-name-input"
                  type="text"
                  placeholder="username"
                  onChange={ this.fucMaior3 }
                />
              )}

          </div>
          <div className="button">

            <button
              data-testid="login-submit-button"
              type="button"
              disabled={ isSaveButtonDisabled }
              onClick={ this.validatonButton }

            >
              Log in
            </button>
            ;
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
