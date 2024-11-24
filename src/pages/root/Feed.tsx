import Post from "../../components/Post";
import postImage from "../../assets/post-img.jpg"
import johnSmith from "../../assets/john-smith.jpg";
import "../../styles/globals.scss";

const Feed = () => {
  return (
    <div id="feed">
      <Post
        profileImg={johnSmith}
        name={"John Smith"}
        postImg={postImage}
        caption={"Photo from my latest trip!"}
      />
    </div>
  );
};

export default Feed;
