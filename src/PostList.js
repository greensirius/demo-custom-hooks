const PostList = ({ data }) => {
  if (!data) return null;
  if (!data.length) return <p>No data</p>;
  return (
    <ul>
      {data.map((item) => {
        return <li key={item.id}>{`${item.id} | ${item.title}`}</li>;
      })}
    </ul>
  );
};

export default PostList;
