import { Field } from 'formik';
import { Container, ErrorMessage } from './FilledInputStyles';

const FilledInput = ({ name, type, placeholder, errorMessage, validateFn }) => {
  return (
    <Container>
      <div>
        <Field
          type={type}
          name={name}
          placeholder=" "
          autoComplete="off"
          validate={validateFn}
        />
        <span>{placeholder}</span>
      </div>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </Container>
  );
};

export default FilledInput;
