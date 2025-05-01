import React from "react";
import { Link, useParams } from "react-router-dom";
import EditPost from "./EditPost";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useNavigate } from "react-router-dom";

const PostPage = () => {
  const history = useNavigate();
  const { id } = useParams();
  const deletePost = useStoreActions((actions) => actions.deletePost);
  const getPostById = useStoreState((state) => state.getPostById);
  const post = getPostById(id);

  const handleDelete = async (id) => {
    deletePost(id);
    history("/");
  };
  return (
    <main className="PostPage">
      <article>
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <button className="Delete" onClick={() => handleDelete(post.id)}>
              Delete
            </button>
            <span> </span>
            <Link to={`/edit/${id}`}>
              <button className="Edit">Edit</button>
            </Link>
          </>
        )}
        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p> well thats disappointing</p>
            <p>
              <Link to="/">Visit Our HomePage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
