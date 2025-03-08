import { editAccountDeletionField } from '../../../storage/accountStore';

export default function DeleteAccountButton({ account }: IProps) {
    const handler = () => {
        editAccountDeletionField({ id: account.id, isDeleted: 1 });
    };

    const isZeroAccount = !account.amount;

    return(
        <>
            {
                isZeroAccount
                    ?   <button
                            className='uk-icon-link'
                            data-uk-icon='icon: trash; ratio: 1.2'
                            onDoubleClick={handler}
                        />
                    :   <span
                            className='uk-icon'
                            data-uk-icon='icon: trash; ratio: 1.2'
                        />
            }
        </>

    );
}

interface IProps {
    account: IAccount
}
