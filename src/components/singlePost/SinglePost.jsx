import { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { getInterviewPosts, updateInterviewPost } from "../../api/get_post";
import "./singlePost.css";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [question, setQuestion] = useState([]);
  const [tipss, setTips] = useState([]);

  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const posts = await getInterviewPosts();
      console.log(posts)
      console.log(path)
      const foundPost = posts.find((post) => post._id === path);
      console.log(foundPost)
      if (foundPost) {
        setPost(foundPost);
        setTitle(foundPost.title);
        setDesc(foundPost.experience);
        setQuestion(foundPost.questions ? foundPost.questions.split('.').map(q => q.trim()).filter(q => q) : []);
        setTips(foundPost.tips.split('.').map(t => t.trim()).filter(t => t));
      }
    };

    getPost();
  }, [path]);

  const handleUpdate = async () => {
    try {
      const updatedPost = {
        title,
        experience: desc,
        questions: question.join('. '),
        tips: tipss.join('. ')
      };

      await updateInterviewPost(post.id, updatedPost);
      setPost((prevPost) => ({
        ...prevPost,
        title,
        experience: desc,
        questions: updatedPost.questions,
        tips: updatedPost.tips
      }));
      setUpdateMode(false); // Exit update mode
    } catch (err) {
      console.error("Failed to update the post:", err);
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/home?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <div>
            <div className="singlePostDesc">
              <h2>My Experience</h2>
              <p>{desc}</p>
            </div>
            <div className="singlePostquestion">
              <h2>Asked Questions</h2>
              <ul>
                {question.map((q, index) => (
                  <li key={index}>{q}</li>
                ))}
              </ul>
            </div>
            <div className="singlePosttips">
              <h2>Preparation Tips</h2>
              <ul>
                {tipss.map((t, index) => (
                  <li key={index}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
