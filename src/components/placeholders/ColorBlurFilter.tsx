
const ColorBlurFilter = ({ color = "rgba(0, 0, 255, 0.5)", height = 200, width = 800 }) => {
    return (
      <div
        className="relative z-30 backdrop-blur-xl"
        style={{
          backgroundColor: color, // Directly apply solid rgba color
          height: `${height}px`,
          width: `${width}px`,
          padding: `1rem`,
          margin: `1rem auto`,
          borderRadius: "1rem",
          // filter: "blur(40px)", // Direct blur instead of Tailwind's class
          willChange: "filter", // Optimize rendering for smoother effect
        }}
      />
    );
  };

export default ColorBlurFilter;