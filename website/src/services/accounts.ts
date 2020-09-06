import AccountDto from "../shared/dto/AccountDto";
import axios from "axios";

export class AccountsService {

    private endpoint: string

    constructor() {
        this.endpoint = 'http://localhost:8500'
    }

    login = async (email: string, password: string) : Promise<AccountDto | void> => {
        return axios.post(`${this.endpoint}/login`, {'email': email, 'password': password})
        .then(
            (r) => {
                if (r.status == 201) {
                    return {'email': email};
                }
            }
        ) .catch(err => console.log(err))
    }

    signup = async (email: string, password: string, name: string, riskProfile: number, telegramId?: string) : Promise<AccountDto | void> => {
        return axios.post(`${this.endpoint}/create`, {'email': email, 'password': password, "name": name, "risk_profile": riskProfile, "telegram_ID": telegramId})
        .then(
            (r) => {
                if (r.status == 201) {
                    return {'email': email};
                }
            }
        ) .catch(err => console.log(err))
    }

    getCredits = async(email: string) => {
        return axios.get(`${this.endpoint}/credits/${email}`)
        .then(
            (r) => {
                return r.data.credits;
            }
        )
    }
}

export default new AccountsService();