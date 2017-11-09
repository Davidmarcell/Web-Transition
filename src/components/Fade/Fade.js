import React from 'react';
import PropTypes from 'prop-types';

import Transition from 'react-transition-group/Transition';

const DURATION = 300;

const defaultStyle = {
    transition: `opacity ${DURATION}ms ease-in-out`,
    opacity: 0,
};

const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
};

// Simple fade transition
const Fade = ({ in: inProp, children, onEntered }) => (
    <Transition in={inProp} timeout={DURATION} onEntered={onEntered} appear>
        {state => (
            <div
                style={{
                    ...defaultStyle,
                    ...transitionStyles[state],
                }}
            >
                {children}
            </div>
        )}
    </Transition>
);

Fade.propTypes = {
    children: PropTypes.node,
    onEntered: PropTypes.func,
    in: PropTypes.bool,
};

export default Fade;
