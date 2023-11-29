import React, { useContext, useEffect, useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import Header from "../../components/header";
import AppTable from "../../components/table";
import styles from "./styles/dashboard.module.scss";
import useSWR from "swr";
import config from "../../config";
import axios from "axios";
import { useQueryClient } from "react-query";
import Swal from "sweetalert2";
import { userContext } from "../../context/user";
import { useLocation } from "react-router-dom";

const Trash = () => {
  const [user] = useContext(userContext);
  const location = useLocation();
  const pageSize = 20;
  const [pageNumber, setPageNumber] = useState(0);
  const queryClient = useQueryClient();

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
      `${config.apiUrl}/da/record/trash/id?perPage=${pageSize}&page=${pageNumber}`,
    ],
    fetcher
  );

  const {
    data: dataSuperAdmin,
    error: errorSuperAdmin,
    mutate: mutateSuperAdmin,
  } = useSWR(
    [`${config.apiUrl}/da/record/trash?perPage=${pageSize}&page=${pageNumber}`],
    fetcher
  );

  // Manage Paginated Page Index
  useEffect(() => {
    setPageNumber(JSON.parse(localStorage.getItem(location.pathname)) || 0);
  }, [location.pathname]);

  const deleteRecord = async (id) => {
    const query = window.confirm(
      "Are you sure you want to move record to trash?"
    );
    if (!query) return;

    try {
      await axios.delete(`${config.apiUrl}/da/record/trash/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      queryClient.invalidateQueries("user-uploads");
      queryClient.invalidateQueries("manage");

      // Update Record
      if (user?.isMainAdmin) {
        mutateSuperAdmin();
      } else {
        mutate();
      }

      Swal.fire({
        icon: "success",
        title: "Record Permanently deleted",
        text: "Record has been deleted successfully",
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

  const restoreTrashedRecord = async (id) => {
    const query = window.confirm("Are you sure to restore record?");
    if (!query) return;

    try {
      await axios.put(`${config.apiUrl}/da/record/trash/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      // console.log("restore:", restore);
      queryClient.invalidateQueries("user-uploads");
      queryClient.invalidateQueries("manage");

      // Update Record
      if (user?.isMainAdmin) {
        mutateSuperAdmin();
      } else {
        mutate();
      }

      Swal.fire({
        icon: "success",
        title: "Record Restored",
        text: "Record has been restored successfully",
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

  return (
    <HomeLayout>
      <div className={styles.pageContainer}>
        <Header title="Trash" subTitle="Item in trash" />

        <div>
          <div className={`d-flex`}>
            {/* <button className={styles.btnCreate}>Create Record</button> */}
            <div className={`numberBox mb-3`}>
              <div className={`${styles.numberBox}`}>
                <div className="d-flex">
                  <div className={styles.number}>
                    {user?.isMainAdmin ? dataSuperAdmin?.total : data?.total}
                  </div>
                  <div className={`${styles.numberLabel} ml-2 `}>
                    <div className="text-sm">records</div>
                    <div className="text-sm">in database</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className={` ${styles.searchLayer}`}>
                        <div className={styles.searchBox}>
                            <Form.Control onChange={(e)=>handleSearch(e)}  placeholder='Search' className={`${styles.searchInput} shadow-none`} type="search" />
                            <BiSearchAlt2 color="lightgray" size={23} />
                        </div>
                    </div> */}
        </div>

        <AppTable
          tbData={user?.isMainAdmin ? dataSuperAdmin : data}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          error={user?.isMainAdmin ? errorSuperAdmin : error}
          TbHeadings="Trash"
          deleteRecord={deleteRecord}
          restoreTrashedRecord={restoreTrashedRecord}
        />
      </div>
    </HomeLayout>
  );
};

export default Trash;
