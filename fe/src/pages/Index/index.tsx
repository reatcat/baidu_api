// 此页面为菜单(介绍)页面
import { FC,useEffect,useState } from "react"
import {Link, useNavigate } from "react-router-dom"
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
    return (
        <>
            <header className="header-area header-sticky">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav className="main-nav" style={{margin:'2% 5% 0 5%'}}>
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
                                            <Link to='/Home'>全新体验</Link>
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
                                        <Link to='/'>关于我们</Link>
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
                        <p>Better Prompt 用于补全润色prompt旨在提供实用性高、稳定性强的、对社会有价值的的promt,助力人机沟通。<br></br>
                            我们的服务理念是Faster and more efficient
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
        </>
    )
}
export default Index