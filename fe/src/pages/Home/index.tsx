// 此页面为主页页面
import { FC,useEffect,useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {ExclamationCircleOutlined} from '@ant-design/icons'
import { Modal, message,Popover } from 'antd'
import axios from "axios"
import './index.css'
const Home:FC = ()=>{
    const [username,setUsername] = useState('')
    const [log,setLog] = useState(false)
    const [open,setOpen] = useState(false)
    // 定义退出modal
    const [modal_logout, contextHolder] = Modal.useModal()
    // 定义注销modal
    const [modal_unregister, contextHolders] = Modal.useModal()
    // showmodal函数
    // 退出登录，应弹出窗口提示,确认后退出
    const showmodal_logout = () => {
        modal_logout.confirm({
        title: '警告',
        icon: <ExclamationCircleOutlined />,
        content: '确认退出登录吗',
        okText: '确认',
        cancelText: '取消',
        onOk:()=>{
            logout()
        },
        })
    }
    // 注销账户，应弹出窗口提示,确认后注销
    const showmodal_unregister = () => {
        setOpen(false)
        modal_unregister.confirm({
        title: '警告',
        icon: <ExclamationCircleOutlined />,
        content: '确认注销该账户吗,注销后该账户不再存在!',
        okText: '确认',
        cancelText: '取消',
        onOk:()=>{
            unregister()
        },
        })
    }
    // popover函数
    const content = (
        <div>
          <div style={{marginTop:'5px'}}>
            <div className="unregister" onClick={showmodal_unregister}>注销账户</div>
            {contextHolders}
          </div>
        </div>
    )
    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen)
    }
    // 使用axios获得用户名
    useEffect(()=>{
        axios.get('/api/user/index')
        .then((res)=>{
            // 依据返回的code确定三个状态
            const code = res.data.data.code
            if(code === 1){
                const name = res.data.data.username
                // 设置用户名
                setUsername(name)
                setLog(true)
            }
        })
    },[])
    // 注销函数
    const unregister = ()=>{
        axios.post('/api/user/unregister')
        .then(()=>{
            setLog(false)
            setUsername('')
            message.success('已注销当前账户')
        })
    }
    // 退出函数
    const logout = () =>{
        axios.post('/api/user/logout')
        .then(()=>{
            setLog(false)
            setUsername('')
            message.success('已退出当前账户')
        })
    }
    return (
        <div>
            {/* head */}
            <nav>
                <div className="middle">
                    <div id="nav_productName">
                        {/* <img id="nav_image" src="./Home_nav_middle.png" alt="nav"/> */}
                        <div>
                            待取名
                        </div>
                    </div>
                </div>
                    <div className="right">
                    <div id="nav_op3" className="nav_op" style={{display:log?'flex':'none'}}>
                        {/* 下拉菜单，个人中心或者注销账户 */}
                        <Popover content={content} open={open} trigger="hover" onOpenChange={handleOpenChange}>
                            <a onClick={(e) => e.preventDefault()}>
                                {username}
                            </a>
                        </Popover>
                    </div>
                    <div id="nav_op4"  style={{display:log?'flex':'none'}}>
                        <button onClick={showmodal_logout} className="linktoo">退出登录</button>
                        {contextHolder}
                    </div>
                    <div id="nav_op3" className="nav_op" style={{display:log?'none':'flex'}}>
                        <Link to="/Login" className="login">登录</Link>
                    </div>
                    <div id="nav_op4" className="nav_op" style={{display:log?'none':'flex'}}>
                        <Link to="/Register" className="login">注册</Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default Home