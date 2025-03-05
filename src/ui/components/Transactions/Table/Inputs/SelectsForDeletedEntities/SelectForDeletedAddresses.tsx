export default function SelectForDeletedAddresses({ transaction }: IProps) {
    const determineOptionValue = () => {

        if (transaction.transactionAddressId !== null) {
            return transaction.transactionAddressName.replace(/\(удалено.+\)/, '')
        }

        if (transaction.spendingCategoryId !== null) {
            return transaction.spendingCategoryName.replace(/\(удалено.+\)/, '')
        }

    };

    return(
        <select
            className='custom-input uk-select uk-text-danger'
            disabled
        >
            <option>
                {determineOptionValue()}
            </option>
        </select>
    );
}

interface IProps {
    transaction: ITransaction
}
