import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { appStart } from '../actions/common'
import Loading from '../components/Loading'
import { enableLifeCycleLog } from '../constants'
import './App.less'

const mapStateToProps = (state) => ({ })
// const mapStateToProps = (state) => ({ lessonList: state.lessonList })

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        appStart,
    }, dispatch)
})
@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
    static propTypes = {
        children: PropTypes.element,
        actions: PropTypes.shape({
            appStart: PropTypes.func.isRequired,
        }).isRequired
    }
    componentWillMount(){
        enableLifeCycleLog && console.warn('%cApp -- will Mount', 'color: #930')
        this.props.actions.appStart();
    }
    componentDidMount(){
        enableLifeCycleLog && console.warn('%cApp -- did Mount', 'color: #930',  { $wrap: this.$warp })
    }
    componentWillUpdate(){
        enableLifeCycleLog && console.warn('%cApp -- will Update', 'color: #930')
    }
    componentDidUpdate(){
        enableLifeCycleLog && console.warn('%cApp -- did Update', 'color: #930')
    }
    componentWillReceiveProps(){
        enableLifeCycleLog && console.warn('%cApp -- will ReceiveProps', 'color: #930')
    }
    componentWillUnmount(){
        enableLifeCycleLog && console.warn('%cApp -- will Unmount', 'color: #930')
    }
    render() {
        enableLifeCycleLog && console.warn('%cApp -- did render', 'color: #930')
        return (
            <div className="wrap" ref={(e) => { this.$warp = e }}>
                {this.props.children}
                <Loading />
            </div>
        )
    }
}
