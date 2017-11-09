import React from 'react';
import PropTypes from 'prop-types';

import { Transition } from 'react-transition-group';
import styled from 'styled-components';

const Container = styled.div`
    overflow: hidden;
`;

const TranslatedContainer = styled.div`
    will-change: opacity, transform;
`;

const TRANSLATE_DIRECTION = {
    LEFT_TO_RIGHT: 'LEFT_TO_RIGHT',
    RIGHT_TO_LEFT: 'RIGHT_TO_LEFT',
    TOP_TO_BOTTOM: 'TOP_TO_BOTTOM',
    BOTTOM_TO_TOP: 'BOTTOM_TO_TOP',
};

// Translate + fade transition
class Translate extends React.Component {
    static defaultProps = {
        delay: 300,
        direction: TRANSLATE_DIRECTION.TOP_TO_BOTTOM,
        duration: 400,
    };

    state = { in: false };
    _timer = null;

    componentDidMount() {
        this._timer = setTimeout(() => {
            this._timer = null;
            this.setState({ in: true });
        }, this.props.delay);
    }

    componentWillUnmount() {
        if (this._timer) {
            clearTimeout(this._timer);
            this._timer = null;
        }
    }

    render() {
        const { in: inState } = this.state;

        const { direction, duration } = this.props;

        let translate = '';
        let fromValue = '';

        switch (direction) {
            case TRANSLATE_DIRECTION.TOP_TO_BOTTOM:
                translate = 'translateY';
                fromValue = '-100';
                break;

            case TRANSLATE_DIRECTION.BOTTOM_TO_TOP:
                translate = 'translateY';
                fromValue = '100';
                break;

            case TRANSLATE_DIRECTION.LEFT_TO_RIGHT:
                translate = 'translateX';
                fromValue = '-100';
                break;

            case TRANSLATE_DIRECTION.RIGHT_TO_LEFT:
                translate = 'translateX';
                fromValue = '100';
                break;

            default:
                break;
        }

        const defaultStyle = {
            opacity: 0,
            transition: `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1),
                         opacity ${duration}ms linear ${duration * 0.3}ms`,
        };

        const transitionStyle = {
            entering: { opacity: 0, transform: `${translate}(${fromValue}%)` },
            entered: { opacity: 1, transform: `${translate}(0)` },
        };

        return (
            <Container>
                <Transition in={inState} timeout={1.3 * duration}>
                    {state => (
                        <TranslatedContainer style={{ ...defaultStyle, ...transitionStyle[state] }}>
                            {this.props.children}
                        </TranslatedContainer>
                    )}
                </Transition>
            </Container>
        );
    }
}

Translate.propTypes = {
    children: PropTypes.element,
    delay: PropTypes.number.isRequired,
    direction: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
};

export { TRANSLATE_DIRECTION };
export default Translate;
