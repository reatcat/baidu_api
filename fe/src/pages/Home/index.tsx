// 此页面为主页页面
import { FC,useEffect,useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
const Home:FC = ()=>{
    const [username,setUsername] = useState('')
    const [log,setLog] = useState(false)
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
            console.log(username,log)
            }
        })
    },[])
    return (
        <div>
            啦啦啦啦
            <Link to="/Login" >
                登录
            </Link>
            <Link to="/Register" >
                注册
            </Link>
        </div>
    )
}
export default Home