import React, { useEffect, useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import Header from "../../components/header";
import AppTable from "../../components/table";

import styles from "./styles/dashboard.module.scss";
import axios from "axios";
import useSWR from "swr";
import config from "../../config";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

const Draft = () => {
  // const [tableData, setTableData] = useState(
  //   JSON.parse(localStorage.getItem("draft")) || []
  // );

  // useEffect(() => {
  //   // /da/record/draft/id
  // }, [third]);

  const location = useLocation();
  const pageSize = 20;
  const [pageNumber, setPageNumber] = useState(0);
  // const [searchKeyWord, setSearchKeyWord] = useState("");

  const fetcher = async function (url) {
    const response = await axios.get(`${url[0]}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  };

  const { data, mutate } = useSWR(
    [
      `${config.apiUrl}/da/record/draft/id?perPage=${pageSize}&page=${pageNumber}`,
    ],
    fetcher
  );

  // Manage Paginated Page Index
  useEffect(() => {
    setPageNumber(JSON.parse(localStorage.getItem(location.pathname)) || 0);
  }, [location.pathname]);

  // useEffect(() => {
  //   // da/record/draft/create, this is for saving in draft
  //   // da/record/draft/:id this is for deleting a record
  //   console.log("Draft Data:", data);
  // }, [data]);

  const removeFromDraft = async (id) => {
    const query = window.confirm("Are you sure you want to delete draft?");
    if (!query) return;
    // await axios.delete(`${config.apiUrl}/${url}`, {
    try {
      await axios.delete(`${config.apiUrl}/da/record/draft/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      // Update Draft Record
      mutate();

      Swal.fire({
        icon: "success",
        title: "Draft Deleted",
        text: "Record wa successfully removed from draft",
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

  // const handleSearch = () => {
  //   navigate("/dashboard/manage");
  // };

  return (
    <HomeLayout>
      <div className={styles.pageContainer}>
        <Header title={`Draft`} subTitle={`Edit draft items`} />

        <div>
          <div className={`d-flex`}>
            {/* <button className={styles.btnCreate}>Create Record</button> */}
            <div className={`numberBox mb-3`}>
              <div className={`${styles.numberBox}`}>
                <div className="d-flex">
                  <div className={styles.number}>{data?.total}</div>
                  <div className={`${styles.numberLabel} ml-2 `}>
                    <div className="text-sm">records</div>
                    <div className="text-sm">in draft</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className={` ${styles.searchLayer}`}>
                        <div className={styles.searchBox} onClick={navigate}>
                            <Form.Control placeholder='Search' className={`${styles.searchInput} shadow-none`} type="search" />
                            <BiSearchAlt2 color="lightgray" size={23} />
                        </div>
                    </div> */}
        </div>

        <AppTable
          tbData={data}
          TbHeadings="Drafts"
          showDraftAction={true}
          enableActions={true}
          removeDraft={removeFromDraft}
          type="draft"
        />
      </div>
    </HomeLayout>
  );
};

export default Draft;
