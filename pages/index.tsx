import { Auth, useAuth } from "@arcana/auth-react";
import { ChakraProvider } from "@chakra-ui/react";

export default function Home() {
  const auth = useAuth();
  return (
    <ChakraProvider>
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
    </ChakraProvider>
  );
}
