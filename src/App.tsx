import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Logo } from "./components";

import { CreatePost, Home } from "./pages";

const App = () => {
  console.log(import.meta.env.VITE_API_URL);
  return (
    <BrowserRouter>
      <Toaster />
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-slate-200 fixed top-0 z-10">
        <Link to="/">
          <Logo />
        </Link>
        <Link
          to="/create"
          className="font-inter font-medium bg-emerald-400 hover:bg-emerald-500 text-white px-4 py-2 rounded-md"
        >
          Create
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full  min-h-[calc(100vh-73px)] mt-[73px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
