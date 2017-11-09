import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import HeaderItem from './HeaderItem';

import menuIcon from './menu.svg';

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 50px;
`;

const BurgerIcon = styled.img`
    height: 12px;
    width: 12px;
    display: block;
    margin-left: 16px;
`;

const Menu = ({ className }) => (
    <Container className={className}>
        <HeaderItem active>Work</HeaderItem>
        <HeaderItem delay={400} duration={600}>
            Do Good
        </HeaderItem>
        <HeaderItem delay={500} duration={600}>
            About
        </HeaderItem>
        <HeaderItem delay={600} duration={600}>
            Contact
        </HeaderItem>
        <HeaderItem delay={700} duration={600}>
            <BurgerIcon src={menuIcon} />
        </HeaderItem>
    </Container>
);

Menu.propTypes = {
    className: PropTypes.string,
};

export default Menu;
