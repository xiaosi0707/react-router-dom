// export default class Footer extends React.Component{
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         let { leftCount, showClearBtn, view, changeView } = this.props;
//         let clearBtn = null;
//         if (showClearBtn) clearBtn = (
//             <button className="clear-completed">
//                 clear all completed
//             </button>
//         )
//         return (
//             <footer className="footer">
//                 <span className="todo-count">
//                     <strong>{ leftCount }</strong>
//                     <span>item left</span>
//                 </span>
//                 <ul className="filters">
//                     <li>
//                         <a href="jvascript:;" onClick={ event => changeView('all') } className={ view === 'all' ? 'selected' : ''}>All</a>
//                     </li>
//                     <li>
//                         <a href="jvascript:;" onClick={ event => changeView('active') } className={ view === 'active' ? 'selected' : ''}>Active</a>
//                     </li>
//                     <li>
//                         <a href="jvascript:;" onClick={ event => changeView('completed') } className={ view === 'completed' ? 'selected' : ''}>Completed</a>
//                     </li>
//                 </ul>
//                 { clearBtn }
//             </footer>
//         )
//     }
// }

/*
* 无状态函数式组件 - 为可复用而生
*   无生命周期
*   无state
*
*   如果需要管理state状态怎么办？redux
*
*   只是用来显示
*   react推荐的
*   尽量让底层的组件编程无状态的函数式组件，只是用来显示数据，我们尽量把数据操作尽可能放在顶层，然后把数据从顶层传递到底层
* */
export default function Footer(props) {

    let { leftCount, showClearBtn, view, changeView } = props;
    let clearBtn = null;
    if (showClearBtn) clearBtn = (
        <button className="clear-completed">
            clear all completed
        </button>
    )
    return (
        <footer className="footer">
                <span className="todo-count">
                    <strong>{ leftCount }</strong>
                    <span>item left</span>
                </span>
            <ul className="filters">
                <li>
                    <a href="jvascript:;" onClick={ event => changeView('all') } className={ view === 'all' ? 'selected' : ''}>All</a>
                </li>
                <li>
                    <a href="jvascript:;" onClick={ event => changeView('active') } className={ view === 'active' ? 'selected' : ''}>Active</a>
                </li>
                <li>
                    <a href="jvascript:;" onClick={ event => changeView('completed') } className={ view === 'completed' ? 'selected' : ''}>Completed</a>
                </li>
            </ul>
            { clearBtn }
        </footer>
    )
}