import React, { createContext, ReactNode, useContext, useRef, useState } from "react";
import Modal from 'react-native-modal';

const ModalContext = createContext({
    showModal: (content) => new Promise(() => false),
    close: () => { }
});
const useModal = () => {
    const [open, setOpen] = useState(false);
    const handleOnHide = () => {
        setOpen(false);
    };
    return {
        open,
        setOpen,
        close: handleOnHide,
    };
};


interface IModelProps {
    title?: string,
    content: any,
    hasTimeOut?: boolean,
    timeOut?: number,
    showModalControls?: any
}
export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
    const resolver = useRef();
    const { setOpen, open, close } = useModal();
    const [content, setContent] = useState();
    // const [isModalOpen, setIsModalOpen] = useState(false)
    const showModal = ({
        title,
        content,
        showModalControls,
        hasTimeOut,
        timeOut
    }: IModelProps) => {
        setContent({
            title,
            content,
            showModalControls,
        });

        setOpen(true);
        if (hasTimeOut) {
            setTimeout(() => {
                setOpen(false)
            }, timeOut);
        }
        return new Promise(function (resolve) {
            resolver.current = resolve;
        });
    }


    return (<ModalContext.Provider value={{ showModal, close }}>
        {children}
        {content && (
            <Modal isVisible={open}>
                {content?.content}
            </Modal>
        )}
    </ModalContext.Provider>)


}


const useModalContext = () => useContext(ModalContext);

export { useModalContext, useModal };