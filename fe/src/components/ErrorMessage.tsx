import { PropsWithChildren } from "react";

export default function ErrorMessage({ children }: PropsWithChildren) {
  if (!children) return null;
  return (
    <div className="rounded-md bg-red-50 p-2">
      <div className="ml-3">
        <h3 className="text-sm font-medium text-red-800">{children}</h3>
      </div>
    </div>
  );
}
