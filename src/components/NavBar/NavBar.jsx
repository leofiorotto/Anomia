import classes from './NavBar.css'
import "./NavBar.css";
import logo from '../../assets/fiorosea.png'
import { NavLink, useNavigate } from 'react-router-dom'


const NavBar = () => {
    const navigate = useNavigate()
    return (
        <nav>
            <img src={logo} className='logo' alt="logo" onClick={() => navigate('/Anomia')} />
            <div className='container-nav'>
                <NavLink to={`/Anomia/detail/1`} className={({ isActive }) => isActive ? classes.active : classes.inactive }>Elegi personaje</NavLink>
                <NavLink to='/Anomia/detail/2' className={({ isActive }) => isActive ? classes.active : classes.inactive }>Empareja sonido</NavLink>
                <NavLink to='/Anomia/detail/3' className={({ isActive }) => isActive ? classes.active : classes.inactive }>Emparejar palabra</NavLink>
                <NavLink to='/Anomia/detail/4' className={({ isActive }) => isActive ? classes.active : classes.inactive }>Uno sobra</NavLink>
                <NavLink to='/Anomia/detail/5' className={({ isActive }) => isActive ? classes.active : classes.inactive }>Palabra aislada</NavLink>

           
            </div>
        </nav>
    )
}

export default NavBar 