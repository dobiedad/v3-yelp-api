# v3 Yelp Api
A simple npm wrapper for Yelp v3 Api which is compatible with [React Native](https://github.com/facebook/react-native)

## Dependencies
[axios](https://github.com/mzabriskie/axios)

[qs](https://github.com/ljharb/qs)
## Install

### npm
    npm i v3-yelp-api -S
### Usage

```JavaScript
import YelpApi from 'v3-yelp-api';

const credentials = {
    appId:"App Id from Yelp Developer Console",
    app: "App Secret from Yelp Developer Console"
}

const yelp = New YelpApi(credentials)
```

### Search
```JavaScript
let params = {
    query: 'food',
    location: '51.5007,0.1246',
    price: '2',
    limit: 10
}

yelp.search(params)
 .then(data => data)
 .catch(err => err)
```
### Phone Search
```JavaScript
let params = { phone: '+442073722882' }

yelp.phoneSearch(params)
 .then(data => data)
 .catch(err => err)
```
### Business / Reviews
```JavaScript
let bestRestaurantEver = 'tamada-london'

yelp.business(bestRestaurantEver)
 .then(data => data)
 .catch(err => err)

yelp.reviews(bestRestaurantEver)
 .then(data => data)
 .catch(err => err)
```
### Transactional Search
```JavaScript
let params = { location: 'london' }
let transactionType = 'delivery'

yelp.transactionSearch(params)(transactionType)
 .then(data => data)
 .catch(err => err)
```
