import "./post.scss";

interface Post {
  profileImg: string;
  name: string;
  postImg: string;
  caption: string;
}

const Post = ({ profileImg, name, postImg, caption }: Post) => {
  return (
    <section className="post">
      <div className="profile">
        <img src={profileImg} alt="profileImage" className="profile__img" />
        <h1 className="name">{name}</h1>
      </div>
      <img src={postImg} alt="#" className="post__img" />
      <p className="caption">{caption}</p>
    </section>
  );
};

export default Post;
