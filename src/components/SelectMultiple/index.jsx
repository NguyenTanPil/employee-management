import { useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import {
  SelectOptionItem,
  SelectOptions,
  SelectValue,
} from '../SelectInput/SelectInputStyles';
import { Container } from './SelectMultipleStyles';
import { store } from '../../app/store';
import { useSnapshot } from 'valtio';
import { handleChangeColumns } from '../../app/actions';

const columnNames = [
  'address',
  'age',
  'sex',
  'startDay',
  'moneyPerHour',
  'phoneNumber',
  'team',
];

const SelectMultiple = () => {
  const [showOptions, setShowOptions] = useState(false);
  const { columns } = useSnapshot(store);

  const getSelected = (colName) => {
    const colList = columns.map((col) => col.name);
    return colList.includes(colName);
  };

  const handleSelectColumn = (colName) => {
    handleChangeColumns(colName);
    setShowOptions(false);
  };

  return (
    <Container>
      <SelectValue onClick={() => setShowOptions(!showOptions)}>
        <span>Columns</span>
        <MdArrowDropDown />
      </SelectValue>
      {showOptions && (
        <SelectOptions>
          {columnNames.sort().map((colName, idx) => (
            <SelectOptionItem
              key={colName + idx}
              selected={getSelected(colName)}
              onClick={() => handleSelectColumn(colName)}
            >
              {colName}
            </SelectOptionItem>
          ))}
        </SelectOptions>
      )}
    </Container>
  );
};

export default SelectMultiple;
