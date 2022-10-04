import React from 'react';
import { NavLink } from 'react-router-dom';
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
        <nav>
          <NavLink
            data-testid="link-to-search"
            to="/search"
            activeClassName="active"
          />
          <NavLink
            data-testid="link-to-favorites"
            to="/favorites"
            activeClassName="active"
          />
          <NavLink
            data-testid="link-to-profile"
            to="/profile"
            activeClassName="active"
          />
        </nav>
      </header>
    );
  }
}

export default Header;
