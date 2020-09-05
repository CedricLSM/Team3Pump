import axios from "axios";

export class PortfolioService {

    private endpoint: string

    constructor() {
        this.endpoint = 'http://localhost:8300'
    }

    getAllTransactions = async (email: string) : Promise<any> => {
        return axios.get(`${this.endpoint}/portfolio/email/${email}`)
        .then(
            (r) => {
                return r.data;
            }
        ) .catch(err => console.log(err))
    }

    getCurrentHoldings = async (email: string) : Promise<any> => {
        return axios.get(`${this.endpoint}/currentHoldings/${email}`)
        .then(
            (r) => {
                return r.data;
            }
        ) .catch(err => console.log(err))
    }

}

export default new PortfolioService();