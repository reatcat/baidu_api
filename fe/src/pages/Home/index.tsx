// 此页面为主页页面
import { FC,useEffect,useState,useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import {ExclamationCircleOutlined} from '@ant-design/icons'
import { Modal, message,Popover} from 'antd'
import axios from "axios"
import copy from 'copy-to-clipboard'
import './index.css'
type Message = {
    content: string;
    sender: 'user' | 'assistant';
    timestamp: string;
}
const Home:FC = ()=>{
    const nav = useNavigate()
    const [username,setUsername] = useState('')
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
                // setLog(true)
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
    // 跳到首页
    const jumptoindex = ()=>{
        nav('/')
    }
    // const onSetTransition = (swiper:any,transition:any) => {
    //     for (let i = 0; i < swiper.slides.length; i++) {
    //         let slide = swiper.slides.eq(i)
    //         slide.transition(transition);
    //     }
    // }

    // const onProgress = (swiper:any, progress:any) => {
    //     for(let i = 0; i < swiper.slides.length; i++){
    //         let slide = swiper.slides.eq(i);
    //         let slideProgress = swiper.slides[i].progress
    //         let modify = 1;
    //         if (Math.abs(slideProgress) > 1) {
    //            modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
    //         }
    //         let translate = slideProgress * modify * 319 + 'px';
    //         let scale = 1 - Math.abs(slideProgress) / 5;
    //         let zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
    //         slide.transform('translateX(' + translate + ') scale(' + scale + ')');
    //         slide.css('zIndex', zIndex);
    //         slide.css('opacity', 1);
    //         if (Math.abs(slideProgress) > 3) {
    //             slide.css('opacity', 0);
    //         }
    //     }
    // }
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)// 添加isLoading状态
    const [textareaValue, setTextareaValue] = useState('')
    const messageRef = useRef<HTMLDivElement>(null);
    const handelSendmessage = ()=>{
            const newMessage: Message = {
                content: textareaValue,
                sender: 'user',
                timestamp: new Date().toLocaleTimeString(),
            }
            setMessages([...messages, newMessage])
            // 发送请求前设置isLoading为true
            setTextareaValue('')
            setIsLoading(true)
            // 调接口
            axios.post('/api/user/chat',{data:JSON.stringify(textareaValue)})
            .then((res)=>{
                // 依据返回的code确定三个状态
                const text = res.data.data.message
                const replyMessage: Message = {
                    content: text,
                    sender: "assistant",
                    timestamp: new Date().toLocaleTimeString(),
                  };
                  setMessages((prevMessages) => [...prevMessages, replyMessage]);
                  setIsLoading(false);
            })
            // setTimeout(() => {
            //     const replyMessage: Message = {
            //       content: "这是回复的内容",
            //       sender: "assistant",
            //       timestamp: new Date().toLocaleTimeString(),
            //     };
            //     setMessages((prevMessages) => [...prevMessages, replyMessage]);
            //     setIsLoading(false);
            // }, 1000)
    }
    const copyanwser = (text:string)=>{
        copy(text)
        message.success("复制成功!")
    }
    useEffect(() => {
        if (messageRef.current) {
          messageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages])
    return (
        <div  >
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
                                    <li>
                                        <Link to='/Home' className="active">全新体验</Link>
                                    </li>
                                    <li>
                                        <Link to='/Author'>关于我们</Link>
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
            <div className="page-heading" style={{paddingTop:'5%'}}>
                <div className="col-lg-12">
                    <h6>Try It</h6>
                </div>
                <div className="box">
                    <div className="box-left">
                        <div className="box-left-top">
                            <div className="box-letf-top-title">
                                Better Prompt
                            </div>
                            <div className="box-letf-top-title2">
                                Faster and more efficient.
                            </div>
                            <div className="box-icon">
                                <img src="./nav.png" alt="icon"  />
                            </div>
                        </div>
                        <div className="box-left-bottom">
                            <div style={{display:'inline-flex'}}>
                                <div className="address">
                                <a target="_blank" rel="noopener noreferrer" href="https://github.com/reatcat/baidu_api">
                                        <button className="box-button">
                                            <div className="address-icon">
                                                <img src="./address.svg" alt="address" />
                                            </div>
                                        </button>
                                    </a>
                                </div>
                            </div>
                            <div>
                                <button className="box-button" onClick={(e)=>{
                                    setMessages([])
                                }}>
                                    <div className="box-button-icon">
                                        <img src="./add.svg" alt="" />
                                    </div>
                                    <div className="newchat">
                                        新的对话
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="margin"></div>
                    </div>
                    <div className="box-right">
                        <div className="box-right-box">
                            <div className="box-chat">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`message ${message.sender === 'user' ? 'user' : 'assistant'}`}
                                        ref={index === messages.length - 1 ? messageRef : null}
                                    >
                                        <div className="message-container">
                                            <div style={{marginTop:'20px'}}>
                                                <div className="user-avatar">
                                                    <img src={message.sender === 'user' ?"./user.svg":"./assistant.svg"} alt="avatar" />
                                                </div>
                                            </div>
                                            <div className="message-item">
                                                {
                                                    message.sender === 'user'?
                                                    <></>
                                                    :
                                                    <div className="actions">
                                                        <div className="action" onClick={(e)=>copyanwser(message.content)}>
                                                            复制
                                                        </div>
                                                        
                                                    </div>
                                                }
                                                <div className="message-body">
                                                    {message.content}
                                                </div>
                                            </div>
                                            <div className="message-time">
                                                <div >
                                                    {message.timestamp} 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="message assistant">
                                        <div className="message-container">
                                            <div style={{marginTop:'20px'}}>
                                                <div className="user-avatar">
                                                    <img src="./assistant.svg" alt="avatar" />
                                                </div>
                                            </div>
                                            <div className="message-item">
                                                <div className="message-body">
                                                    <div className="loading">
                                                        <div></div>
                                                        <div></div>
                                                        <div></div>
                                                    </div>
                                                   加载中
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="box-right-input">
                                <div className="box-right-input-bottom">
                                    <textarea value={textareaValue} className="send-question" placeholder="Ctrl + Enter发送" 
                                    onChange={(e) => setTextareaValue(e.target.value)}
                                    onKeyDown={(e) =>{if (e.ctrlKey && e.key === 'Enter') {
                                        handelSendmessage()
                                    }} }
                                    rows={3}></textarea>
                                    <button className="send-button" onClick={handelSendmessage}>
                                        <div className="send-button-icon">
                                            <img src="./send.svg" alt="send" />
                                        </div>
                                        <div className="send">
                                            发送
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
export default Home