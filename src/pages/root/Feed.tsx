import Post from "../../components/Post";
import postImage from "../../../public/assets/post-img.jpg";
import johnSmith from "../../../public/assets/john-smith.jpg";
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
