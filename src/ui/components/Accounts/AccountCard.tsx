import DeleteAccountButton from './Buttons/DeleteAccountButton';
import AccountAmountInput from './Inputs/AccountAmountInput';
import AccountNameInput from './Inputs/AccountNameInput';

export default function AccountCard() {
    return(
        <div className='uk-card uk-card-default uk-card-primary uk-card-small uk-card-body'>

            <div className='uk-width-expand uk-text-right uk-margin-bottom-small'>
                <DeleteAccountButton />
            </div>

            <AccountNameInput />
            <AccountAmountInput />

        </div>
    );
}
