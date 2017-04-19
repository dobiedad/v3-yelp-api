import http from 'axios';
import qs from 'querystring'

const baseUrl = 'https://api.yelp.com/v3/';
const tokenUrl = 'https://api.yelp.com/oauth2/token';

class YelpApiV3 {

  constructor(options) {
    this.credentials = {
      client_id:options.appId,
      client_secret:options.appSecret,
      grant_type:'client_credentials'
    }
  }

  getAccessToken() {
    if(this.accessToken) Promise.resolve(this.accessToken)
    return http.post(tokenUrl, qs.stringify(this.credentials) )
      .then((res) => { this.accessToken = res.data.access_token;return this.accessToken})
    }

  get(resource,params){
    if(!params) throw new Error('An object must be supplied with the following properties: query, location, price, limit')
    return this.getAccessToken()
      .then(token => http({method:'get' ,url:baseUrl + resource, params:params, headers: {'Authorization': 'Bearer ' + token}}))
      .then(res => res.data)
  }

  search(params) {
    return this.get('businesses/search',params);
  }

  phoneSearch(params) {
    return this.get('businesses/search/phone', params);
  }

  transactionSearch(params) {
    return (transactionType) => this.get(`transactions/${transactionType}/search`, params)
  }

  business(id) {
    return this.get(`businesses/${id}`, {});
  }

  reviews(id) {
    return this.get(`businesses/${id}/reviews`, {});
  }

  autocomplete(params) {
    return this.get('autocomplete', params);
  }
}

export {YelpApiV3 as default}
