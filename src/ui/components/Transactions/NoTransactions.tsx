export default function NoTransactions() {
    return(
        <tr>
            <td className='not-hover' colSpan={6}>
                <div className='uk-alert-primary' data-uk-alert>
                    <h3>Транзакции отсутствуют</h3>
                </div>
            </td>
        </tr>
    );
}
