import styles from './DeleteButton.module.scss';
type ButtonType = {
  customStyles: string;
  onClick: () => void;
};
function DeleteButton({ customStyles, onClick }: ButtonType) {
  return (
    <button
      onClick={onClick}
      className={`${styles.deleteButton} ${customStyles}`}
    ></button>
  );
}

export default DeleteButton;
