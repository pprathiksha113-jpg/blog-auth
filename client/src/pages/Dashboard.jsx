import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const load = async () => {
    const res = await api.get("/blogs/my");
    setBlogs(res.data);
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await api.post("/blogs", { title, content });
    setTitle("");
    setContent("");
    load();
  };

  const handleDelete = async (id) => {
    await api.delete(`/blogs/${id}`);
    load();
  };

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <form onSubmit={handleCreate} style={{ display: "grid", gap: 8, marginBottom: 20 }}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
        <button type="submit">Add Blog</button>
      </form>
      <h3>My Blogs</h3>
      {blogs.length === 0 && <p>No blogs yet.</p>}
      {blogs.map((b) => (
        <div key={b._id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <h4>{b.title}</h4>
          <p>{b.content}</p>
          <button onClick={() => handleDelete(b._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
