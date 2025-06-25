import React from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity">
            <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full relative animate-fade-in">
                {/* <button
                    className="absolute top-2 right-2"
                    onClick={onClose}
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8 p-2 text-white bg-[#dd3170] rounded-full hover:scale-105 transition-all duration-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>

                    </span>
                </button> */}
                {children}
            </div>
        </div>
    );
};

export default Modal;
