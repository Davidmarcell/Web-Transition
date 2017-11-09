import React from 'react';
import PropTypes from 'prop-types';

import styled, { keyframes, css } from 'styled-components';

import Fade from '../Fade';

import cursorIcon from './cursor.png';

// Cursor scale duration
const SCALE_DURATION = 250;

const MoveContainer = styled.div.attrs({
    style: ({ x, y }) => ({
        transform: `translate(${x}px, ${y}px)`,
    }),
})`
    position: absolute;
    left: 0;
    top: 0;
    will-change: transform;
    width: 30px;
    heigth: 30px;
    pointer-events: none;
`;

const scale = keyframes`
    0% {
        transform: translate(-50%, -50%) scale(1);
    }

    50% {
        transform: translate(-50%, -50%) scale(0.3);
    }

    100% {
        transform: translate(-50%, -50%) scale(1);
    }
`;

const Circle = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 15px;
    border: 1px solid white;

    transform: translate(-50%, -50%);
    will-change: opacity transform;
    opacity: 1;
    ${props =>
        props.active &&
        css`
            animation: ${scale} ${SCALE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0;
            transition: opacity 50ms linear 250ms;
        `};
`;

const Icon = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 52px;
    background: url('${cursorIcon}') 50% 50% no-repeat;
    background-size: contain;
    user-select: none;
`;

// Circle circle with press animation and delayed onDown
class Cursor extends React.Component {
    state = { x: 0, y: 0 };
    _timer = null;

    componentDidMount = () => {
        window.addEventListener('mousedown', this.onMouseDown);
        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('mouseup', this.onMouseUp);
    };

    componentWillUnmount = () => {
        if (this._timer) {
            clearTimeout(this._timer);
            this._timer = null;
        }

        window.removeEventListener('mousedown', this.onMouseDown);
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('mouseup', this.onMouseUp);
    };

    onMouseMove = e => {
        this.setState({ x: e.clientX, y: e.clientY });
    };

    onMouseDown = e => {
        if (this._timer) {
            clearTimeout(this._timer);
            this._timer = null;
        }

        this._timer = setTimeout(() => {
            this.props.onDown();
        }, SCALE_DURATION);

        this.setState({ active: true });
    };

    onMouseUp = e => {
        if (this._timer) {
            clearTimeout(this._timer);
            this._timer = null;
        }

        this.props.onUp();

        this.setState({ active: false });
    };

    render() {
        const { show } = this.props;

        if (!show) {
            return <div />;
        }

        const { x, y, active } = this.state;

        return (
            <MoveContainer x={x} y={y}>
                <Circle active={active} />
                <Fade in={active}>
                    <Icon />
                </Fade>
            </MoveContainer>
        );
    }
}

Cursor.propTypes = {
    show: PropTypes.bool,
    onDown: PropTypes.func.isRequired,
    onUp: PropTypes.func.isRequired,
};

export default Cursor;
