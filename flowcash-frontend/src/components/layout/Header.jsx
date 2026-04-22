import { useState } from "react";
import Modal from "../ui/Modal";
import TransactionForm from "../transactions/TransactionForm";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center p-6 border-b border-[#1B2A3A] bg-[#050816]">

        <div>
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <p className="text-sm text-[#A5B5BF]">
            Gestión de efectivo
          </p>
        </div>

      </header>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <TransactionForm />
      </Modal>
    </>
  );
}