import React, { createContext, useReducer } from "react";

export interface Step {
  id: string;
  name: string;
  status: string;
  has_complete: boolean;
}

type ACTIONTYPE = {
  type:
    | "PREVIOUS_STEP"
    | "NEXT_STEP"
    | "RESET_STEP"
    | "UPDATE_PROFILE_FORM_STATE"
    | "UPDATE_INFORMATION_FORM_STATE"
    | "CHANGE_STEP";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
};

export interface FormContextType {
  steps: Step[];
  currentStep: number;
  dispatch: React.Dispatch<ACTIONTYPE>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formStateValue: any;
}

const initialState = {
  steps: [
    { id: "01", name: "Profile", status: "current", has_complete: false },
    {
      id: "02",
      name: "Personal Information",
      status: "upcoming",
      has_complete: false,
    },
    { id: "03", name: "Preview", status: "upcoming", has_complete: false },
  ],
  currentStep: 1,
  formStateValue: {
    profile: {
      userName: "",
      description: "",
      img_upload: "",
    },
    information: {
      firstName: "",
      lastName: "",
      userPhone: "",
      email: "",
      streetAddress: "",
      comments: "",
      candidates: "",
      offers: "",
      pushEverything: "",
      pushEmail: "",
      pushNothing: "",
    },
  },
};
function updateStepStatus(steps: Step[], stepSelected: Step) {
  return steps.map((step) => {
    if (step.id === stepSelected.id) {
      return {
        ...step,
        status: "current",
      };
    }
    if (!step.has_complete) {
      return {
        ...step,
        status: "upcoming",
      };
    }
    return { ...step, status: "complete" };
  });
}

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case "NEXT_STEP":
      return {
        ...state,
        currentStep: state.currentStep + 1, // 2
        steps: state.steps.map((step) => {
          if (parseFloat(step.id) === state.currentStep + 1) {
            // console.log(state.currentStep); // 1
            return {
              ...step,
              status: "current",
            };
          }
          return step;
        }),
      };
    case "PREVIOUS_STEP":
      return {
        ...state,
        currentStep: state.currentStep - 1,
        steps: state.steps.map((step) => {
          const stepId = parseFloat(step.id);
          if (stepId === state.currentStep - 1) {
            return {
              ...step,
              status: "current",
            };
          } else if (stepId === state.currentStep) {
            return {
              ...step,
              status: "upcoming",
            };
          }
          return step;
        }),
      };

    case "CHANGE_STEP":
      return {
        ...state,
        currentStep: +action.payload?.id,
        steps: updateStepStatus(state.steps, action.payload),
      };

    case "UPDATE_PROFILE_FORM_STATE":
      return {
        ...state,
        steps: state.steps.map((step) => {
          if (step.id === "01") {
            return {
              ...step,
              status: "complete",
              has_complete: true,
            };
          }
          return step;
        }),
        formStateValue: {
          ...state.formStateValue,
          profile: {
            ...state.formStateValue.profile,
            userName: action.payload.userName,
            description: action.payload.description,
            img_upload: action.payload.img_upload,
          },
        },
      };
    case "UPDATE_INFORMATION_FORM_STATE":
      return {
        ...state,
        steps: state.steps.map((step) => {
          if (step.id === "02") {
            return {
              ...step,
              status: "complete",
              has_complete: true,
            };
          }
          return step;
        }),
        formStateValue: {
          ...state.formStateValue,
          information: {
            ...state.formStateValue.information,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            userPhone: action.payload.userPhone,
            email: action.payload.email,
            streetAddress: action.payload.streetAddress,
            comments: action.payload.comments,
            candidates: action.payload.candidates,
            offers: action.payload.offers,
            pushEverything: action.payload.pushEverything,
            pushEmail: action.payload.pushEmail,
          },
        },
      };
    default:
      return state;
  }
}

const FormContext = createContext<FormContextType | null>(null);

function FormContextProvider({ children }: { children: React.ReactNode }) {
  const [{ steps, currentStep, formStateValue }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <FormContext.Provider
      value={{
        steps,
        currentStep,
        formStateValue,
        dispatch,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export { FormContextProvider, FormContext };
