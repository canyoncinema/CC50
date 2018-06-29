## Development

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and relies heavily on interactions with the museum curatorial software program, [CollectionSpace](https://wiki.collectionspace.org/).

## Build

Update the deployment build. With the correct credentials,

```
cd $CC50_DIR_PATH && yarn build && mv build/ cc50/ && sudo scp -r $CC50_DIR_PATH $CC50_USERNAME@$CC50_HOST:/var/www/
```

Please contact Amy Hua at [amy@canyoncinema.com](mailto:amy@canyoncinema.com) or Nima Khazaei at [nima@canyoncinema.com](mailto:nima@canyoncinema.com) for credentials.

## Contributors:

* Amy Hua
* Olivia Kumar
* Backend shout-out to Nima Khazaei