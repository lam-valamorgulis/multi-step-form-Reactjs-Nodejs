import useForm from "../context/useFormContext";

function ButtonControler() {
  const { currentStep, dispatch, trigger, formState } = useForm();
  const { errors } = formState;
  const handleClick = () => {
    trigger("username");
    console.log(errors);
    dispatch({ type: "NEXT_STEP" });
  };

  return (
    <div className="mt-6 flex items-center justify-end gap-x-6">
      {currentStep > 0 && (
        <button
          onClick={() => dispatch({ type: "PREVIOUS_STEP" })}
          type="button"
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Previous
        </button>
      )}

      <button
        // onClick={() => dispatch({ type: "NEXT_STEP" })}
        onClick={handleClick}
        type="button"
        className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Next
      </button>
      <button
        type="submit"
        className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Finish
      </button>
    </div>
  );
}

export default ButtonControler;
