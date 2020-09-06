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

    addTransaction = async (email: string, ticker: string, quantity: number, price: number, buy: boolean) => {
        return axios.post(`${this.endpoint}/portfolio`, 
            {
                "email": email,
                "stock_ticker": ticker,
                "quantity": quantity,
                "date_time": new Date().toISOString().slice(0, 19).replace('T', ' '),
                "price": price,
                "buy": (buy ? 1 : 0)
            })
            .then(
                (r) => {
                    return r.data;
                }
            ) .catch(err => console.log(err));
    }

}

export default new PortfolioService();