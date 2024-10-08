import  { createContext, useState } from "react";

export const ModalContext = createContext({
  isCreateModalOpen: false,
  alertModal: {
    isOpen: false,
    message: "",
  },
  isReGetting: true,
  condition: "all",
  page: 1,
  changePage: (page: number) => {},
  toggleCondition: (flag: string) => {},
  toggleModal: (flag: string, message?: string) => {},
  toggleReGetting: () => {},
});

export const ModalProvider = ({ children }: any) => {
  const [isCreateModalOpen, setModalOpen] = useState(false);
  const [alertModal, setAlertModal] = useState({
    isOpen: false,
    message: "",
  });
  const [isReGetting, setReGettingOpen] = useState(true);
  const [condition, setCondition] = useState("all");
  const [page, setPage] = useState(1);
  const toggleModal = (flag: string, message?: string) => {
    if (flag === "create-modal") {
      setModalOpen(!isCreateModalOpen);
    } else if (flag === "alert-modal") {
      setAlertModal((prev): any => ({
        isOpen: !prev.isOpen,
        message,
      }));
    }
  };
  const toggleReGetting = () => {
    setReGettingOpen(!isReGetting);
  };
  const toggleCondition = (flag: string) => {
    setCondition(flag);
  };
  const changePage = (page: number) => {
    setPage(page);
  };
  return (
    <ModalContext.Provider
      value={{
        isCreateModalOpen,
        alertModal,
        isReGetting,
        condition,
        page,
        changePage,
        toggleCondition,
        toggleModal,
        toggleReGetting,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
