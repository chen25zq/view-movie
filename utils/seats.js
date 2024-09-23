
// 获取最佳座位
const getBestSeats = (start, end) => {
    const results = [];
    const midPoint = Math.floor((start + end) / 2); // 计算中点
    const range = 8; // 定义要获取的数字个数

    // 计算要提取的范围
    const startRange = midPoint - Math.floor(range / 2);
    const endRange = midPoint + Math.floor((range + 1) / 2);

    for (let i = start; i <= end; i++) {
        if (i > startRange && i <= endRange) {
            results.push(i);
        }
    }

    return results;
}


// 生成一个对象，用来表示电影院的座位布局
export const createSeats = (rowNum = 6, colNum = 12) => {
    const seats = {};
    const bestSeats = getBestSeats(1, colNum);
    for (let i = 1; i <= rowNum; i++) {
        for (let j = 1; j <= colNum; j++) {
            const seId = `${String.fromCharCode(65 + (i - 1))}${j}`;
            seats[`${seId}`] = {
                row: i,
                column: j,
                No: seId,
                isBeat: bestSeats.includes(j)
            };
        }
    }
    return seats;
}

// 初始化电影数据
export const initMovieData = [
    {
        id: 1,
        title: 'Endgame ($10)',
        time: '',
        price: 10,
        description: 'A thrilling drama about the search for a mysterious alien artifact that grants superhuman strength and control over the human population.',
        image: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2522206650.webp',
    },
    {
        id: 2,
        title: 'Joker ($12)',
        time: '',
        price: 12,
        description: 'A dark comedy that follows the exploits of a young man with a vast knowledge of the law.',
        image: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2522206650.webp',
    },
    {
        id: 3,
        title: 'Toy Story 4 ($8)',
        time: '',
        price: 8,
        description: 'A thrilling drama about the search for a mysterious alien artifact that grants superhuman strength and control over the human population.',
        image: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2522206650.webp',
    },
]


// 初始化用户信息
export const initUserData = [
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
    {
        id: 2,
        name: 'Lucia',
        amount: 500,
        tickets: [
            {
                movieId: 2,
                seats: []
            },
            {
                movieId: 3,
                seats: []
            },
        ]
    },
    {
        id: 3,
        name: 'Tom',
        amount: 200,
        tickets: [
            {
                movieId: 1,
                seats: []
            },
            {
                movieId: 3,
                seats: []
            },
        ]
    },
    {
        id: 4,
        name: 'Admin',
        amount: 10000000,
        tickets: []
    }
]

// 获取指定电影的已占座位
export const getOccupiedSeats = (userData, useId, movieId) => {
    if (!movieId || !useId) return undefined;
    const ticketRst = {};
    const list = [];
    userData.forEach(item => {
        if (item.id === useId) {
            // 自己的票
            const ownTicket = item.tickets?.find(item => item.movieId === movieId);
            if (ownTicket) {
                ticketRst.ownTicket = ownTicket.seats;
            }
        } else {
            // 已占座位
            const occiipedTickets = item.tickets?.filter(item => item.movieId === movieId);
            if (occiipedTickets.length > 0) {
                list.push(...occiipedTickets[0].seats);
                ticketRst.occpiedSeats = list;
            }
        }
    });
    // 全部已选座位
    ticketRst.allSeats = ticketRst.ownTicket?.concat(ticketRst.occpiedSeats);
    return ticketRst;
}

// getOccupiedSeats(initUserData, 1, 1)