import { Field, Form, Formik } from 'formik';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { TextButton } from '../../common/Button';
import { ModalFooter } from '../../common/Modal';
import FilledInput from '../FilledInput';
import SelectInput from '../SelectInput';
import { InputGroup } from './AddEmployeeFormStyles';

const validate = {
  fullName: (value) => {
    if (!value) {
      return 'Full name is required';
    }

    if (value.length < 6) {
      return 'Full name must be at least 6 characters';
    }

    if (value.length > 255) {
      return 'Full name must be at most 255 characters';
    }
  },
  address: (value) => {
    if (!value) {
      return 'Address is required';
    }
  },
  age: (value) => {
    if (value <= 0) {
      return 'Age must be positive';
    }
  },

  moneyPerHour: (value) => {
    if (value <= 0) {
      return 'Money/hour must be positive';
    }
  },
  phoneNumber: (value) => {
    if (!value) {
      return 'Phone number is required';
    }

    const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
    if (re.test(value) === false) {
      return 'Phone number is invalid';
    }
  },
};

const initValues = {
  fullName: '',
  address: '',
  age: 0,
  sex: 'male',
  startDay: '2022-06-14',
  moneyPerHour: 0,
  phoneNumber: '',
};

const AddEmployeeForm = (
  { initialValues = initValues, handleShowModal, handleAddNewEmployee, teams },
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
        initialValues={{
          ...initialValues,
          team: initialValues.team || teams[0].teamName,
        }}
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
              <FilledInput
                name="fullName"
                type="text"
                placeholder="Full name"
                errorMessage={
                  errors.fullName && touched.fullName && errors.fullName
                }
                validateFn={validate.fullName}
              />
              <Field
                name="team"
                optionList={teams.map((item) => item.teamName)}
                component={SelectInput}
              />
            </InputGroup>
            <InputGroup>
              <FilledInput
                name="address"
                type="text"
                placeholder="Address"
                errorMessage={
                  errors.address && touched.address && errors.address
                }
                validateFn={validate.address}
              />
              <Field
                name="sex"
                optionList={['male', 'female', 'other']}
                component={SelectInput}
              />
            </InputGroup>
            <InputGroup>
              <FilledInput
                name="age"
                type="number"
                placeholder="Age"
                errorMessage={errors.age && touched.age && errors.age}
                validateFn={validate.age}
              />
              <FilledInput
                name="startDay"
                type="date"
                placeholder="start day"
              />
            </InputGroup>
            <InputGroup>
              <FilledInput
                name="moneyPerHour"
                type="number"
                placeholder="money/hours"
                errorMessage={
                  errors.moneyPerHour &&
                  touched.moneyPerHour &&
                  errors.moneyPerHour
                }
                validateFn={validate.moneyPerHour}
              />
              <FilledInput
                name="phoneNumber"
                type="tel"
                placeholder="phone number"
                errorMessage={
                  errors.phoneNumber &&
                  touched.phoneNumber &&
                  errors.phoneNumber
                }
                validateFn={validate.phoneNumber}
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
                {initialValues.id ? 'Update' : 'Add'}
              </TextButton>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default forwardRef(AddEmployeeForm);
