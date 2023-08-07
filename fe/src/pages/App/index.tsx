// 此页面为具体应用页面
import { FC,useEffect,useState,useRef } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import {ExclamationCircleOutlined} from '@ant-design/icons'
import { Modal, message,Popover,Switch} from 'antd'
import axios from "axios"
import 'swiper/swiper-bundle.css'
import copy from 'copy-to-clipboard'
import './index.css'
type Message = {
    content: string
    sender: 'user' | 'assistant'
    timestamp: string
    isfavorite: boolean
}
const Apps:FC = ()=>{
    // 获得路由
    const location = useLocation()
    // 获得路由id
    const id = Number(location.pathname.split('/')[2]) - 1
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
    const data = [
        {
            id:1,
            name:"旅游指南",
            img:"./lvyou1.svg",
            description:"我在_____（出行时间）想要出去旅行。请你作为一个出色的旅游指南制定者并且具备雄厚的知识储备，为我提供一份准确全面、实用性强且结合当地特色的旅游指南。以下是我的要求：预算_____，从_____（所在地）出发，想要_____（自己/和家人/和朋友等）去_____（要求）的地方。"
        },
        {
            id:2,
            name:"草拟标题",
            img:"./biaoti1.svg",
            description:"作为一名_____（身份），我写了一篇文章，但对于文章的标题感到困惑。作为一名熟练的语言工作者，我希望你能为我的文章制定一个吸引人的标题，以突出以下要素：_____（要求）。以下是文章的主要内容："
        },
        {
            id:3,
            name:"私人教练",
            img:"./jiaolian1.svg",
            description:"你是一名私人健身教练和营养师，精通《健身营养全书》、《运动营养学》以及《健身量化》等专业书籍。请你根据你所掌握知识给出一个身高_____体重_____想要_____的_____（性别）的BMI和BMI状态并为其设计一个_____天训练计划和饮食建议。要求训练计划不重复。"
        },
        {
            id:4,
            name:"起名大师",
            img:"./qiming1.svg",
            description:"我的孩子是个_____孩，姓_____，生于_____年_____月_____日，请你根据他的出生年月日给他起10个名字，名字最好能符合阴阳五行，要求新颖不重复、不要太简单、朗朗上口、悦耳动听符合语义，具有中国诗意，你可以参考《诗经》、《楚辞》、《论语》等，而且我更希望你能给出高质量的名字，不要出现形如“聪明”、“风水”、“阳光”这样的名字，请直接给出名字哦。"
        },
        {
            id:5,
            name:"定制妆容",
            img:"./zhuangrong1.svg",
            description:"我希望画一个精致的妆容，请你给出针对性的建议，场景：即将参加_____，自身条件：_____。要求：给出10点建议，建议要结合特定场景，每条建议都要结合自身条件，建议要具体全面，我更希望你可以学习小红书、微博有关妆容的内容给出建议，先给出名字再直接给出建议。"
        },
        {
            id:6,
            name:"润色简历",
            img:"./jianli1.svg",
            description:"现在你是一个资深的面试官并且非常擅长润色求职简历，为我润色我的求职简历，要求优化语言表述并且对于整体结构重新排版，使用大字号标题分割板块，加粗强调有竞争力的内容，使之更加受面试官青睐，输出docx文档，以下是我的简历内容：_____。"
        },
        {
            id:7,
            name:"模拟面试",
            img:"./mianshi1.svg",
            description:"现在我是一个缺乏经验的求职者，我需要你为我模拟出在我求职的过程中面试官可能问出来的问题，并且给出面试官希望得到的参考答案，你需要按照这样的模板分条给出多个问题：在该场景下面试官的问题：在该场景下面试官希望得到的参考答案：我需要面试的岗位是：_____。"
        },
        {
            id:8,
            name:"创业启发",
            img:"./chuangye1.svg",
            description:"根据人们的愿望生成创业的idea。例如，当我说 我希望在我的小镇上有一个大的大型购物中心 时，你为创业计划生成一份商业计划书，其中包括想法名称、简短的单行文本、目标用户角色、需要解决的用户痛点、主要价值主张、销售和营销渠道、收入来源、成本结构、关键活动、关键资源、关键合作伙伴、想法验证步骤、预计第1年的运营成本，以及需要寻找的潜在商业挑战。把结果写在一个标记表中。以下是我的想法：_____。"
        },
        {
            id:9,
            name:"求职帮手",
            img:"./qiuzhi1.svg",
            description:"我希望你帮我写一封求职信。我将向你提供有关我所申请的工作以及我的相关技能和经验的信息，你将利用这些信息来创作一封专业和有效的求职信。你应该使用适当的格式和布局，使求职信在视觉上吸引人，易于阅读。你还应根据我所申请的具体工作和公司定制求职信的内容，突出我的相关技能和经验，并解释为什么我是该职位的有力候选人。请确保求职信清晰、简明，并有效地传达我的资格和对该工作的兴趣。请不要在求职信中加入任何个人意见或偏好，而应注重求职信写作的最佳做法和行业标准。我所申请的工作以及我的相关技能和经验是：_____。"
        },
        {
            id:10,
            name:"学习导师",
            img:"./daoshi1.svg",
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
    const [messages, setMessages] = useState<Message[]>([{
        content:'111',
        sender:'assistant',
        timestamp:new Date().toLocaleString(),
        isfavorite:false
    }])
    const [isLoading, setIsLoading] = useState(false)// 添加isLoading状态
    const [textareaValue, setTextareaValue] = useState('')
    const messageRef = useRef<HTMLDivElement>(null)
    const handelSendmessage = ()=>{
        if(textareaValue.length === 0){
            message.warning("对话不能为空哦~")
        }else{
            const newMessage: Message = {
                content: textareaValue,
                sender: 'user',
                timestamp: new Date().toLocaleString(),
                isfavorite:false
            }
            setMessages([...messages, newMessage])
            // 发送请求前设置isLoading为true
            setTextareaValue('')
            setIsLoading(true)
            axios.post('/api/user/best_chat',{data:{text:JSON.stringify(textareaValue),code:id+1,history:JSON.stringify(messages)}})
                .then((res)=>{
                    console.log(res)    
                    const text = res.data.data.message
                    const replyMessage: Message = {
                        content: text,
                        sender: "assistant",
                        timestamp: new Date().toLocaleTimeString(),
                        isfavorite:false
                        };
                    setMessages((prevMessages) => [...prevMessages, replyMessage]);
                    setIsLoading(false);
             })
        }
    }
    const copyanwser = (text:string)=>{
        copy(text)
        message.success("复制成功!")
    }
    const newchat = ()=>{
        
    }
    useEffect(() => {
        if (messageRef.current) {
          messageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages])
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
                <div className="col-lg-13">
                    <div style={{display:'flex',margin:'auto'}}>
                        <div className="apps" onClick={(e)=>{nav('/Application')}}>应用 &gt; </div>
                        <div>{data[id].name}</div>
                    </div>
                </div>
                <div className="box" style={{marginTop:'10px',backgroundColor:'#f4eded',color:'black'}}>
                    <div className="box-left" style={{backgroundColor:'rgb(255 255 255 / 87%)'}}>
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
                        <div>
                            <div style={{display:'block',letterSpacing:'2px',alignItems:'center',justifyContent:'space-between',marginTop:'5%'}}>
                                <div className="rule">
                                    用户指导
                                </div>
                                <div className="text" style={{marginTop:'10%',fontSize:'16px',fontStyle:'italic'}}>
                                    您好!这里是Better Prompt 最佳应用中的<span style={{color:'#f10d95'}}>{data[id].name}</span>应用部分,
                                    您可以按照指示直接与其进行对话并得到您所期望的结果,希望您使用顺利~
                                </div>
                            </div>
                        </div>
                        <div className="box-left-bottom" style={{paddingTop:'110%'}}>
                            <div style={{display:'inline-flex'}}>
                                <div className="address">
                                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/reatcat/baidu_api">
                                        <button className="box-button" style={{backgroundColor:'#262828'}}>
                                            <div className="address-icon">
                                                <img src="./address.svg" alt="address" />
                                            </div>
                                        </button>
                                    </a>
                                </div>
                            </div>
                            <div>
                                <button className="box-button" onClick={(e)=>newchat()} style={{backgroundColor:'#262828'}}>
                                    <div className="box-button-icon">
                                        <img src="./add.svg" alt="" />
                                    </div>
                                    <div className="newchat">
                                        新的对话
                                    </div>
                                </button>
                            </div>
                        </div>
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
                                        <div className="message-container" >
                                            <div style={{marginTop:'20px'}}>
                                                <div className="user-avatar" style={{boxShadow:'0px 2px 4px 0px rgb(22 21 21 / 62%)'}}>
                                                    <img style={{width:'25px',height:'25px'}} src={message.sender === 'user' ?"./user2.svg":data[id].img} alt="avatar" />
                                                </div>
                                            </div>
                                            <div className="message-item" style={{backgroundColor:'rgb(22 21 21 / 45%)',color:'#2d2c2c'}}>
                                                {
                                                    message.sender === 'user'?
                                                    <></>
                                                    :
                                                    index === 0?
                                                    <></>
                                                    :
                                                    <div className="actions">
                                                        <div className="action" onClick={(e)=>copyanwser(message.content)}>
                                                            复制
                                                        </div>
                                                    </div>
                                                }
                                                <div className="message-body" style={{whiteSpace:'pre-line',color:'#2d2c2c'}}>
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
                                                    <img style={{width:'25px',height:'25px'}} src={data[id].img} alt="avatar" />
                                                </div>
                                            </div>
                                            <div className="message-item" style={{backgroundColor:'rgb(22 21 21 / 45%)',color:'#2d2c2c'}}>
                                                <div className="message-body" style={{whiteSpace:'pre-line',color:'#2d2c2c'}}>
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
                                    <textarea value={textareaValue} className="send-question" style={{backgroundColor:'white',color:'#2d2c2c'}} placeholder="Ctrl + Enter发送" 
                                    onChange={(e) => setTextareaValue(e.target.value)}
                                    onKeyDown={(e) =>{if (e.ctrlKey && e.key === 'Enter') {
                                        e.preventDefault()
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
export default Apps