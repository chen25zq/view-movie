"use client";

import { useState,useEffect } from "react";

export default function Demo1Page() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [scList, setScList] = useState([]);
  const [gList, setGList] = useState([]);

  // 1. 完善请求
  // 2. 根据学校 / 性别进行分类并查询数据
  // 无es3、es5要求，可任意使用es6以上版本特性
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch("/api/data"); // 请求 API 路由
        // const json = await response.json();
        // console.log(json, 'response');
        // if (!response.ok) {
        //   setError("request error");
        // } else {
        //   setData(json)
        //   setLoading(false);
        // }
        setData([
          { school_name: "SJSU", gender: "male" },
          { school_name: "UVA", gender: "male" },
          { school_name: "KCC", gender: "male" },
          { school_name: "KCC", gender: "female" },
          { school_name: "SJSU", gender: "female" },
        ])

      } catch (error) {
        setError(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTypeSchoolName = (schoolName: string) => {
    console.log(schoolName, 'schoolName');
    if (schoolName === 'ALL') {
      setScList(data);
      return;
    }
    const filterSchool = data.filter(item => item?.school_name === schoolName);
    setScList(filterSchool);
  }

  const handleTypeGender = (gender: string) => {
    // { school_name: "SJSU", gender: "female" },
    if (gender === 'ALL') {
      setGList(data);
      return;
    }
    const genderList = data.filter(item => item?.gender === gender);
    setGList(genderList)
  }

  return (
    <div className="w-screen h-screen flex items-center py-[100px] flex-col">
      <div className="font-[32px]">1. 完善请求</div>
      <div className="h-[24px]" />
      <div className="font-[32px]">2. 根据学校 / 性别进行分类并查询数据</div>
      <div className="h-[24px]" />

      {/* ------------------- */}

      <div className="h-[120px] w-[400px] border-[5px] border-[#F0F0F0] flex flex-row justify-around items-center">
        <div className="h-full py-[6px] justify-start">
          <h6 className="font-semibold">按学校分类</h6>
          {/* 示例： 点击ALL 显示所有的，点击SJSU / KCC 只显示SJSU / KCC的数据 */}
          <p onClick={() => handleTypeSchoolName("ALL")}>ALL</p>
          <p onClick={() => handleTypeSchoolName("SJSU")}>示例: SJSU</p>
          <p onClick={() => handleTypeSchoolName("KCC")}>示例: KCC</p>
        </div>
        <div className="h-full py-[6px] justify-start">
          <h6 className="font-semibold">按性别分类</h6>
          <p onClick={() => handleTypeGender("ALL")}>ALL</p>
          <p onClick={() => handleTypeGender("male")}>male</p>
          <p onClick={() => handleTypeGender("female")}>female</p>
        </div>
      </div>
      {/* 渲染位置 */}
      <div className="h-[400px] w-[800px]">
        {scList.map(item =>(
          <p className="flex">
            <span className="mr-10">学校名称:{item?.school_name}</span>
            <span>性别:{item?.gender}</span>
          </p>
        ))}
      </div>

      <div className="h-[400px] w-[800px]">
        {gList.map(item =>(
          <p className="flex">
            <span className="mr-10">学校名称:{item?.school_name}</span>
            <span>性别:{item?.gender}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
