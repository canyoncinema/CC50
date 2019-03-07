//TODO: remove repeated elements of URLS for each type, make dynamic
const urlLookup = {
    films: {
        format: {
            "super8": "(works_canyon:rentalFormats/*+%3D+%22urn:cspace:canyoncinema.com:vocabularies:name(format):item:name(film_super_8mm)%27Super%208mm%27%22)",
            "8mm" : '(works_canyon:rentalFormats/*+%3D+%22urn:cspace:canyoncinema.com:vocabularies:name(format):item:name(film_8mm)%278mm%20Film%27%22)',
            "16mm": "(works_canyon:rentalFormats/*+%3D+%22urn:cspace:canyoncinema.com:vocabularies:name(format):item:name(film_16mm)%2716mm%20Film%27%22)",
            "35mm": "(works_canyon:rentalFormats/*+%3D+%22urn:cspace:canyoncinema.com:vocabularies:name(format):item:name(film_35mm)%2735mm%20Film%27%22)",
            "dvd": "(works_canyon:rentalFormats/*+%3D+%22urn:cspace:canyoncinema.com:vocabularies:name(format):item:name(dvd)%27dvd%27%22)+OR+(works_canyon:rentalFormats/*+%3D+%22urn:cspace:canyoncinema.com:vocabularies:name(format):item:name(dvd_ntsc)%27NTSC%20DVD%27%22)+OR+(works_canyon:rentalFormats/*+%3D+%22urn:cspace:canyoncinema.com:vocabularies:name(format):item:name(dvd_pal)%27PAL%20DVD%27%22)"
            },
        image: {
            "bw": "(works_canyon:color+%3D+%22b_w%22)",
            "color": "(works_canyon:color+%3D+%22color%22)"
        },
        sound: {
            "sound": "(works_canyon:sound+%3D+%22sound%22)",
            "silent": "(works_canyon:sound+%3D+%22silent%22)"
        },
        years: {
            "1920s": "(works_common:workDateGroupList%2F*%2FdateEarliestScalarValue+%3C+TIMESTAMP+%221930-01-01T00:00:00.000Z%22+AND+works_common:workDateGroupList%2F*%2FdateLatestScalarValue+%3E%3D+TIMESTAMP+%221920-01-01T00:00:00.000Z%22)",
            "1930s": "(works_common:workDateGroupList%2F*%2FdateEarliestScalarValue+%3C+TIMESTAMP+%221940-01-01T00:00:00.000Z%22+AND+works_common:workDateGroupList%2F*%2FdateLatestScalarValue+%3E%3D+TIMESTAMP+%221930-01-01T00:00:00.000Z%22)",
            "1940s": "(works_common:workDateGroupList%2F*%2FdateEarliestScalarValue+%3C+TIMESTAMP+%221940-01-01T00:00:00.000Z%22+AND+works_common:workDateGroupList%2F*%2FdateLatestScalarValue+%3E%3D+TIMESTAMP+%221940-01-01T00:00:00.000Z%22)",
            "1950s": "(works_common:workDateGroupList%2F*%2FdateEarliestScalarValue+%3C+TIMESTAMP+%221960-01-01T00:00:00.000Z%22+AND+works_common:workDateGroupList%2F*%2FdateLatestScalarValue+%3E%3D+TIMESTAMP+%221950-01-01T00:00:00.000Z%22)",
            "1960s": "(works_common:workDateGroupList%2F*%2FdateEarliestScalarValue+%3C+TIMESTAMP+%221970-01-01T00:00:00.000Z%22+AND+works_common:workDateGroupList%2F*%2FdateLatestScalarValue+%3E%3D+TIMESTAMP+%221960-01-01T00:00:00.000Z%22)",
            "1970s": "(works_common:workDateGroupList%2F*%2FdateEarliestScalarValue+%3C+TIMESTAMP+%221980-01-01T00:00:00.000Z%22+AND+works_common:workDateGroupList%2F*%2FdateLatestScalarValue+%3E%3D+TIMESTAMP+%221970-01-01T00:00:00.000Z%22)",
            "1980s": "(works_common:workDateGroupList%2F*%2FdateEarliestScalarValue+%3C+TIMESTAMP+%221990-01-01T00:00:00.000Z%22+AND+works_common:workDateGroupList%2F*%2FdateLatestScalarValue+%3E%3D+TIMESTAMP+%221980-01-01T00:00:00.000Z%22)",
            "1990s": "(works_common:workDateGroupList%2F*%2FdateEarliestScalarValue+%3C+TIMESTAMP+%222000-01-01T00:00:00.000Z%22+AND+works_common:workDateGroupList%2F*%2FdateLatestScalarValue+%3E%3D+TIMESTAMP+%221990-01-01T00:00:00.000Z%22)",
            "2000s": "(works_common:workDateGroupList%2F*%2FdateEarliestScalarValue+%3C+TIMESTAMP+%222010-01-01T00:00:00.000Z%22+AND+works_common:workDateGroupList%2F*%2FdateLatestScalarValue+%3E%3D+TIMESTAMP+%222000-01-01T00:00:00.000Z%22)",
            "2010s": "(works_common:workDateGroupList%2F*%2FdateEarliestScalarValue+%3C+TIMESTAMP+%222020-01-01T00:00:00.000Z%22+AND+works_common:workDateGroupList%2F*%2FdateLatestScalarValue+%3E%3D+TIMESTAMP+%222010-01-01T00:00:00.000Z%22)"
        },
    },
    ephemera: {
        type: ['videos', 'interviews', 'printedPieces', 'writings', 'newsletters', 'photos']
    }
};

const filterOutDisabledTags = function(collectionItems, disabledTags, theseTags, tagType) {
    return Object.keys(theseTags)
        .map(tag => {
            return tagType + '__' + tag;
        })
        .filter(tag => disabledTags[tag] !== true )
};

export const getFilterUrl = function(collectionItems, disabledTags) {
    let url = "";
    const tagTypeArr = Object.keys(urlLookup[collectionItems]);
    tagTypeArr.forEach(function(tagType, index) {
        const theseTags = urlLookup[collectionItems][tagType];
        const tagArr = filterOutDisabledTags(collectionItems, disabledTags, theseTags, tagType);
        console.log(tagArr);
        tagArr.forEach(function(tag, i) {
            // if the tag isn't one of the disabled, get its url piece
            // TODO make splitting/merging the tags less repetitive
            let thisUrl = theseTags[tag.split('__')[1]];
            if (i < tagArr.length - 1) {
                url = url + thisUrl + '+OR+';
            } else { url = url + thisUrl }
        });

        if (index !== tagTypeArr.length - 1) {
            url = url + ')+AND+('
        }
    });
    console.log(url);
    return url;
};

// TODO link these dynamically with which tags are displayed on page
// export const getCollectionTags = (function(collectionItems) {
//     // let allTags = [];
//     if (collectionItems === 'films') {
//         return [...filmTags]
//     } else if (collectionItems === 'ephemera') {
//         return [...ephemeraTags]
//     } else { return new Error('Bad Filter Data')}
//
// });