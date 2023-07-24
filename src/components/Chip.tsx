import React, { useEffect, useState } from "react";
import styles from "@/styles/Chip.module.css";

interface ChipProps {
  children: React.ReactNode;
  id: string | number;
  name: string | number;
  initPressed?: boolean;
  onPress?: (id: string, currentPressed: boolean) => void;
  className?: string;
}

export default function Chip({
  children,
  id,
  name,
  initPressed = false,
  onPress = (id: string, currentPressed: boolean) => {},
  className = "",
}: ChipProps): JSX.Element {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    setIsPressed(initPressed);
  }, [initPressed]);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const { id } = e.currentTarget;
    const currentPressed = isPressed;
    setIsPressed(!currentPressed);
    onPress(id, !currentPressed);
  };
  return (
    <div className={styles.chip_box}>
      <button
        id={id}
        name={name}
        className={styles.chip}
        onClick={handleClick}
        aria-pressed={isPressed}
      >
        {children}
      </button>
    </div>
  );
}
