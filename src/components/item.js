
export default class Item extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            inEdit: false,
            val: ''
        };
        this.onEdit = this.onEdit.bind(this);
        this.editDone = this.editDone.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.onEnter = this.onEnter.bind(this);
    }
    // 双击编辑
    onEdit() {
        let { value } = this.props.todo;
        this.setState({
            inEdit: true,
            val: value
        }, () => this.refs.editInput.focus())   // setState更新状态是异步的；并不是说在左右生命周期阶段就能够拿到ref，至少需要在组件挂载之后（mount）再去拿ref
    }
    // 组件挂载前
    componentWillMount() {
        console.log(this.refs.editInput, 'will');
    }
    // 组件挂载后
    componentDidMount() {
        console.log(this.refs.editInput, 'did');    // 组件挂载完成后才能拿到refs
    }
    // 公用方法
    editDone() {
        let { itemEditDone, todo } = this.props;
        itemEditDone(todo, this.state.val);
        this.setState({
            inEdit: false
        })
    }
    // 更新input值
    inputChange(ev) {
        this.setState({
            val: ev.target.value
        })
    }
    // 回车保存
    onEnter(ev) {
        if(ev.keyCode!== 13) return;
        console.log('13');
        this.editDone();
    }
    render() {
        console.log(this.refs.editInput, 'render'); // 第一次拿不到，更新一下setState就可以拿到了
        let { todo, func, func1, itemEditDone } = this.props;
        let { inEdit, val } = this.state;
        let { onEdit, inputChange, onEnter } = this;
        let itemClassName = '';
        if (inEdit) itemClassName = 'editing';
        return (
            <li className={ itemClassName }>
                <div className="view">
                    <input type="checkbox" className="toggle" checked={todo.hasCompleted} onClick={event => func1(todo)}/>
                    <label onDoubleClick={ onEdit}>
                        { todo.value }
                    </label>
                    <button className="destroy" onClick={event => func(todo)}></button>
                </div>
                <input type="text" className="edit" value={val} onChange={inputChange} onKeyDown={onEnter} ref='editInput'/>
            </li>
        )
    }
};

