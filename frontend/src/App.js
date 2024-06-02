import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import theme from "./Styles/Theme";
import { ThemeProvider } from "@emotion/react";
import { UserProvider } from "./Context/useAuth";
import { ScrollRestoration } from "react-router-dom";

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
      className="App"
    >
      <UserProvider>
        <ThemeProvider
          theme={theme}
        >
          <NavBar />
          <div
            style={{
              height: "70px"
            }}
          />
          <Outlet />
          <Footer />
          <ToastContainer />
          <ScrollRestoration />
        </ThemeProvider>
      </UserProvider>
    </div>
  );
}

export default App;
