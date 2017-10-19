// loading
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import { Menu, Icon } from 'antd';
import './Loading.less'
// //将store注入组件的props
const mapStateToProps = (state) => ({
    lessionList: state.lessionList
})
@connect(mapStateToProps)
export default class Nav extends Component {
    static propTypes = {
        lessionList: PropTypes.object
    }
    render() {
        const { lessionList } = this.props
        console.log(lessionList)
        return (
            <Menu>
                <Menu.Item key="mail">
                    <Icon type="mail" />Home
                </Menu.Item>
            </Menu>
        )
    }
}
