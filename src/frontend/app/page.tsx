import Image from "next/image";
import StepsWrapper from "./_components/StepsWrapper";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-20">
        <Image
          src="/ui/fairaware.png"
          alt="FairAware logo"
          width={300}
          height={200}
        />
        <h2 className="w-full text-right text-xl sm:text-1xl md:text-2xl lg:text-3xl text-dark_blue-400 mb-10">
          Your first step towards your FAIR data(set)
        </h2>
        <div className="text-sm space-y-5 text-gray-900">
          <p>
            Do you work with data? Are you looking to make it future-proof? The
            FAIR Principles can help you.
          </p>

          <p>
            These principles stand for the Findability, Accessibility,
            Interoperability and Reusability of data(sets). Applying these
            principles to your data(set) will help others to find, cite and
            reuse your data more easily.
          </p>

          <p>
            FAIR-Aware helps you assess your knowledge of the FAIR Principles,
            and better understand how making your data(set) FAIR can increase
            the potential value and impact of your data.
          </p>

          <p>
            The tool is discipline-agnostic, making it relevant to any
            scientific field. You can use this tool at any point during your
            research before depositing your data(set) in a data repository. It
            is also good to keep in mind that many FAIR-related decisions can
            already be made in the research planning phase, so you may want to
            use FAIR-Aware early on to help you make those decisions. Also, if
            you are a trainer, you can use FAIR-Aware to assess the knowledge of
            FAIR of your course participants.
          </p>

          <p>
            The self-assessment consists of 10 questions with additional
            guidance texts to help you become more aware of what you can do to
            make your data(set) as FAIR as possible. The assessment will take
            between 10-30 minutes, after which you will receive an overview of
            your awareness level and additional tips on how you can further
            improve your FAIR skills.
          </p>

          <p>
            If you would like to use FAIR-Aware in your own training, you can
            find instructions on the trainer functionality{" "}
            <a
              className="text-light_blue-400 underline cursor-pointer font-bold"
              href="https://fairaware.dans.knaw.nl/documents/trainer_instructions.pdf"
            >
              here
            </a>
          </p>
          <p>
            You can contact the FAIR-Aware development team for any questions or
            comments via e-mail:{" "}
            <a
              className="text-light_blue-400 underline cursor-pointer font-bold"
              href="mailto:fair-aware@dans.knaw.nl"
            >
              fair-aware@dans.knaw.nl.
            </a>
          </p>
        </div>
      </section>
      <section>
        <StepsWrapper>
          <TabPanel>FINDABLE - Content1</TabPanel>
          <TabPanel>ACCESSIBLE - Content2</TabPanel>
          <TabPanel>INTEROPERABLE - Content3</TabPanel>
          <TabPanel>REUSABLE - Content4</TabPanel>
        </StepsWrapper>
      </section>
    </>
  );
}
