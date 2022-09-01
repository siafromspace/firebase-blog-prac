import {deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import {Link} from "react-router-dom"

const Home = ({isAuth, postList}) => {

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };

  return (
    <div className="homePage">
      {postList ? postList.map((post) => {
        return (
          <div key={post.id} className="post">
            <div className="postHeader">
              <div className="title">
                <Link to={`post/${post.id}`}>{post.title}</Link>
              </div>
              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && <button
                  onClick={() => {
                    deletePost(post.id);
                  }}
                >
                  &#128465;
                </button>}
              </div>
            </div>
            <h3>@{post.author.name}</h3>
          </div>
        )
      }) : <h1>No Posts Available</h1>}
    </div>
  );
};

export default Home;
