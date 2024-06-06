import { CountersType } from '../../components/CountersList/types';
import DeleteButton from '../../features/DeleteButton/DeleteButton';
import styles from './CounterItem.module.scss';

type ItemProps = {
  itemData: CountersType;
  index: number;
  onClick: () => void;
};

function CounterItem({ itemData, index, onClick }: ItemProps) {
  return (
    <div className={styles.item}>
      <div className={styles.itemNumber}>{index}</div>
      <div
        className={`${styles.itemType} ${
          itemData._type[0] === 'ColdWaterAreaMeter' ? styles.cold : styles.hot
        }`}
      >
        {itemData._type[0] === 'ColdWaterAreaMeter' ? 'ХВС' : 'ГВС'}
      </div>
      <div className={styles.itemDate}>
        {new Date(itemData.installation_date).toLocaleDateString()}
      </div>
      <div className={styles.itemAutomatic}>
        {itemData.is_automatic ? 'да' : 'нет'}
      </div>
      <div className={styles.itemCurrentValue}>
        {itemData.initial_values[0]}
      </div>
      <div className={styles.itemAddress}>{itemData.address}</div>
      <div className={styles.itemNote}>{itemData.description}</div>
      <DeleteButton onClick={onClick} customStyles={styles.deliteItemButton} />
    </div>
  );
}

export default CounterItem;
