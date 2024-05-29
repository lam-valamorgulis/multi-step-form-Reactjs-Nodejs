import "./App.css";
import { FormContextProvider } from "./context/FormContext";
import StepForm from "./components/StepForm";

function App() {
  return (
    <FormContextProvider>
      <StepForm />
    </FormContextProvider>
  );
}

export default App;
