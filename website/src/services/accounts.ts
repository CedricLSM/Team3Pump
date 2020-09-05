import AccountDto from "../shared/dto/AccountDto";
import axios from "axios";

export class AccountsService {

    private endpoint: string
    private password: string

    constructor() {
        this.endpoint = 'http://localhost:5000'
    }

    login = async (email: string, password: string) : Promise<AccountDto | void> => {
        return axios.post(`${this.endpoint}/login`, {'username': email, 'password': password}).then(
            (r) => {
                if (r.status == 201) {
                    return {'email': email};
                }
            }
        )
    }

    signup = async (email: string, password: string) : Promise<AccountDto | void> => {
        axios.post(`${this.endpoint}/signup`, {'username': email, 'password': password})
        .then(
            (r) => {
                if (r.status == 201) {
                    return {'email': email};
                }
            }
        ).catch(err => console.log(err))
    }
}

export default new AccountsService();