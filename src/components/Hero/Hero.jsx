import React, { Component } from 'react';
import VideoCover from 'react-video-cover';
import './Hero.css';

class Hero extends Component {
  componentWillUnmount() {
    if (this.playTimeout) {
      clearTimeout(this.playTimeout);
    }
  }

  onVideoLoad = () => {
    document.getElementById('hero-video').play();
  }

  render() {
    const videoIndex = Math.ceil(Math.random() * 4);
    const { active, children } = this.props;
  	return (
  		<div className={active ? 'Hero' : ''}>
  			<div className="shadow" />
  			<div className="video-wrapper">
          <VideoCover
            videoOptions={{
              id: 'hero-video',
              src: `Home_${videoIndex}.mp4`,
              title: 'Canyon Cinema',
              autoPlay: true,
              muted: 'muted',
              // play: true,
              loop: true,
              poster: 'cc50.mp4',
              onLoadStart: this.onVideoLoad
            }}
            remeasureOnWindowResize={true}
          />
        </div>
  			{children}
  		</div>
  	);
  }
}

export default Hero;