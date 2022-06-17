import {
  Container,
  SelectOptionItem,
  SelectOptions,
  SelectValue,
} from './SelectInputStyles';
import { MdArrowDropDown } from 'react-icons/md';
import { useState } from 'react';

const compareString = (str1, str2) => {
  return str1.toLowerCase() === str2.toLowerCase();
};

const SelectInput = ({
  optionList,
  field: { value, name },
  form: { setFieldValue },
}) => {
  const [isShowDropdown, setIsShowDropdown] = useState(false);

  const handleClickOption = (option) => {
    setIsShowDropdown(false);
    setFieldValue(name, option);
  };

  return (
    <Container>
      <SelectValue onClick={() => setIsShowDropdown((prev) => !prev)}>
        <span>{value}</span>
        <MdArrowDropDown />
      </SelectValue>

      {isShowDropdown && (
        <SelectOptions>
          {optionList.map((option, idx) => (
            <SelectOptionItem
              key={option + idx}
              selected={compareString(option, value)}
              value={option}
              onClick={() => handleClickOption(option)}
            >
              {option}
            </SelectOptionItem>
          ))}
        </SelectOptions>
      )}
    </Container>
  );
};

export default SelectInput;
