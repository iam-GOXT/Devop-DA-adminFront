import React, { useContext } from "react";
import { userContext } from "../context/user";
import { useNavigate, Link, useLocation } from "react-router-dom";
import config from "../config";
import styles from "./styles/table.module.scss";
import ReactPaginate from "react-paginate";
import { Spinner } from "react-bootstrap";

const AppTable = ({
  showDraftAction,
  // tbData: tbDataInit,
  tbData,
  TbHeadings,
  enableActions,
  removeDraft,
  type,
  pageNumber,
  setPageNumber,
  error,
  deleteRecord,
  restoreTrashedRecord,
}) => {
  const navigate = useNavigate();
  const [user] = useContext(userContext);
  // const [tbData, setTbData] = useState(tbDataInit);
  const isTrash = TbHeadings === "Trash" ? true : false;
  const location = useLocation();

  // useEffect(() => {
  //   setTbData(tbDataInit);
  //   console.log("tbDataInit:", tbDataInit);
  // }, [tbDataInit]);

  const formatDigit = (index, itemId) => {
    if (typeof itemId === "number") {
      let s__number = `00${index + 1}`;
      const id = `ADM${s__number}`;
      return id;
    } else if (typeof itemId === "string") {
      let s__number = itemId.slice(17);
      const id = `ADM${s__number}`;
      return id;
    }
  };

  const editRecord = (item) => {
    navigate(`/dashboard/edit/${item._id}?type=${type}`);
  };

  const handlePageChange = (page) => {
    setPageNumber(page?.selected);

    // Manage Paginated Page Index
    localStorage.setItem(location.pathname, JSON.stringify(page?.selected));
  };

  return (
    <div>
      <div className={`mt-7 ${styles.tableContainer}`}>
        <div className={`d-flex`}>
          <div className={`${styles.tableTitle}`}>{TbHeadings}</div>
          <div className={`d-flex flex-1 justify-content-end`}>
            <span className={` ${styles.viewAll}`}>View all</span>
          </div>
        </div>
        <hr />
        <table className={`${styles.table}`}>
          <thead className={`${styles.tableHead}`}>
            <tr>
              <td className={styles.th}>Id</td>
              <td className={styles.th}>School</td>
              <td className={styles.th}>Location</td>
              <td className={styles.th}>department</td>
              <td className={styles.th}>Faculty</td>
              <td className={styles.th}>
                {enableActions ? "Action" : "Author"}{" "}
              </td>
              {!enableActions && <td>Action</td>}
            </tr>
          </thead>
          <tbody>
            {/* {console.log("tbData:", tbData)}
            {console.log("user:", user)} */}
            {tbData?.data?.map((item, i) => (
              <tr className={`${styles.tableRow}`} key={i}>
                <td className={styles.td}>{formatDigit(i, item?._id)}</td>
                <td className={styles.td}>{item.schoolName}</td>
                <td className={styles.td}>{item.country}</td>
                <td className={styles.td}>{item.department}</td>
                <td className={styles.td}>{item.faculty}</td>

                <td className={`${styles.td}`}>
                  {enableActions ? (
                    <>
                      <span
                        onClick={() => editRecord(item)}
                        className={`${styles.edit} mr-3`}
                      >
                        Edit{" "}
                      </span>
                      {showDraftAction ? (
                        <span
                          className={styles.delete}
                          onClick={() => removeDraft(item?._id)}
                        >
                          Delete
                        </span>
                      ) : (
                        <span
                          className={styles.delete}
                          onClick={() => deleteRecord(item?._id)}
                        >
                          Delete
                        </span>
                      )}
                    </>
                  ) : (
                    <span className={``}>
                      <Link
                        style={{ color: "blue", textDecoration: "none" }}
                        to={`/dashboard/profile/${user?._id}`}
                      >
                        {`${item?.user_id?.firstName} ${item?.user_id?.lastName}`}
                      </Link>
                    </span>
                  )}
                </td>

                {!enableActions &&
                (user?.isMainAdmin || item?.user_id?._id === user?._id) ? (
                  <td>
                    <>
                      {!isTrash && (
                        <span
                          onClick={() => editRecord(item)}
                          className={`${styles.edit} mr-3`}
                        >
                          Edit{" "}
                        </span>
                      )}

                      {isTrash && (
                        <span
                          className={`${styles.edit} mr-3 text-secondary`}
                          onClick={() => restoreTrashedRecord(item?._id)}
                        >
                          Restore{" "}
                        </span>
                      )}

                      {showDraftAction ? (
                        <span
                          className={styles.delete}
                          onClick={() => removeDraft(item?._id)}
                        >
                          Delete
                        </span>
                      ) : (
                        <span
                          className={styles.delete}
                          onClick={() => deleteRecord(item?._id)}
                        >
                          Delete
                        </span>
                      )}
                    </>
                  </td>
                ) : !enableActions ? (
                  <td></td>
                ) : null}

                {!showDraftAction && (
                  <td>
                    <a
                      style={{ color: "blue" }}
                      href={`${config.apiUrl}/da/record/${item._id}`}
                    >
                      Preview
                    </a>
                  </td>
                )}
              </tr>
            ))}
          </tbody>

          {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
          {!tbData?.data && !error ? (
            <div
              className="col-12"
              style={{
                textAlign: "center",
                color: "gray",
                marginTop: "3.2rem",
              }}
            >
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : null}

          {error ? (
            <p
              style={{
                textAlign: "center",
                color: "gray",
                marginTop: "3.2rem",
              }}
            >
              <b>Oops! Something went wrong</b>
            </p>
          ) : null}

          {tbData?.total === 0 ? (
            <div
              className="col-12"
              style={{
                textAlign: "center",
                color: "gray",
                marginTop: "3.2rem",
              }}
            >
              <h5>No Result Found</h5>
            </div>
          ) : null}

          {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
        </table>
      </div>

      <div style={{ margin: "auto", marginTop: "2rem", width: "fit-content" }}>
        <ReactPaginate
          previousLabel="< previous"
          nextLabel="next >"
          pageRangeDisplayed={4}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          pageCount={tbData?.numPages}
          breakLabel="..."
          forcePage={pageNumber}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          activeClassName="bg-primary text-light"
          activeLinkClassName="bg-primary text-light"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default AppTable;
