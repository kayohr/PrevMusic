import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    informationAlbum: [],
    load: false,
    // check: '',
    musicaFavorita: [],
  };

  componentDidMount() {
    this.requestMusic();
  }

  requestMusic = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({
      load: true,
    });
    // const { props: { id } } = this.pro.match.params;
    const musics = await getMusics(id);
    this.setState({
      informationAlbum: musics,
      load: false,
    });
  };

  // .filter((songs) => songs.kind === 'song'),
  // handleInputChange = async (event, trackId) => {
  //   const { name, type, checked } = event.target;
  //   const { informationAlbum } = this.state;
  //   const value = type === 'checkbox' ? checked : event.target.value;
  //   this.setState({
  //     [name]: value,
  //     // load: false,
  //   });
  //   // const newMusic = informationAlbum.find((ele) => ele.trackId === trackId);
  //   // const response = await addSong(newMusic);
  //   // console.log(response);
  //   // this.setState((prev)({
  //   //   // load: true,
  //   //   // check: false,
  //   // }));
  // };

  savedFavorit = async (trackId) => {
    const { informationAlbum } = this.state;
    this.setState({
      load: true,
    });
    const newMusic = informationAlbum.find((ele) => ele.trackId === trackId);
    const response = await addSong(newMusic);
    this.setState({
      musicaFavorita: response,
    });
    this.setState({
      load: false,
    });
    // console.log('xablau');
  };

  render() {
    const { informationAlbum, load } = this.state;
    // console.log(informationAlbum);
    // if (load) {
    //   return (<p>Carregando...</p>);
    // }
    return (
      <div data-testid="page-album">
        <Header />
        Album
        { informationAlbum.length > 0 && (
          <>
            <p data-testid="artist-name">{informationAlbum[0].artistName}</p>
            <p data-testid="album-name">{informationAlbum[0].collectionName}</p>
          </>
        )}

        { load ? (<p>Carregando...</p>)
          : (
            informationAlbum.map((musica, index) => (
              (index > 0
                 && <MusicCard
                   trackId={ musica.trackId }
                   trackName={ musica.trackName }
                   previewUrl={ musica.previewUrl }
                   key={ index }
                   //  savedFavorit={ this.savedFavorit }
                   musica={ musica }
                   addSong={ addSong }
                 />)
            )))}

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
