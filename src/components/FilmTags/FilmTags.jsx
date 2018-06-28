import React from 'react';
import Tag from '../Tag/Tag';
import {
	yearsFromYear,
	getNameFromFilmFormat,
	getFilmColor,
	getFilmSound	
} from '../../utils/parse-data';

const FilmTags = ({ film }) => {
	return (
		<div className="FilmTags tags">
			{
				film.originalFormat ?
				<Tag>{getNameFromFilmFormat(film.originalFormat)}</Tag>
				: null
			}
			{
				film.creationYear ?
				<Tag>{yearsFromYear(
					film.creationYear,
					film.workDateGroupList && film.workDateGroupList.workDateGroup && film.workDateGroupList.workDateGroup.dateEarliestSingleYear,
					film.workDateGroupList && film.workDateGroupList.workDateGroup && film.workDateGroupList.workDateGroup.dateLatestYear
				)}</Tag>
				: null
			}
			{
				film.color ?
				<Tag>{getFilmColor(film.color)}</Tag>
				: null
			}
			{
				film.sound ?
				<Tag>{getFilmSound(film.sound)}</Tag>
				: null
			}
		</div>
	);
}

export default FilmTags;