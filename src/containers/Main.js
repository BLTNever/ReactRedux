//目录container
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Menu, Icon, Card } from 'antd'
import { enableLifeCycleLog } from '../constants'
import './Main.less'

const mapStateToProps = (state) => ({
    lessonList: state.lessonList,
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({

    }, dispatch)
})
@connect(mapStateToProps, mapDispatchToProps)
export default class Main extends Component {
    static propTypes = {
        lessonList: PropTypes.object.isRequired
    }
    constructor(props){
        super(props);
        this.state = {
            selectedMenuIndex: 0
        }
        this.handleMenuClick = this.handleMenuClick.bind(this)
    }
    componentWillMount(){
        // this.setState({ selectedMenuIndex: 1 });
        enableLifeCycleLog && console.warn('%cMain -- will Mount', 'color: #666')
        /**
         * 调初始化action等更新组件，放这里；无法获取到dom（还未rendered）
         */
    }
    componentDidMount(){
        enableLifeCycleLog && console.warn('%cMain -- did Mount', 'color: #666')
        /**
         * 如需dom操作，在这里， 不推荐 更新组件
         */
    }
    componentWillUpdate(){
        enableLifeCycleLog && console.warn('%cMain -- will Update', 'color: #666')
        /**
         * 可以dom操作，禁止 更新组件
         */
    }
    componentDidUpdate(){
        enableLifeCycleLog && console.warn('%cMain -- did Update', 'color: #666')
        /**
         * 可以dom操作，不推荐 更新组件
         */
    }
    componentWillReceiveProps(){
        enableLifeCycleLog && console.warn('%cMain -- will ReceiveProps', 'color: #666')
        /**
         * react给予的下次props变更时更新组件 地方
         */
    }
    shouldComponentUpdate(){
        return true
        /**
         * 未出现性能瓶颈，不要使用
         */
    }
    componentWillUnmount(){
        enableLifeCycleLog && console.warn('%cMain -- will Unmount', 'color: #666')
        /**
         * 接触dom时间绑定，清空数据等
         */
    }
    render() {
        enableLifeCycleLog && console.warn('%cMain -- did render', 'color: #666')
        const { lessonList } = this.props
        const { selectedMenuIndex } = this.state
        return (
            <div className="page page-menu">

                <Menu mode="horizontal"
                    onClick={this.handleMenuClick}
                    defaultSelectedKeys={[selectedMenuIndex.toString()]}
                >
                    {lessonList.payload.map((lesson, index) => (
                        <Menu.Item key={index}>
                            <Icon type="mail" />{lesson.name}
                        </Menu.Item>
                    ))}
                </Menu>
                <br />
                <br />
                <br />
                <br />
                <Card title={`当前选择了第${selectedMenuIndex}个`} bordered={false}>
                    <p>当前选择的是第{selectedMenuIndex}个</p>
                    <p>名称：{lessonList.payload[selectedMenuIndex] && lessonList.payload[selectedMenuIndex].name}</p>
                    <p>Card content</p>
                </Card>
            </div>
        )
    }
    handleMenuClick(e){
        const selectedMenuIndex = e.key
        this.setState({
            selectedMenuIndex
        })
    }
}
