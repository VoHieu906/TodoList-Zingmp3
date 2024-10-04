import React from "react";
import Icons from "../ultis/Icons";
import Search from "./Search";
import { useNavigate, useParams } from "react-router-dom";
const { FaLongArrowAltLeft, FaLongArrowAltRight } = Icons;
const Header = () => {
  const navigate = useNavigate();
  const { singer } = useParams();
  return (
    <div
      className="row w-100 d-flex align-items-center"
      style={{ height: "70px" }}
    >
      <div className="col-md-10">
        <div className=" row px-3">
          <div className="col-md-2 px-0">
            <span
              className="cursor-pointer"
              onClick={() => {
                navigate(-1);
              }}
            >
              {<FaLongArrowAltLeft size={24} />}
            </span>
            <span
              className="cursor-pointer"
              onClick={() => {
                navigate(+1);
              }}
              style={{ marginLeft: "30px" }}
            >
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
