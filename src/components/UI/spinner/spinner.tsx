import { FC } from 'react';
import { ThreeCircles } from 'react-loader-spinner';

const Spinner: FC = () => {
  return <ThreeCircles color="rgb(124, 181, 236)" visible={true} />;
};

export default Spinner;
