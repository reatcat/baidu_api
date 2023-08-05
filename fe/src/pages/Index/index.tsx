// 此页面为菜单(介绍)页面
import { FC,useEffect,useState } from "react"
import {Link, useNavigate } from "react-router-dom"
import { createThrottle } from '../../component/help'
import 'swiper/swiper-bundle.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper'
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
    // const [show1, switchShow1] = useState(false)
    // useEffect(()=>{
    //     const listener = createThrottle(()=>{
    //         const shouldShow = window.scrollY > 115
    //         if (shouldShow !== show1) {
    //             switchShow1(shouldShow)
    //         }
    //     }, 500) as EventListener;
    //     document.addEventListener('scroll', listener)
    //     return ()=>document.removeEventListener('scroll', listener)
    // }, [show1])
    // 文字是否出现
    const [show2, switchShow2] = useState(false)
    useEffect(()=>{
        const listener = createThrottle(()=>{
            const shouldShow = window.scrollY > window.innerHeight * 0.5
            if (shouldShow !== show2) {
                switchShow2(shouldShow)
            }
        }, 500) as EventListener;
        document.addEventListener('scroll', listener)
        return ()=>document.removeEventListener('scroll', listener)
    }, [show2])
    // 优势是否出现
    const [show3, switchShow3] = useState(false)
    useEffect(()=>{
        const listener = createThrottle(()=>{
            const shouldShow = window.scrollY > window.innerHeight
            if (shouldShow !== show3) {
                switchShow3(shouldShow)
            }
        }, 500) as EventListener;
        document.addEventListener('scroll', listener)
        return ()=>document.removeEventListener('scroll', listener)
    }, [show3])
    // 优势是否出现
    const [show4, switchShow4] = useState(false)
    useEffect(()=>{
        const listener = createThrottle(()=>{
            const shouldShow = window.scrollY > window.innerHeight * 1.2
            if (shouldShow !== show4) {
                switchShow4(shouldShow)
            }
        }, 500) as EventListener;
        document.addEventListener('scroll', listener)
        return ()=>document.removeEventListener('scroll', listener)
    }, [show4])
        // 菜单栏数据3类
    const data = [
        {
            id:1,
            name:"旅游指南",
            group:1,
            img:"./lvyou.svg",
            description:"我在_____（出行时间）想要出去旅行。请你作为一个出色的旅游指南制定者并且具备雄厚的知识储备，为我提供一份准确全面、实用性强且结合当地特色的旅游指南。以下是我的要求：预算_____，从_____（所在地）出发，想要_____（自己/和家人/和朋友等）去_____（要求）的地方。"
        },
        {
            id:2,
            name:"草拟标题",
            group:1,
            img:"./biaoti.svg",
            description:"作为一名_____（身份），我写了一篇文章，但对于文章的标题感到困惑。作为一名熟练的语言工作者，我希望你能为我的文章制定一个吸引人的标题，以突出以下要素：_____（要求）。以下是文章的主要内容："
        },
        {
            id:3,
            name:"私人教练",
            group:1,
            img:"./jiaolian.svg",
            description:"你是一名私人健身教练和营养师，精通《健身营养全书》、《运动营养学》以及《健身量化》等专业书籍。请你根据你所掌握知识给出一个身高_____体重_____想要_____的_____（性别）的BMI和BMI状态并为其设计一个_____天训练计划和饮食建议。要求训练计划不重复。"
        },
        {
            id:4,
            name:"起名大师",
            group:1,
            img:"./qiming.svg",
            description:"我的孩子是个_____孩，姓_____，生于_____年_____月_____日，请你根据他的出生年月日给他起10个名字，名字最好能符合阴阳五行，要求新颖不重复、不要太简单、朗朗上口、悦耳动听符合语义，具有中国诗意，你可以参考《诗经》、《楚辞》、《论语》等，而且我更希望你能给出高质量的名字，不要出现形如“聪明”、“风水”、“阳光”这样的名字，请直接给出名字哦。"
        },
        {
            id:5,
            name:"定制妆容",
            group:1,
            img:"./zhuangrong.svg",
            description:"我希望画一个精致的妆容，请你给出针对性的建议，场景：即将参加_____，自身条件：_____。要求：给出10点建议，建议要结合特定场景，每条建议都要结合自身条件，建议要具体全面，我更希望你可以学习小红书、微博有关妆容的内容给出建议，先给出名字再直接给出建议。"
        },
        {
            id:6,
            name:"润色简历",
            group:2,
            img:"./jianli.svg",
            description:"现在你是一个资深的面试官并且非常擅长润色求职简历，为我润色我的求职简历，要求优化语言表述并且对于整体结构重新排版，使用大字号标题分割板块，加粗强调有竞争力的内容，使之更加受面试官青睐，输出docx文档，以下是我的简历内容：_____。"
        },
        {
            id:7,
            name:"模拟面试",
            group:2,
            img:"./mianshi.svg",
            description:"现在我是一个缺乏经验的求职者，我需要你为我模拟出在我求职的过程中面试官可能问出来的问题，并且给出面试官希望得到的参考答案，你需要按照这样的模板分条给出多个问题：在该场景下面试官的问题：在该场景下面试官希望得到的参考答案：我需要面试的岗位是：_____。"
        },
        {
            id:8,
            name:"创业启发",
            group:2,
            img:"./chuangye.svg",
            description:"根据人们的愿望生成创业的idea。例如，当我说 我希望在我的小镇上有一个大的大型购物中心 时，你为创业计划生成一份商业计划书，其中包括想法名称、简短的单行文本、目标用户角色、需要解决的用户痛点、主要价值主张、销售和营销渠道、收入来源、成本结构、关键活动、关键资源、关键合作伙伴、想法验证步骤、预计第1年的运营成本，以及需要寻找的潜在商业挑战。把结果写在一个标记表中。以下是我的想法：_____。"
        },
        {
            id:9,
            name:"求职帮手",
            group:2,
            img:"./qiuzhi.svg",
            description:"我希望你帮我写一封求职信。我将向你提供有关我所申请的工作以及我的相关技能和经验的信息，你将利用这些信息来创作一封专业和有效的求职信。你应该使用适当的格式和布局，使求职信在视觉上吸引人，易于阅读。你还应根据我所申请的具体工作和公司定制求职信的内容，突出我的相关技能和经验，并解释为什么我是该职位的有力候选人。请确保求职信清晰、简明，并有效地传达我的资格和对该工作的兴趣。请不要在求职信中加入任何个人意见或偏好，而应注重求职信写作的最佳做法和行业标准。我所申请的工作以及我的相关技能和经验是：_____。"
        },
        {
            id:10,
            name:"学习导师",
            group:2,
            img:"./daoshi.svg",
            description:"请作为一个精通所有知识的老师，以一种非常个性化和耐心的方式为一个学生传授他不知道的知识概念。教学的方式有几个步骤，注意，下述的每个步骤都必须写至少300文字的内容，你需要想清楚怎样将这个知识讲的非常的详细且动人，否则就不是一个耐心的老师……"
        },
        {
            id:11,
            name:"敬请期待……",
            group:3,
            img:"./more.svg",
            description:"开发中，敬请期待……"
        }
    ]
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
                                        <>
                                            <li>
                                                <Link to='/Home'>全新体验</Link>
                                            </li>
                                            <li>
                                                <Link to='/Application'>最佳应用</Link>
                                            </li>
                                        </>
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
                                            <Link to='/Register'>注册</Link>
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
                            {
                                log?
                                <Link to='/Home'>继续使用</Link>
                                :
                                <Link to='/Login'>登录以开启新体验</Link>

                            }
                            
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
            <div className="categories-collections" style={{padding:'120px 0 90px 0'}}>
                <div className="container">
                    <div className="row">
                        <div style={{textAlign:'center',fontSize:'40px',color:'white'}}>
                            适用场景
                        </div>
                        <div className={show2?"changjing-show":"changjing"}>
                            从日常生活到职业生涯规划,我们全覆盖.
                        </div>
                        {/* <div style={{display:'flex',marginTop:'20px'}}>
                            <div className={show1?"tupian-show":"tupian"}>
                                <h1 style={{color:'black'}}>
                                    日常生活
                                </h1>
                                <div className="tupian-img">
                                    <img src="./live.svg" alt="live"/>
                                </div>
                                <div style={{marginBottom:'10px'}}>
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
                                <div style={{marginBottom:'10px'}}>
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
                        </div> */}
                        <div id="certify" style={{top:"20px"}}>
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
            </div>      
            <div className="create-nft">
                <div className="container">
                    <div>
                        <div style={{textAlign:'center',fontSize:'40px',color:'black'}}>
                            我们的优势
                        </div>
                        <div className={show3?"youshi-show":"youshi"}>
                            Better Prompt,让您的prompt更高效
                        </div>
                        <div>
                            <div className="first-wrap">
                                <div className={show4?"zhineng-show":"zhineng"}>
                                    <div className="youshi-img">
                                        <img src="./zhineng.svg" alt="zhineng"/>
                                    </div>
                                    <div className="jieshao">
                                        <h3>更智能</h3>
                                        <div className="line-dec"></div>
                                        <div>
                                            生成的promtp更快速、更高效
                                        </div>
                                    </div>
                                </div>
                                <div className={show4?"haoyong-show":"haoyong"}>
                                    <div className="youshi-img">
                                        <img src="./haoyong.svg" alt="haoyong"/>
                                    </div>
                                    <div className="jieshao">
                                        <h3>更好用</h3>
                                        <div className="line-dec"></div>
                                        <div>
                                            极简的交互设计，助您快速上手
                                        </div>
                                    </div>
                                </div>
                                <div className={show4?"gaoxiao-show":"gaoxiao"}>
                                    <div className="youshi-img">
                                        <img src="./gaoxiao.svg" alt="gaoxiao"/>
                                    </div>
                                    <div className="jieshao">
                                        <h3>更方便</h3>
                                        <div className="line-dec"></div>
                                        <div>
                                            自动补全prompt，轻松完成需求
                                        </div>
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