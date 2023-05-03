import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Translate to slang in seconds."
          />
          <meta property="og:site_name" content="slangthesaurus.com" />
          <meta
            property="og:description"
            content="Translate to slang in seconds."
          />
          <meta property="og:title" content="Slang Translator" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Slang Translator" />
          <meta
            name="twitter:description"
            content="Translate to slang in seconds."
          />
          <meta
            property="og:image"
            content="https://slangthesaurus.com/og-image.png"
          />
          <meta
            name="twitter:image"
            content="https://slangthesaurus.com/og-image.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
