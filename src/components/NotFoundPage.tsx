import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'motion/react';
import { play } from 'cuelume';
import { navigateTo } from '../lib/router';

// Assets
import keyboardBg from '../assets/404/keyboard-bg.svg';
import key4Default from '../assets/404/4.svg';
import key4Pressed from '../assets/404/4-pressed.svg';
import key0Default from '../assets/404/0.svg';
import key0Pressed from '../assets/404/0-pressed.svg';

interface KeycapProps {
  label: string;
  isPressed: boolean;
  defaultSrc: string;
  pressedSrc: string;
  onPressStart: () => void;
  onPressEnd: () => void;
  ariaLabel: string;
}

function Keycap({
  label,
  isPressed,
  defaultSrc,
  pressedSrc,
  onPressStart,
  onPressEnd,
  ariaLabel
}: KeycapProps) {
  return (
    <button
      type="button"
      onMouseDown={onPressStart}
      onMouseUp={onPressEnd}
      onMouseLeave={onPressEnd}
      onTouchStart={(e) => {
        e.preventDefault();
        onPressStart();
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        onPressEnd();
      }}
      aria-label={ariaLabel}
      aria-pressed={isPressed}
      className="relative w-[70px] h-[70px] select-none cursor-pointer focus:outline-hidden group"
    >
      <motion.div
        className="w-full h-full relative"
        animate={{
          y: isPressed ? 2 : 0,
          scale: isPressed ? 0.98 : 1,
        }}
        transition={{
          duration: 0.2,
          ease: 'easeOut',
        }}
      >
        {/* Unpressed Key State */}
        <motion.img
          src={defaultSrc}
          alt={label}
          draggable={false}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-sm"
          initial={false}
          animate={{
            opacity: isPressed ? 0 : 1,
          }}
          transition={{
            duration: 0.2,
            ease: 'easeOut',
          }}
        />

        {/* Pressed Key State */}
        <motion.img
          src={pressedSrc}
          alt={`${label} pressed`}
          draggable={false}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          initial={false}
          animate={{
            opacity: isPressed ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
            ease: 'easeOut',
          }}
        />
      </motion.div>
    </button>
  );
}

export default function NotFoundPage() {
  // Individual key press states
  const [key4LeftPressed, setKey4LeftPressed] = useState(false);
  const [key0PressedState, setKey0PressedState] = useState(false);
  const [key4RightPressed, setKey4RightPressed] = useState(false);

  // Track alternating index for 4: left first, then right on next press
  const next4IsLeftRef = useRef(true);

  // Handle keyboard events
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
      return;
    }

    if (e.repeat) return;

    if (e.key === '4' || e.code === 'Digit4' || e.code === 'Numpad4') {
      play('press', { volume: 0.65 });
      if (next4IsLeftRef.current) {
        setKey4LeftPressed(true);
        next4IsLeftRef.current = false;
      } else {
        setKey4RightPressed(true);
        next4IsLeftRef.current = true;
      }
    } else if (e.key === '0' || e.code === 'Digit0' || e.code === 'Numpad0') {
      play('press', { volume: 0.65 });
      setKey0PressedState(true);
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === '4' || e.code === 'Digit4' || e.code === 'Numpad4') {
      play('release', { volume: 0.55 });
      setKey4LeftPressed(false);
      setKey4RightPressed(false);
    } else if (e.key === '0' || e.code === 'Digit0' || e.code === 'Numpad0') {
      play('release', { volume: 0.55 });
      setKey0PressedState(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  // Click & touch handlers for interactive keycaps
  const handleKeycapStart = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    play('press', { volume: 0.65 });
    setter(true);
  };

  const handleKeycapEnd = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    play('release', { volume: 0.55 });
    setter(false);
  };


  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-start pt-16 sm:pt-24 pb-32 sm:pb-44 px-4 sm:px-6 text-center select-none">
      {/* Interactive Keyboard Enclosure with clean backdrop matching inspiration */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-7 flex items-center justify-center"
      >
        {/* Keyboard container */}
        <div className="relative w-[288px] h-[160px] flex items-center justify-center">
          {/* Authentic keyboard-bg SVG */}
          <img
            src={keyboardBg}
            alt="Mechanical keyboard base"
            draggable={false}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          />

          {/* Keycaps Container with snug 0px gap matching design */}
          <div className="relative z-10 flex items-center justify-center gap-0">
            {/* Left '4' Key */}
            <Keycap
              label="4"
              ariaLabel="Keyboard key 4 (first)"
              isPressed={key4LeftPressed}
              defaultSrc={key4Default}
              pressedSrc={key4Pressed}
              onPressStart={() => handleKeycapStart(setKey4LeftPressed)}
              onPressEnd={() => handleKeycapEnd(setKey4LeftPressed)}
            />

            {/* Middle '0' Key */}
            <Keycap
              label="0"
              ariaLabel="Keyboard key 0"
              isPressed={key0PressedState}
              defaultSrc={key0Default}
              pressedSrc={key0Pressed}
              onPressStart={() => handleKeycapStart(setKey0PressedState)}
              onPressEnd={() => handleKeycapEnd(setKey0PressedState)}
            />

            {/* Right '4' Key */}
            <Keycap
              label="4"
              ariaLabel="Keyboard key 4 (second)"
              isPressed={key4RightPressed}
              defaultSrc={key4Default}
              pressedSrc={key4Pressed}
              onPressStart={() => handleKeycapStart(setKey4RightPressed)}
              onPressEnd={() => handleKeycapEnd(setKey4RightPressed)}
            />
          </div>
        </div>
      </motion.div>

      {/* Typography matching inspiration */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-2.5 max-w-lg mx-auto"
      >
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 font-sans">
          Page Not Found
        </h1>
        <p className="text-sm sm:text-base text-neutral-500 font-normal leading-relaxed">
          Your internet isn&apos;t wonky, this page, just doesn&apos;t exist, yet.
        </p>
      </motion.div>

      {/* Action Button matching inspiration pill */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 flex items-center justify-center"
      >
        <button
          type="button"
          onClick={() => navigateTo('/')}
          data-cuelume-press
          data-cuelume-release
          className="px-7 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
        >
          Back to Homepage
        </button>
      </motion.div>
    </div>
  );
}

