import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PhotoFill, { EMPTY_STILL_PATH } from '../PhotoFill/PhotoFill';
import CSpacePhoto from '../CSpacePhoto/CSpacePhoto';

const CSpacePhotoFill = CSpacePhoto(PhotoFill);

CSpacePhotoFill.propTypes = {
	caption: PropTypes.string,
	captionLink: PropTypes.obj,
	fadedCaption: PropTypes.boolean,
	blobCsid: PropTypes.string.isRequired,
	canvasSize: PropTypes.obj
};

export default CSpacePhoto(PhotoFill);