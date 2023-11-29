import React, { useContext } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import Avatar from "react-avatar";
import { userContext } from "../context/user";
import styles from "./styles/header.module.scss";

const DashBoardHeader = ({ title, subTitle }) => {
  const [user] = useContext(userContext);
  return (
    <div>
      <div className={`${styles.header}`}>
        <div className={`${styles.text}`}>
          <div className={`${styles.title}`}>{title}</div>
          <div className={`${styles.subTitle}`}>{subTitle}</div>
        </div>

        <div className={`d-flex flex-1 justify-content-end hideOnMobile`}>
          {/* <IoIosNotificationsOutline className='mr-4 mt-2' size={23} color='#0D5459' /> */}
          <Avatar
            fgcolor="#fff"
            name={user?.userName}
            round={true}
            size={"40px"}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoardHeader;
