import { Form, Formik } from 'formik';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { TextButton } from '../../common/Button';
import { ModalFooter } from '../../common/Modal';
import FilledInput from '../FilledInput';

const validate = {
  teamName: (value) => {
    if (!value) {
      return 'Team name is not zero or empty';
    }
  },
};

const initValues = {
  teamName: '',
};

const AddTeamForm = (
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
        onSubmit={(values) => {
          handleAddNewEmployee(values);
          handleShowModal(false);
        }}
      >
        {({ handleSubmit, resetForm, errors, touched }) => (
          <Form>
            <FilledInput
              name="teamName"
              type="text"
              placeholder="Team name"
              errorMessage={
                errors.teamName && touched.teamName && errors.teamName
              }
              validateFn={validate.teamName}
            />
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
                Add
              </TextButton>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default forwardRef(AddTeamForm);
