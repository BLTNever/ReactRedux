// loading
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import './Loading.less'
// //将store注入组件的props
const mapStateToProps = (state) => ({
    loading: state.loading
})
// //将action与dispatch进行绑定并注入组件的props
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
    }, dispatch)
})
@connect(mapStateToProps, mapDispatchToProps)
export default class Loading extends Component {
    static propTypes = {
        loading: PropTypes.bool.isRequired
    }
    render() {
        const { loading } = this.props
        return <div className={`common-loading ${loading?'active':''}`}></div>
    }
}
