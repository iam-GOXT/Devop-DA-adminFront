import { QueryClientProvider, QueryClient } from "react-query";
import APP_ROUTES from "./routes";
import UserDetailsProvider from "./context/user";

import "./styles/bootstrap.css";
import "./styles/main.css";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserDetailsProvider>
        <APP_ROUTES />
      </UserDetailsProvider>
    </QueryClientProvider>
  );
}

export default App;
