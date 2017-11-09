import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Transition, TransitionGroup } from 'react-transition-group';

import styled from 'styled-components';

import DelayedFade from './DelayedFade';

const Container = styled.div`
    background: white;
    display: flex;
    height: 100%;
    overflow: hidden;
    width: 100%;
    user-select: none;
    position: relative;
`;

const LeftColumn = styled.div`
    flex: 1;
`;

const CenterColumn = styled.div`
    align-items: center;
    display: flex;
    font-family: 'hk_grotesk_prosemibold', Arial, Helvetica, sans-serif;
    font-kerning: auto;
    font-size: 9px;
    letter-spacing: 2px;
    margin: 0 50px;
    text-transform: uppercase;
`;

const MenuItems = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 120vh;
    margin-top: -10vh;
`;

const MenuItem = styled(DelayedFade)`
    align-items: center;
    display: flex;
    flex: 1;
    font-family: 'din';
    font-size: 85px;
    text-transform: uppercase;
`;

const DURATION = 150;

const defaultStyle = {
    transition: `opacity ${DURATION}ms ease-in-out`,
    opacity: 0,
};

const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
};

// Sample menu implementation with cascade projects appearance
const MockMenu = props => {
    function onEntered() {
        props.onChange(true);
    }

    function onExited() {
        props.onChange(false);
    }

    return (
        <Transition in={props.show} enter={false} timeout={DURATION} onExited={onExited}>
            {state => {
                return (
                    <Container
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state],
                        }}
                    >
                        <LeftColumn />
                        <CenterColumn>
                            <DelayedFade delay={0} in={props.show}>
                                Go to this project:
                            </DelayedFade>
                        </CenterColumn>
                        <MenuItems>
                            <MenuItem delay={50} in={props.show}>
                                THE BALVENIE
                            </MenuItem>
                            <MenuItem delay={90} in={props.show}>
                                Ford Ecosport
                            </MenuItem>
                            <MenuItem delay={140} in={props.show}>
                                Mr. Robot
                            </MenuItem>
                            <MenuItem delay={180} in={props.show}>
                                Snapchat Twilight
                            </MenuItem>
                            <MenuItem delay={220} in={props.show} onEntered={onEntered}>
                                The Handmaid’s Tale
                            </MenuItem>
                        </MenuItems>;
                    </Container>
                );
            }}
        </Transition>
    );
};

MockMenu.propTypes = {
    onChange: PropTypes.func,
    show: PropTypes.bool,
};

export default MockMenu;
