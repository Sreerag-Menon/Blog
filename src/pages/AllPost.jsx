import React, { useEffect, useState } from "react";
import services from "../appwrite/db";
import { Container, PostCard } from "../components";

function AllPost() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    services.getPosts([]).then((post) => {
      if (post) {
        setPosts(post.documents);
      }
    });
  }, []);
  console.log(posts);
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
