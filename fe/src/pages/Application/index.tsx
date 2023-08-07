// 此页面为应用页面
import { FC,useEffect,useState,useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import {ExclamationCircleOutlined} from '@ant-design/icons'
import { Modal, message,Popover,Switch} from 'antd'
import axios from "axios"
import 'swiper/swiper-bundle.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper'
import './index.css'
const Application:FC = ()=>{
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
    // 菜单栏数据3类
    const data = [
        {
            id:1,
            name:"旅游指南",
            img:"./lvyou.svg",
            description:"我在_____（出行时间）想要出去旅行。请你作为一个出色的旅游指南制定者并且具备雄厚的知识储备，为我提供一份准确全面、实用性强且结合当地特色的旅游指南。以下是我的要求：预算_____，从_____（所在地）出发，想要_____（自己/和家人/和朋友等）去_____（要求）的地方。"
        },
        {
            id:2,
            name:"草拟标题",
            img:"./biaoti.svg",
            description:"作为一名_____（身份），我写了一篇文章，但对于文章的标题感到困惑。作为一名熟练的语言工作者，我希望你能为我的文章制定一个吸引人的标题，以突出以下要素：_____（要求）。以下是文章的主要内容："
        },
        {
            id:3,
            name:"私人教练",
            img:"./jiaolian.svg",
            description:"你是一名私人健身教练和营养师，精通《健身营养全书》、《运动营养学》以及《健身量化》等专业书籍。请你根据你所掌握知识给出一个身高_____体重_____想要_____的_____（性别）的BMI和BMI状态并为其设计一个_____天训练计划和饮食建议。要求训练计划不重复。"
        },
        {
            id:4,
            name:"起名大师",
            img:"./qiming.svg",
            description:"我的孩子是个_____孩，姓_____，生于_____年_____月_____日，请你根据他的出生年月日给他起10个名字，名字最好能符合阴阳五行，要求新颖不重复、不要太简单、朗朗上口、悦耳动听符合语义，具有中国诗意，你可以参考《诗经》、《楚辞》、《论语》等，而且我更希望你能给出高质量的名字，不要出现形如“聪明”、“风水”、“阳光”这样的名字，请直接给出名字哦。"
        },
        {
            id:5,
            name:"定制妆容",
            img:"./zhuangrong.svg",
            description:"我希望画一个精致的妆容，请你给出针对性的建议，场景：即将参加_____，自身条件：_____。要求：给出10点建议，建议要结合特定场景，每条建议都要结合自身条件，建议要具体全面，我更希望你可以学习小红书、微博有关妆容的内容给出建议，先给出名字再直接给出建议。"
        },
        {
            id:6,
            name:"润色简历",
            img:"./jianli.svg",
            description:"现在你是一个资深的面试官并且非常擅长润色求职简历，为我润色我的求职简历，要求优化语言表述并且对于整体结构重新排版，使用大字号标题分割板块，加粗强调有竞争力的内容，使之更加受面试官青睐，输出docx文档，以下是我的简历内容：_____。"
        },
        {
            id:7,
            name:"模拟面试",
            img:"./mianshi.svg",
            description:"现在我是一个缺乏经验的求职者，我需要你为我模拟出在我求职的过程中面试官可能问出来的问题，并且给出面试官希望得到的参考答案，你需要按照这样的模板分条给出多个问题：在该场景下面试官的问题：在该场景下面试官希望得到的参考答案：我需要面试的岗位是：_____。"
        },
        {
            id:8,
            name:"创业启发",
            img:"./chuangye.svg",
            description:"根据人们的愿望生成创业的idea。例如，当我说 我希望在我的小镇上有一个大的大型购物中心 时，你为创业计划生成一份商业计划书，其中包括想法名称、简短的单行文本、目标用户角色、需要解决的用户痛点、主要价值主张、销售和营销渠道、收入来源、成本结构、关键活动、关键资源、关键合作伙伴、想法验证步骤、预计第1年的运营成本，以及需要寻找的潜在商业挑战。把结果写在一个标记表中。以下是我的想法：_____。"
        },
        {
            id:9,
            name:"求职帮手",
            img:"./qiuzhi.svg",
            description:"我希望你帮我写一封求职信。我将向你提供有关我所申请的工作以及我的相关技能和经验的信息，你将利用这些信息来创作一封专业和有效的求职信。你应该使用适当的格式和布局，使求职信在视觉上吸引人，易于阅读。请确保求职信清晰、简明，并有效地传达我的资格和对该工作的兴趣。请注重求职信写作的最佳做法和行业标准。我所申请的工作以及我的相关技能和经验是：_____。"
        },
        {
            id:10,
            name:"学习导师",
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
    const jumptoapp = (id:number)=>{
        if(id === 11){
            message.warning('正在开发中,敬请期待……')
        }else{
            nav(`/Apps/${id}`)
        }
    }
    return (
        <div>
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
                                        <Link to='/Home'>全新体验</Link>
                                    </li>
                                    <li>
                                        <Link to='/Chat'>文心实战</Link>
                                    </li>
                                    <li>
                                        <Link to='/Application' className="active">最佳应用</Link>
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
                <div className="col-lg-12" style={{marginTop:'40px'}}>
                    <h6>Try Our Best Application</h6> 
                </div>
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
                                                    <div className="menu-item" onClick={(e)=>jumptoapp(t.id)}>
                                                        <div className="menu-item-box"></div>
                                                        <div className="menu-item-img">
                                                            <img src={t.img} alt={t.name} />
                                                        </div>
                                                        <div className="menu-item-names">
                                                            <h2 style={{fontStyle:'italic'}}>{t.name}</h2>
                                                            <p style={{fontStyle:'italic'}}>{t.description}</p>
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
export default Application