import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import Translate, { TRANSLATE_DIRECTION } from '../Translate';

import nextIcon from './next.svg';

const Container = styled.div`
    color: white;
    font-family: 'din';
    padding-left: 100px;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const H1 = styled.h1`
    margin: 0;
    font-size: 60px;
`;

const SmallTextContainer = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
`;

const SmallText = styled.p`
    font-size: 10px;
    line-height: 10px;
    margin: 0;
`;

const SmallTextSuffix = SmallText.extend`
    margin-left: 12px;
    opacity: 0.3;
`;

const Icon = styled.img`
    display: block;
    margin-left: 18px;
    height: 18px;
    width: 18px;
`;

const Body = ({ className }) => {
    return (
        <Container className={className}>
            <Translate direction={TRANSLATE_DIRECTION.BOTTOM_TO_TOP}>
                <H1>wework creator</H1>
            </Translate>
            <Translate direction={TRANSLATE_DIRECTION.BOTTOM_TO_TOP} delay={350}>
                <H1>awards</H1>
            </Translate>

            <SmallTextContainer>
                <Translate direction={TRANSLATE_DIRECTION.LEFT_TO_RIGHT}>
                    <SmallText>Find out more</SmallText>
                </Translate>
                <Translate direction={TRANSLATE_DIRECTION.LEFT_TO_RIGHT} delay={400}>
                    <Icon src={nextIcon} />
                </Translate>
            </SmallTextContainer>
        </Container>
    );
};

Body.propTypes = {
    className: PropTypes.string,
};

export default Body;
