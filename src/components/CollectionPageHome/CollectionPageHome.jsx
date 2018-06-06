import React from 'react';

import CollectionSection from '../CollectionSection/CollectionSection';
import { filmData, filmmakerData, programData, ephemeraData } from '../../spoof-data';

const CollectionPageHome = () => {
  console.log('CollectionPageHome');
	return [
		<CollectionSection key={0}
      header="Recently Added Films"
      description="New acquisitions to the Canyon Cinema collection"
      buttonText="See all films"
      searchData={filmData}
    />,
    <CollectionSection key={1}
      header="Recently Added Filmmakers"
      description="Spotlight on some of Canyon Cinema’s filmmakers"
      buttonText="See all filmmakers"
      searchData={filmmakerData}
    />,
    <CollectionSection key={2}
      header="Recently Added Curated Programs"
      description="Curated by Canyon Cinema staff, Board of Directors, and Advisory Board"
      buttonText="See all curated programs"
      searchData={programData}
    />,
    <CollectionSection key={3}
      header="Recently Added Ephemera"
      description="Printed pieces, photos, stills, videos, and other related materials"
      buttonText="See all ephemera"
      searchData={ephemeraData}
    />
	];
};

export default CollectionPageHome;
