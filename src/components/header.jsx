import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { userContext } from "../context/user";
import { IoIosNotificationsOutline } from "react-icons/io";
import styles from "../views/Admin/styles/dashboard.module.scss";
import { IoMdLogOut } from "react-icons/io";

const Header = ({ title, subTitle }) => {
  const navigate = useNavigate();

  const [user, setUser] = useContext(userContext);
  const LogOut = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };
  console.log("Admin user", user);
  return (
    <div>
      <div className={`d-flex`}>
        <div>
          <div className={styles.hello}>{title}</div>
          <div className={styles.welcome}>{subTitle}</div>
        </div>
        <div className={`d-flex flex-1 justify-content-end me-3`}>
          <div className="hideOnMobile">
            {/* <IoIosNotificationsOutline
              className="mr-4"
              size={23}
              color="#0D5459"
            /> */}
            <Link to={`/dashboard/profile/${user._id}`}>
              <Avatar name={user?.userName} round={true} size={"60px"} />
            </Link>
          </div>
        </div>
      </div>

      <div className="d-flex flex-1 justify-content-end hideOnMobile">
        <div className={`${styles.smallNavs} hideOnMobile`}>
          <div>
            <Link className={styles.links}> Contact Supervisor</Link>
          </div>
          {user?.isMainAdmin ? (
            <div>
              <Link to="/dashboard/admins" className={styles.links}>
                Admin
              </Link>
            </div>
          ) : (
            ""
          )}
          <div onClick={LogOut}>
            <Link className={styles.links}>Logout</Link>
          </div>
          {/* <div onClick={LogOut}>
            <IoMdLogOut size={25} />
            <span
              style={{ fontWeight: "600", cursor: "pointer" }}
            >
              Logout
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
