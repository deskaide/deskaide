import styled from 'styled-components';
import { Box } from '../../components';
import getTitleCase from '../../../utils/getTitleCase';

import { ReactComponent as HashIcon } from '../../../assets/icons/hash.svg';

const links = [
  {
    tag: 'tags_website',
    totalDocs: 5,
  },
  {
    tag: 'tags_resources',
    totalDocs: 4,
  },
];

const Wrapper = styled.ul`
  list-style: none;
  li {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 8px;
    cursor: pointer;

    &:last-child {
      margin-bottom: 0;
    }

    svg {
      position: relative;
      top: 2px;
    }
  }
`;

const LinkTags = ({ data = links }) => (
  <Box p={4}>
    <Wrapper>
      {data.map((item) => (
        <li key={item.tag}>
          {' '}
          <HashIcon width={16} height={16} />{' '}
          {`${getTitleCase(item.tag.split('tags_')[1])} (${item.totalDocs})`}
        </li>
      ))}
    </Wrapper>
  </Box>
);

export default LinkTags;
