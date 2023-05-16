import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { db } from "../../firebase/fbInstance";
import "./community.css"

function PostEdit(){
  const { id } = useParams();
  const location = useLocation();
  const { content } = location.state || {};
  const [newContent, setNewContent] = useState(content.content);
  const [newtitle, setNewtitle] = useState(content.title);
  const [newfile , setNewFile] = useState(content.file)

  const navigate = useNavigate();
console.log(content)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value } = e.target;
    setNewContent(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updateRef = doc(db, "post", content.id);
    updateDoc(updateRef, {
      title:newtitle,
      content: newContent,
      file: newfile
  });
  navigate(-2)
  };

  const onCancel = () => {
    navigate(-2)
  };

  const onChangeTitle=(e: React.ChangeEvent<HTMLInputElement>) => {
    const {value } = e.target;
    setNewtitle(value);
  }

  const onChangeFile=(e: { target: { value: any; }; })=>{
    const {value} =e.target;
    setNewFile(value);
  }
  return (
    <>
      <form onSubmit={onSubmit} className='addpostCon'>
        <div className="addpostinputCon">
          <label id="title" className="addpostLabel" >제목</label>
          <input id="title" type="text" className='addTitle' value={newtitle} onChange={onChangeTitle} required/>
        </div>
        <div className="addpostinputCon">
          <label id="content" className="addpostLabel" >내용</label>
          <input
            id="content"
            onChange={onChange}
            type="text"
            placeholder="텍스트 수정"
            value={newContent}
            required
            className='contentText'
          />
        </div>
        <div className="addpostinputCon">
          <label className="addpostLabel">
            첨부파일:
          </label>
          <input type="file" onChange={onChangeFile} />
        </div>
        <div className="editSubmit">
          <input type="submit" className="editSubmitbtn" value="수정" />
          <button className="editSubmitbtn" onClick={onCancel}>취소</button>
        </div>
      </form>
    </>
  );
}
export default PostEdit