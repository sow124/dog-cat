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

  const emailCheck = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('이메일 형식으로 입력해주세요.');
    return;
  }

  const querySnapshot = await getDocs(collection(db, "user"));
  const existingEmails = querySnapshot.docs.map((doc) => doc.data().email);

  if (existingEmails.includes(email)) {
    alert('이미 있는 email입니다.');
  } else {
    alert('사용 가능한 email입니다.');
  }
  };
  const pwcheck =(e:any) =>{
    const { target: { value } } = e;
    setCheckpw(value)
  }
  const onSubmit = async (e: any) => {
    e.preventDefault();
  
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('이메일 형식으로 입력해주세요.');
      return;
    }
  
    const querySnapshot = await getDocs(collection(db, "user"));
    let isEmailDuplicate = false;
  
    querySnapshot.forEach((doc) => {
      if (email === doc.data().email) {
        isEmailDuplicate = true;
        alert('이미 있는 아이디입니다.');
      }
    });
  
    if (isEmailDuplicate) {
      return; 
    }
    let data;
  
    try {
      data = await createUserWithEmailAndPassword(authService, email, password);
      await setDoc(doc(db, "user", email), {
        email: email,
        pw: password
      });
      navigate('/login');
    } catch (error: any) {
      if (error.message === 'Firebase: Error (auth/invalid-email).') {
        alert('아이디를 이메일 형식으로 입력해주세요.');
      }
      localStorage.setItem('login', 'false');
    }
  
    if (password !== checkpassword) {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };
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
                      className='joinsubmitBtn'
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