import Account from '../entities/Account';
import { makeError } from '../utils';

class AccountController {

    async addAccount(): Promise<ResponceData<null>> {
        try {

            const account = new Account();
            await account.add();

            return {
                data: null,
                error: null
            }

        } catch(error) {

            const errorMessage = makeError(error as Error, 'ошибка создания счёта');

            return {
                data: null,
                error: errorMessage
            }

        }
    }

}

export default new AccountController();
