import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "../ui/features/home/HomePage.tsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
