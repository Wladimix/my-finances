export default function Pagination() {
    return(
        <nav>
            <ul className='uk-pagination uk-flex-center'>
                <li><a href='#'><span data-uk-pagination-previous></span></a></li>
                <li><a href='#'>1</a></li>
                <li className='uk-disabled'><span>…</span></li>
                <li><a href='#'>4</a></li>
                <li><a href='#'>5</a></li>
                <li><a href='#'>6</a></li>
                <li className='uk-active'><span aria-current='page'>7</span></li>
                <li><a href='#'>8</a></li>
                <li><a href='#'>9</a></li>
                <li><a href='#'>10</a></li>
                <li className='uk-disabled'><span>…</span></li>
                <li><a href='#'>20</a></li>
                <li><a href='#'><span data-uk-pagination-next></span></a></li>
            </ul>
        </nav>
    );
}
