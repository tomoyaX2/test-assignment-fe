import { useEffect } from "react";

export const useClickOutside = (
  ref: React.RefObject<HTMLDivElement> | undefined,
  onClose: () => void
) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref && ref.current && !ref.current?.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose, ref]);
};
