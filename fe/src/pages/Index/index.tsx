// 此页面为菜单(介绍)页面
import { FC,useEffect,useState } from "react"
import {Link, useNavigate } from "react-router-dom"
import { createThrottle } from '../../component/help'
import axios from "axios"
import './index.css'
const Index:FC = ()=>{
    const nav = useNavigate()
    // 返回首页
    const jumptoindex = ()=>{
        nav('/')
    }
    const [log,setLog] = useState(false)
    // 使用axios获得用户名
    useEffect(()=>{
        axios.get('/api/user/index')
        .then((res)=>{
            // 依据返回的code确定三个状态
            const code = res.data.data.code
            if(code === 1){
                // const name = res.data.data.username
                // 设置登录状态
                setLog(true)
            }
        })
    },[])
    // 监听滚动位置，是否显示返回顶部
    const [show, switchShow] = useState(false)
    useEffect(()=>{
        const listener = createThrottle(()=>{
            const shouldShow = window.scrollY > 10
            if (shouldShow !== show) {
                switchShow(shouldShow)
            }
        }, 500) as EventListener;
        document.addEventListener('scroll', listener)
        return ()=>document.removeEventListener('scroll', listener)
    }, [show])
    // 图片是否出现
    const [show1, switchShow1] = useState(false)
    useEffect(()=>{
        const listener = createThrottle(()=>{
            const shouldShow = window.scrollY > 115
            if (shouldShow !== show1) {
                switchShow1(shouldShow)
            }
        }, 500) as EventListener;
        document.addEventListener('scroll', listener)
        return ()=>document.removeEventListener('scroll', listener)
    }, [show1])
    // 文字是否出现
    const [show2, switchShow2] = useState(false)
    useEffect(()=>{
        const listener = createThrottle(()=>{
            const shouldShow = window.scrollY > 100
            if (shouldShow !== show2) {
                switchShow2(shouldShow)
            }
        }, 500) as EventListener;
        document.addEventListener('scroll', listener)
        return ()=>document.removeEventListener('scroll', listener)
    }, [show2])
    return (
        <>
            <header className={show?"header-area header-sticky background-header":"header-area header-sticky"}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav className="main-nav" style={show?{margin:'0 3%'}:{margin:'2% 5% 0 5%'}}>
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
                                        <Link to='/' className="active">首页</Link>
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
                                        <Link to='/Author'>关于我们</Link>
                                    </li>
                                </ul>   
                                <a className='menu-trigger'>
                                    <span>Menu</span>
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            <div className="main-banner">
                <div className="container">
                <div className="row">
                    <div className="col-lg-6 align-self-center">
                    <div className="header-text" style={{marginLeft:'5%',marginTop:'5%'}}>
                        <h6 style={{fontStyle:'italic'}}>Better Prompt</h6>
                        <h2 style={{fontStyle:'italic'}}>Faster &amp; more efficient.</h2>
                        <p>Better Prompt 用于补全润色prompt旨在提供实用性高、稳定性强、对社会有价值的promt,助力人机沟通.<br></br>
                            我们的服务理念是Faster and more efficient.
                        </p>
                        <div className="buttons">
                        <div className="border-button">
                            <Link to='/Login'>登录以开启新体验</Link>
                        </div>
                        <div className="main-button">
                            <a id="docLink" target="_blank" rel="noopener noreferrer" href="https://github.com/reatcat/baidu_api">
                                我们的项目地址
                            </a>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="categories-collections" >
                <div className="container">
                    <div className="row">
                        <div style={{textAlign:'center',fontSize:'40px',color:'white'}}>
                            适用场景
                        </div>
                        <div className={show2?"changjing-show":"changjing"}>
                            从日常生活到职业生涯规划,我们全覆盖.
                        </div>
                        <div style={{display:'flex',marginTop:'20px'}}>
                            <div className={show1?"tupian-show":"tupian"}>
                                <h1 style={{color:'black'}}>
                                    日常生活
                                </h1>
                                <div className="tupian-img">
                                    <img src="./live.svg" alt="live"/>
                                </div>
                                <div>
                                    <ul>
                                        <li>
                                            旅游指南 私人教练
                                        </li>
                                        <li>
                                            起名大师 定制妆容
                                        </li>
                                        <li>
                                            学习导师 敬请期待
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={show1?"tupian-show2":"tupian"}>
                                <h1 style={{color:'black'}}>
                                    生涯规划
                                </h1>
                                <div className="tupian-img">
                                    <img src="./work.svg" alt="live"/>
                                </div>
                                <div style={{marginBottom:'2px'}}>
                                    <ul>
                                        <li>
                                            草拟标题 润色简历
                                        </li>
                                        <li>
                                            模拟面试 创业启发
                                        </li>
                                        <li>
                                            求职帮手 敬请期待
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>                       
        </>
    )
}
export default Index