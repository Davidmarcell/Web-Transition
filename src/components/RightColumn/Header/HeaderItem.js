import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import Translate from '../../Translate';

const Link = styled.a`
    display: block;
    font-size: 9px;
    font-family: 'hk_grotesk_prosemibold', Arial, Helvetica, sans-serif;
    color: ${props => (props.active ? '#eee' : 'white')};
    height: 14px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-kerning: auto;
    margin: 0 30px;
    text-decoration: none;

    border-bottom: ${props => (props.active ? '2px solid white' : '')};

    &:hover {
        color: #eee;
    }
`;

const HeaderItem = ({ active, delay, children }) => (
    <Translate delay={delay}>
        <Link active={active} href="#">
            {children}
        </Link>
    </Translate>
);

HeaderItem.propTypes = {
    children: PropTypes.node,
    active: PropTypes.bool,
    delay: PropTypes.number,
};

export default HeaderItem;
