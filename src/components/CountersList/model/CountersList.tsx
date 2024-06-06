import { useState, useEffect } from 'react';
//fetch api
import { getAddress, deleteCounter } from '../api';
//types
import { CountersType, ResponseCountersType } from '../types';
//components
import CounterItem from '../../../entities/CounterItem/CounterItem';
//styles
import styles from './CountersList.module.scss';
import CountersListHeader from '../../../entities/CountersListHeader/CountersListHeader';
import Pagination from '../../../features/Pagination/Pagination';

type CashedType = {
  [key: string]: CountersType[];
};

const CountersList = () => {
  const [data, setData] = useState<CountersType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cachedPages, setCachedPages] = useState<CashedType>({});
  const [totalItems, setTotalItems] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const itemsPerPage = 20;

  //основная логика запроса
  useEffect(() => {
    async function getUsersAndAddress() {
      if (cachedPages[currentPage]) {
        // Если данные страницы закэшированы, используем их
        setData(cachedPages[currentPage]);
      } else {
        setIsLoading(true);
        // Если данные страницы не закэшированы, выполняем запрос
        const offset = (currentPage - 1) * itemsPerPage;

        const response = await fetch(
          `http://showroom.eis24.me/api/v4/test/meters/?limit=${itemsPerPage}&offset=${offset}`
        );

        const counters = await response.json();

        const countersData: ResponseCountersType['results'] = [];

        if (counters) {
          //хэшированные ID и address
          let hashId: string = '';
          let hashAddress: string = '';

          for (let i = 0; i < counters.results.length; i++) {
            //если уже встречали такой id просто подставляем адрес
            if (hashId === counters.results[i].area.id) {
              counters.results[i].address = hashAddress;
              countersData.push(counters.results[i]);
              continue;
            }

            //запоминаем id адреса
            hashId = counters.results[i].area.id;
            //делаем запрос на получение адреса
            const address = await getAddress(hashId);

            if (address) {
              //запоминаем адрес
              hashAddress = address;
              counters.results[i].address = hashAddress;
              countersData.push(counters.results[i]);
            }
          }

          setData(countersData);
          setCachedPages((prev) => ({ ...prev, [currentPage]: countersData }));
          setIsLoading(false);
          if (!totalItems) {
            setTotalItems(counters.count);
          }
        }
      }
    }
    getUsersAndAddress();
  }, [currentPage, cachedPages, totalItems]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  //логика удаления
  const handleDeleteCounter = async (id: string) => {
    const res = await deleteCounter(id);

    if (res) {
      for (let i = 0; i < data.length; i++) {
        if (cachedPages[i + 1]) {
          const cashedItems = cachedPages[i + 1].filter(
            (item) => item.id !== id
          );
          setCachedPages((prev) => ({ ...prev, [i + 1]: cashedItems }));
        }
        if (data[i].id === id) {
          setData((prev) => prev.filter((counter) => counter.id !== id));
        }
      }
      const offset = currentPage * itemsPerPage;

      const response = await fetch(
        `http://showroom.eis24.me/api/v4/test/meters/?limit=1&offset=${offset}`
      );

      const jsonData = await response.json();

      const newItem = jsonData.results[0];

      //делаем запрос на получение адреса
      const address = await getAddress(newItem.area.id);

      if (address) {
        newItem.address = address;
      }

      setCachedPages((prev) => ({
        ...prev,
        [currentPage]: [...prev[currentPage], newItem],
      }));
      setData((prev) => [...prev, newItem]);
    }
  };

  return (
    <div className={styles.countersList}>
      <CountersListHeader />

      <div className={styles.countersListBody}>
        {isLoading &&
          Array(20)
            .fill('1')
            .map((_, index) => (
              <div key={index} className={styles.preloaderItem}>
                Loading...
              </div>
            ))}
        {!isLoading &&
          data.map((item, index) => (
            <CounterItem
              key={item.id}
              itemData={item}
              index={index + 1}
              onClick={() => handleDeleteCounter(item.id)}
            />
          ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />
    </div>
  );
};

export default CountersList;
