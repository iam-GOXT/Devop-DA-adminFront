import React, { useContext } from "react";
import { userContext } from "../context/user";
import Spinner from "react-spinner-material";
import { Button } from "react-bootstrap";
import styles from "./styles/table.module.scss";
import ReactPaginate from "react-paginate";
import { useLocation } from "react-router-dom";

const AdminTable = ({
  tbTitle,
  tbData,
  pageNumber,
  setPageNumber,
  error,
  handleAdminVerification,
  deleteAdmin,
  isLoading,
  processingIndex,
}) => {
  const [user] = useContext(userContext);
  const location = useLocation();

  const handlePageChange = (page) => {
    setPageNumber(page?.selected);

    // Manage Paginated Page Index
    localStorage.setItem(location.pathname, JSON.stringify(page?.selected));
  };

  return (
    <div>
      <div className={`mt-14 ${styles.tableContainer}`}>
        <div className={`d-flex`}>
          <div className={`${styles.tableTitle}`}>{tbTitle}</div>
          <div className={`d-flex flex-1 justify-content-end`}>
            <span className={` ${styles.viewAll}`}>View all</span>
          </div>
        </div>
        <hr />

        <table className={`${styles.table}`}>
          <thead className={`${styles.tableHead}`}>
            <tr>
              <td className={styles.th}>FirstName</td>
              <td className={styles.th}>LastName</td>
              <td className={styles.th}>Email</td>
              <td className={styles.th}>Id</td>
              <td className={styles.th}>Action</td>
            </tr>
          </thead>
          <tbody>
            {tbData?.data?.map((item, i) => (
              <tr key={i}>
                <td className={styles.td}>{item.firstName}</td>
                <td className={styles.td}>{item.lastName}</td>
                <td className={styles.td}>{item.email}</td>
                <td className={styles.td}>{item._id.slice(17)}</td>
                <td className={styles.td} style={{ color: "green" }}>
                  <>
                    {item.isVerified ? (
                      <Button
                        disabled={user?.isMainAdmin ? false : true}
                        onClick={() =>
                          handleAdminVerification(item, "unverify", i)
                        }
                        variant="danger"
                        style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        {isLoading && processingIndex.includes(i) ? (
                          <Spinner
                            className="mx-auto"
                            color="white"
                            radius={20}
                            stroke={2}
                          />
                        ) : (
                          "Unverify"
                        )}
                      </Button>
                    ) : (
                      <Button
                        disabled={user?.isMainAdmin ? false : true}
                        onClick={() =>
                          handleAdminVerification(item, "verify", i)
                        }
                        style={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        {isLoading && processingIndex.includes(i) ? (
                          <Spinner
                            className="mx-auto"
                            color="white"
                            radius={20}
                            stroke={2}
                          />
                        ) : (
                          "verify"
                        )}
                      </Button>
                    )}
                  </>
                </td>
                <td className={styles.td} style={{ color: "red" }}>
                  <Button
                    onClick={() => deleteAdmin(item)}
                    disabled={item.isVerified ? true : false}
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Delete
                  </Button>
                </td>
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

export default AdminTable;
