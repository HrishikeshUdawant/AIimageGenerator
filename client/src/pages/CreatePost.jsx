import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (!form.prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImg(true);

      const response = await fetch(`${API_URL}/dalle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: form.prompt }),
      });

      const data = await response.json();

      if (!data.photo) {
        alert("Image generation failed");
        return;
      }

      setForm({
        ...form,
        photo: `data:image/jpeg;base64,${data.photo}`,
      });
    } catch (error) {
      console.error(error);
      alert("Image generation failed");
    } finally {
      setGeneratingImg(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.prompt || !form.photo) {
      return alert("Generate image first");
    }

    try {
      setLoading(true);

      await fetch(`${API_URL}/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Post failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Create Image</h1>

      <form onSubmit={handleSubmit} className="mt-10 max-w-3xl">
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            name="prompt"
            type="text"
            placeholder="A futuristic city..."
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative w-64 h-64 border rounded-lg flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 bg-black/50 flex justify-center items-center">
                <Loader />
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={generateImage}
            className="bg-green-600 text-white py-2 rounded"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>

          <button
            type="submit"
            className="bg-[#6469ff] text-white py-2 rounded"
          >
            {loading ? "Sharing..." : "Share"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
