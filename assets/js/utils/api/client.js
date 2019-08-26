import superagent from 'superagent';
import Cookies from 'js-cookie'

const ClientApi =  class ClientApi {
    constructor() {
        this.url = '/';
        this.tokenHeaderKey = 'auth_token';
    }

    async checkToken(token) {
        let resultToken = '';

        try {
            let data = await superagent.post('/checkToken')
                .set(this.tokenHeaderKey, token)
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
        let result = {
            needAuth: false
        };

        try {
            let data = await superagent.get(this.url + 'products')
                .set(this.tokenHeaderKey, Cookies.get('token'))
                .ok(res => res.status < 500);
            if (data.status == 403) {
                result.needAuth = true;
            }
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