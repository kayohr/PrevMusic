import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const character = 2;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      // nomeArtista: '',
      isSaveButtonDisabled: true,
      load: false,
      albumArtist: [],
      inputText: '',
    };
  }

  componentDidMount() {
    this.requisicaoApi();
  }

  fucMaior2 = (event) => {
    if (event.target.value.length >= character) {
      this.setState({ isSaveButtonDisabled: false, inputText: event.target.value });
    }
  };

  requisicaoApi = async () => {
    const { inputText } = this.state;
    this.setState({
      load: true,

    });
    const response = await searchAlbumsAPI(inputText);
    this.setState({
      load: false,
      albumArtist: response,
      // nomeArtista: '',

    });
    // console.log(response);
  };

  render() {
    const { isSaveButtonDisabled, load, albumArtist, inputText } = this.state;
    if (load) {
      return (<p>Carregando...</p>);
    }
    return (
      <div className="cabeçalho">
        <div data-testid="page-search">
          <div className="gif-container2">
            {/* Search */}
            <Header />
            {/* { load
          ? (<p>Carregando...</p>)
          : ( */}

            <input
              data-testid="search-artist-input"
              placeholder="usernameArtista"
              onChange={ this.fucMaior2 }
              type="text"
            />
            {/* )} */}
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ isSaveButtonDisabled }
              onClick={ this.requisicaoApi }
            >
              Search
            </button>
          </div>

          {
            albumArtist.length === 0 ? (<p>Nenhum álbum foi encontrado</p>)
              : (
                <p className="name">{`Resultado de álbuns de: ${inputText}`}</p>)
          }
          { albumArtist.map((album, index) => (
            <div key={ index }>
              <p className="name">{ album.collectionName }</p>
              <img src={ album.artworkUrl100 } alt={ album.collectionName } />
              <NavLink
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                xablau
              </NavLink>

            </div>
          )) }
        </div>
      </div>
    );
  }
}

export default Search;
