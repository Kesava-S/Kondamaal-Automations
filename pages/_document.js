import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/logo.png" type="image/png" sizes="any" />
        <link rel="icon" href="/logo.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="shortcut icon" href="/logo.png" type="image/png" />

        {/* Critical CSS for LCP elements (Hero) */}
        <style dangerouslySetInnerHTML={{
          __html: `
          :root {
            --background: #ffffff;
            --foreground: #1d1d1f;
            --accent-gradient: linear-gradient(135deg, #0071e3 0%, #42a1ff 100%);
            --text-secondary: #86868b;
            --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          }
          body {
            margin: 0;
            font-family: var(--font-sans);
            background: var(--background);
            color: var(--foreground);
          }
          .navbar {
            position: fixed;
            top: 0;
            width: 100%;
            height: 64px;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(20px);
            z-index: 1000;
          }
          .hero {
            padding: 180px 0 100px;
            text-align: center;
            background: radial-gradient(circle at 50% 0%, #fbfbfd 0%, #ffffff 100%);
          }
          .hero h1 {
            font-size: 4rem;
            font-weight: 700;
            letter-spacing: -0.03em;
            line-height: 1.1;
            margin-bottom: 1.5rem;
          }
        `}} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
