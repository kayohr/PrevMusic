import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      informationAlbum: [],
      load: true,
    };
  }

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

  render() {
    const { informationAlbum, load } = this.state;
    // console.log(informationAlbum);
    if (load) {
      return (<p>Carregando...</p>);
    }
    return (
      <div data-testid="page-album">
        <Header />
        Album
        <p data-testid="artist-name">{informationAlbum[0].artistName}</p>
        <p data-testid="album-name">{informationAlbum[0].collectionName}</p>
        {(informationAlbum.length === 0)
          ? (
            <p>xablau...</p>
          )
          : (
            informationAlbum.map((musica, index) => (
              (index > 0
                 && <MusicCard
                   trackName={ musica.trackName }
                   previewUrl={ musica.previewUrl }
                   key={ index }
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
