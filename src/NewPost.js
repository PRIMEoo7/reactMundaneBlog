import React from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";

const NewPost = () => {
  const history = useNavigate();
  const posts = useStoreState((state) => state.posts);
  const postTitle = useStoreState((state) => state.postTitle);
  const postBody = useStoreState((state) => state.postBody);

  const savePost = useStoreActions((actions) => actions.savePost);
  const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
  const setPostBody = useStoreActions((actions) => actions.setPostBody);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? Math.max(...posts.map((post) => post.id)) + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy ");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    savePost(newPost);
    history("/");
  };
  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Body:</label>
        <textarea
          id="postBody"
          type="text"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
