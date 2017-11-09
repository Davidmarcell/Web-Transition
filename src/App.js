import React, { Component } from 'react';

import styled from 'styled-components';

import LeftColumn from './components/LeftColumn';
import CenterColumn from './components/CenterColumn';
import RightColumn from './components/RightColumn';
import Fade from './components/Fade';
import FullScreenMenu from './components/FullScreenMenu';
import MockMenu from './components/MockMenu';
import Cursor from './components/Cursor';

import bg from './images/bg.jpg';

const STATES = {
    LOADING: 'LOADING',
    LOADED: 'LOADED',
    IMAGE_IS_SHOWN: 'IMAGE_IS_SHOWN',
};

const AppContainer = styled.div`
    cursor: none;
    height: 100%;
    overflow: hidden;
    position: relative;
    width: 100%;
`;

const BackgroundImage = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-drag: none;
    user-select: none;
`;

const Content = styled.div`
    display: flex;
`;

const LeftContentColumn = styled(LeftColumn)`
    flex: 1;
`;
const RightContentColumn = styled(RightColumn)`
    flex: 1;
`;

class App extends Component {
    state = { appState: STATES.LOADING, showMenu: false, showCursor: false };

    imageLoaded = () => this.setState({ appState: STATES.LOADED });

    imageShown = () => this.setState({ appState: STATES.IMAGE_IS_SHOWN });

    onCursorDown = () => {
        this.setState({
            showMenu: true,
        });
    };

    onCursorUp = () => {
        this.setState({
            showMenu: false,
        });
    };

    onMouseLeave = e => {
        this.setState({
            showMenu: false,
            showCursor: false,
        });
    };

    onMouseEnter = e => {
        this.setState({
            showCursor: true,
        });
    };

    render() {
        const { appState, showMenu, showCursor } = this.state;

        let content = null;
        if (appState === STATES.IMAGE_IS_SHOWN) {
            content = (
                <Content>
                    <LeftContentColumn />
                    <CenterColumn />
                    <RightContentColumn />
                </Content>
            );
        }

        const showImage = appState === STATES.LOADED || appState === STATES.IMAGE_IS_SHOWN;

        return (
            <AppContainer onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <Fade in={showImage} onEntered={this.imageShown}>
                    <BackgroundImage src={bg} onLoad={this.imageLoaded} draggable={false} />
                </Fade>
                {content}
                <FullScreenMenu show={showMenu}>
                    <MockMenu />
                </FullScreenMenu>
                <Cursor show={showCursor} onDown={this.onCursorDown} onUp={this.onCursorUp} />
            </AppContainer>
        );
    }
}

export default App;
