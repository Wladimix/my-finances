import Heading from './Heading';
import Row from './Row';

export default function Categories() {
    return(
        <>
            <Heading />

            <div className='uk-child-width-expand' data-uk-grid>
                <div>
                    <table>
                        <tbody>
                            <Row />
                            <Row />
                            <Row />
                            <Row />
                            <Row />
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
