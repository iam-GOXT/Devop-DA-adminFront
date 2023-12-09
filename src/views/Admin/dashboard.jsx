import React, { useContext, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link, useLocation } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import { Form } from "react-bootstrap";
import Header from "../../components/header";
import AppTable from "../../components/table";
import Backdrop from "../../components/backdrop";
import { userContext } from "../../context/user";
import axios from "axios";
import config from "../../config";
import useSWR from "swr";
import styles from "./styles/dashboard.module.scss";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [user] = useContext(userContext);
  const queryClient = useQueryClient();
  const location = useLocation();
  const pageSize = 20;
  const [pageNumber, setPageNumber] = useState(0);
  const [searchKeyWord, setSearchKeyWord] = useState("");

  const fetcher = async function (url) {
    const response = await axios.get(`${url[0]}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  };

  const { data, error, mutate } = useSWR(
    [
      `${config.apiUrl}/da/record/search?keyword=${searchKeyWord}&perPage=${pageSize}&page=${pageNumber}`,
    ],
    fetcher
  );

  // Manage Paginated Page Index
  useEffect(() => {
    setPageNumber(0);
  }, [searchKeyWord]); // Reset page number when search keyword changes

  useEffect(() => {
    if (data) {
      // Ensure that pageCount is a non-negative integer
      const pageCount = Math.max(Math.ceil(data.total / pageSize), 0);
      setPageNumber(Math.min(pageNumber, pageCount - 1));
    }
  }, [data, pageSize]);

  const trashRecord = async (id) => {
    const query = window.confirm(
      "Are you sure you want to move the record to trash?"
    );
    if (!query) return;

    try {
      await axios.delete(`${config.apiUrl}/da/record/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      queryClient.invalidateQueries("user-uploads");
      queryClient.invalidateQueries("manage");

      // Update Record
      mutate();

      Swal.fire({
        icon: "success",
        title: "Record Moved To Trash",
        text: "Record has been Trashed",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message,
        showCancelButton: true,
        showConfirmButton: false,
      });
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchKeyWord(query);
  };

  return (
    <HomeLayout>
      <div className={styles.pageContainer}>
        <Header
          title={`Hello, ${user?.firstName} ${user?.lastName}`}
          subTitle="Welcome to your dashboard"
        />
        <div>
          <div className={`d-flex`}>
            <Link to="/dashboard/new">
              <button className={styles.btnCreate}>Create Record</button>
            </Link>
            <div className={`numberBox d-flex justify-content-end flex-1`}>
              <div className={`${styles.numberBox}`}>
                <div className="d-flex">
                  <div className={styles.number}>{data?.total}</div>
                  <div className={`${styles.numberLabel} ml-2`}>
                    <div>Records</div>
                    <div>uploaded</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={` ${styles.searchLayer}`}>
            <div className={styles.searchBox}>
              <Form.Control
                placeholder="Search"
                className={`${styles.searchInput} shadow-none`}
                type="search"
                onChange={handleSearch}
              />
              <BiSearchAlt2 color="lightgray" size={23} />
            </div>
          </div>
        </div>

        <AppTable
          TbHeadings="Recent records"
          tbData={data}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          error={error}
          type="uploads"
          deleteRecord={trashRecord}
        />
      </div>

      {!user && <Backdrop />}
    </HomeLayout>
  );
};

export default Dashboard;
