//hook可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性
//useState方法返回一个数组[a,fn],a<=>state,fn<=>setState
//useEffect类似生命周期中的更新

import React,{useState,useEffect} from 'react'

export default function Index() {
    const [isLiked,setLike] = useState(false)
    useEffect(()=>{
        document.title = isLiked ? '❤️取消' : '🖤点赞'
    })
    return (
        <div onClick = {()=>{setLike(!isLiked)}}>
            {isLiked ? '❤️取消' : '🖤点赞'}
        </div>
    )
}
//
