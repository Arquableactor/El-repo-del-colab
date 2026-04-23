import { motion, animate } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1,
      onUpdate: (v) => setDisplay(v.toFixed(0))
    });

    return () => controls.stop();
  }, [value]);

  return <span>${display}</span>;
}