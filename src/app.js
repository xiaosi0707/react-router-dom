import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Item from 'components/item.js'
import Footer from 'components/footer.js'
import './common/style/base.css'
import './common/style/index.css'

export default class App extends React.Component{
    constructor() {
        super();
        // 初始化数据
        this.state = {
            todosData: [],
            inputVal: '',
            view: 'all' // 视图初始值
        };
        // 改变this指向
        this.handleKeyDownPost = this.handleKeyDownPost.bind(this);
        this.onDestroy = this.onDestroy.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.changeView = this.changeView.bind(this);
        this.itemEditDone = this.itemEditDone.bind(this);
    }
    // 添加
    handleKeyDownPost(ev) {
        // 可控写法
        let { inputVal } = this.state;
        let value = inputVal + '小四'; // 可控的好处可以拦截/截断。自定义
        // 判断条件
        if (ev.keyCode !== 13) return;
        // let value = ev.target.value.trim(); // 非可控写法
        if (value === '') return;

        // 创建数据对象
        let todo = {};
        todo.id = new Date().getTime();
        todo.value = value;
        todo.hasCompleted = false;

        let { todosData } = this.state;
        todosData.push(todo);

        // 更新数据
        this.setState({
            todosData
        });

        // 清空input  - 非可控
        // ev.target.value = '';
        this.setState({
            inputVal: ''
        })
    }
    // 单条删除
    onDestroy(todo) {
        let { todosData } = this.state;
        todosData = todosData.filter((item) => {
            return item.id !== todo.id
        });
        this.setState({
            todosData
        });
    }

    // 选中删除
    onClearCompleted() {
        let { todosData } = this.state;
        todosData = todosData.filter((item) => {
            return !item.hasCompleted
        });
        this.setState({
            todosData
        })
    }

    // input改值
    inputChange(ev) {
        this.setState({
            inputVal: ev.target.value
        })
    }
    // 全选状态
    toggleAll(ev) {
        let { checked } = ev.target;
        let { todosData } = this.state;
        todosData = todosData.map((item) => {
            item.hasCompleted = checked;
            return item;
        });
        this.setState({
            todosData
        })
    }

    // 单个状态
    onToggle(todo) {

        let { todosData } = this.state;
        todosData = todosData.map((item) => {
            console.log(item.id === todo.id);
            if (todo.id === item.id) {
                item.hasCompleted = !item.hasCompleted
            }
            return item
        });
        this.setState({
            todosData
        })
    }
    // 修改视图
    changeView(view) {
        this.setState({
            view
        })
    }
    // 编辑保存
    itemEditDone(todo, value) {
        let { todosData } = this.state;
        todosData = todosData.map((item) => {
            if (todo.id === item.id) {
                item.value = value
            }
            return item;
        })
    }
    render() {
        let { handleKeyDownPost, onDestroy, inputChange, onToggle, toggleAll, changeView, itemEditDone } = this;
        let { todosData, inputVal, view } = this.state;
        let leftCount = todosData.length; // 默认为所有的数据长度
        let items,
            footer = null,
            itemsBox = null;

        items = todosData.filter((item) => {
            if (item.hasCompleted) leftCount--; // 每选中一个就减少一个
            switch (view) {
                case 'active':
                    return !item.hasCompleted
                break;
                case 'completed':
                    return item.hasCompleted
                break;
                default:
                    return true;
            }
        })

        // 遍历数据填充到列表
        items = items.map((item, index) => {
            return (
                <Item todo={item} func={ onDestroy } key={index} func1={ onToggle } itemEditDone={itemEditDone}/>
            )
        })

        if (todosData.length) {
            itemsBox = (
                <section className="main">
                    <input type="checkbox" className="toggle-all" onClick={toggleAll} checked={ leftCount === 0 }/>
                    <ul className="todo-list">
                        { items }
                    </ul>
                </section>
            );
            footer = (<Footer
                {
                    ...{
                        leftCount,
                        showClearBtn: leftCount < todosData.length,
                        view,
                        changeView
                    }
                }
            />)
        }

        return (
            <div>
                <header className='header'>
                    <h1>todos</h1>
                    {/*
                        1、value不能输入任何值，受到了react的控制
                        2、value='默认值' 会报错
                        3、defaultValue='默认值' 就可以了 但是Input依旧是一个不受控的组件
                        4、改造成受控的组件
                            1、声明inputVal变量
                            2、render函数中取出变量
                            3、绑定change事件
                        5、可控好处：可以截断/拦截,value值进行自定义特殊处理等操作
                        */}
                    <input type="text" className="new-todo" onKeyDown={ handleKeyDownPost } value={ inputVal } onChange={ inputChange }/>
                </header>
                { itemsBox }
                { footer }
            </div>
        )
    }
}

function Aaa() {
    return (
        <div>我的名字是Aaa</div>
    )
};

function Bbb() {
    return (
        <div>我的名字是Bbb</div>
    )
}

/*
* render用来显示什么
* component用来匹配什么
* */
ReactDOM.render(
    <Router>
        <div>
            <Route path='/app' render={
                () => {
                    return (
                        <div>
                                当前组件是app
                                <App />
                        </div>
                    )
                }
            }></Route>
            <Route path='/aaa' component={Aaa}></Route>
            <Route path='/bbb' component={Bbb}></Route>
        </div>
    </Router>,
  document.getElementById('root')
)
