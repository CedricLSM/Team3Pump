import AccountDto from "../shared/dto/AccountDto";

export class AccountsService {

    private email: string
    private password: string

    constructor() {
        this.email = 'testtest1@test.com'
        this.password = 'testtest1@test.com'
    }

    login = async (email: string, password: string) : Promise<AccountDto> => {
        if (email === this.email && password === this.password) {
            return {email: email}
        }
    }
}

export default new AccountsService();