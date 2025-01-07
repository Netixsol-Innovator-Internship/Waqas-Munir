import Post from "./Post";

const PostList = ({ posts }) => {
  return posts.map((post) => <Post post={post} key={post?._id} />);
};

export default PostList;
