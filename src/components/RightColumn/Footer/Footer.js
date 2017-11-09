import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import Translate, { TRANSLATE_DIRECTION } from '../../Translate';

import facebookIcon from './facebook.svg';
import instagramIcon from './instagram.svg';

const Container = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    margin: 50px;
`;

const Text = styled.div`
    color: white;
    text-transform: uppercase;
    font-size: 9px;
    font-family: 'hk_grotesk_prosemibold', Arial, Helvetica, sans-serif;
    letter-spacing: 1px;
    font-kerning: auto;
`;

const Icon = styled.img`
    display: block;
    width: 12px;
    height: 12px;
    margin-left: 30px;
`;

const Footer = ({ className }) => {
    return (
        <Container className={className}>
            <Translate direction={TRANSLATE_DIRECTION.BOTTOM_TO_TOP}>
                <Text>Follow us on</Text>
            </Translate>
            <Translate direction={TRANSLATE_DIRECTION.BOTTOM_TO_TOP} delay={400}>
                <Icon src={instagramIcon} />
            </Translate>
            <Translate direction={TRANSLATE_DIRECTION.BOTTOM_TO_TOP} delay={500}>
                <Icon src={facebookIcon} />
            </Translate>
        </Container>
    );
};

Footer.propTypes = {
    className: PropTypes.string,
};

export default Footer;
