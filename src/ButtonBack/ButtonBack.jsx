import React from 'react';
import PropTypes from 'prop-types';
import { CarouselPropTypes, cn } from '../helpers';
import s from './ButtonBack.css';

export default class ButtonBack extends React.Component {
  static propTypes = {
    carouselStore: PropTypes.object.isRequired,
    children: CarouselPropTypes.children.isRequired,
    className: PropTypes.string,
    currentSlide: PropTypes.number.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    step: PropTypes.number.isRequired,
  };


  static defaultProps = {
    className: null,
    disabled: null,
    onClick: null,
  }

  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.state = {
      disabled: ButtonBack.setDisabled(props.disabled, props.currentSlide),
    };
  }

  static setDisabled(disabled, currentSlide) {
    if (disabled !== null) return disabled;
    if (currentSlide === 0) return true;
    return false;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const disabled = ButtonBack.setDisabled(nextProps.disabled, nextProps.currentSlide);
    if (prevState.disabled !== disabled) {
      return { disabled };
    }
    return null;
  }

  handleOnClick(ev) {
    const { carouselStore, currentSlide, onClick, step } = this.props;
    const newCurrentSlide = Math.max(
      currentSlide - step,
      0,
    );
    carouselStore.setStoreState({
      currentSlide: newCurrentSlide,
    }, onClick !== null && onClick.call(this, ev));
  }

  render() {
    const {
      carouselStore, className, currentSlide, disabled, onClick, step, ...props
    } = this.props;

    const newClassName = cn([
      s.buttonBack,
      'carousel__back-button',
      className,
    ]);

    return (
      <button
        aria-label="previous"
        className={newClassName}
        onClick={this.handleOnClick}
        disabled={this.state.disabled}
        {...props}
      >{this.props.children}</button>
    );
  }
}
