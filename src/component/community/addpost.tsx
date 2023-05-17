import { collection, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router";
import { authService , db } from "../../firebase/fbInstance";
import "./community.css";

function Addpost(){
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file , setFile] = useState(null)
  const navigate = useNavigate();

  function handleFileChange(event:any) {
    setFile(event.target.files[0]);
  }
  async function handleSubmit(e:any) {
    const currentUser : any = authService.currentUser;
    e.preventDefault();
    try{
      const docRef = doc(collection(db, "post"));
      await setDoc(docRef, {
        title: title,
        content: content,
        file: file,
        createdAt: serverTimestamp(),
        userId: currentUser.uid,
      });
      navigate(-1);
    } catch(error:any) {
      alert("글 작성 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit} className='addpostCon'>
        <div className="addpostinputCon">
          <label className="addpostLabel">
            제목:
          </label>
          <input type="text" value={title} className='addTitle' onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="addpostinputCon">
          <label className="addpostLabel">
            내용:
          </label>
          <textarea value={content} onChange={e => setContent(e.target.value)} className='contentText' />
        </div>
        <div className="addpostinputCon">
          <label className="addpostLabel">
            첨부파일:
          </label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit" className="addSubmit">작성 완료</button>
      </form>
    </>
  );
}

export default Addpost;
