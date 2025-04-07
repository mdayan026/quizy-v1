import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#297fff" />
        {/* <!-- Meta --> */}
        <meta name="author" content="SANDF" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
