import { useEffect, useState } from 'react';
import { CgSearch } from 'react-icons/cg';
import { useSnapshot } from 'valtio';
import {
  onChangeEmployeePerPage,
  onChangeSearchContent,
} from '../../app/actions';
import { store } from '../../app/store';
import { SearchButton } from '../../common/Button';
import { TextInput } from '../../common/Input';
import useDebounce from '../hooks/useDebounce';
import { Container, SearchWrap } from './SearchBarStyles';

const SearchBar = ({ employeeListLength, placeholder }) => {
  const { searchContent } = useSnapshot(store);
  const [txtInput, setTxtInput] = useState(searchContent);
  const debounceSearchContent = useDebounce(txtInput, 350);

  useEffect(() => {
    onChangeSearchContent(debounceSearchContent);
  }, [debounceSearchContent]);

  const handleChangeSearchInput = (e) => {
    setTxtInput(e.target.value);
  };

  return (
    <Container>
      <SearchWrap>
        <SearchButton>
          <CgSearch />
        </SearchButton>
        <TextInput
          placeholder={placeholder}
          value={txtInput}
          onChange={handleChangeSearchInput}
        />
      </SearchWrap>
    </Container>
  );
};

export default SearchBar;
