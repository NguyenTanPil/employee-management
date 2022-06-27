import { Field, Form, Formik } from 'formik';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { TextButton } from '../../common/Button';
import { ModalFooter } from '../../common/Modal';
import FilledInput from '../FilledInput';
import { useGetTeamList } from '../hooks/team';
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
  age: 1,
  sex: 'male',
  startDay: '2022-06-14',
  moneyPerHour: 1,
  phoneNumber: '',
};

const AddEmployeeForm = (
  { initialValues = initValues, handleShowModal, handleAddNewEmployee },
  ref
) => {
  const formikRef = useRef();
  const { data: teams, isLoading: isTeamListLoading } = useGetTeamList();

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
          team:
            initialValues.team || (isTeamListLoading ? ' ' : teams[0].teamName),
        }}
        innerRef={formikRef}
        enableReinitialize={true}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={(values, { resetForm }) => {
          handleAddNewEmployee(values);
          resetForm();
        }}
      >
        {({ handleSubmit, resetForm, errors, touched, isValid }) => (
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
                optionList={
                  isTeamListLoading
                    ? [' ']
                    : teams.map((item) => item?.teamName)
                }
                component={SelectInput}
              />
            </InputGroup>
            <InputGroup>
              <FilledInput name="address" type="text" placeholder="Address" />
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
                // errorMessage={
                //   errors.phoneNumber &&
                //   touched.phoneNumber &&
                //   errors.phoneNumber
                // }
                // validateFn={validate.phoneNumber}
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
              <TextButton
                active
                disabled={
                  initialValues.id
                    ? !isValid
                    : Object.keys(touched).length === 0 || !isValid
                }
                onClick={handleSubmit}
              >
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
