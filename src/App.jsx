import "primereact/resources/themes/lara-light-blue/theme.css";

import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import ArtworkTable from "./components/ArtworkTable";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Art Institute Data Table</h2>
      <ArtworkTable />
    </div>
  );
}

export default App;