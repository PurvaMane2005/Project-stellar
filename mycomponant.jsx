import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  {
    title: "Personal Space",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    description:
      "A calming personal space to relax and reflect, featuring serene visuals.",
    color: "#A4C6EB",
    demoLink: "https://example.com/full-personal-space-demo",
    tryLink: "https://example.com/try-personal-space",
  },
  {
    title: "Therapy Game",
    video: "https://www.w3schools.com/html/movie.mp4",
    description:
      "Engage in interactive therapy games to support mental wellness.",
    color: "#F6D186",
    demoLink: "https://example.com/full-therapy-game-demo",
    tryLink: "https://example.com/try-therapy-game",
  },
];

// Laptop frame wrapper component
const LaptopFrame = ({ children }) => (
  <div
    style={{
      borderRadius: 24,
      padding: 24,
      background: "#F7F9FC",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      maxWidth: 600,
      width: "100%",
      position: "relative",
    }}
  >
    {/* Screen */}
    <div
      style={{
        borderRadius: 16,
        overflow: "hidden",
        background: "#000",
        boxShadow: "inset 0 0 20px rgba(0,0,0,0.15)",
      }}
    >
      {children}
    </div>
    {/* Bottom bezel */}
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "80%",
        height: 16,
        background: "#d3dce6",
        borderRadius: "0 0 24px 24px",
      }}
    />
  </div>
);

export default function DemoVideosComponent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = tabs[activeIndex];

  const handleWatchFullDemo = () => window.open(current.demoLink, "_blank");
  const handleTryNow = () => window.open(current.tryLink, "_blank");

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#EFF3F8",
        color: "#222",
        fontFamily: "'Poppins', sans-serif",
        padding: 40,
        display: "flex",
        gap: 40,
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {/* Vertical Tabs */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 32,
          position: "relative",
          height: "fit-content",
          minWidth: 140,
        }}
      >
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              style={{
                all: "unset",
                cursor: "pointer",
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                fontSize: isActive ? 18 : 16,
                fontWeight: isActive ? "700" : "400",
                color: isActive ? "#444" : "rgba(68,68,68,0.5)",
                padding: "8px 16px",
                borderRadius: 8,
                backgroundColor: isActive ? tabs[index].color + "AA" : "transparent",
                transition: "all 0.3s ease",
                width: "fit-content",
              }}
            >
              {tab.title}
            </button>
          );
        })}
        {/* Indicator */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{
            position: "absolute",
            width: 8,
            borderRadius: 4,
            backgroundColor: tabs[activeIndex].color,
            top: activeIndex * 64,
            left: -20,
            height: 48,
          }}
          key="indicator"
        />
      </div>

      {/* Video + Description + Buttons */}
      <div
        style={{
          maxWidth: 650,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          alignItems: "center",
        }}
      >
        <LaptopFrame>
          <AnimatePresence mode="wait" initial={false}>
            <motion.video
              key={current.video}
              src={current.video}
              autoPlay
              loop
              muted
              controls={false}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </AnimatePresence>
        </LaptopFrame>

        <p
          style={{
            color: "#555",
            fontSize: 18,
            textAlign: "center",
            maxWidth: 600,
            lineHeight: 1.4,
          }}
        >
          {current.description}
        </p>

        <div
          style={{
            display: "flex",
            gap: 20,
          }}
        >
          <button
            onClick={handleWatchFullDemo}
            style={{
              padding: "12px 32px",
              backgroundColor: current.color,
              border: "none",
              borderRadius: 30,
              fontWeight: "700",
              color: "white",
              cursor: "pointer",
              boxShadow: `0 4px 15px ${current.color}AA`,
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#7a9ddc")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = current.color)}
          >
            Watch Full Demo
          </button>

          <button
            onClick={handleTryNow}
            style={{
              padding: "12px 32px",
              backgroundColor: "transparent",
              border: `2px solid ${current.color}`,
              borderRadius: 30,
              fontWeight: "700",
              color: current.color,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = current.color;
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = current.color;
            }}
          >
            Try Now
          </button>
        </div>
      </div>
    </div>
  );
}