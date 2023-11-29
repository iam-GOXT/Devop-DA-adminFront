import React, { useEffect, useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import Header from "../../components/header";
import AppTable from "../../components/table";

import styles from "./styles/dashboard.module.scss";
import useSWR from "swr";
import config from "../../config";
import axios from "axios";
import { useQueryClient } from "react-query";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

const Uploaded = () => {
  // const [user, setUser] = useContext(userContext);
  // // console.log(`This is the user that uploaded ${user}`)
  // const [Admins, setAdmins] = useState([]);
  // const [response, setResponse] = useState();
  // const [isLoading, setIsLoading] = useState();

  const location = useLocation();
  const pageSize = 20;
  const [pageNumber, setPageNumber] = useState(0);
  const queryClient = useQueryClient();
  // const [searchKeyWord, setSearchKeyWord] = useState("");

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
      `${config.apiUrl}/da/record/search/id?perPage=${pageSize}&page=${pageNumber}`,
    ],
    fetcher
  );

  // Manage Paginated Page Index
  useEffect(() => {
    setPageNumber(JSON.parse(localStorage.getItem(location.pathname)) || 0);
  }, [location.pathname]);

  // useEffect(() => {
  //   console.log("data:", data);
  // }, [data]);

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

  // const { isLoading, isFetching, data} = useQuery(
  //     'user-uploads',
  //     // ()=>getRequest({url:`api/schools/user/${user?._id}`}),
  //     ()=>getRequest({url:`da/record/all/${user?.user_id}`}),

  //     {
  //         refetchOnWindowFocus:false,
  //         onSuccess(response){
  //              console.log(response);
  //         },
  //         onError(error){
  //             console.log(error)
  //         },
  //         enabled:!!user?._id
  //     }
  // )
  // console.log(`This the data ${data}`)

  // useEffect(() => {
  //   async function fetchUserUploads() {
  //     const { data } = await getRequest({ url: `da/record/all/id` });
  //     console.log("dataaa", data);
  //     setResponse(data);
  //   }
  //   if (user) fetchUserUploads();
  // }, [user]);

  // const handleSearch = ()=>{
  //     navigate('/dashboard/manage')
  // }

  return (
    <HomeLayout>
      <div className={styles.pageContainer}>
        <Header title="Uploaded" subTitle="All active institutions" />

        <div>
          <div className={`d-flex`}>
            {/* <button className={styles.btnCreate}>Create Record</button> */}
            <div className={`numberBox mb-3`}>
              <div className={`${styles.numberBox}`}>
                <div className="d-flex">
                  {/* <div className={styles.number}>{data?.data?.schools?.length}</div> */}
                  <div className={styles.number}>{data?.total}</div>
                  <div className={`${styles.numberLabel} ml-2 `}>
                    <div className="text-sm">records</div>
                    <div className="text-sm">uploaded</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className={` ${styles.searchLayer}`}>
                        <div className={styles.searchBox}>
                            <Form.Control placeholder='Search' className={`${styles.searchInput} shadow-none`} type="search" />
                            <BiSearchAlt2 color="lightgray" size={23} />
                        </div>
                    </div> */}
        </div>

        <AppTable
          tbData={data}
          TbHeadings="Your uploads"
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          error={error}
          enableActions={true}
          type="uploads"
          deleteRecord={trashRecord}
        />
      </div>
    </HomeLayout>
  );
};

export default Uploaded;
