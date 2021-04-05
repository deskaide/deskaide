import styled from 'styled-components';

import Box from './Box';
import Text from './Text';

const electron = window.require('electron');
const { shell } = electron;

const Wrapper = styled(Box)`
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.lightDark};
  border-top: none;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;

  .link-image {
    height: 240px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.lightDark};
    background-image: ${({ bgImage }) => `url(${bgImage})`};
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  .link-meta {
    padding: 16px;
  }

  .link-image,
  .link-meta h4,
  .link-meta p {
    cursor: pointer;
  }
`;

const LinkCard = ({ title = '', url = '', image = '', description = '' }) => {
  const handleURLClick = (e) => {
    e.preventDefault();
    shell.openExternal(url);
  };

  return (
    <Wrapper bgImage={image}>
      <div className="link-image" onClick={handleURLClick} />
      <div className="link-meta">
        <Text variant="h4" onClick={handleURLClick} color="primary">
          {title}
        </Text>
        <Text onClick={handleURLClick}>{description}</Text>
      </div>
    </Wrapper>
  );
};

export default LinkCard;
