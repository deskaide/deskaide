import React from 'react';
import { SubmenuContainer } from '../../components';
import SaveLink from './SaveLink';
import LinkTags from './LinkTags';

const LinkOptions = () => (
  <SubmenuContainer appTitle="Link Options">
    <>
      <SaveLink />
      <LinkTags />
    </>
  </SubmenuContainer>
);

export default LinkOptions;
