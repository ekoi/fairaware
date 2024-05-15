import { CheckIcon } from "@heroicons/react/24/solid";
import { StepProps } from "../_types/stepprops-interface";
import { Tab } from "@headlessui/react";

const Step = ({
  step,
  index,
  callback,
}: {
  step: StepProps;
  index: number;
  callback: (id: string) => void;
}) => {
  const colorMap = {
    dark_blue: {
      bg: "bg-dark_blue-400",
      text: "text-dark_blue-400",
      border: "border-dark_blue-400",
      hover: "group-hover:bg-dark_blue-400",
    },
    blue: {
      bg: "bg-blue-400",
      text: "text-blue-400",
      border: "border-blue-400",
      hover: "group-hover:bg-blue-400",
    },
    light_blue: {
      bg: "bg-light_blue-400",
      text: "text-light_blue-400",
      border: "border-light_blue-400",
      hover: "group-hover:bg-light_blue-400",
    },
    yellow: {
      bg: "bg-yellow-400",
      text: "text-yellow-400",
      border: "border-yellow-400",
      hover: "group-hover:bg-yellow-400",
    },
  };

  let innerStep = (
    <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300">
      <span className="text-gray-500">{step.id}</span>
    </span>
  );

  if (step.status === "current") {
    innerStep = (
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
          colorMap[step.color].border
        }`}
      >
        <span className={colorMap[step.color].text}>{step.id}</span>
      </span>
    );
  }

  if (step.status === "complete") {
    innerStep = (
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full ${
          colorMap[step.color].bg
        }`}
      >
        <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
      </span>
    );
  }

  return (
    <Tab
      className="group w-full focus:outline-none"
      onClick={() => callback(step.id)}
    >
      <span
        className={`absolute left-0 top-0 h-full w-1 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full ${
          step.status === "current"
            ? colorMap[step.color].bg
            : `bg-transparent ${colorMap[step.color].hover}`
        }`}
        aria-hidden="true"
      />
      <span
        className={`${
          index !== 0 ? "lg:pl-9" : ""
        } flex items-start px-6 py-5 text-sm font-medium`}
      >
        <span className="flex-shrink-0">{innerStep}</span>
        <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
          <span
            className={`text-sm font-medium ${
              step.status === "current"
                ? colorMap[step.color].text
                : "text-gray-500"
            }`}
          >
            {step.name}
          </span>
          <span className="text-sm font-medium text-gray-500">
            {step.description}
          </span>
        </span>
      </span>
    </Tab>
  );
};

export default Step;
