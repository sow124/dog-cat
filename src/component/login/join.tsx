import React, { useState } from "react";
import {
  createUserWithEmailAndPassword
} from "firebase/auth";
import { authService , db } from "../../firebase/fbInstance";
import { initializeApp } from "firebase/app";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import './join.css'
import { useNavigate } from "react-router";


const Join = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkpassword,setCheckpw] = useState('');
  const navigate = useNavigate();

  const onChange =(e:any) => {
      const { target: { name, value } } = e;
      if (name === "email") setEmail(value);
      else if (name === "password") setPassword(value);
  }

  const emailCheck =async ()=>{
    const querySnapshot = await getDocs(collection(db, "user"));
    querySnapshot.forEach((doc) => {
    if(email === doc.data().email){
        alert('이미있는 email입니다.')
    }else(
      alert('사용가능한 email입니다.')
    )
});
  }
  const pwcheck =(e:any) =>{
    const { target: { value } } = e;
    setCheckpw(value)
  }
  const onSubmit = async (e:any) => {
      e.preventDefault();
      let data ;
      try {
          data = await createUserWithEmailAndPassword(authService, email, password);
          await setDoc(doc(db, "user", email), {
            email: email,
            pw: password
          })
          localStorage.setItem('login','true');
          navigate(-1);
      } catch (error:any) {
        if(error.message == 'Firebase: Error (auth/invalid-email).'){
            alert('아이디를 이메일 형식으로 입력해주세요')
        }
        localStorage.setItem('login','false');
      }
      if(password !==checkpassword){
        alert('비밀번호가일치하지않습니다.');
      }
  }
  localStorage.setItem('login','false')
        return (
          <div className="joinBox">
            <h2 className="joinTitle">회원가입</h2>
            <div className="joinForm idcontainer">
              <form onSubmit={onSubmit}>
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
                <div className="joinContainer">
                  <label htmlFor="checkpw" className="joinLabel">비밀번호확인</label>
                  <input name="password"
                      id="checkpw"
                      type="password"
                      value={checkpassword}
                      onChange={pwcheck}
                      placeholder="checkPassword"/>
                </div>
                <input
                      type="submit"
                      value={"회원가입"}
                      className='submitBtn'
                    />
              </form>
              <div>
                <button onClick={emailCheck} className='checkid'>중복확인</button>
              </div>
              </div>
          </div>
      )
    }
export default Join;