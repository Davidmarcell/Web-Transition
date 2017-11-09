import React from 'react';
import PropTypes from 'prop-types';

import Transition from 'react-transition-group/Transition';

const DURATION = 200;

const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
};

// Fade transition with a delay
function DelayedFade({ className, in: inState, delay, children, onEntered }) {
    const defaultStyle = {
        opacity: 0,
        transition: `opacity ${DURATION}ms linear ${delay}ms`,
    };

    return (
        <Transition in={inState} timeout={DURATION + delay} onEntered={onEntered}>
            {state => (
                <div
                    className={className}
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
}

DelayedFade.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    delay: PropTypes.number,
    in: PropTypes.bool,
    onEntered: PropTypes.func,
};

export default DelayedFade;
