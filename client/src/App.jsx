import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";

const App = () => {
  return (
    <main className="sm:p-8 px-4 py-8 bg-[#f9fafe] min-h-screen">
      <nav className="flex justify-between items-center mb-8">
        <Link to="/" className="font-bold text-xl text-[#6469ff]">
          AI Image Generator
        </Link>
        <Link
          to="/create-post"
          className="font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
        >
          Create
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </main>
  );
};

export default App;
