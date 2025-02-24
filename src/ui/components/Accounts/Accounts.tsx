import AccountCard from './AccountCard';
import Heading from './Heading';

export default function Accounts() {
    return(
        <>
            <Heading />

            <div className='uk-grid-column-small uk-grid-row-small uk-child-width-1-3@s' data-uk-grid>
                <div>
                    <AccountCard />
                </div>
                <div>
                    <AccountCard />
                </div>
                <div>
                    <AccountCard />
                </div>
                <div>
                    <AccountCard />
                </div>
                <div>
                    <AccountCard />
                </div>
            </div>
        </>
    );
}
