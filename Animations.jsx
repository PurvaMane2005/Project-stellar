import React, { useEffect, useState } from "react";

type Card = {
  title: string;
  text: string;
  image: string;
};

const cards: Card[] = [
  {
    title: "",
    text: "Because talking about feelings is hard, but beating anxiety in level 5? Easier.",
    image: "/card0.jpg",
  },
  {
    title: "",
    text: "Finally, a space where you can overthink in peace — and maybe even breathe.",
    image: "/card2.jpg",
  },
  {
    title: "",
    text: "Growth isn’t always visible... but here, it literally is 🌱✨.",
    image: "/card3.jpg",
  },
  {
    title: "",
    text: "Mood swings? We got the toolkit — because adulting is hard, but you’re harder.",
    image: "/card4.jpg",
  },
  {
    title: "Dashboard and analytics",
    text: "Tracking your vibes like a pro — because even your mood needs receipts.",
    image: "/card5.jpg",
  },
  {
    title: "Interactive Vlogs & Analysis",
    text: "Watch, vibe, analyze — because your feelings deserve a glow-up too.",
    image: "/card6.jpg",
  },
];

export default function App() {
  const [activeIndex, setActiveIndex] = useState(2); // start from middle card

  // Calculate transforms based on active index and layout: 'slide'
  const getCardStyle = (index: number) => {
    const offset = index - activeIndex;
    const absOffset = Math.abs(offset);

    // scale smaller for cards further away, min 0.7
    const scale = Math.max(1 - absOffset * 0.15, 0.7);

    // horizontal translate based on offset (percentage)
    const translateX = offset * 60;

    // zIndex higher for active, lower for others
    const zIndex = cards.length - absOffset;

    return {
      transform: `translateX(${translateX}%) scale(${scale})`,
      zIndex,
      transition: "transform 0.5s ease",
      cursor: offset === 0 ? "default" : "pointer",
    };
  };

  // On card click, set it active
  const handleClick = (index: number) => {
    if (index !== activeIndex) setActiveIndex(index);
  };

  // Swipe handlers for touch devices
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    function handleTouchStart(e: TouchEvent) {
      touchStartX = e.changedTouches[0].screenX;
    }

    function handleTouchEnd(e: TouchEvent) {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 50) {
        // swipe left
        setActiveIndex((prev) => Math.min(prev + 1, cards.length - 1));
      } else if (touchEndX > touchStartX + 50) {
        // swipe right
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
    }

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className="overflow-x-hidden w-screen">
      <div className="relative max-w-xl mx-auto mt-20 h-[350px] select-none">
        {cards.map((card, index) => {
          const style = getCardStyle(index);
          const isActive = index === activeIndex;

          return (
            <div
              key={index}
              className={`absolute top-0 left-1/2 w-72 h-72 rounded-xl overflow-hidden shadow-xl transition-transform duration-500 ease-in-out
              ${isActive ? "shadow-2xl" : "shadow-lg"}
            `}
              style={{ ...style, transformOrigin: "center" }}
              onClick={() => handleClick(index)}
            >
              {/* Background image with blur on inactive cards */}
              <div
                className={`absolute inset-0 bg-center bg-cover transition-filter duration-400 ease-in-out`}
                style={{
                  backgroundImage: `url(${card.image})`,
                  filter: isActive ? "none" : "blur(6px)",
                }}
              ></div>

              {/* Text overlay */}
              <div
                className={`relative z-10 flex flex-col justify-center items-center h-full p-5 text-center
                bg-white bg-opacity-60 rounded-xl
                opacity-0 transition-opacity duration-400 ease-in-out
                ${isActive ? "opacity-100" : "opacity-0"}
              `}
              >
                <h2 className="text-2xl font-bold mb-3 text-black drop-shadow-md">
                  {card.title}
                </h2>
                <p className="text-black">{card.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
