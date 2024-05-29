import NavigationStep from "./NavigationStep";
import ProfileStep from "./ProfileStep";
import InformationStep from "./InformationStep";
import Preview from "./Preview";
import useFormContext from "../context/useFormContext";

function StepForm() {
  const { currentStep } = useFormContext();
  return (
    <div className="bg">
      <div className="flex flex-row"></div>
      <NavigationStep />
      {currentStep === 1 && <ProfileStep />}
      {currentStep === 2 && <InformationStep />}
      {currentStep === 3 && <Preview />}
    </div>
  );
}

export default StepForm;
