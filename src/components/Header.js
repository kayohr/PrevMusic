import React from 'react';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    loginName: '',
    load: true,
  };

  componentDidMount() {
    this.func();
  }

  func = async () => {
    const retorno = await getUser();
    this.setState({
      loginName: retorno.name,
      load: false,
    });

    console.log(retorno);
  };

  render() {
    const { load, loginName } = this.state;
    return (
      <header data-testid="header-component">
        {
          load
            ? <p>Carregando...</p>
            : <p data-testid="header-user-name">{loginName}</p>
        }
      </header>
    );
  }
}

export default Header;