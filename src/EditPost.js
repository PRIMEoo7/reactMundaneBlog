import React, { useActionState, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useStoreActions, useStoreState } from "easy-peasy";

const EditPost = () => {
  const editTitle = useStoreState((state) => state.editTitle);
  const editBody = useStoreState((state) => state.editBody);

  const editPost = useStoreActions((actions) => actions.editPost);
  const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
  const setEditBody = useStoreActions((actions) => actions.setEditBody);

  const getPostById = useStoreState((state) => state.getPostById);
  const { id } = useParams();
  const post = getPostById(id);

  const history = useNavigate();
  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  const handleEdit = async (e) => {
    e.preventDefault();
    const datetime = format(new Date(), "MMMM dd, yyyy ");
    const updatedPost = {
      id,
      title: editTitle,
      datetime: datetime,
      body: editBody,
    };
    console.log(updatedPost);
    editPost(updatedPost);
    history(`/post/${id}`);
  };

  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form className="newPostForm" onSubmit={handleEdit}>
            <label htmlFor="editTitle">Title:</label>
            <input
              id="editTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="editBody">Body:</label>
            <textarea
              id="editBody"
              type="text"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post Not Found</h2>
          <p> well thats disappointing</p>
          <p>
            <Link to="/">Visit Our HomePage</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
