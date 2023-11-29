import React, { useEffect, useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import Header from "../../components/header";
import { BiSearchAlt2 } from "react-icons/bi";
import { Form } from "react-bootstrap";
import axios from "axios";
import config from "../../config";
import useSWR from "swr";
import AppTable from "../../components/table";
import { useLocation } from "react-router-dom";

import styles from "./styles/dashboard.module.scss";
import { useQueryClient } from "react-query";
import Swal from "sweetalert2";

const ManageRecords = () => {
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
    setPageNumber(JSON.parse(localStorage.getItem(location.pathname)) || 0);
  }, [location.pathname]);

  const trashRecord = async (id) => {
    const query = window.confirm(
      "Are you sure you want to move record to trash?"
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

  const handleSearch = async (e) => {
    const query = e.currentTarget.value;
    setSearchKeyWord(query);
    setPageNumber(0);
  };

  return (
    <HomeLayout>
      <div className={styles.pageContainer}>
        <Header title={"Manage"} subTitle={"Manage All Records"} />

        <div>
          <div className={`d-flex`}>
            {/* <button className={styles.btnCreate}>Create Record</button> */}
            <div className={`numberBox mb-3`}>
              <div className={`${styles.numberBox}`}>
                <div className="d-flex">
                  <div className={styles.number}>{data?.total}</div>
                  <div className={`${styles.numberLabel} ml-2 `}>
                    <div className="text-sm">records</div>
                    <div className="text-sm">in database</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={` ${styles.searchLayer}`}>
            <div className={styles.searchBox}>
              <Form.Control
                onChange={(e) => handleSearch(e)}
                placeholder="Search"
                className={`${styles.searchInput} shadow-none`}
                type="search"
              />
              <BiSearchAlt2 color="lightgray" size={23} />
            </div>
          </div>
        </div>

        <AppTable
          tbData={data}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          error={error}
          TbHeadings="All Records"
          type="uploads"
          deleteRecord={trashRecord}
        />
      </div>
    </HomeLayout>
  );
};

export default ManageRecords;
