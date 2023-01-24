import PropTypes from 'prop-types';
import React from 'react';

class MusicCard extends React.Component {
  // state = ({
  //   load: false,
  //   check: false,
  // });

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
  // saveMusics = async () => {
  //   const { musica } = this.props;
  //   await addSong(musica);
  // };

  // validarCarregando = async () => {
  //   this.setState((prev) => ({
  //     load: true,
  //     check: !prev.check,
  //   }));
  //   await this.saveMusics();
  //   this.setState({
  //     load: false,
  //   });
  // };

  render() {
    const { trackName, previewUrl, trackId, validarCarregando, state } = this.props;
    // const { load, check } = this.state;

    return (
      <div
        className="gif-container4"
      >
        <p data-testid="trackName">{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
        </audio>
        <label htmlFor="check">
          <input
            className="favorita"
            id={ trackId }
            name={ `check-${trackId}` }
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ validarCarregando }
            checked={ state[trackId] || false }
          />
          Favorita
        </label>

      </div>

    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  state: PropTypes.shape({
    trackId: PropTypes.bool,
  }).isRequired,
}.isRequired;

export default MusicCard;
