import { useState } from "react";


export function useDeslocamentoHook() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return {
    isModalOpen,
    setIsModalOpen,
  };
}