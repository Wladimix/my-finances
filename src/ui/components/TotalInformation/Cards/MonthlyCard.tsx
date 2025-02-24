export default function MonthlyCard() {
    return(
        <div className='uk-card uk-card-default uk-card-body uk-background-muted'>

            <div className='uk-card-badge uk-label'>ИНФЛЯЦИЯ: 5%</div>

            <h2>Сентябрь</h2>

            <div className='uk-margin-remove' data-uk-grid>
                <div className='uk-width-expand uk-padding-remove uk-text-large uk-text-left'>Доходы</div>
                <div className='uk-text-large'>20 000 ₽</div>
            </div>

            <div className='uk-margin-remove' data-uk-grid>
                <div className='uk-width-expand uk-padding-remove uk-text-large'>Расходы</div>
                <div className='uk-text-large'>5 000 ₽</div>
            </div>

            <div className='uk-margin-remove' data-uk-grid>
                <div className='uk-width-expand uk-padding-remove uk-text-large uk-text-success'>Экономия</div>
                <div className='uk-text-large uk-text-large uk-text-success'>15 000 ₽</div>
            </div>

        </div>
    );
}
