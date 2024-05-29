import useFormContext from "../context/useFormContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm, Controller } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { useState } from "react";

type InformationFormValues = {
  firstName: string;
  lastName: string;
  userPhone: string;
  email: string;
  streetAddress: string;
  comments: string;
  candidates: string;
  offers: string;
  pushEverything: string;
  pushEmail: string;
  pushNothing: string;
};

function InformationStep() {
  const [errPhones, setErrPhones] = useState<string>();
  const { dispatch, formStateValue } = useFormContext();
  const { information } = formStateValue;
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InformationFormValues>({
    defaultValues: information,
  });

  const onSubmit = handleSubmit((data) => {
    if (!data.userPhone) {
      setErrPhones("Phone number is required");
    } else if (!/^84\d{9}$/.test(data.userPhone)) {
      setErrPhones("Invalid phone number");
    } else {
      setErrPhones(undefined);
      dispatch({ type: "UPDATE_INFORMATION_FORM_STATE", payload: data });
      dispatch({ type: "NEXT_STEP" });
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-12 sm:space-y-16 mt-10">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                First name
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  id="firstName"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  {...register("firstName", {
                    required: "This field is required",
                    minLength: {
                      value: 3,
                      message: "Min 6 character required",
                    },
                    pattern: {
                      value: /^[a-zA-Z][a-zA-Z]*$/,
                      message: "Only alphabet charater",
                    },
                  })}
                />
                <div className="mt-4 sm:max-w-xs">
                  <ErrorMessage>{errors.firstName?.message}</ErrorMessage>
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Last name
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  id="lastName"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  {...register("lastName", {
                    required: "This field is required",
                    minLength: {
                      value: 3,
                      message: "Min 6 character required",
                    },
                    pattern: {
                      value: /^[a-zA-Z][a-zA-Z]*$/,
                      message: "Only alphabet charater",
                    },
                  })}
                />
                <div className="mt-4 sm:max-w-xs">
                  <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Phone
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <Controller
                  name="userPhone"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      placeholder="+84 987058579"
                      country="vn"
                      regions={"asia"}
                      inputProps={{
                        required: true,
                        autoFocus: true,
                      }}
                    />
                  )}
                />

                <div className="mt-4 sm:max-w-xs">
                  <ErrorMessage>{errPhones && errPhones}</ErrorMessage>
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Email address
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Street address
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                  {...register("streetAddress")}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Notifications
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
            We'll always let you know about important changes, but you pick what
            else you want to hear about.
          </p>

          <div className="mt-10 space-y-10 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <fieldset>
              <legend className="sr-only">By Email</legend>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-6">
                <div
                  className="text-sm font-semibold leading-6 text-gray-900"
                  aria-hidden="true"
                >
                  By Email
                </div>
                <div className="mt-4 sm:col-span-2 sm:mt-0">
                  <div className="max-w-lg space-y-6">
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="comments"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          {...register("comments")}
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="comments"
                          className="font-medium text-gray-900"
                        >
                          Comments
                        </label>
                        <p className="mt-1 text-gray-600">
                          Get notified when someones posts a comment on a
                          posting.
                        </p>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="candidates"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          {...register("candidates")}
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="candidates"
                          className="font-medium text-gray-900"
                        >
                          Candidates
                        </label>
                        <p className="mt-1 text-gray-600">
                          Get notified when a candidate applies for a job.
                        </p>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="offers"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          {...register("offers")}
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="offers"
                          className="font-medium text-gray-900"
                        >
                          Offers
                        </label>
                        <p className="mt-1 text-gray-600">
                          Get notified when a candidate accepts or rejects an
                          offer.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className="sr-only">Push Notifications</legend>
              <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
                <div
                  className="text-sm font-semibold leading-6 text-gray-900"
                  aria-hidden="true"
                >
                  Push Notifications
                </div>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <div className="max-w-lg">
                    <p className="text-sm leading-6 text-gray-600">
                      These are delivered via SMS to your mobile phone.
                    </p>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          defaultChecked
                          id="pushEverything"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          {...register("pushEverything")}
                        />
                        <label
                          htmlFor="push-everything"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Everything
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="pushEmail"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          {...register("pushEmail")}
                        />
                        <label
                          htmlFor="pushEmail"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Same as email
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="pushNothing"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          {...register("pushNothing")}
                        />
                        <label
                          htmlFor="pushNothing"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          No push notifications
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          onClick={() => dispatch({ type: "PREVIOUS_STEP" })}
          type="button"
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Previous
        </button>

        <button
          type="submit"
          className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Finish
        </button>
      </div>
    </form>
  );
}

export default InformationStep;
