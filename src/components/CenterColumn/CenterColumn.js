import React from 'react';

import styled from 'styled-components';

import Translate, { TRANSLATE_DIRECTION } from '../Translate';

const TranslatedContent = styled.div`
    background-color: white;
    height: 100vh;
    width: 3px;
`;

// Box in the middle of page
const CenterBlock = () => (
    <Translate direction={TRANSLATE_DIRECTION.BOTTOM_TO_TOP} duration={500}>
        <TranslatedContent />
    </Translate>
);

export default CenterBlock;
