import CategoryCosts from '../CategoryCosts';
import MonthlyDiagram from '../Diagrams/MonthlyDiagram'

export default function MonthlyCard() {
    return(
        <div className='uk-card uk-card-default uk-card-body uk-background-muted'>
            <h2>Сентябрь</h2>
            <MonthlyDiagram />
            <CategoryCosts />
        </div>
    );
}
