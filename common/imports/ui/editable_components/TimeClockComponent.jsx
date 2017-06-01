import React, {PropTypes as types} from 'react'
import ReactDOM from 'react-dom'
import {ApPureMixin} from 'apeman-react-mixin-pure'

/** @lends ApClock */
const ApClock = React.createClass({

  propTypes: {},

  mixins: [],

  statics: {},

  getInitialState () {
    return {}
  },

  getDefaultProps () {
    return {}
  },

  render () {
    const s = this,
      { props } = s

    return (
      <div className={'ap-clock '+props.className }>
        { props.children }
      </div>
    )
  },

})

/** @lends ApAnalogClockLetter */
const ApAnalogClockLetter = React.createClass({
  propTypes: {
    angle: types.number,
    mode: types.number
  },
  getDefaultProps () {
    return {
      angle: 0,
      mode: 0
    }
  },
  render () {
    const s = this
    let { props } = s

    let { angle, mode } = props

    let containerStyle = { transform: `rotate(${angle}deg)` }
    let letterStyle = { transform: `rotate(${angle * -1}deg)` }
    return (
      <span className="ap-analog-letter"
        style={ containerStyle }>
          <span className={`ap-analog-letter-title clock-mode-${mode}`} style={ letterStyle }>
          </span>
      </span>
    )
  }
})

/** @lends ApAnalogClockHand */
const ApAnalogClockHand = React.createClass({
  propTypes: {
    angle: types.number,
    width: types.number,
    heightRate: types.number
  },
  getDefaultProps () {
    return {
      angle: 0,
      width: 24,
      heightRate: 1
    }
  },
  render () {
    const s = this,
      { props } = s

    let className = props.className,
      angle = props.angle,
      heightRate = props.heightRate,
      width = props.width;

    return (
      <div className={'ap-analog-clock-hand '+ className}
           style={ {transform: `rotate(${angle}deg)`} }>
        <div className="ap-analog-clock-hand-bar-container"
             style={ {top: `${(1 - heightRate) * 100}%`} }>
          <div className="ap-analog-clock-hand-bar"
               style={ {width: `${width}px`} }></div>
        </div>
      </div>
    )
  }
})

/** @lends ApAnalogClock */
const ApAnalogClock = React.createClass({
  mixins: [
    ApPureMixin
  ],
  statics: {
    _angleForValue (value, max) {
      let rate = (value % max) / max
      return Math.round(rate * 360)
    },
    hourHandAngle (date) {
      let hours = date.getHours()
      return ApAnalogClock._angleForValue(hours, 12)
    },
    minuteHandAngle (date) {
      let minutes = date.getMinutes()
      return ApAnalogClock._angleForValue(minutes, 60)
    },
    secondHandAngle (date) {
      let seconds = date.getSeconds()
      return ApAnalogClock._angleForValue(seconds, 60)
    },
    letterAngle (i, count) {
      return ApAnalogClock._angleForValue(i, count)
    }
  },

  getInitialState () {
    return {
      hour: 0,
      minute: 0,
      second: 0,
      size: 84,
      boardLetters: ['|','-','|','-']
    }
  },

  render () {
    const s = this
    let { state, props } = s

    let letters = state.boardLetters.map((letter, i, letters) => {
      let angle = ApAnalogClock.letterAngle(i, letters.length)
      return (
        <ApAnalogClockLetter key={ `ap-analog-letter-` + i }
                             mode={ i%2 }
                             angle={i*90} />
      )
    })

    let size = state.size

    let boardStyle = {
      width: size,
      height: size
    }

    let screwSize = 9

    return (
      <ApClock className={'ap-analog-clock'}>
        <div className="ap-analog-clock-board" style={boardStyle}>
          <div className="ap-analog-clock-board-inner">
            <ApAnalogClockHand className="ap-analog-clock-hand-hour" width={ 4 } heightRate={ 0.9 }
                               angle={ state.hour }/>
            <ApAnalogClockHand className="ap-analog-clock-hand-minute" width={ 4 } heightRate={ 1.2 }
                               angle={ state.minute }/>
            <ApAnalogClockHand className="ap-analog-clock-hand-second" width={ 2 } heightRate={ 1.3 }
                               angle={ state.second }/>
          </div>
          <div>
            {letters}
          </div>
          <div className="ap-analog-clock-screw-container">
            <div className="ap-analog-clock-screw"
                 style={ {width: screwSize, height: screwSize, bottom: -screwSize -1} }
                 ref="screw"></div>
          </div>
        </div>
      </ApClock>
    )
  },

  // --------------------
  // Lifecycle
  // --------------------

  // create new Date object for different city
  calculateTime() {
    const { office } = this.props;

    const date = new Date()
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    return new Date(utc + (3600000*parseFloat(office.timezone||0)));
  },

  componentWillMount () {
    const s = this
    s._looping = true
  },

  componentDidMount () {
    const s = this
    let { props } = s

    function _loop () {
      if (!s._looping) {
        return
      }
      let now = s.calculateTime()
      s.setState({
        hour: ApAnalogClock.hourHandAngle(now),
        minute: ApAnalogClock.minuteHandAngle(now),
        second: ApAnalogClock.secondHandAngle(now)
      })
      window.requestAnimationFrame(_loop)
    }

    window.addEventListener('resize', s.resizeClock)
    _loop()
    s.resizeClock()
  },

  componentWillUnmount () {
    const s = this
    window.removeEventListener('resize', s.resizeClock)
    s._looping = false
  },

  resizeClock () {
    const s = this
    let elm = ReactDOM.findDOMNode(s)
    let size = Math.min(elm.offsetWidth, elm.offsetHeight)
    s.setState({
      size: size
    })
  }
})

export default ApAnalogClock
