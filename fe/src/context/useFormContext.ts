import { useContext } from "react";
import { FormContext, FormContextType } from "./FormContext";

function useFormContext(): FormContextType {
  const context = useContext(FormContext);
  if (context === undefined)
    throw new Error("FormContext was used outside of the FormContextProvider");
  return context as FormContextType;
}

export default useFormContext;
