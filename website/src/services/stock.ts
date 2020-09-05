import axios from "axios";

export class StockService {

    private endpoint: string

    constructor() {
        this.endpoint = 'http://localhost:8400'
    }

    getStockInfo = async (ticker: string) : Promise<any> => {
        return axios.get(`${this.endpoint}/getstock`, {params: {symbol: ticker}})
        .then(
            (r) => {
                return r.data;
            }
        ) .catch(err => console.log(err))
    }

    getStockHistory = async (ticker: string) : Promise<any> => {
        return axios.get(`${this.endpoint}/stockhistory`, {params: {symbol: ticker}})
        .then(
            (r) => {
                return r.data;
            }
        ) .catch(err => console.log(err))
    }

}

export default new StockService();