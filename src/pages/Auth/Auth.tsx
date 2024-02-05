import { FC, useCallback, useEffect, useState } from "react";

import s from "./auth.module.scss";

import Input from "@/components/Input/Input";
import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";
import { Button } from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";

const Auth: FC = () => {
  const { focusKey, focusSelf, ref } = useFocusable();
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const handleModalOpen = useCallback((opened: boolean) => {
    setIsModalOpened(typeof opened === "boolean" ? opened : true);
  }, []);

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);
  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref}>
        <Button variant="glass" focusedVariant="orange">
          hello
        </Button>
        <Button variant="glass" focusedVariant="orange">
          hello
        </Button>
        <Button
          variant="transparent"
          focusedVariant="orange"
          onPress={handleModalOpen}
        >
          HELLO
        </Button>
        <Input label="name-" placeholder="Имя" />
        <Modal isOpen={isModalOpened} setIsOpen={setIsModalOpened}>
          <h1>HELLO WORLD</h1>
          <Button
            variant="glass"
            focusedVariant="orange"
            onPress={() => handleModalOpen(false)}
          >
            HELLO
          </Button>
          <Button
            variant="glass"
            focusedVariant="orange"
            onPress={() => handleModalOpen(false)}
          >
            HELLO x2
          </Button>
        </Modal>
        {/* <Input label="login-password" placeholder="Введите пароль" password /> */}
      </div>
    </FocusContext.Provider>
  );
};

export default Auth;
