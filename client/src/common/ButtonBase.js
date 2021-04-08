import React, { Component } from "react";
import PropTypes from "prop-types";
//import audio from "../../utils/audio";

export default class ButtonBase extends Component {

    /** Init state */
    state = { classAnimation: '' };

    /**
     * Mounted component
     */
    /* componentDidMount() {
        this.elementRef.addEventListener('animationend', this.addEventAnimationEnd);
    } */

    /**
     * Destroyed component
     */
    /* componentWillUnmount() {
        this.elementRef.removeEventListener('animationend', this.addEventAnimationEnd);
    } */

    /**
     * Add Event
     */
   /*  addEventAnimationEnd = () => {
        this.setState({
            classAnimation: ''
        })
    } */

    /**
     * Play animation
     */
    /* runAnimation = () => {
        this.setState({
            classAnimation: 'animated-btn'
        });
    } */

    /**
     * Play audio
     */
    // runAudio = () => {
    //     const isAudio = audio.getAudioLocal();
    //     if (isAudio) {
    //         new Audio(require('../../audios/sell3.mp3')).play();
    //     }
    // }

    /**
     * Handler clicked button
     */
    handleEvent = (e) => {
        const { disabled, onClick, onChange } = this.props;
        if (!disabled) {
            //this.runAudio();
            //this.runAnimation();
            onClick(e);
            onChange(e);
        }
    }

    render() {
        const { className, title, children, type } = this.props;
        return (
            <button
                title={title}
                type={type}
                className={className}
                onClick={this.handleEvent}
                ref={ref => this.elementRef = ref}
            >
                {children}
            </button>
        )
    }

    static propTypes = {
        onClick: PropTypes.func,
        onChange: PropTypes.func
    };

}

ButtonBase.defaultProps = {
    onClick: () => { },
    onChange: () => { }
};