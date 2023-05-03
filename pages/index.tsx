import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>The Best Slang Thesaurus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-1 flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          The Best Ever Slang Thesaurus
        </h1>
        <p className="text-slate-500 mt-5 text-xl">
          The best ever slang thesaurus is coming soon, but for now enjoy this slang translator.
        </p>
        <p className="text-slate-500 mt-5 text-xl">
          Warning: It will get you cancelled, fired, and likely tarred and feathered.
        </p>
        <div className="mt-10">
          <Link href="/translator">
            Try the Slang Translator &rarr;
            {/* <a className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80">
              // Try the Slang Translator &rarr;
            </a> */}
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
