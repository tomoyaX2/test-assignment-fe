import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current?.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center ">
      <div
        ref={modalRef}
        className=" p-6 rounded-md shadow-lg max-w-md w-full bg-gray-800"
      >
        <div
          className="flex flex-row items-center justify-end  cursor-pointer"
          onClick={onClose}
        >
          <XMarkIcon className="w-4 h-4" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
