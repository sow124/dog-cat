import React, { useEffect, useState } from "react"
import './header.css'
import { Link, useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth";
import { authService } from "../../firebase/fbInstance";



function Header(){
  const [isLogined, setIsLogined] = useState(localStorage.getItem('login') === 'true');
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLogined(localStorage.getItem('login') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  const logout =()=>{
    authService.signOut()
    localStorage.setItem('login','false')
    window.location.reload();
  }
  
return(
  <header className="headerContainer">
  <ul className="headerCategory">
    <li className="CategoryList"><Link to={'/dog'}>유기견</Link></li>
    <li className="CategoryList"><Link to={'/cat'}>유기묘</Link></li>
    <li className="CategoryList"><Link to={'/community'}>커뮤니티</Link></li>
  </ul>
  <div className="join">
      {isLogined ? <button onClick={logout} className="logout">로그아웃</button> : <Link to={'/login'}>로그인</Link> }
  </div>
</header>
  )

}

export default Header

