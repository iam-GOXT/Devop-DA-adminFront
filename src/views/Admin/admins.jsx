import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import HomeLayout from "../../Layouts/HomeLayout";
import Header from "../../components/header";
import { BiSearchAlt2 } from "react-icons/bi";
import { Form } from "react-bootstrap";
import AdminTable from "../../components/adminTable";
import { updateRequest } from "../../utils/axios";
import { userContext } from "../../context/user";

import styles from "./styles/dashboard.module.scss";
import axios from "axios";
import useSWR from "swr";
import config from "../../config";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const Admins = () => {
  const navigate = useNavigate();
  const [user] = useContext(userContext);
  const queryClient = useQueryClient();
  const location = useLocation();
  const pageSize = 20;
  const [pageNumber, setPageNumber] = useState(0);
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [processingIndex, setProcessingIndex] = useState([]);

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
      `${config.apiUrl}/da/admin/all-admin?keyword=${searchKeyWord}&perPage=${pageSize}&page=${pageNumber}`,
    ],
    fetcher
  );

  useEffect(() => {
    if (user && !user?.isMainAdmin) {
      return navigate("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Manage Paginated Page Index
  useEffect(() => {
    setPageNumber(JSON.parse(localStorage.getItem(location.pathname)) || 0);
  }, [location.pathname]);

  // useEffect(() => {
  //   console.log("data:", data);
  // }, [data]);

  const { mutate: mutation, isLoading } = useMutation(updateRequest, {
    onSuccess(response) {
      queryClient.invalidateQueries("admins");

      // Fetch Updated Admin List
      mutate();
    },
    onError(error) {
      // console.log(error);
    },
  });

  useEffect(() => {
    if (!isLoading) {
      setProcessingIndex([]);
    }
  }, [isLoading]);

  const handleAdminVerification = (admin, action, index) => {
    setProcessingIndex([...processingIndex, index]);

    mutation({
      url: `da/admin/verify?action=${action}`,

      data: { admin: admin._id },
    });
  };

  const deleteAdmin = async (item) => {
    // console.log(item);
    const query = window.confirm(
      `Are you sure to Delete User: ${item.firstName} ${item.lastName}?`
    );
    if (!query) return;

    try {
      await axios.delete(`${config.apiUrl}/da/admin/${item._id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Admin deleted",
        text: "Admin has been deleted successfully",
      });

      // console.log(`this is the record created: ${response.data}`);

      // Fetch Updated Admin List
      mutate();
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchKeyWord(query);
    setPageNumber(0);
  };

  return (
    <HomeLayout>
      <div className={styles.pageContainer}>
        <Header
          title={`Hello, ${user?.userName}`}
          subTitle="Welcome to your dashboard"
        />

        <div>
          <div className={`d-flex`}>
            <div className={`numberBox mb-3`}>
              <div className={`${styles.numberBox}`}>
                <div className="d-flex">
                  <div className={styles.number}>{data?.total}</div>
                  <div className={`${styles.numberLabel} ml-2 `}>
                    <div className="text-sm">Admins</div>
                    <div className="text-sm">in Database</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={` ${styles.searchLayer}`}>
            <div className={styles.searchBox} onChange={(e) => handleSearch(e)}>
              <Form.Control
                placeholder="Search"
                className={`${styles.searchInput} shadow-none`}
                type="search"
              />
              <BiSearchAlt2 color="lightgray" size={23} />
            </div>
          </div>
        </div>

        <AdminTable
          tbData={data}
          tbTitle="Admins"
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          error={error}
          handleAdminVerification={handleAdminVerification}
          deleteAdmin={deleteAdmin}
          isLoading={isLoading}
          processingIndex={processingIndex}
        />
      </div>
    </HomeLayout>
  );
};

export default Admins;
