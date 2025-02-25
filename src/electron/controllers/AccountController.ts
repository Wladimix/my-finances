import Account from '../entities/Account';
import { makeError } from '../utils';

class AccountController {

    async getAllAccounts(): Promise<ResponceData<IAccount[]>> {
        try {

            const account = new Account();

            return {
                data: await account.getAll(),
                error: null
            };

        } catch(error) {

            const errorMessage = makeError(error as Error, 'ошибка получения счетов');

            return {
                data: null,
                error: errorMessage
            };

        }
    }

    async addAccount(): Promise<ResponceData<null>> {
        try {

            const account = new Account();
            await account.add();

            return {
                data: null,
                error: null
            };

        } catch(error) {

            const errorMessage = makeError(error as Error, 'ошибка создания счёта');

            return {
                data: null,
                error: errorMessage
            };

        }
    }

    async editAccountName({ id, name }: { id: number, name: string }): Promise<ResponceData<null>> {
        try {

            const account = new Account(id);
            await account.editName(id, name);

            return {
                data: null,
                error: null
            };

        } catch(error) {

            const errorMessage = makeError(error as Error, 'ошибка редактирования счёта');

            return {
                data: null,
                error: errorMessage
            };

        }
    }

}

export default new AccountController();
