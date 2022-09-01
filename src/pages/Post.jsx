import {useParams} from "react-router-dom"

const Post = ({postList}) => {
    const {id} = useParams()
    const post = postList.filter(post => post.id === id)
    return (
        <div className="singlePost">
            <h1>{post[0].title}</h1>
            <h3>Written by {post[0].author.name} </h3>
            <p>{post[0].postText}</p>
        </div>
    )
}

export default Post