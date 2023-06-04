// 此页面为主页页面
import { FC,useEffect,useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {ExclamationCircleOutlined} from '@ant-design/icons'
import { Modal, message,Popover,Segmented } from 'antd'
import axios from "axios"
import './index.css'
const Home:FC = ()=>{
    const nav = useNavigate()
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
            <Link to="/Personal" className="personal">个人中心</Link>
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
    // 跳到彩蛋
    const jumptocaidan = ()=>{
        nav('/EasterEgg')
    }
    // 菜单栏数据3类
    const data = [
        {
            id:1,
            name:"旅游指南",
            group:1,
            img:"./lvyou.svg"
        },
        {
            id:2,
            name:"草拟标题",
            group:1,
            img:"./biaoti.svg"
        },
        {
            id:3,
            name:"私人教练",
            group:1,
            img:"./jiaolian.svg"
        },
        {
            id:4,
            name:"起名大师",
            group:1,
            img:"./qiming.svg"
        },
        {
            id:5,
            name:"定制妆容",
            group:1,
            img:"./zhuangrong.svg"
        },
        {
            id:6,
            name:"润色简历",
            group:2,
            img:"./jianli.svg"
        },
        {
            id:7,
            name:"模拟面试",
            group:2,
            img:"./mianshi.svg"
        },
        {
            id:8,
            name:"创业启发",
            group:2,
            img:"./chuangye.svg"
        },
        {
            id:9,
            name:"求职帮手",
            group:2,
            img:"./qiuzhi.svg"
        },
        {
            id:10,
            name:"学习导师",
            group:2,
            img:"./daoshi.svg"
        },
        {
            id:11,
            name:"敬请期待……",
            group:3,
            img:"./more.svg"
        }
    ]
    const group1 = [
        {
            id:1,
            name:"旅游指南",
            group:1,
            img:"./lvyou.svg"
        },
        {
            id:2,
            name:"草拟标题",
            group:1,
            img:"./biaoti.svg"
        },
        {
            id:3,
            name:"私人教练",
            group:1,
            img:"./jiaolian.svg"
        },
        {
            id:4,
            name:"起名大师",
            group:1,
            img:"./qiming.svg"
        },
        {
            id:5,
            name:"定制妆容",
            group:1,
            img:"./zhuangrong.svg"
        },
        {
            id:6,
            name:"敬请期待……",
            group:3,
            img:"./more.svg"
        }
    ]
    const group2 = [
        {
            id:1,
            name:"润色简历",
            group:2,
            img:"./jianli.svg"
        },
        {
            id:2,
            name:"模拟面试",
            group:2,
            img:"./mianshi.svg"
        },
        {
            id:3,
            name:"创业启发",
            group:2,
            img:"./chuangye.svg"
        },
        {
            id:4,
            name:"求职帮手",
            group:2,
            img:"./qiuzhi.svg"
        },
        {
            id:5,
            name:"学习导师",
            group:2,
            img:"./daoshi.svg"
        },
        {
            id:6,
            name:"敬请期待……",
            group:3,
            img:"./more.svg"
        }
    ]
    // 获得segmented的值渲染数据
    const [type,setType] = useState("1")
    const gettype = (value:any) =>{
        setType(value)
        console.log(type)
    }
    // 获得搜索框内容
    // const [value,setValue] = useState("")
    // const getValue = (e:any) => {
    //     const tmpvalue = e.target.value
    //     setValue(tmpvalue)
    //     console.log(tmpvalue)
    //     // todo
    //     // 获得值后搜索内容进行新的渲染
    // }
    return (
        <div>
            {/* head */}
            <nav>
                <div className="middle">
                    <div id="nav_productName" onClick={jumptocaidan}>
                        {/* <img id="nav_image" src="./Home_nav_middle.png" alt="nav"/> */}
                        <div>
                            Better Prompt
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
            {/* 只有10个，还是别搜索了…… */}
            {/* <div className="search">
                <input type="text" placeholder="搜索场景名" defaultValue={value} onKeyDown={e => getValue(e)} onChange={e => getValue(e)}/>
            </div> */}
            {/* 顶部分类 */}
            {/* 引用antd-segmented */}
            <div className="sort">
                {/* <div className="sort-head"> */}
                    <Segmented onChange={e => gettype(e)} className="segmented" options={[{ label: '全部', value: '1'},{ label: '日常生活', value: '2',},{ label: '职业生涯规划', value: '3',},{ label: '开发中敬请期待……', value: '4', disabled: true },]} defaultValue={"1"}/>
                {/* </div> */}
            </div>
            <div className="main">
                {
                    type === "1"?
                    <div className="menu">
                        {data.map((t)=>(
                            <div className="menu-item">
                                <img src={t.img} alt={t.name} />
                                <div>
                                    {t.name}
                                </div>
                            </div>
                        ))}
                    </div>
                    :type === "2"?
                    <div className="menu">
                        {group1.map((t,i)=>(
                            <div className="menu-item">
                                <img src={t.img} alt={t.name} />
                                <div>
                                    {t.name}
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <div className="menu">
                        {group2.map((t,i)=>(
                            <div className="menu-item">
                                <img src={t.img} alt={t.name} />
                                <div>
                                    {t.name}
                                </div>
                            </div>
                        ))}
                    </div>
                }
                
            </div>
        </div>
    )
}
export default Home