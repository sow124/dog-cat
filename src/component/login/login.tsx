import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { authService } from "../../firebase/fbInstance";

function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onChange =(e:any) => {
    const { target: { name, value } } = e;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
}
const navigate = useNavigate();
  
  const subMit =(e:any)=>{
    e.preventDefault();
    let date;
      date = signInWithEmailAndPassword(authService, email, password);
      date.then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      })};
      const handleGoogleLogin=()=>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(authService, provider)
          .then((data:any) => {
            setUserData(data.user); 
            console.log(data);
            localStorage.setItem('login','true')
          })
          .catch((err) => {
            console.log(err);
          });
      }

  useEffect(() => {
        authService.onAuthStateChanged((user) => {
          if (user) {
            // 로그인 된 상태일 경우
            setIsLoggedIn(true);
            localStorage.setItem('login','true')
            navigate('/')
            window.location.reload();

          } else {
            // 로그아웃 된 상태일 경우
            setIsLoggedIn(false);
          }
        });
      }, []);
  return(
    <div className="joinBox">
      <h2 className="joinTitle">로그인</h2>
      <div className="joinForm idcontainer">
        <form onSubmit={subMit}>
          <div className="joinContainer">
            <label htmlFor="id" className="joinLabel">아이디</label>
            <input
              id="id"
              name="email"
              type="text"
              placeholder='Email'
              required
              value={email}
              onChange={onChange} />
          </div>
          <div className="joinContainer">
            <label htmlFor="pw" className="joinLabel">비밀번호</label>
            <input
              id="pw"
              name="password"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={onChange} />
          </div>
          <button className="goggleLogin" onClick={handleGoogleLogin}>구글로 로그인하기</button>
          <div className="submitCon">
            <input
                type="submit"
                value={"로그인"}
                className='submitBtn loginBtn' />
            <Link className="submitBtn" to={'/join'}>회원가입</Link>
          </div>
      </form>
    </div>
</div>
)
}
export default Login