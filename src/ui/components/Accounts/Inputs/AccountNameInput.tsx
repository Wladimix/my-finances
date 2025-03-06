import { $allAccounts, $name, changeName, editAccountName } from '../../../storage/accountStore';
import { useState } from 'react';
import { useUnit } from 'effector-react';

export default function AccountNameInput({ account }: IProps) {
    const changeNameEvent = useUnit(changeName);

    const allAccounts = useUnit($allAccounts);
    const name = useUnit($name);

    const [localName, changeLocalName] = useState<string>(account.name);
    const [inputFocus, changeInputFocus] = useState<boolean>(false);

    const isEmptyName = localName === '';
    const accountAvailability = Boolean(allAccounts.find(account => account.name === localName));
    const editingCondition = !isEmptyName && !accountAvailability;

    const blurHandler = () => {

        changeInputFocus(false);

        if (editingCondition) {
            editAccountName({ id: account.id, name });
        } else {
            changeLocalName(account.name);
        }

    };

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeLocalName(e.target.value);
        changeNameEvent(e.target.value);
    };

    const focusHandler = () => {
        changeInputFocus(true);
    }

    const getDangerColor = () => {
        if (inputFocus && !editingCondition) {
            return ' uk-text-danger';
        } else if (inputFocus && editingCondition) {
            return ' uk-text-success';
        } else {
            return '';
        }
    };

    return(
        <input
            className={'custom-input uk-input uk-text-large' + getDangerColor()}
            onBlur={blurHandler}
            onChange={changeHandler}
            onFocus={focusHandler}
            spellCheck={false}
            value={localName}
        />
    );
}

interface IProps {
    account: IAccount
}
