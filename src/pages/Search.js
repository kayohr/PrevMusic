import React from 'react';
import Header from '../components/Header';

const character = 2;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      // sizeIdex: 0,
      isSaveButtonDisabled: true,
      searchName: '',
      // load: false,
    };
  }

  fucMaior2 = (event) => {
    const { searchName } = this.state;
    if (event.target.value.length >= character) {
      this.setState({ isSaveButtonDisabled: false, searchName: event.target.value });
    } this.setState({ searchName: event.target.value });
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
        <form>
          <input
            data-testid="search-artist-input"
            placeholder="usernameArtista"
            onChange={ this.fucMaior2 }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isSaveButtonDisabled }
            onClick="{ }"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
