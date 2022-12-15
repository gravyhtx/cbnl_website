import React, { useState } from "react";
import styles from "./styles/context-menu.module.css";

const ContextMenu = (
  menu: {
    name: string,
    function: () => void
  }[]
) => {
  // Show or hide the custom context menu
  const [isShown, setIsShown] = useState(false);

  // The position of the custom context menu
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Show the custom context menu
  const showContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    // Disable the default context menu
    event.preventDefault();

    setIsShown(false);
    const newPosition = {
      x: event.pageX,
      y: event.pageY,
    };

    setPosition(newPosition);
    setIsShown(true);
  };

  // Hide the custom context menu
  const hideContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsShown(false);
  };

  return (
    <div
      className={styles.container}
      onContextMenu={showContextMenu}
      onClick={hideContextMenu}
    >
      {isShown && (
        <div
          style={{ top: position.y, left: position.x }}
          className={styles.customContextMenu}
        >
          { menu.map((item,index) => {
            return (
              <div className={styles.option} onClick={item.function} key={index}>
                item.name
              </div>)
            })
          }
        </div>
      )}
    </div>
  );
};

export default ContextMenu;