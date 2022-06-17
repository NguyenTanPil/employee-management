import { SearchButton } from '../../common/Button';
import { TextInput } from '../../common/Input';
import { Container, SearchWrap } from './SearchBarStyles';
import { CgSearch } from 'react-icons/cg';
import { useState } from 'react';

const SearchBar = ({ placeholder }) => {
  const [searchContent, setSearchContent] = useState('');

  const handleSearchContentChange = (e) => {
    setSearchContent(e.target.value);
  };

  return (
    <Container>
      <SearchWrap>
        <SearchButton>
          <CgSearch />
        </SearchButton>
        <TextInput
          placeholder={placeholder}
          value={searchContent}
          onChange={handleSearchContentChange}
        />
      </SearchWrap>
    </Container>
  );
};

export default SearchBar;
