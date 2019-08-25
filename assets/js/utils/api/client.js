import superagent from 'superagent';
import Cookies from 'js-cookie'

var ClientApi =  class ClientApi {
    constructor() {
        this.url = '/';
    }

    setApiKey(key) {
        Cookies.set('token', key);
    }

    async checkToken(token) {
        let resultToken = '';

        try {
            let data = await superagent.post('/checkToken')
                .set('auth_token', token)
                .ok(res => res.status < 500);

            if (data.status != 403) {
                resultToken = data.body.data.auth_token;
            }
        } catch (e) {
            console.log(e);
        }

        return resultToken;
    }

    async auth(code, phone) {
        let result = {};

        try {
            let data = await superagent.post('/auth').send({
                code: code,
                phone: phone,
            }).ok(res => res.status < 500);
            if (data.status != 403) {
                result.token = data.body.data.auth_token;
            }
        } catch (e) {
            console.log(e);
        }

        return result;
    }

    async products() {
        let result = {};

        try {
            let data = await superagent.get(this.url + 'products')
                .set('auth_token', Cookies.get('token'))
                .ok(res => res.status < 500);

            result = data.body.data;
        } catch (e) {
            console.log(e);
        }

        return result;
    }

    getResponseData(res) {
        return res.body.data;
    }
};

export default ClientApi;