import Control from './Control';
import Heading from './Heading';
import Table from './Table/Table';
import Pagination from './Pagination';

export default function Transactions() {
    return(
        <>
            <Heading />
            <Control />
            <Table />
            <Pagination />
        </>
    );
}
