import { CgSearch } from 'react-icons/cg';
import { SearchButton } from '../../common/Button';
import { TextInput } from '../../common/Input';
import { Container, SearchWrap } from './SearchBarStyles';

const SearchBar = ({ placeholder, handleChange }) => {
  return (
    <Container>
      <SearchWrap>
        <SearchButton>
          <CgSearch />
        </SearchButton>
        <TextInput placeholder={placeholder} onChange={handleChange} />
      </SearchWrap>
    </Container>
  );
};

export default SearchBar;
