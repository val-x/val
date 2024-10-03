import React, { createContext, useContext, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <motion.div
        className={containerClassName}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsMouseEntered(true)}
        onMouseLeave={() => setIsMouseEntered(false)}
      >
        <motion.div
          className={className}
          style={{
            rotateX: useSpring(
              useTransform(mouseY, [0, 1], [10, -10]), {
                stiffness: 150,
                damping: 20,
              }
            ),
            rotateY: useSpring(
              useTransform(mouseX, [0, 1], [-10, 10]), {
                stiffness: 150,
                damping: 20,
              }
            ),
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={className}>{children}</div>;
};

export const CardItem = ({
  as: Component = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
}) => {
  const [isMouseEntered] = useMouseEnter();

  const style = {
    transform: isMouseEntered
      ? `perspective(1000px) translate3d(${translateX}px, ${translateY}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
      : "none",
    transition: "all 0.3s ease-out",
  };

  return (
    <Component className={className} style={style} {...rest}>
      {children}
    </Component>
  );
};

export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};