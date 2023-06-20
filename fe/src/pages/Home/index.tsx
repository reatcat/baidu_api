// 此页面为主页页面
import { FC,useEffect,useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {ExclamationCircleOutlined} from '@ant-design/icons'
import { Modal, message,Popover} from 'antd'
import 'swiper/swiper-bundle.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper'
import axios from "axios"
import './index.css'
const Home:FC = ()=>{
    const nav = useNavigate()
    const [username,setUsername] = useState('zzz')
    const [log,setLog] = useState(true)
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
    const jumptoindex = ()=>{
        nav('/')
    }
    // 菜单栏数据3类
    const data = [
        {
            id:1,
            name:"旅游指南",
            group:1,
            img:"./lvyou.svg",
            description:"作为一个出色的旅游指南制定者并且具备雄厚的知识储备，为您提供一份准确全面、实用性强且结合当地特色的旅游指南。"
        },
        {
            id:2,
            name:"草拟标题",
            group:1,
            img:"./biaoti.svg",
            description:"作为一名出色的语言工作者，为您的文章制定一个符合要求的标题，起到画龙点睛的作用。"
        },
        {
            id:3,
            name:"私人教练",
            group:1,
            img:"./jiaolian.svg",
            description:"作为一名私人教练和营养师，根据您的自身条件给出您满意的训练建议。"
        },
        {
            id:4,
            name:"起名大师",
            group:1,
            img:"./qiming.svg",
            description:"作为一名精通中国文化的起名大师，根据您的要求给您满意合适的名字。"
        },
        {
            id:5,
            name:"定制妆容",
            group:1,
            img:"./zhuangrong.svg",
            description:"作为一名高级化妆师，根据您的自身条件和场景给出您最佳的妆容建议，让您大放光彩。"
        },
        {
            id:6,
            name:"润色简历",
            group:2,
            img:"./jianli.svg",
            description:"作为一个资深的面试官并且非常擅长润色求职简历，为您润色您的求职简历使之更加受面试官青睐，并输出docx文档，助力您的求职。"
        },
        {
            id:7,
            name:"模拟面试",
            group:2,
            img:"./mianshi.svg",
            description:"作为一个资深面试官，为您模拟出在您求职的过程中面试官可能问出来的问题，并且给出参考答案，让您在面试中展现自己，获得满意offer。"
        },
        {
            id:8,
            name:"创业启发",
            group:2,
            img:"./chuangye.svg",
            description:"作为一名优秀的创业师，根据您的愿望生成创业的idea，为您生成详细的计划书，助力您的创业。"
        },
        {
            id:9,
            name:"求职帮手",
            group:2,
            img:"./qiuzhi.svg",
            description:"作为一名求职达人，根据您所申请的工作以及您的相关技能和经验的信息，为您创作一封专业和有效的求职信。"
        },
        {
            id:10,
            name:"学习导师",
            group:2,
            img:"./daoshi.svg",
            description:"作为一个精通所有知识的老师，以个性化和耐心的方式从多个角度全面为您传授您所感兴趣的的知识。"
        },
        {
            id:11,
            name:"敬请期待……",
            group:3,
            img:"./more.svg",
            description:"开发中，敬请期待……"
        }
    ]
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
    return (
        <div  >
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
                                    <li>
                                        <Link to='/Home' className="active">全新体验</Link>
                                    </li>
                                    <li>
                                        <Link to='/'>作者简介</Link>
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
                            <h2>Try Our Best Products</h2>
                        </div>
                    </div>
                </div>
                <div id="certify">
                    <div className="swiper-container">
                            <Swiper
                                            
                                            key={data.length}
                                            className="swiper-wrapper"
                                            loop={true} //循环切换
                                            autoplay={true}
                                            watchSlidesProgress={true}  //Progress（进度、进程）分为swiper的progress 和每个slide单独的progress。
                                            loopedSlides={5} //可视slide有3个，loopedSlides可设为5个或以上
                                            slidesPerView={'auto'}
                                            pagination={{ clickable: true }} //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
                                            navigation={true} //前后进退按纽
                                            centeredSlides={true} //设定为true时，active slide会居中，而不是默认状态下的居左。
                                            initialSlide={Math.floor(data.length/2)} //与centeredSlide结合使用，指定初始化的索引
                                            modules={[Navigation,Pagination,Autoplay]}
                                            // onProgress={onProgress} //回调函数，当Swiper的progress被改变时执行。接受swiper实例和此Swiper的progress作为参数（返回值范围一般在0-1）。
                                            // onSetTransition={onSetTransition} //回调函数，每当设置Swiper开始过渡动画时执行。transtion获取到的是Swiper的speed值。
                                            >
                                        {data.map(t => {
                                            return (
                                                <SwiperSlide key={t.id} >
                                                    <div className="menu-item">
                                                        <div className="menu-item-box"></div>
                                                        <div className="menu-item-img">
                                                            <img src={t.img} alt={t.name} />
                                                        </div>
                                                        <div className="menu-item-name">
                                                            <h2>{t.name}</h2>
                                                            <p>{t.description}</p>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        })}
                            </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home