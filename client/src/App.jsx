import { useEffect } from "react";
import api from "./services/api";

function App() {
  useEffect(() => {
    async function checkHealth() {
      try {
    console.log("Step 1");

    const response = await api.get("/health");

    console.log("Step 2");
}
catch(error) {
    console.log("Step 3");
}
    }

    checkHealth();
  }, []);

  return (
    <div>
      <h1>EduNexus</h1>
    </div>
  );
}

export default App;
