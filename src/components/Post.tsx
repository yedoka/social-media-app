import "./post.scss"
import type { Post } from "../types/Post";

interface Props {
  post: Post;
}

const Post = ({post}: Props) => {
  return (
    <section className="post">
      <div className="profile">
        <img src={post.profileImg} alt="profileImage" className="profile__img" />
        <h1 className="name">{post.name}</h1>
      </div>
      <img src={post.postImg} alt="#" className="post__img" />
      <p className="caption">{post.caption}</p>
    </section>
  );
};

export default Post;
