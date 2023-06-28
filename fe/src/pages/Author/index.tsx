// 此页面为作者(介绍)页面
import { FC,useEffect,useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {ExclamationCircleOutlined} from '@ant-design/icons'
import { Modal, message,Popover} from 'antd'
import 'swiper/swiper-bundle.css'
import axios from "axios"
import './index.css'
const Author:FC = ()=>{
    const nav = useNavigate()
    const [username,setUsername] = useState('')
    const [open,setOpen] = useState(false)
    const [log,setLog] = useState(false)
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
            <Link to="/Personal" className="personal">个人中心</Link>
            <div style={{marginTop:'5px'}}>
                <div onClick={showmodal_logout} className="unregister">退出登录</div>
                {contextHolder}
            </div>
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
            // setLog(false)
            setUsername('')
            message.success('已注销当前账户')
            nav('/')
        })
    }
    // 退出函数
    const logout = () =>{
        axios.post('/api/user/logout')
        .then(()=>{
            // setLog(false)
            setUsername('')
            message.success('已退出当前账户')
            nav('/')
        })
    }
    // 跳到主页面
    const jumptoindex = ()=>{
        nav('/')
    }
    return (
        <div>
            {/* head */}
            <header className={"header-area header-sticky background-header"}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav className="main-nav" style={{margin:'0 3%'}}>
                                <div id="nav_productName" onClick={jumptoindex}>
                                    <img id="nav_image" style={{width:'45px'}} src="./nav.png" alt="nav"/>
                                    <div style={{marginLeft:'10px'}}>
                                        <div style={{color:'#7453FC',fontStyle:'italic'}}>
                                            Better Prompt
                                        </div>
                                        <div style={{ fontStyle:'italic',fontSize:'15px'}}>
                                            Faster and more efficient
                                        </div>
                                    </div>
                                </div>
                                <ul className="nav">
                                    <li>
                                        <Link to='/'>首页</Link>
                                    </li>
                                    {
                                        log?
                                        <li>
                                            <Link to='/Home'>继续使用</Link>
                                        </li>
                                        :
                                        <li>
                                            <Link to='/Login'>登录</Link>
                                        </li>
                                    }
                                    {
                                        log?
                                        <></>
                                        :
                                        <li>
                                            <Link to='/Login'>注册</Link>
                                        </li>
                                    }
                                    <li>
                                        <Link to='/Author' className="active">关于我们</Link>
                                    </li>
                                    <li>
                                        <Popover content={content} open={open} trigger="hover" onOpenChange={handleOpenChange}>
                                            <a onClick={(e) => e.preventDefault()}>
                                                {username}
                                            </a>
                                        </Popover>
                                    </li>
                                </ul>   
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            <div className="page-heading">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h6>Better Prompt</h6>
                            <h2>View Details For Us</h2>
                        </div>
                    </div>
                </div>
            </div>
            {/* 项目介绍 */}
            <div className="author-page">

            </div>
            {/* 作者介绍 */}
            <div className="create-nft">
                <div className="container" style={{marginLeft:'5%'}}>
                    <div style={{display:'flex'}}>
                        <div className="col-lg-8" >
                            <div className="section-heading">
                                <div className="line-dec"></div>
                                <h2>View Details For Author.</h2>
                            </div>
                        </div>
                        <div className="address">
                            <div className="main-button">
                                <a target="_blank" rel="noopener noreferrer" href="https://github.com/reatcat/baidu_api">我们的项目地址</a>
                            </div>
                        </div>
                    </div>
                    <div className="rows">
                        <div className="col-lg-4">
                            <div className="item first-item">
                                <div className="number">
                                <h6>1</h6>
                                </div>
                                <div className="icon">
                                    <img className="author-icon" src="./author01.jpg" alt="author01" />
                                </div>
                                <h4>潘勇</h4>
                                <p>Email:1837271943@qq.com<br/>负责文档撰写,ppt与视频制作.</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="item second-item">
                                <div className="number">
                                <h6>2</h6>
                                </div>
                                <div className="icon">
                                    <img className="author-icon" src="./author02.jpg" alt="author02" />
                                </div>
                                <h4>赵宇航</h4>
                                <p>Email:2739904664@qq.com<br/>负责前端设计与实现.</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="item second-item">
                                <div className="number">
                                <h6>3</h6>
                                </div>
                                <div className="icon">
                                    <img className="author-icon" src="./author03.jpg" alt="author03" />
                                </div>
                                <h4>张庙松</h4>
                                <p>Email:1875912440@qq.com<br/>负责后端设计与实现.</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="item">
                                <div className="icon">
                                    <img className="author-icon" src="./author04.jpg" alt="author04" />
                                </div>
                                <h4>沈楚明</h4>
                                <p>Email:2271519405@qq.com<br/>负责对话核心功能实现.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Author