import React from "react";
import Icons from "../ultis/Icons";
import Search from "./Search";
const { FaLongArrowAltLeft, FaLongArrowAltRight } = Icons;
const Header = () => {
  const aic = "align-items-center";
  return (
    <div className="row w-100" style={{ height: "60px" }}>
      <div className="col-md-10">
        <div className=" row ">
          <div className="col-md-2">
            <span>{<FaLongArrowAltLeft size={24} />}</span>
            <span style={{ marginLeft: "30px" }}>
              {<FaLongArrowAltRight size={24} />}
            </span>
          </div>
          <div className="col-md-10 ">
            <Search />
          </div>
        </div>
      </div>
      <div className="col-md-2">Đăng nhập</div>
    </div>
  );
};

export default Header;
