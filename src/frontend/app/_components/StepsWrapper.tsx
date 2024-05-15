"use client";

import { ReactElement, useState } from "react";
import { StepProps } from "../_types/stepprops-interface";
import Step from "./Step";
import { TabGroup, TabList, TabPanels } from "@headlessui/react";

const steps: StepProps[] = [
  {
    id: "F",
    name: "Findable",
    status: "current",
    color: "dark_blue",
  },
  {
    id: "A",
    name: "Accessible",
    status: "upcoming",
    color: "yellow",
  },
  {
    id: "I",
    name: "Interoperable",
    status: "upcoming",
    color: "light_blue",
  },
  {
    id: "R",
    name: "Reusable",
    status: "upcoming",
    color: "blue",
  },
];

const StepsWrapper = ({ children }: { children: ReactElement[] }) => {
  const [stepsState, setStepsState] = useState<StepProps[]>(steps);

  const handleNextStep = (id: string) => {
    const activeStepIndex = stepsState.findIndex((step) => step.id === id);

    const newSteps: StepProps[] = stepsState.map((step, index) => {
      if (index < activeStepIndex) {
        return { ...step, status: "complete" };
      } else if (index === activeStepIndex) {
        return { ...step, status: "current" };
      } else {
        return { ...step, status: "upcoming" };
      }
    });

    setStepsState([...newSteps]);
  };

  return (
    <TabGroup>
      <TabList
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Progress"
      >
        <ol
          role="list"
          className="overflow-hidden rounded-md lg:flex lg:rounded-none lg:border lg:border-gray-200"
        >
          {stepsState.map((step, stepIdx) => (
            <li key={step.id} className="relative overflow-hidden lg:flex-1">
              <div
                className={`${stepIdx === 0 ? "rounded-t-md border-b-0" : ""} ${
                  stepIdx === steps.length - 1 ? "rounded-b-md border-t-0" : ""
                } overflow-hidden border border-gray-200 lg:border-0`}
              >
                {step.status === "complete" ? (
                  <Step step={step} index={stepIdx} callback={handleNextStep} />
                ) : step.status === "current" ? (
                  <Step step={step} index={stepIdx} callback={handleNextStep} />
                ) : (
                  <Step step={step} index={stepIdx} callback={handleNextStep} />
                )}

                {stepIdx !== 0 ? (
                  <>
                    <div
                      className="absolute inset-0 left-0 top-0 hidden w-3 lg:block"
                      aria-hidden="true"
                    >
                      <svg
                        className="h-full w-full text-gray-300"
                        viewBox="0 0 12 82"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0.5 0V31L10.5 41L0.5 51V82"
                          stroke="currentcolor"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </div>
                  </>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </TabList>
      <TabPanels className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-20">
        {children}
      </TabPanels>
    </TabGroup>
  );
};

export default StepsWrapper;
