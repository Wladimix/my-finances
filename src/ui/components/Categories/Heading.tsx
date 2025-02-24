import AddCategoryButton from './Buttons/AddCategoryButton';

export default function Heading() {
    return(
        <h1 className='uk-heading-divider'>
            <span>Категории</span>
            <AddCategoryButton />
        </h1>
    );
}
