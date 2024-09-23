"use client";
import { useState, useEffect } from "react";
import { createSeats, getOccupiedSeats } from "@/utils/seats";
import { initUserData, initMovieData } from "@/utils/seats";
import { UserInfo } from "@/components/UserInfo";

import { Result } from "./Result";
import { ErrorModal } from "@/components/ErrorModal";

// 初始化电影位置选择
const MovieSeat = ({ seatKey, clsName = "bg-gray-200" }) => {
  return (
    <div className={`cursor-pointer h-4 w-6 rounded-t-full overflow-hidden ${clsName}`}>
      <div data-seat-key={seatKey} className={`${clsName} h-4 w-6 rounded-full text-small`}>{seatKey}</div>
    </div>
  );
};

export interface SeatSelectionProps {
  selectUser: number;
  selectMovie: number;
}

export const SeatSelection = ({ selectUser, selectMovie }: SeatSelectionProps) => {
  const allSeats = createSeats(5, 12);
  const [seats] = useState(allSeats);
  const [message, setMessage] = useState("");
  const [sellPrice, setSellPrice] = useState(0);

  const [user, setUser] = useState(() => {
    const userInfo = localStorage.getItem('user');
    return userInfo ? JSON.parse(userInfo) : initUserData; // 如果有值则解析，否则初始化为空字符串
  });

  // 座位分类
  const typeSeats = getOccupiedSeats(user, selectUser, selectMovie);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  // 验证买票条件
  const checkSeat = (seatInfo: any) => {
    console.log(typeof selectUser, selectMovie, seatInfo);
    if (selectUser === 0) {
      setMessage("请选择用户");
      return false;
    }
    if (selectMovie === 0) {
      setMessage("请选择电影");
      return false; 
    }

    if (!typeSeats) return false;

    const { occpiedSeats, ownTicket } = typeSeats;
    console.log(occpiedSeats, ownTicket, 'occpiedSeats, ownTicket');
    
    // 座位是否被占用
    if (occpiedSeats?.includes(seatInfo.No)) {
      setMessage("该座位已被占用");
      return false;
    } else if (ownTicket?.includes(seatInfo.No)) {
      // 取消已购买的座位
      updateSeat(seatInfo, "cancel");
    } else {
      // 购买座位
      updateSeat(seatInfo, "buy");
    }
  }

  // 更新座位状态
  const updateSeat = (seatInfo: any, type: string) => {
    const movieInfo = initMovieData.filter(item => item.id === selectMovie)[0];
    let price = movieInfo.price;
    if (seatInfo.isBeat) {
      price *= 1.5; // 1.5倍票
    }

    setSellPrice(price);

    const currentUser = user.filter(item => item.id === selectUser)[0];
    const currentSeat = currentUser.tickets.filter(item => item.movieId === movieInfo.id)[0];
    console.log(currentSeat, 'currentSeat');
    const currentUserIndex = user.findIndex(item => item.id === selectUser);
    if (type === "cancel") {
      currentUser.amount += price; // 返还余额
      currentSeat.seats = currentSeat?.seats?.filter(seat => seat !== seatInfo.No); // 删除购买的座位
      if (currentUserIndex > -1) {
        user[currentUserIndex] = currentUser; // 更新用户信息
      }
      setUser([...user]);
      setMessage("取消座位成功");
      return true;
    } else if (type === "buy") {
      if (price >= currentUser.amount) {
        setMessage("该用户余额不足");
        return false;
      } else {
        currentUser.amount -= price; // 扣除余额
        currentSeat?.seats?.push(seatInfo.No); // 购买座位
        if (currentUserIndex > -1) {
          user[currentUserIndex] = currentUser; // 更新用户信息
        }
        setUser([...user]); // 更新用户信息
        setMessage("购买成功");
        return true;
      }
    }
  }

  // 选座位
  const handleSeatClick = (event: any) => {
    const seatKey: string = event.target.getAttribute('data-seat-key');
    const selectedSeatInfo: any = seats[seatKey];
    checkSeat(selectedSeatInfo);
    // console.log('被点击的座位key:', selectedSeatInfo, typeSeats);
  };

  return (
    <>
      {selectUser !== 0 && <UserInfo user={user} selectUser={selectUser} />}
    
      <div className="flex justify-center items-center gap-30 mt-10">
        <div className="flex items-center gap-2">
          <MovieSeat seatKey="" />
          <span className="mr-2">N/A</span>
        </div>
        <div className="flex items-center gap-2">
          <MovieSeat seatKey="" clsName={"bg-blue-500"}/>
          <span className="mr-2">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <MovieSeat seatKey="" clsName={"bg-red-500"} />
          <span className="mr-2">Occupied</span>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 mt-10" onClick={handleSeatClick}>
        {Object.keys(seats).map(seatKey => {
          const clsName = typeSeats?.ownTicket?.includes(seatKey) ? "bg-blue-500" : typeSeats?.occpiedSeats?.includes(seatKey) ? "bg-red-500" :  "bg-gray-200"
          return (
            <MovieSeat key={seatKey} seatKey={seatKey} clsName={clsName}/>
          )
        })}
      </div>

      <Result seats={typeSeats} sellPrice={sellPrice} />

      {message && <ErrorModal message={message} handleCloseModal={() => setMessage("")} />}
    </>
  );
};
