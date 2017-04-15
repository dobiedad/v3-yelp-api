import http from 'httpism';

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
    return http.post(tokenUrl, this.credentials , {form: true})
      .then((res) => {this.accessToken = res.body.access_token; return this.accessToken})
      .catch(err => new Error(err.message))
  }

  get(resource,params){
    if(!params) throw new Error('An object must be supplied with the following properties: query, location, price, limit')
    return this.getAccessToken()
      .then(token => http.get(baseUrl + resource ,{ querystring:params, headers: {'Authorization': 'Bearer ' + token}}))
      .then(res => res.body)
      .catch(err => new Error(err.message))
  }

  search(params) {
    return this.get('businesses/search',params);
  }

  phoneSearch(params) {
    return this.get('businesses/search/phone', params);
  }

  transactionSearch(params, transactionType) {
    return this.get(`transactions/${transactionType}/search`, params);
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
