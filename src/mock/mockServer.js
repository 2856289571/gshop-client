/* 
    利用mockjs提供mock数据接口
        1、安装，引入
        2、引入自定义的json数据
        3、使用mock()方法提供接口
    ！！！mockjs的接口只能通过ajax访问（因为是拦截的ajax请求），且该请求不会在network上看到
*/
import Mock from 'mockjs'
import floors from './floors.json'
import recommand from './recommand.json'

// mock()   参数1：路径 参数2：数据
Mock.mock('/mock/floors',{code:200,data:floors})

Mock.mock('/mock/recommand',{code:200,data:recommand})

