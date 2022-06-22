import { Form, Formik } from 'formik';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { TextButton } from '../../common/Button';
import { ModalFooter } from '../../common/Modal';
import FilledInput from '../FilledInput';
import { InputGroup } from '../AddEmployeeForm/AddEmployeeFormStyles';

const validate = {
  salaryPerHour: (value) => {
    if (value <= 0) {
      return 'Money/hour must be positive';
    }
  },
};

const initValues = {
  date: '2022-06-14',
  salaryPerHour: 0,
};

const AddWorkingForm = (
  { initialValues = initValues, handleShowModal, handleAddNewEmployee },
  ref
) => {
  const formikRef = useRef();

  useImperativeHandle(ref, () => ({
    resetFormik() {
      formikRef.current.resetForm();
    },
  }));
  return (
    <>
      <Formik
        initialValues={initialValues}
        innerRef={formikRef}
        enableReinitialize={true}
        validateOnBlur={true}
        validateOnChange={false}
        onSubmit={(values, { resetForm }) => {
          handleAddNewEmployee(values);
          resetForm();
        }}
      >
        {({ handleSubmit, resetForm, errors, touched }) => (
          <Form>
            <InputGroup>
              <FilledInput name="date" type="date" placeholder="date" />
              <FilledInput
                name="salaryPerHour"
                type="number"
                placeholder="salary/hours"
                errorMessage={
                  errors.salaryPerHour &&
                  touched.salaryPerHour &&
                  errors.salaryPerHour
                }
                validateFn={validate.salaryPerHour}
              />
            </InputGroup>
            <ModalFooter>
              <TextButton
                onClick={() => {
                  resetForm();
                  handleShowModal(false);
                }}
              >
                Cancel
              </TextButton>
              <TextButton active onClick={handleSubmit}>
                {initialValues.no ? 'Update' : 'Add'}
              </TextButton>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default forwardRef(AddWorkingForm);
