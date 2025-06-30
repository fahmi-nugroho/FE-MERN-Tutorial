import { ReactNode } from "react";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";

interface PropType {
  type: string;
  message: string;
}

const Toaster = (props: PropType) => {
  const { type, message } = props;
  const iconList: { [key: string]: ReactNode } = {
    success: <CiCircleCheck className="text-3xl text-success-500" />,
    error: <CiCircleRemove className="text-3xl text-danger-500" />,
  };

  return (
    <div
      role="alert"
      aria-labelledby="toaster-label"
      className="fixed right-8 top-8 z-50 max-w-xs rounded-xl border border-gray-200 bg-white shadow-sm"
    >
      <div className="flex items-center gap-2 p-4">
        {iconList[type]}
        <p id="toaster-label" className="text-sm text-gray-700">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Toaster;
