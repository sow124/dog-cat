import { getDocs,collection, where, query, doc, getDoc, deleteDoc, addDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import {authService, db} from "../../firebase/fbInstance"
import "./community.css"

function PostDetail(){
  const [content, setContents] = useState<any>([]);
const [comment, setComment] = useState('');
const [comments, setComments] = useState<any>([]);
const [editingComments, setEditingComments] = useState<any>([]);
const [editedComments, setEditedComments] = useState<any>({});
const { id } = useParams();
const navigate = useNavigate();
const currentUser: any = authService.currentUser;
useEffect(() => {
  const getContent = async () => {
    if (id) {
      const postDocRef = doc(db, 'post', id);
      const postDocSnap = await getDoc(postDocRef);
      if (postDocSnap.exists()) {
        setContents({ ...postDocSnap.data(), id: postDocSnap.id });
      } else {
      }
    }
  };
  getContent();
}, [id]);

const handleDelete = async () => {
  try {
    await deleteDoc(doc(db, 'post', content.id));
    navigate(-1);
  } catch (error) {
    console.error('Error deleting content:', error);
  }
};

const fetchComments = async () => {
  if (content && content.id) {
    const commentsRef = collection(db, 'comments');
    const querySnapshot = await getDocs(query(commentsRef, where('postId', '==', content.id)));
    const fetchedComments = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setComments(fetchedComments);
  }
};

useEffect(() => {
  fetchComments();
}, [content]);

const addComment = async (e: any) => {
  e.preventDefault();

  if (!comment) {
    return;
  }

  if (!currentUser) {
    alert("로그인 후에 댓글을 작성할 수 있습니다.");
    navigate("/login");
    return;
  }

  const newComment = {
    postId: content.id,
    userId: currentUser.uid,
    content: comment,
    userEmail: currentUser.email,
  };

  await addDoc(collection(db, 'comments'), newComment);
  setComment('');
  fetchComments();
};

const isCommentAuthor = (commentUserId: string) => {
  return currentUser && currentUser.uid === commentUserId;
};

const handleDeleteComment = async (comment: any) => {
  try {
    await deleteDoc(doc(db, 'comments', comment.id));
    fetchComments();
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
};

const handleEditComment = (comment: any) => {
  setEditingComments((prevEditingComments: any) => [
    ...prevEditingComments,
    comment.id,
  ]);
};

const handleSaveComment = async (comment: any) => {
  const editedContent = editedComments[comment.id] || comment.content;
  const updatedComment = { ...comment, content: editedContent };

  try {
    await updateDoc(doc(db, 'comments', comment.id), updatedComment);
    window.location.reload();
  } catch (error) {
  }

  setEditingComments((prevEditingComments: any) =>
    prevEditingComments.filter((id: any) => id !== comment.id)
  );
  setEditedComments((prevEditedComments: any) => {
    const updatedEditedComments = { ...prevEditedComments };
    delete updatedEditedComments[comment.id];
    return updatedEditedComments;
  });
};
const handleCommentInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>, comment: any) => {
  const updatedComment = { ...comment, content: e.target.value };
  setEditedComments((prevEditedComments: any) => ({
    ... prevEditedComments,
    [comment.id]: e.target.value,
    }))}
    return (
      <>
        <div className="ContentDetail">
          <h2 className="ContentDetailTitle">{content.title}</h2>
          {isCommentAuthor(content.userId) && (
            <div className="contentBTN">
              <Link to={`/content/${content.id}/edit`} state={{ content }} className='contentBtnLink'>
                <button className="contentEdit">수정</button>
              </Link>
              <button onClick={handleDelete}>삭제</button>
            </div>
          )}
          {content.file ? (
                <img src={content.file} alt={content.file} className="contentDetailImg"/>
              ) : (
                <img src="http://via.placeholder.com/300x300" alt="Placeholder"  className="contentDetailImg"/> // 대체 이미지 경로와 alt 텍스트를 수정해주세요.
              )}
          <p className="contentDetailP">{content.content}</p>
        </div>
  
  <form onSubmit={addComment} className='commentCon'>
    <label>댓글달기</label>
    <div className="addcommnet">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글달기"
        required
        className="commentText"
      ></textarea>
      <button type="submit" className="commentBtn">작성</button>
    </div>
  </form>
        <div>
          {comments.map((comment: any) => (
            <div key={comment.id} className='addcommentCon'>
              {editingComments.includes(comment.id) ? (
                <div className="commentDetail">
                  <textarea
                  className="editCommentTextA"
                    value={editedComments[comment.id] || comment.content}
                    onChange={(e) =>
                      setEditedComments((prevEditedComments: any) => ({
                        ...prevEditedComments,
                        [comment.id]: e.target.value,
                      }))
          
                    }
                  ></textarea>
                  <button onClick={() => handleSaveComment(comment)}>수정</button>
                </div>
              ) : (
                <div className="commentDetail">
                  <span className="commentEmail">{comment.userEmail}</span>
                  <p className="commentcontent">{comment.content}</p>
                </div>
              )}
              {isCommentAuthor(comment.userId) && (
                <div>
                  {editingComments.includes(comment.id) ? (
                    <button onClick={() => handleSaveComment(comment)}>저장</button>
                  ) : (
                    <button onClick={() => handleEditComment(comment)} className='editcomment'>수정</button>
                  )}
                  <button onClick={() => handleDeleteComment(comment)}>삭제</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </>
    );
  }
export default PostDetail
