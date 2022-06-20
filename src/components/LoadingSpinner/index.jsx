import { Container } from '../NoneSpinner/NoneSpinnerStyles';
import loadingGif from '../../assets/images/loading.gif';

const LoadingSpinner = () => {
  return (
    <Container>
      <img src={loadingGif} alt="" />
    </Container>
  );
};

export default LoadingSpinner;
