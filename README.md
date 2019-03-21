## Development

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and relies heavily on interactions with the museum curatorial software program, [CollectionSpace](https://wiki.collectionspace.org/).

## Build

Update the deployment build. With the correct credentials,

```
cd $CC50_DIR_PATH && yarn build && mv build/ cc50/ && sudo scp -r $CC50_DIR_PATH $CC50_USERNAME@$CC50_HOST:/var/www/
```

Please contact Amy Hua at [amy@canyoncinema.com](mailto:amy@canyoncinema.com) or Nima Khazaei at [nima@canyoncinema.com](mailto:nima@canyoncinema.com) for credentials.

## Data

```
http://beta.canyoncinema50.org/cspace-services/media?as=((media_canyon:filmSubject+%3D+%22urn%3Acspace%3Acanyoncinema.com%3Aworkauthorities%3Aname(work)%3Aitem%3Aname(17ReasonsWhy1533599384370)%2717%20Reasons%20Why%27%22+AND+media_common:typeList%2F*+%3D+%22film_still%22))&pgSz=3&wf_deleted=false


## Contributors:

* Amy Hua
* Backend shout-out to Nima Khazaei
* Marlo Longley