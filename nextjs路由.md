1. nextjs路由的定义: 路由是指客户端访问服务器的路径，通过路由可以将请求转发到对应的处理函数上。

2. nextjs路由的类型: nextjs路由有三种类型：静态路由、动态路由、嵌套路由。

3. nextjs路由的匹配规则: nextjs路由的匹配规则是基于路径的，即路径的前缀匹配。

4. nextjs路由的优先级: nextjs路由的优先级是由上到下，即静态路由 > 动态路由 > 嵌套路由。
3. nextjs路由的使用方法： 
1. nextjs路由的静态路由：就是使用 useRouter 方法获取路由信息，然后根据路由信息渲染对应的页面。
```js
import { useRouter } from 'next/router';

const router = useRouter();

const Page = () => {
  const { query } = router;
  return <div>Welcome to {query.name}</div>;
};

export default Page;
```

2. nextjs路由的动态路由
3. nextjs路由的通配符

4. nextjs路由的嵌套
5. nextjs路由的重定向
7. nextjs路由的权限控制