export default function SelectForDeletedSources({ transaction }: IProps) {
    return(
        <select
            className='custom-input uk-select uk-text-danger'
            disabled
        >
            <option>
                {transaction.sourceOfTransactionName.replace(/\(удалено.+\)/, '')}
            </option>
        </select>
    );
}

interface IProps {
    transaction: ITransaction
}
