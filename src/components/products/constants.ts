import { Options } from 'react-select';

import { Option } from './interfaces';
import { Category } from '../../types/products';

export const DEFAULT_CATEGORY: Category = 'smartphones';

export const SELECT_OPTIONS: Options<Option> = [
  { value: 'smartphones', label: 'Смартфоны' },
  { value: 'laptops', label: 'Планшеты' },
];
