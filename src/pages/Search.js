import React from 'react';
import Header from '../components/Header';

const character = 2;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      // sizeIdex: 0,
      isSaveButtonDisabled: true,
      // load: false,
    };
  }

  fucMaior2 = (event) => {
    // const { searchName } = this.state;
    if (event.target.value.length >= character) {
      this.setState({ isSaveButtonDisabled: false });
    }
  };

  // validatonButton = async () => {
  //   const { loginName } = this.state;

  //   this.setState({
  //     load: true,
  //   });
  // };

  render() {
    const { isSaveButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        Search
        <Header />

        <input
          data-testid="search-artist-input"
          placeholder="usernameArtista"
          onChange={ this.fucMaior2 }
          type="text"
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ isSaveButtonDisabled }
        >
          Pesquisar
        </button>

      </div>
    );
  }
}

export default Search;
