import { Auth, useAuth } from "@arcana/auth-react";

export default function Home() {
  const auth = useAuth();
  return (
    <div>
      {auth.loading ? (
        "Loading"
      ) : auth.isLoggedIn ? (
        <p>Logged In</p>
      ) : (
        <div>
          <Auth
            externalWallet={true}
            theme={"light"}
            onLogin={() => alert("loggedin successfully")}
          />
        </div>
      )}
    </div>
  );
}
