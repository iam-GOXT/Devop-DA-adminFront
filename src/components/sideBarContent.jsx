import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles/sidebar.module.scss";
import { NavBarOptions } from "../utils/helpers/data/navbar";
import { IoMdLogOut } from "react-icons/io";

const SideBarContent = () => {
  const navOptions = NavBarOptions();
  const navigate = useNavigate();

  const LogOut = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };
  return (
    <div className={styles.sideBarContent}>
      <div className={`${styles.logoArea}`}>
        <div className={`${styles.logoBox}`}>
          <img
            src="../../assets/logo.png"
            style={{ objectFit: "contain" }}
            alt="logo"
            width={125}
          />
        </div>
      </div>
      <hr
        className="mt-4"
        style={{
          border: "1px solid rgba(42, 55, 138, 0.75)",
          color: "rgba(42, 55, 138, 0.75)",
        }}
      />
      <div className={styles.navBarOptions}>
        {navOptions.map((item, i) => (
          <div key={i} className={styles.listsBox}>
            <Link
              style={{
                color: "rgba(42, 55, 138, 0.75)",
                textDecoration: "none",
              }}
              to={item.target}
            >
              <span
                className={`mr-2 ${styles.itemIcon}`}
                style={{ color: "rgba(42, 55, 138, 0.75)" }}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <hr
          style={{
            border: "1px solid rgba(42, 55, 138, 0.75)",
            color: "rgba(42, 55, 138, 0.75)",
            minWidth: "120px",
          }}
        />
        <div onClick={LogOut}>
          <IoMdLogOut size={25} />
          <span
            className="ml-4"
            style={{ fontWeight: "600", cursor: "pointer" }}
          >
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default SideBarContent;
