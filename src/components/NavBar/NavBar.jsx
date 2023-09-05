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
                <NavLink to='/Anomia/category/Tower' className={({ isActive }) => isActive ? classes.active : classes.inactive }>Elegi personaje</NavLink>
                <NavLink to='/Anomia/category/Mirascape' className={({ isActive }) => isActive ? classes.active : classes.inactive }>Empareja sonido</NavLink>
                <NavLink to='/Anomia/category/DeGod' className={({ isActive }) => isActive ? classes.active : classes.inactive }>Emparejar palabra</NavLink>
                <NavLink to='/Anomia/category/DeGod' className={({ isActive }) => isActive ? classes.active : classes.inactive }>Uno sobra</NavLink>
                <NavLink to='/Anomia/category/DeGod' className={({ isActive }) => isActive ? classes.active : classes.inactive }>Palabra aislada</NavLink>

           
            </div>
        </nav>
    )
}

export default NavBar 