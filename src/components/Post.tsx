import "./post.scss";
import type { Post } from "../types/Post";

const Post = ({ profileImg, name, postImg, caption }: Post) => {
  return (
    <section className="post">
      <div className="profile">
        <img src={profileImg} alt="profileImage" className="profile__img" />
        <h1 className="profile__name">{name}</h1>
      </div>
      <img src={postImg} alt="#" className="post__img" />
      <p className="caption">{caption}</p>
    </section>

  );
};

export default Post;
