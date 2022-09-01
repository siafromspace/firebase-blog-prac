import "./styles.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { db, auth } from "./firebase-config";
import { getDocs, collection} from "firebase/firestore";

export default function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [postList, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };
  
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, [postList]);

  
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        {!isAuth ? (
          <Link to="/login">Log In</Link>
        ) : (
          <>
            <Link to="/create">Create Post</Link>
            <button onClick={signUserOut}>Log Out</button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} postList={postList} />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/post/:id" element={<Post postList={postList}/>} />
      </Routes>
    </Router>
  );
}
