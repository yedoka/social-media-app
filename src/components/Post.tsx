import "../styles/post.scss";

interface PostProps {
  profileImg: string;
  name: string;
  postImg: string;
  description: string;
}

const Post = ({ profileImg, name, postImg, description }: PostProps) => {
  return (
    <>
      <section className="post">
        <div className="profile">
          <img src={profileImg} alt="profileImage" className="profile__img" />
          <h1 className="name">{name}</h1>
        </div>
        <img src={postImg} alt="#" className="post__img" />
        <p className="description">{description}</p>
      </section>
    </>
  );
};

export default Post;
