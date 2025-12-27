import React, { useEffect, useState } from "react";
import { Card, FormField, Loader } from "../components";

const API_URL = "http://localhost:8080/api/v1";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch(`${API_URL}/post`);
      const data = await res.json();
      setPosts(data.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    (p) =>
      p.name.toLowerCase().includes(searchText.toLowerCase()) ||
      p.prompt.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto">
      <FormField
        labelName="Search"
        type="text"
        name="search"
        placeholder="Search..."
        value={searchText}
        handleChange={(e) => setSearchText(e.target.value)}
      />

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {filteredPosts.map((post) => (
            <Card key={post._id} {...post} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;
