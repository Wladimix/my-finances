import { convertAmount } from '../../utils';

export default function CategoryCosts({ statisticsOnExpenses }: IProps) {
    const makeClass = (string: string) =>
        /\(удалено.+\)/.test(string)
            ? 'uk-width-expand uk-text-large uk-text-danger'
            : 'uk-width-expand uk-text-large';

    return(
        <>
            {
                statisticsOnExpenses.map(elem =>
                    <div key={elem.purchase} className='uk-grid-small' data-uk-grid>
                        <div className={makeClass(elem.purchase)} data-uk-leader>
                            {elem.purchase.replace(/\(удалено.+\)/, '')}
                        </div>
                        <div className='uk-text-large'>{convertAmount(elem.amount)}</div>
                    </div>
                )
            }

        </>
    );
}

interface IProps {
    statisticsOnExpenses: IStatisticsOfExpenses[]
}
