import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Circle from './Circle';

// Internal component state
const STATE = {
    EXPAND: 0,
    COLLAPSE: 1,
};

// Animated expandable circle at point (x, y)
class ExpandableCircle extends Component {
    _raf = null;

    componentWillUnmount = () => {
        if (this._raf) {
            cancelAnimationFrame(this._raf);
            this._raf = null;
        }
    };

    componentWillReceiveProps = nextProps => {
        if (!this.props.show && nextProps.show) {
            this._state = STATE.EXPAND;
        } else if (this.props.show && !nextProps.show) {
            this._state = STATE.COLLAPSE;
        } else {
            return;
        }

        if (!this._raf) {
            this._raf = requestAnimationFrame(this._draw);
        }
    };

    shouldComponentUpdate = () => {
        return false;
    };

    _draw = timestamp => {
        let needMore = true;
        if (this._state === STATE.EXPAND) {
            if (!this._circle) {
                this._circle = new Circle(this._canvas, this.props.point.x, this.props.point.y, 0);
            }

            needMore = this._circle.expand(timestamp);
        } else if (this._state === STATE.COLLAPSE) {
            if (!this._circle) {
                this._circle = new Circle(this._canvas, this.props.point.x, this.props.point.y, 1);
            }

            needMore = this._circle.collapse(timestamp);
        }

        if (!needMore) {
            this._raf = null;
            this.props.onChange(this._circle._progress === 1);
            this._circle = null;

            return;
        }

        this._raf = requestAnimationFrame(this._draw);
    };

    render() {
        return (
            <canvas
                className={this.props.className}
                width={this.props.width}
                height={this.props.height}
                ref={canvas => {
                    this._canvas = canvas;
                }}
            />
        );
    }
}

ExpandableCircle.propTypes = {
    className: PropTypes.string,
    height: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    point: PropTypes.PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
    show: PropTypes.bool,
    width: PropTypes.number,
};

export default ExpandableCircle;
