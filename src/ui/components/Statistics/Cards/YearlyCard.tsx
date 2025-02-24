import CategoryCosts from '../CategoryCosts';
import YearlyDiagram from '../Diagrams/YearlyDiagram';

export default function YearlyCard() {
    return(
        <div className='uk-card uk-card-default uk-card-body uk-background-muted'>
            <h2>2024</h2>
            <YearlyDiagram />
            <CategoryCosts />
        </div>
    );
}
