import React, { Component } from 'react'
import { BarLoader } from 'react-spinners'

class RoundedButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    
    return (
      <div className='roundedBtn' style={{ height: 34, borderRadius: '17px', overflow: 'hidden' }}>
        <BarLoader
          color={this.props.barColor}
          loading={this.props.loading || false}
          width={100}
          widthUnit={'%'}
        />
        <button
          ref='signButton'
          className="btn btn-primary btn btn-block"
          disabled={this.props.loading}
          type="submit"
        // onclick={this.props.onPress}
        >
          {this.props.text}
        </button>
      </div>
    )
  }
}

export default RoundedButton
