import { Container } from './NoneSpinnerStyles';
import { CgUnavailable } from 'react-icons/cg';

const NoneSpinner = ({ text = "Don't have any employee" }) => {
  return (
    <Container>
      <CgUnavailable size={60} />
      <span>{text}</span>
    </Container>
  );
};

export default NoneSpinner;
