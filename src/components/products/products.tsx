import { FC, useMemo, useState } from 'react';
import Select, { SingleValue } from 'react-select';

import { Option } from './interfaces';
import { DEFAULT_CATEGORY, SELECT_OPTIONS } from './constants';
import Spinner from '../UI/spinner';
import Chart from '../UI/rateColumnChart';
import { useGetProductsByCategoryQuery } from '../../services/products';

import styles from './styles.module.css';

const Products: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SingleValue<Option>>(
    SELECT_OPTIONS.find((item) => item.value === DEFAULT_CATEGORY) ||
      SELECT_OPTIONS[0]
  );

  const { data, isFetching } = useGetProductsByCategoryQuery(
    selectedCategory?.value || DEFAULT_CATEGORY
  );

  const chartData = useMemo(() => {
    if (!data || isFetching) {
      return [];
    }

    return data.products.map(({ title, rating }) => ({
      name: title,
      y: rating,
    }));
  }, [data, isFetching]);

  const handleChangeCategory = (newCategory: SingleValue<Option>) =>
    setSelectedCategory(newCategory);

  return (
    <>
      <h1>Рейтинг смартфонов и планшетов</h1>
      <div className={styles.categorySelectWrapper}>
        <Select
          options={SELECT_OPTIONS}
          value={selectedCategory}
          onChange={handleChangeCategory}
          isDisabled={isFetching}
        />
      </div>
      {isFetching ? (
        <div className={styles.spinnerWrapper}>
          <Spinner />
        </div>
      ) : (
        <Chart title={selectedCategory?.label || 'Продукты'} data={chartData} />
      )}
    </>
  );
};

export default Products;
