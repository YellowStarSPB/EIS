import styles from './CountersListHeader.module.scss';

function CountersListHeader() {
  return (
    <div className={styles.countersListHeader}>
      <div className={`counters__list-header-number ${styles.headerItem}`}>
        №
      </div>
      <div className={`counters__list-header-type ${styles.headerItem}`}>
        Тип
      </div>
      <div className={`counters__list-header-date ${styles.headerItem}`}>
        Дата установки
      </div>
      <div className={`counters__list-header-automatic ${styles.headerItem}`}>
        Автоматический
      </div>
      <div
        className={`counters__list-header-current-value ${styles.headerItem}`}
      >
        Текущие показания
      </div>
      <div className={`counters__list-header-address ${styles.headerItem}`}>
        Адрес
      </div>
      <div className={`counters__list-header-note ${styles.headerItem}`}>
        Примечание
      </div>
    </div>
  );
}

export default CountersListHeader;
