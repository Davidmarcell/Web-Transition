import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import Translate from '../Translate';

import nextIcon from '../RightColumn/next.svg';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;

// Rotate content
const RotatedContainer = styled.div`
    margin-left: 75px;
    transform: rotate(-90deg);
    display: flex;
    align-items: center;
`;

const Text = styled.div`
    color: white;
    text-transform: uppercase;
    font-size: 10px;
    font-family: 'hk_grotesk_prosemibold', Arial, Helvetica, sans-serif;
    letter-spacing: 1px;
    font-kerning: auto;
`;

const Icon = styled.img`
    display: block;
    width: 20px;
    height: 20px;
    transform: rotate(-90deg);
    margin-right: 8px;
`;

// Left part of main page
const LeftColumn = ({ className }) => {
    return (
        <Container className={className}>
            <RotatedContainer>
                <Translate>
                    <Icon src={nextIcon} />
                </Translate>
                <Translate delay={400}>
                    <Text>Do Good</Text>
                </Translate>
            </RotatedContainer>
        </Container>
    );
};

LeftColumn.propTypes = {
    className: PropTypes.string,
};

export default LeftColumn;
