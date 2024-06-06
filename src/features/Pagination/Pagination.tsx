import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
};

function Pagination({
  currentPage,
  totalPages,
  handleNextPage,
  handlePrevPage,
}: PaginationProps) {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationBtn}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        Назад
      </button>

      <span className={`${styles.paginationCountPage}`}>
        {currentPage} / {totalPages}
      </span>
      <button
        className={styles.paginationBtn}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Вперед
      </button>
    </div>
  );
}

export default Pagination;
