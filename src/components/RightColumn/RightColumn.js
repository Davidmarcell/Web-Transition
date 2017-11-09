import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import Body from './Body';
import Footer from './Footer';
import Header from './Header';

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const HeaderRow = styled(Header)`
    flex: 1;
`;
const BodyRow = styled(Body)`
    flex: 1;
`;
const FooterRow = styled(Footer)`
    flex: 1;
`;

// Right part of main page
const RightColumn = ({ className }) => {
    return (
        <Container className={className}>
            <HeaderRow />

            <BodyRow />

            <FooterRow />
        </Container>
    );
};

RightColumn.propTypes = {
    className: PropTypes.string,
};

export default RightColumn;
