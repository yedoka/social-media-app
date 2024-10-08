import Post from "../components/Post";
import pfp from "../assets/pfp.png";
import "../styles/globals.scss";

const Feed = () => {
  return (
    <div id="feed">
      <Post
        profileImg={pfp}
        name={"John Smith"}
        postImg={pfp}
        caption={"some description"}
      />
    </div>
  );
};

export default Feed;
