import monster from '../../img/logo.jpeg';
import './main.css';


function Header() {

  return (
    <>
      <nav className="navbar">
        <div className='container'>
          <div className="logo d-flex align-items-center m-auto">
            <a href="/"><img src={monster} alt="Logo" /></a>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header;
