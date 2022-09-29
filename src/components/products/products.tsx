import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Select, { SingleValue } from 'react-select';

import { Option } from './interfaces';
import { DEFAULT_CATEGORY, SELECT_OPTIONS } from './constants';
import Spinner from '../UI/spinner';
import Chart from '../UI/rateColumnChart';
import { Product } from '../../types/products';
import { productsApi } from './../../api';

import styles from './styles.module.css';

const Products: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<SingleValue<Option>>(
    SELECT_OPTIONS.find((item) => item.value === DEFAULT_CATEGORY) ||
      SELECT_OPTIONS[0]
  );
  const [isLoading, setIsLoading] = useState(false);

  const chartData = useMemo(
    () => products.map(({ title, rating }) => ({ name: title, y: rating })),
    [products]
  );

  const fetchData = useCallback(async () => {
    if (!selectedCategory) {
      return [];
    }

    setIsLoading(true);
    const products = await productsApi.getProducts(selectedCategory.value);
    setIsLoading(false);

    return products || [];
  }, [selectedCategory]);

  const handleChangeCategory = (newCategory: SingleValue<Option>) =>
    setSelectedCategory(newCategory);

  useEffect(() => {
    (async () => {
      if (!selectedCategory) {
        return;
      }

      const productData = await fetchData();

      if (productData) {
        setProducts(productData);
      }
    })();
  }, [fetchData, selectedCategory]);

  return (
    <>
      <h1>Рейтинг смартфонов и планшетов</h1>
      <div className={styles.categorySelectWrapper}>
        <Select
          options={SELECT_OPTIONS}
          value={selectedCategory}
          onChange={handleChangeCategory}
          isDisabled={isLoading}
        />
      </div>
      {isLoading ? (
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
