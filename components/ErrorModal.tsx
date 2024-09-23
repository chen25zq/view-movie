
export interface ErrorModalProps {
    message: String;
    handleCloseModal: () => void;
  }

export const ErrorModal = ({ message, handleCloseModal }: ErrorModalProps) => {

  const handleClose = () => {
    handleCloseModal();
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 bg-red-500 text-white px-4 py-2 rounded shadow-lg">
        {message}
        <button onClick={handleClose} className="ml-4 text-blue-200">
          X
        </button>
      </div>
    </>
  );
}