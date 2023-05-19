// 此页面为主页页面
import { FC } from "react"
import { Link, useNavigate } from "react-router-dom"
const Home:FC = ()=>{
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