import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = ({
    load: false,
    check: false,
  });

  // acompanhar = async () => {
  //   const { match: { params: { trackId } } } = this.props;
  //   this.setState((prev)({
  //     load: false,
  //     check: !prev.check,
  //   }));
  //   const response = await addSong(trackId);
  //   console.log(response);
  //   this.setState({
  //     load: true,
  //   });
  // };
  // handleInputChange = async (event) => {
  //   const { name, type, checked } = event.target;
  //   const value = type === 'checkbox' ? checked : event.target.value;
  //   this.setState({
  //     [name]: value,
  //     load: false,
  //   });
  //   const response = await addSong();
  //   console.log(response);
  //   this.setState({
  //     load: true,
  //     check: response,
  //   });
  // };
  saveMusics = async () => {
    const { musica } = this.props;
    await addSong(musica);
  };

  validarCarregando = async () => {
    this.setState((prev) => ({
      load: true,
      check: !prev.check,
    }));
    await this.saveMusics();
    this.setState({
      load: false,
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { load, check } = this.state;

    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        { load ? (<p>Carregando...</p>)
          : (

            <label htmlFor="musicaFavorita">
              <input
                name="musicaFavorita"
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.validarCarregando }
                checked={ check }
              />
              Favorita
            </label>
          )}
      </div>

    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  // trackId: PropTypes.string,
}.isRequired;

export default MusicCard;
