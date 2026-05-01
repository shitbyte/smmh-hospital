// pages/_app.jsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // ── Scroll-reveal observer ────────────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const attach = () => {
      document.querySelectorAll(".reveal").forEach((el) => {
        observer.observe(el);
      });
    };

    // Attach after initial render
    attach();

    // Re-attach on route change
    router.events.on("routeChangeComplete", () => {
      setTimeout(attach, 100);
    });

    return () => {
      observer.disconnect();
    };
  }, [router]);

  return <Component {...pageProps} />;
}
