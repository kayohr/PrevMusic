import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    informationAlbum: [],
    load: false,
    // check: '',
    // musicaFavorita: [],
    musicasDoAlbum: [],
  };

  componentDidMount() {
    this.requestMusic();
    this.musicsFavorites();
  }

  validarCarregando = async (event) => {
    const { checked, id } = event.target;
    const { musicasDoAlbum } = this.state;
    const newMusic = musicasDoAlbum.find((ele) => +ele.trackId === +id); // Nessa linha 25 ajuda da Ellen
    if (checked) {
      this.setState({
        load: true,
        [id]: true,
      });
      await addSong(newMusic);
      this.setState({
        load: false,
      });
    } else {
      this.setState({
        load: true,
        [id]: false,
      });
      await removeSong(newMusic);
      this.setState({
        load: false,
      });
    }
  };

  requestMusic = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({
      load: true,
    });
    // const { props: { id } } = this.pro.match.params;
    const musics = await getMusics(id);
    // console.log(musics);
    this.setState({
      informationAlbum: musics,
      load: false,
      musicasDoAlbum: musics.filter((e) => e.kind === 'song'),
    });
  };

  // Com ajuda da Ellen
  musicsFavorites = async () => {
    const myMusics = await getFavoriteSongs();
    const favoritas = myMusics.reduce((acc, curr) => ({
      ...acc, [curr.trackId]: true,
    }), {});
    this.setState({
      ...favoritas,
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

  // saveMusics = async () => {
  //   // const { musica } = this.props;
  //   await addSong(musica);
  // };

  render() {
    const { informationAlbum, load, musicasDoAlbum } = this.state;
    // console.log(informationAlbum);
    // if (load) {
    //   return (<p>Carregando...</p>);
    // }
    return (
      <div
        data-testid="page-album"
        className="gif-container3"
      >
        <Header />
        { load ? (<p>Carregando...</p>)
          : (
            <>

              <p className="name3">Album</p>

              { informationAlbum.length > 0 && (
                <>
                  <p
                    data-testid="artist-name"
                    className="name3"
                  >
                    {informationAlbum[0].artistName}

                  </p>
                  <p
                    data-testid="album-name"
                    className="name3"
                  >
                    {informationAlbum[0].collectionName}

                  </p>
                </>
              )}

              { musicasDoAlbum.map((musica, index) => (
                <div key={ index }>
                  <MusicCard
                    trackId={ musica.trackId }
                    trackName={ musica.trackName }
                    previewUrl={ musica.previewUrl }
                    //  savedFavorit={ this.savedFavorit }
                    // musica={ musica }
                    //  addSong={ addSong }
                    state={ this.state }
                    validarCarregando={ this.validarCarregando }
                  />

                </div>
              ))}
            </>
          )}

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
