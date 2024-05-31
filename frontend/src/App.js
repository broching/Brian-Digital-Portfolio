import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import theme from "./Styles/Theme";
import { ThemeProvider } from "@emotion/react";
import { UserProvider } from "./Context/useAuth";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <ThemeProvider
          theme={theme}
        >
          <NavBar />
          <div
            style={{ height: "5vh" }}
          />
          <Outlet />
          <Footer />
          <ToastContainer />
        </ThemeProvider>
      </UserProvider>
    </div>
  );
}

export default App;
