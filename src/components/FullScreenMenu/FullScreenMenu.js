import React, { Component } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

import ExpandableCircle from './ExpandableCircle';

const Container = styled.div`
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    pointer-events: none;
`;

const FullScreenExpandableCircle = styled(ExpandableCircle)`
    left: 0;
    position: absolute;
    top: 0;
`;

const STATE = {
    HIDDEN: 0,
    CIRCLE_EXPANDING: 1,
    CONTENT_APPEARING: 2,
    SHOWN: 3,
    CONTENT_HIDING: 4,
    CIRCLE_COLLAPSING: 5,
};

// Menu container with expandable circle animation from the current mouse point.
// Content passed as a child and should provide props: show, onChange
class FullScreenMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cursor: {
                x: 0,
                y: 0,
            },
            state: STATE.HIDDEN,
            window: {
                width: window.innerWidth,
                height: window.innerHeight,
            },
        };
    }

    componentDidMount = () => {
        window.addEventListener('mousemove', this.onMouseMove);
    };

    componentWillUnmount = () => {
        window.removeEventListener('mousemove', this.onMouseMove);
    };

    componentWillReceiveProps = nextProps => {
        if (!this.props.show && nextProps.show) {
            // From hide to show
            if (this.state.state === STATE.HIDDEN || this.state.state === STATE.CIRCLE_COLLAPSING) {
                this.setState({ state: STATE.CIRCLE_EXPANDING });
            } else if (this.state.state === STATE.CONTENT_HIDING) {
                this.setState({ state: STATE.CONTENT_APPEARING });
            }
        } else if (this.props.show && !nextProps.show) {
            // From show to hide
            if (this.state.state === STATE.CIRCLE_EXPANDING) {
                this.setState({ state: STATE.CIRCLE_COLLAPSING });
            } else if (
                this.state.state === STATE.CONTENT_APPEARING ||
                this.state.state === STATE.SHOWN
            ) {
                this.setState({ state: STATE.CONTENT_HIDING });
            }
        }
    };

    onMouseMove = e => {
        this.setState({
            cursor: {
                x: e.pageX,
                y: e.pageY,
            },
        });
    };

    onExpandableCircleChange = show => {
        if (show) {
            this.setState({ state: STATE.CONTENT_APPEARING });
            return;
        }

        this.setState({ state: STATE.HIDDEN });
    };

    onContentChange = show => {
        if (show) {
            this.setState({ state: STATE.SHOWN });
            return;
        }

        this.setState({ state: STATE.CIRCLE_COLLAPSING });
    };

    render() {
        let showCircle;
        let showContent;
        switch (this.state.state) {
            case STATE.CONTENT_APPEARING:
            case STATE.SHOWN:
                showCircle = true;
                showContent = true;
                break;

            case STATE.CIRCLE_EXPANDING:
            case STATE.CONTENT_HIDING:
                showCircle = true;
                showContent = false;
                break;

            case STATE.CIRCLE_COLLAPSING:
            case STATE.HIDDEN:
                showCircle = false;
                showContent = false;
                break;

            default:
                return null;
        }

        const content = React.cloneElement(this.props.children, {
            show: showContent,
            onChange: this.onContentChange,
        });

        return (
            <Container>
                <FullScreenExpandableCircle
                    show={showCircle}
                    width={this.state.window.width}
                    height={this.state.window.height}
                    point={this.state.cursor}
                    onChange={this.onExpandableCircleChange}
                />
                {content}
            </Container>
        );
    }
}

FullScreenMenu.propTypes = {
    children: PropTypes.element,
    show: PropTypes.bool,
};

export default FullScreenMenu;
