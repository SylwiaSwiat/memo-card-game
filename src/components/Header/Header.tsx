import './Header.scss';
type HeaderProps = {
    header: string;
}

const Header = ({header}: HeaderProps) => {
    return ( 
        <h1 className='main'>{header}</h1>
     );
}
 
export default Header;