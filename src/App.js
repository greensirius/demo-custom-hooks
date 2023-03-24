import { useEffect, useState } from "react";

import useFetcher from "./useFetcher";
import PostList from "./PostList";
import WithLoading from "./WithLoading";
import "./styles.css";

const PostListWithLoading = WithLoading(PostList);
export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const { isLoading, error, data } = useFetcher(
    `https://jsonplaceholder.typicode.com/posts?_start=${currentPage}&_limit=10`
  );

  useEffect(() => {
    console.log("FETCHER: ", { isLoading, error, data });
  }, [isLoading, error, data]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <PostListWithLoading isLoading={isLoading} data={data} />
    </div>
  );
}
