import React, { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQ: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const toggle = (i: number) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  return (
    <div className="md:max-w-3xl w-full  flex flex-col lg:flex-row ">
      <div className="flex flex-col mx-4">
        <div className="flex flex-col justify-center items-center">
          <div className=" my-10">
            <h1 className="text-4xl text-black font-semibold text-center mb-8 border-b-4 w-24 mx-auto border-black dark:text-white dark:border-white">
              FAQ
            </h1>
            {data.map((item: FAQItem, i: number) => (
              <div
                key={i}
                className="bg-[#c5c2c2] shadow-inner shadow-gray-600 mb-3 py-3 px-8 rounded-md"
              >
                <div
                  className="text-gray-700 font-semibold text-md flex justify-between items-center cursor-pointer"
                  onClick={() => toggle(i)}
                >
                  <h1>{item.question}</h1>
                  <span>{selected === i ? "-" : "+"}</span>
                </div>
                <div className={selected === i ? "content show" : "content"}>
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .content {
          display: none;
          padding: 10px;
        }
        .content.show {
          display: block;
        }
      `}</style>
    </div>
  );
};

const data: FAQItem[] = [
  {
    question: "What is SlangThesaurus Translator?",
    answer:
      "SlangThesaurus Translator is an innovative online tool that provides users with urban thesaurus and slang translations. It helps users understand and interpret slang language, colloquial expressions, and informal terms traditionally found outside of standard dictionaries. We are constantly looking for ways to improve, and exploring new features to add to our platform.",
  },
  {
    question: "How does SlangThesaurus Translator work?",
    answer:
      "SlangThesaurus Translator uses OpenAI's ChatGPT API to translate your text. By entering a word or phrase into the search bar, users can generate a slang translation. If our platform causes you to get fired, we are not responsible, but please let us know so we can add it to our list of accomplishments.",
  },
  {
    question: "Why should I use SlangThesaurus Translator?",
    answer:
      "SlangThesaurus Translator is a valuable resource for anyone looking to understand and navigate the ever-evolving world of urban slang. Whether you're a language enthusiast, a writer, or simply curious about slang expressions, our translator provides quick and accurate translations to enhance your understanding of informal language.",
  },
  {
    question: "Is SlangThesaurus Translator free to use?",
    answer:
      "Yes, SlangThesaurus Translator is completely free to use. Our goal is to make slang translations accessible to everyone, and we're committed to providing a user-friendly and cost-free platform for all visitors.",
  },
  {
    question: "Can I use SlangThesaurus Translator on any device?",
    answer:
      "Absolutely! SlangThesaurus Translator is compatible with both desktop and mobile devices. Our responsive design ensures a seamless user experience, allowing you to access slang translations on the go.",
  },
  {
    question: "How accurate are the translations on SlangThesaurus Translator?",
    answer:
      "SlangThesaurus Translator uses AI-powered technology to provide accurate and reliable translations of slang terms and expressions. While we strive for precision, we rely on Large Language Models like ChatGPT, and meanings may be slightly outdated or simply incorrect.",
  },
  {
    question: "Is SlangThesaurus Translator safe to use?",
    answer:
      "Yes, SlangThesaurus Translator is safe to use. We prioritize user privacy and do not collect or store any personal information. Our platform is designed to provide a secure and reliable experience for all users.",
  },
  {
    question:
      "How can I stay updated on new features and updates for SlangThesaurus Translator?",
    answer:
      "To stay updated on the latest features and updates for SlangThesaurus Translator just check our platform every once in a while. We will be posting updates soon.",
  },
  {
    question: "How can I support this project?",
    answer:
      "You can support this project by upvoting it on FuturePedia, sharing it with your friends, and shooting us an email at contact@slangthesaurus.com. We're also open to sponsorships and partnerships. This site is expensive to run, so we appreciate any support you can give us.",
  },
  {
    question: "How can I contact you or report a bug?",
    answer:
        "You can contact us at contact@slangthesaurus.com"
  },
  {
    question: "How do I win?",
    answer: "You can win by taking a screenshot of your translation and posting it on Twitter or Reddit. If we see your translation and like it, we'll contact you to send you a rare SlangThesaurus mug. This is not a limited time offer, so you can win at any time."
  }
];

export default FAQ;
