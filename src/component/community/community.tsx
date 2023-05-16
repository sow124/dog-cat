import { getDocs , collection, doc, query, onSnapshot  } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {authService, db} from "../../firebase/fbInstance"
import Search from "./search";
import "./community.css"

function Community(){
  const [viewContent, setViewContents] = useState<any>([]);
  const [isLogined, setIsLogined] = useState(localStorage.getItem('login') === 'true');

useEffect(()=>{
	const getContents = async () => {
		const data = await getDocs(collection(db,"post"));
		setViewContents(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
	};
	getContents()
},[])
useEffect(() => {
  authService.onAuthStateChanged((user) => {
    console.log(user);
    if (user) {
      // 로그인 된 상태일 경우
      setIsLogined(true);
    } else {
      // 로그아웃 된 상태일 경우
      setIsLogined(false);
    }
  });
}, []);
  const handlePost =()=>{
    if(!isLogined){
      alert('로그인 후 이용 가능합니다.')
    }
  }
  return(
		<div className="communityCon">
      <Search/>
      <Link to={isLogined ? '/post' : '/'} onClick={handlePost} className='addpost'>글작성하러가기</Link>
      <div>
        {viewContent.map((content: any, index: any) => (
          <Link to={`/content/${content.id}`} key={index} className='contentLink'>
            <div className="contentCon">
            {content.file ? (
                <img src={content.file} alt={content.file} className="contentImg"/>
              ) : (
                <img src="http://via.placeholder.com/150x150" alt="Placeholder"  className="contentImg"/> // 대체 이미지 경로와 alt 텍스트를 수정해주세요.
              )}
              <div className="communitycontent">
                <h2>{content.title}</h2>
                <p>{content.content}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
export default Community