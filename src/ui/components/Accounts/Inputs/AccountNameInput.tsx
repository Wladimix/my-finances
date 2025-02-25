export default function AccountNameInput({ name }: IProps) {
    return(
        <input
            className='custom-input uk-input uk-text-large'
            value={name}
        />
    );
}

interface IProps {
    name: string
}
