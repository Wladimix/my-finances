import Header from './Header';
import Row from './Row';

export default function Table() {
    return(
        <table>
            <thead>
                <Header />
            </thead>
            <tbody>
                <Row />
                <Row />
                <Row />
                <Row />
            </tbody>
        </table>
    );
}
