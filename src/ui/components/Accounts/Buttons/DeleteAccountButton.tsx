import { editAccountDeletionField } from '../../../storage/accountStore';

export default function DeleteAccountButton({ account }: IProps) {
    const handler = () => {
        editAccountDeletionField({ id: account.id, isDeleted: 1 });
    };

    return(
        <button
            className='uk-icon-link'
            data-uk-icon='icon: trash; ratio: 1.2'
            onClick={handler}
        />
    );
}

interface IProps {
    account: IAccount
}
