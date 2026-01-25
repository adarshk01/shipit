import "./App.css";
import { Dashboard } from "./pages/Dashboard";
import { Landingpage } from "./pages/Landingpage";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

function Auth0ProviderWithNavigate({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  const onRedirectCallback = (appState?: { returnTo?: string }) => {
    navigate(appState?.returnTo || window.location.pathname, { replace: true });
  };
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: `${import.meta.env.VITE_AUTH0_API_AUDIENCE}`,
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="memory"
      useRefreshTokens={true}
    >
      {children}
    </Auth0Provider>
  );
}

function App() {
  return (
    <div className="h-screen bg-[#0e100f]">
      <BrowserRouter>
        <Auth0ProviderWithNavigate>
          <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Auth0ProviderWithNavigate>
      </BrowserRouter>
    </div>
  );
}

export default App;
