import React from 'react';
import VideoCover from 'react-video-cover';
import './Hero.css';

export default ({active, children}) => {
	return (
		<div className={active ? 'Hero' : ''}>
			<div className="shadow" />
			<div className="video-wrapper">
        <VideoCover
          videoOptions={{
            src: 'cc50.mp4',
            title: 'Canyon Cinema',
            autoPlay: true,
            muted: '',
            loop: true,
            poster: 'cc50.mp4'
          }}
          remeasureOnWindowResize={true}
        />
      </div>
			{children}
		</div>
	);
};