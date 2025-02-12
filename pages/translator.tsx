import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown from "../components/DropDown";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import FuturePedia from "../components/FuturePedia";
import FAQ from "../components/FAQ";

const Translator: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [slangLevel, setSlangLevel] = useState("4/5 cancelled");
  const [generatedTranslation, setGeneratedTranslation] = useState<String>("");

  const textRef = useRef<null | HTMLDivElement>(null);

  const scrollToTranslation = () => {
    if (textRef.current !== null) {
      textRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt = `
${text}${text.slice(-1) === "." ? "" : "."}

Translates the above text into exaggerated internet slang in the style of urban dictionary. Absolutely NO HASHTAGS ALLOWED.

Slang level = "${slangLevel}"

Based on the slang level, which comes with a level out of 5, where each level has a name from 'toeing the line' to 'death', be more or less ridiculous with your slang. If it's at 1, just modify it slightly. If it's at 5... go crazy, with all the slangiest slang you can think of.

Your translation without hashtags:`;

  const generateTranslation = async (e: any) => {
    e.preventDefault();
    setGeneratedTranslation("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedTranslation((prev) => prev + chunkValue);
    }
    scrollToTranslation();
    setLoading(false);
  };

  return (
    <div style={{
      // background: linear-gradient(90deg, #00c9ff, #92fe9d);
      // background: "linear-gradient(90deg, #00c9ff, #92fe9d)",
      // retro yellow gradient
      // background: "linear-gradient(90deg, #f6d365, #fda085)",
      background: "linear-gradient(to right, #d3cce3, #e9e4f0)",
    }}>
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Text to Slang Translator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        {/* <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
          href="https://github.com/Nutlope/twitterbio"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          <p>Star on GitHub</p>
        </a> */}
        {/* make the slang word blue and text word gray */}
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Translate your 
          <span className="text-gray-500"> text</span> into
          internet
          <span className="text-blue-500"> slang</span>.
        </h1>
        {/* <p className="text-slate-500 mt-5">
          47,118 translations generated so far.
        </p> */}
        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Enter your text{" "}
              <span className="text-slate-500">
                (or write a few sentences you want to translate)
              </span>
              .
            </p>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "e.g. This is some regular boring text."
            }
          />
          <div className="flex mb-5 items-center space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="2 icon" />
            <p className="text-left font-medium">Select your slang level.</p>
          </div>
          <div className="block">
            <DropDown
              vibe={slangLevel}
              setVibe={(newSlangLevel) =>
                setSlangLevel((newSlangLevel as string))
              }
              options={["1/5 just toeing the line", "2/5 edgy", "3/5 dank", "4/5 cancelled", "5/5 dead"]}
              label="Slang Level"
            />
          </div>
          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={(e) => generateTranslation(e)}
            >
              Translate to Slang &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="space-y-10 my-10">
          {generatedTranslation && (
            <>
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  ref={textRef}
                >
                  Your translated text
                </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                <div
                  className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      generatedTranslation.toString()
                    );
                    toast("Translation copied to clipboard", {
                      icon: "✂️",
                    });
                  }}
                >
                  <p>{generatedTranslation}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <FuturePedia />
      <FAQ />
      <Footer />
    </div>
    </div>
  );
};

export default Translator;


