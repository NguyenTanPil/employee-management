import { Form, Formik } from 'formik';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { TextButton } from '../../common/Button';
import { ModalFooter } from '../../common/Modal';
import FilledInput from '../FilledInput';

const validate = {
  teamName: (value) => {
    if (!value) {
      return 'This field is not zero or empty';
    }
  },
};

const initValues = {
  teamName: '',
};

const AddTeamForm = (
  {
    initialValues = initValues,
    handleShowModal,
    handleAddNewEmployee,
    placeholder,
  },
  ref,
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
        validateOnChange={true}
        onSubmit={(values, { resetForm }) => {
          handleAddNewEmployee(values);
          handleShowModal(false);
          resetForm();
        }}
      >
        {({ handleSubmit, resetForm, errors, touched, isValid }) => (
          <Form>
            <FilledInput
              name="teamName"
              type="text"
              placeholder={placeholder}
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
              <TextButton
                active
                disabled={Object.keys(touched).length === 0 || !isValid}
                onClick={handleSubmit}
              >
                {placeholder === 'Team Name' ? 'Add' : 'Update'}
              </TextButton>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default forwardRef(AddTeamForm);
