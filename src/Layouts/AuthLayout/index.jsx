import React from "react";
import styles from "../styles/auth.module.scss";
import { Col, Row } from "react-bootstrap";

const AuthLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Row style={{ minHeight: "100vh" }}>
        <Col className={`hideOnMobile`} lg="6" md="6">
          <div className={styles.bannerImage}>
            <img
              className={styles.image}
              src="../../assets/banner1.png"
              alt=""
            />
          </div>
        </Col>

        <Col lg="6" md="6" className={styles.childSection}>
          <div className={`hideOnDesktop`}>
            <img
              className={`${styles.logo}`}
              src="../assets/logo.png"
              alt=""
              width={125}
            />
          </div>
          {children}
        </Col>
      </Row>
    </div>
  );
};
export default AuthLayout;
