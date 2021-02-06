## Development

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and relies heavily on interactions with the museum curatorial software program, [CollectionSpace](https://wiki.collectionspace.org/).

To use for local development, run `yarn start:local`

## Build

We use CodeShip for continuous integration. The `master` branch correlates to our staging site, and `production` to `canyoncinema50.org`.

Staging can be viewed at: http://ec2-34-214-63-217.us-west-2.compute.amazonaws.com/

With the correct credentials the scripts run are:

#### For staging: `yarn build:staging`
#### for production: `yarn build:production`

Please contact Nima Khazaei at [nima@canyoncinema.com](mailto:nima@canyoncinema.com) or Marlo Longley at [marlo@codeandcursor.com](mailto:marlo@codeandcursor.com) for credentials.

#### For staging: `yarn build:staging`
#### for production: `yarn build:production`

Please contact Amy Hua at [amy@canyoncinema.com](mailto:amy@canyoncinema.com) or Nima Khazaei at [nima@canyoncinema.com](mailto:nima@canyoncinema.com) for credentials.

## Data

```
http://beta.canyoncinema50.org/cspace-services/media?as=((media_canyon:filmSubject+%3D+%22urn%3Acspace%3Acanyoncinema.com%3Aworkauthorities%3Aname(work)%3Aitem%3Aname(17ReasonsWhy1533599384370)%2717%20Reasons%20Why%27%22+AND+media_common:typeList%2F*+%3D+%22film_still%22))&pgSz=3&wf_deleted=false


## Contributors:

* Amy Hua
* Backend shout-out to Nima Khazaei
* Marlo Longley
