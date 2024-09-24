# Next.js & NextUI Template

This is a template for creating applications using Next.js 14 (app directory) and NextUI (v2).

[Try it on CodeSandbox](https://githubbox.com/nextui-org/next-app-template)

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## How to Use

1. yarn
2. yarn dev
3. open http://localhost:3000 in your browser

## 操作

1. 切换到管理员：用户选择 Admin，即可看到用户管理、电影管理两个入口
2. 其他用户就是普通用户

## 思路

1. 模拟电影数据
2. 模拟用户数据，包含购买的电影座位，剩余的金额
3. 权限部分：区分管理员和普通用户，管理员可以管理电影数据，普通用户只能查看电影数据

### 基础数据

1. 数据存储在localStorage中，包括用户信息和电影信息
2. 每次操作前先读区缓存数据，操作后更新缓存数据: 更新的时候就只需要更新该数据即可，即可同步其他操作项数据

```js
const [user, setUser] = useState(() => {
    const userInfo = localStorage.getItem('user');
    return userInfo ? JSON.parse(userInfo) : initUserData; // 如果有值则解析，否则初始化为空字符串
});

useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
}, [user]);
```

3. 更新用户数据是采用的是先更新获取到的值，修改完成后在调用 hooks 中的 setUser 函数更新缓存数据

#### 数据结构说明

1. 电影信息数据结构: 核心是名称和价格，这个是基础价，在选座位的时候，如果是最佳观影位置，回在该基础上*1.5

```js
const initMovieData = [
    {
        id: 1,
        title: 'Endgame ($10)',
        time: '',
        price: 10,
        description: 'A thrilling drama about the search for a mysterious alien artifact that grants superhuman strength and control over the human population.',
        image: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2522206650.webp',
    },
];
```

2. 用户信息数据结构: 核心是用户名、余额、购买的电影座位: 购买的是哪个电影的哪些座位

```js
{
    id: 1,
    name: 'Jack',
    amount: 300,
    tickets: [
        {
            movieId: 1,
            seats: []
        },
        {
            movieId: 2,
            seats: []
        },
    ]
},
```

3. 电影座位数据结构: 核心是标识，行号、列号、是否是最佳观影位置，表现是 A2、A5、B7、C8、F9 这样的字母标识
- 可以通过 utils/seat.ts 中的 createSeats、getBestSeats 方法获取座位标识
- 这里没有采用二维数据结构，主要是为了方便前端渲染，后端只需要存储座位标识即可，在购买座位的时候，可以根据座位标识找到对应的座位信息

```js
seats[`${seId}`] = {
    row: i,
    column: j,
    No: seId,
    isBeat: bestSeats.includes(j)
};
```

4. 座位颜色标识可通过 utils/seats.js 中的 getOccupiedSeats 方法得到：这里主要可以使用在验证是否可以购买座位权限时，可以根据座位标识判断是否已经被占用
- 根据用户信息和userId、movieId，来得到当前电影中哪些座位已经被占用，哪些座位可以被选中，哪些是我已经购买的座位
{
    ownTicket: [], // 我已经购买的座位
    occiipedTickets: [], // 已经被占用的座位
    allSeats: [], // 所有已选座位
}

##### 管理员操作用户权限

1. 新增用户：输入用户名、金额，提交后在用户列表中显示，构建基本用户信息数据结构存储
2. 编辑用户：修改金额，提交后更新用户信息

##### 管理员操作电影数据

1. 新增电影：输入电影名称、价格、描述，提交后在电影列表中显示，构建基本电影信息数据结构存储
2. 编辑电影：修改电影信息，提交后更新电影信息
3. 删除电影：删除电影，提交后从电影列表中删除

## 座位状态

- 空闲：没有被选中，可以选中
- 选中：已经被选中，用户如果再次点击，则取消选中，此时需要将该座位标识从用户信息中移除，并且将对应的座位金额返还给用户余额
    如果是第一次选中，则需要扣除对应座位的金额，如果余额不足，则不能选中，如果余额充足，则将该座位标识加入用户信息中，并且扣除对应座位的金额
- 已售：已经被购买，不能再选中、

- 对于座位点击购买时，采用的是事件委托方式，为了防止过多的事件绑定


## 文件拆分

1. 模块拆在 app/modules 目录下，包含用户、管理员两个大块
2. 管理员模块包含电影、用户两个子模块，分别管理电影数据和用户数据，其页面对应 app/admin 和 app/movie 两个目录
    这两个目录页面组件拆分在 app/components/admin 和 app/components/movie 目录下

  - 电影管理：新增和修改电影信息，采用的是同一个弹窗组件，然后根据父组件传递的数据来判断新增还是修改

3. 其余组件都在 app/components 目录下，包含公共组件、用户组件、管理员组件等
