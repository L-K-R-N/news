import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { NewsPage } from "./pages/NewsPage/NewsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/news" element={<HomePage />} />
      <Route path="/news/item/:id" element={<NewsPage />} />
    </Routes>
  );
}

export default App;
