import { Dashboard } from "./pages/Dashboard";
import { Landingpage } from "./pages/Landingpage";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { AuthInitializer } from "./components/AuthInitializer";
import { Import } from "./components/Import";

function Auth0ProviderWithNavigate({ children }: { children: React.ReactNode }) {
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
        scope: "openid profile email offline_access",
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
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
          <AuthInitializer />
          <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/import" element={<Import />} />
          </Routes>
        </Auth0ProviderWithNavigate>
      </BrowserRouter>
    </div>
  );
}

export default App;
