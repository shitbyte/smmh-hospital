// components/FloatingButtons.jsx
import { useState, useEffect } from "react";
import Link from "next/link";
import { PhoneIcon, CalendarIcon, ChevronUpIcon } from "./Icons";

const styles = {
  strip: {
    position: "fixed",
    bottom: 24,
    right: 24,
    zIndex: 999,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  btn: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 20px",
    borderRadius: 50,
    fontWeight: 600,
    fontSize: "0.875rem",
    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
    transition: "transform 0.25s",
    cursor: "pointer",
    border: "none",
    fontFamily: "inherit",
  },
  emergency: {
    background: "#dc2626",
    color: "white",
  },
  appointment: {
    background: "var(--teal)",
    color: "white",
  },
  scrollTop: {
    position: "fixed",
    bottom: 24,
    left: 24,
    width: 44,
    height: 44,
    background: "var(--navy)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
    transition: "all 0.25s",
    zIndex: 999,
    color: "white",
  },
};

export default function FloatingButtons() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* Floating action buttons */}
      <div style={styles.strip}>
        <a
          href="tel:042111786786"
          style={{ ...styles.btn, ...styles.emergency, textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(-4px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}
        >
          <PhoneIcon size={18} />
          Emergency
        </a>

        <Link
          href="/#appointment"
          style={{ ...styles.btn, ...styles.appointment, textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(-4px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}
        >
          <CalendarIcon size={18} />
          Appointment
        </Link>
      </div>

      {/* Scroll to top */}
      {visible && (
        <button
          style={styles.scrollTop}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--teal)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--navy)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <ChevronUpIcon size={18} />
        </button>
      )}
    </>
  );
}
