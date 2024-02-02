import { AnimatePresence, motion } from "framer-motion";
import { FC, PropsWithChildren } from "react";
import styles from "./modal.module.scss"; // импорт модульных стилей

type Modal = PropsWithChildren<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}>;

const Modal: FC<Modal> = ({ isOpen, setIsOpen, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className={styles.modalContainer}
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            className={styles.modalContent}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
