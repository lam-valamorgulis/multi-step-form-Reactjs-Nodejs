import { PhotoIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import useFormContext from "../context/useFormContext";

type ProfileFormValues = {
  userName?: string;
  description?: string;
  img_upload?: File | null;
};

function ProfileStep() {
  const [selectedImage, setSelectedImage] = useState<string>();
  const { dispatch, formStateValue } = useFormContext();
  const { profile } = formStateValue;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({ defaultValues: profile });

  useEffect(() => {
    if (profile?.img_upload?.[0]) {
      const blob = profile.img_upload[0];
      const url = URL.createObjectURL(blob);
      setSelectedImage(url);

      // Cleanup the URL object when the component unmounts or the URL changes
      return () => URL.revokeObjectURL(url);
    }
  }, [profile]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      if (file.size > 2000000) {
        // File size exceeds 2MB
        console.log("File size exceeds 2MB");
        return;
      }
      if (!file.type.match(/image\/(jpeg|png)/)) {
        // File type is not JPEG or PNG
        console.log("File type is not JPEG or PNG");
        return;
      }
      const blob = new Blob([file], { type: file.type });
      setSelectedImage(URL.createObjectURL(blob));
    }
  };

  const onSubmit = handleSubmit((data) => {
    dispatch({
      type: "UPDATE_PROFILE_FORM_STATE",
      payload: data,
    });
    dispatch({ type: "NEXT_STEP" });
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-12 sm:space-y-4 mt-10">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Username
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    id="userName"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    {...register("userName", {
                      required: "This field is required",
                      minLength: {
                        value: 6,
                        message: "Min 6 character required",
                      },
                      maxLength: {
                        value: 20,
                        message: "Max 20 character required",
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/,
                        message: "No special character",
                      },
                    })}
                  />
                </div>
                <div className="mt-4 sm:max-w-md">
                  <ErrorMessage>{errors.userName?.message}</ErrorMessage>
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                About
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <textarea
                  id="description"
                  rows={3}
                  className="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("description")}
                />
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Cover photo
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex max-w-2xl justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          type="file"
                          className="sr-only"
                          {...register("img_upload", {
                            required: "This field is required",
                            onChange: (e) => {
                              handleImageChange(e);
                            },
                          })}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 2MB
                    </p>
                  </div>
                </div>
                <div className="mt-4 sm:max-w-2xl">
                  <ErrorMessage>{errors.img_upload?.message}</ErrorMessage>
                </div>
                {selectedImage && (
                  <div className="text-center">
                    <img
                      src={selectedImage}
                      alt="Uploaded"
                      style={{ maxWidth: "100%", maxHeight: "250px" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
}

export default ProfileStep;
