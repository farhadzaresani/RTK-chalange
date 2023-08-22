import "./App.css";
import { useGetDummyListQuery } from "./services/dummyApi";

function App() {
  const { data, error, isLoading } = useGetDummyListQuery();

  console.log("data", data);

  return <div className="App"></div>;
}

export default App;
