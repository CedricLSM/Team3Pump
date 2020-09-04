import AccountDto from "../shared/dto/AccountDto";

export class AccountsService {

    private username: string
    private password: string

    constructor() {
        this.username = 'testtest1@test.com'
        this.password = 'testtest1@test.com'
    }

    login = async (user: string, pass: string) : Promise<AccountDto> => {
        if (user === this.username && pass === this.password) {
            return {accountId: user}
        }
    }
}

export default new AccountsService();