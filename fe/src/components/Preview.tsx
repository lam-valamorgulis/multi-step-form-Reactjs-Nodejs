import { useState, useEffect } from "react";
import useFormContext from "../context/useFormContext";
import axios from "axios";

const URL_API = "http://localhost:3000/upload";

export default function Preview() {
  const [loading, setLoading] = useState(false);
  const { formStateValue, dispatch } = useFormContext();
  const { profile, information } = formStateValue;
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    if (profile?.img_upload?.[0]) {
      const blob = profile.img_upload[0];
      const url = URL.createObjectURL(blob);
      setImgUrl(url);

      // Cleanup the URL object when the component unmounts or the URL changes
      return () => URL.revokeObjectURL(url);
    }
  }, [profile]);

  const handleDownload = async () => {
    const formData = new FormData();

    // Append profile data
    formData.append("profile[userName]", formStateValue.profile.userName);
    formData.append("profile[description]", formStateValue.profile.description);
    formData.append(
      "profile[img_upload]",
      formStateValue.profile.img_upload[0]
    );

    // Append information data
    formData.append(
      "information[firstName]",
      formStateValue.information.firstName
    );
    formData.append(
      "information[lastName]",
      formStateValue.information.lastName
    );
    formData.append(
      "information[userPhone]",
      formStateValue.information.userPhone
    );
    formData.append("information[email]", formStateValue.information.email);
    formData.append(
      "information[streetAddress]",
      formStateValue.information.streetAddress
    );
    formData.append(
      "information[comments]",
      formStateValue.information.comments
    );
    formData.append(
      "information[candidates]",
      formStateValue.information.candidates
    );
    formData.append("information[offers]", formStateValue.information.offers);
    formData.append(
      "information[pushEverything]",
      formStateValue.information.pushEverything
    );
    formData.append(
      "information[pushEmail]",
      formStateValue.information.pushEmail
    );
    formData.append(
      "information[pushNothing]",
      formStateValue.information.pushNothing
    );

    try {
      setLoading(true);
      const response = await axios.post(URL_API, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      });
      // Create a Blob from the response data
      if (response.data) {
        setLoading(false);
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        // Open the PDF in a new tab
        window.open(url, "_blank");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <form encType="multipart/form-data" action="/upload"></form>
      <div className="px-4 sm:px-0 mt-10">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Personal Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal details and application.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 h-[300px] w-[300px] text-gray-900">
              <img
                src={imgUrl}
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </dt>

            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  User Name
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {profile.userName}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Full name
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {information.firstName} {information.lastName}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  User Phone
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {information.userPhone}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Email address
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {information.email}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Street Address
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {information.streetAddress}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Notifications
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {information.comments && "Comments"}
                  {information.pushEmail && "Email"}
                  {information.pushEverything && "Everything"}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  About
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {profile.description}
                </dd>
              </div>
            </dd>
          </div>
        </dl>
      </div>
      <div className="flex items-center justify-end gap-x-6">
        <button
          onClick={() => dispatch({ type: "PREVIOUS_STEP" })}
          type="button"
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Previous
        </button>

        <button
          onClick={handleDownload}
          disabled={loading}
          className={`inline-flex justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
          }`}
        >
          {loading ? "Downloading..." : "Download"}
        </button>
      </div>
    </div>
  );
}
