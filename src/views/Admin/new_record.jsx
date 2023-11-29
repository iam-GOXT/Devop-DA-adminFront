import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import Spinner from "react-spinner-material";
import Swal from "sweetalert2";
import { postRequest } from "../../utils/axios";
import { countries } from "../../utils/helpers/data/countries";
import { NewRecordValidator } from "../../utils/validators/admin/newRecord";
import HomeLayout from "../../Layouts/HomeLayout";
import DashBoardHeader from "../../components/dashboard_header";
import { Row, Col, Form, Button, FormSelect } from "react-bootstrap";

import styles from "./styles/new.module.scss";
import { useNavigate } from "react-router-dom";

const NewRecord = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      schoolName: "",
      department: "",
      contact: "",
      faculty: "",
      country: "",
      email: "",
      website: "",
      courseOverview: "",
      funding: "",
      aboutSchool: "",
      requirement: "",
      services: "",
      fee: "",
      degree: "",
    },
    validationSchema: NewRecordValidator(),
    onSubmit: (values) => {
      console.log({ image: previewSource, logo: logoSource, ...values });

      mutate({
        // url:'api/schools',
        url: "da/record/create",
        data: { image: previewSource, logo: logoSource, ...values },
      });
    },
  });

  const { isLoading, mutate } = useMutation(postRequest, {
    onSuccess(response) {
      Swal.fire({
        icon: "success",
        title: "Record Saved",
        text: "New record has been created successfully",
      });
      //  for(let key in formik.values){
      //     formik.values[key] = ""
      //  }
      console.log(response.data);

      // Go to dashboard
      setTimeout(() => {
        navigate("/");
      }, 1500);
    },
    onError(error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message,
        showCancelButton: true,
        showConfirmButton: false,
      });
    },
  });

  const { isLoading: isLoadingDraft, mutate: mutateDraft } = useMutation(
    postRequest,
    {
      onSuccess(response) {
        Swal.fire({
          icon: "success",
          title: "Record Saved To Draft",
          text: "Record was successfully saved to draft",
        });
        // console.log(response.data);
      },
      onError(error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response?.data?.message,
          showCancelButton: true,
          showConfirmButton: false,
        });
      },
    }
  );

  const [disableDraftBTN, setDisableDraftBTN] = useState(true);
  const saveAsDraft = () => {
    mutateDraft({
      url: "da/record/draft/create",
      data: { image: previewSource, logo: logoSource, ...formik.values },
    });
  };

  useEffect(() => {
    const keyList = [];
    for (let key in formik.values) {
      keyList.push(key);
    }
    const activeKey = keyList.find((item) => formik.values[item] !== "");
    activeKey ? setDisableDraftBTN(false) : setDisableDraftBTN(true);
  }, [formik.values]);

  const [previewSource, setPreviewSource] = useState(null);
  const [logoSource, setLogoSource] = useState(null);
  const handleImgSelection = (e, type) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      type === "image"
        ? setPreviewSource(reader.result)
        : setLogoSource(reader.result);
    };
    reader.readAsDataURL(file);

    // console.log(previewSource)
  };

  const errorStyle = { border: "1px solid red" };
  return (
    <HomeLayout>
      <DashBoardHeader
        title={"New Record"}
        subTitle="Create new record for institution"
      />

      <div className={`${styles.imageSelction} mt-5 `}>
        <div className={`px-5 text-center mb-3`}>
          <input
            onChange={(e) => handleImgSelection(e, "image")}
            type="file"
            className={`${styles.inputFile} mb-3`}
          />{" "}
          <br />
          <img
            src={previewSource ? previewSource : "../../assets/image.jpg"}
            alt="placeholder"
            className={styles.placeholder}
          />
          <div className={`${styles.selectLabel} mt-2`}>
            select school image
          </div>
        </div>

        <div className={`px-5 text-center`}>
          <input
            onChange={(e) => handleImgSelection(e, "logo")}
            type="file"
            className={`${styles.inputFile} mb-3`}
          />{" "}
          <br />
          <img
            src={logoSource ? logoSource : "../../assets/image.jpg"}
            alt="placeholder"
            className={styles.logo}
          />
          <div className={`${styles.selectLabel} mt-2`}>select school logo</div>
        </div>
      </div>

      <Row className={styles.Layout}>
        <Col lg="12" md="12" sm="12" xs="12">
          <div className={styles.formContainer}>
            <form onSubmit={formik.handleSubmit}>
              <Row>
                <Col lg="6" className=" mb-3">
                  <Form.Group>
                    <Form.Label
                      htmlFor="school name"
                      className={`${styles.label} ml-3`}
                    >
                      Name of Institution{" "}
                    </Form.Label>
                    <Form.Control
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.schoolName}
                      type="text"
                      className={`${styles.input}  ml-3 `}
                      name="schoolName"
                      style={
                        formik.touched.schoolName &&
                        formik.errors.schoolName &&
                        errorStyle
                      }
                    />

                    {formik.touched.schoolName && formik.errors.schoolName && (
                      <p className={`${styles.errorMessage} px-3`}>
                        {formik.errors.schoolName}
                      </p>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col lg="5" className=" mb-3">
                  <Form.Group>
                    <Form.Label
                      htmlFor="Department"
                      className={`${styles.label} ml-3`}
                    >
                      Department
                    </Form.Label>
                    <Form.Control
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.department}
                      type="text"
                      className={`${styles.input} ml-3 `}
                      name="department"
                      style={
                        formik.touched.department &&
                        formik.errors.department &&
                        errorStyle
                      }
                    />
                    {formik.touched.department && formik.errors.department && (
                      <p className={`${styles.errorMessage} px-3`}>
                        {formik.errors.department}
                      </p>
                    )}
                  </Form.Group>
                </Col>

                <Col lg="5" className=" mb-3">
                  <Form.Group>
                    <Form.Label
                      htmlFor="contact"
                      className={`${styles.label} ml-3`}
                    >
                      Contact
                    </Form.Label>
                    <Form.Control
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.contact}
                      type="text"
                      className={`${styles.input} ml-3 `}
                      name="contact"
                      style={
                        formik.touched.contact &&
                        formik.errors.contact &&
                        errorStyle
                      }
                    />
                    {formik.touched.contact && formik.errors.contact && (
                      <p className={`${styles.errorMessage} px-3`}>
                        {formik.errors.contact}
                      </p>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col lg="5" className=" mb-3">
                  <Form.Group>
                    <Form.Label
                      htmlFor="faculty"
                      className={`${styles.label} ml-3`}
                    >
                      Faculty
                    </Form.Label>
                    <Form.Control
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.faculty}
                      type="text"
                      className={`${styles.input} ml-3 `}
                      name="faculty"
                      style={
                        formik.touched.faculty &&
                        formik.errors.faculty &&
                        errorStyle
                      }
                    />
                    {formik.touched.faculty && formik.errors.faculty && (
                      <p className={`${styles.errorMessage} px-3`}>
                        {formik.errors.faculty}
                      </p>
                    )}
                  </Form.Group>
                </Col>

                <Col lg="5" className=" mb-3">
                  <Form.Group>
                    <Form.Label
                      htmlFor="country"
                      className={`${styles.label} ml-3`}
                    >
                      Country
                    </Form.Label>
                    <FormSelect
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.country}
                      className={`${styles.input}  ml-3 `}
                      name="country"
                      style={
                        formik.touched.country &&
                        formik.errors.country &&
                        errorStyle
                      }
                    >
                      <option value="">Select country</option>
                      {countries.map((item, i) => (
                        <option value={item.name}>{item.name}</option>
                      ))}
                    </FormSelect>
                    {formik.touched.country && formik.errors.country && (
                      <p className={`${styles.errorMessage} px-3`}>
                        {formik.errors.country}
                      </p>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col lg="5" className=" mb-3">
                  <Form.Group>
                    <Form.Label
                      htmlFor="email"
                      className={`${styles.label} ml-3`}
                    >
                      Email
                    </Form.Label>
                    <Form.Control
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      type="text"
                      className={`${styles.input} ml-3 `}
                      name="email"
                      style={
                        formik.touched.email &&
                        formik.errors.email &&
                        errorStyle
                      }
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className={`${styles.errorMessage} px-3`}>
                        {formik.errors.email}
                      </p>
                    )}
                  </Form.Group>
                </Col>

                <Col lg="5" className=" mb-3">
                  <Form.Group>
                    <Form.Label
                      htmlFor="website"
                      className={`${styles.label} ml-3`}
                    >
                      Website
                    </Form.Label>
                    <Form.Control
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.website}
                      type="text"
                      className={`${styles.input} ml-3 `}
                      name="website"
                      style={
                        formik.touched.website &&
                        formik.errors.website &&
                        errorStyle
                      }
                    />
                    {formik.touched.website && formik.errors.website && (
                      <p className={`${styles.errorMessage} px-3`}>
                        {formik.errors.website}
                      </p>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col lg="5" className=" mb-3">
                  <Form.Group>
                    <Form.Label
                      htmlFor="school fee"
                      className={`${styles.label} ml-3`}
                    >
                      School Fee{" "}
                    </Form.Label>
                    <Form.Control
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.fee}
                      type="text"
                      className={`${styles.input}  ml-3 `}
                      name="fee"
                      style={
                        formik.touched.fee && formik.errors.fee && errorStyle
                      }
                    />

                    {formik.touched.fee && formik.errors.fee && (
                      <p className={`${styles.errorMessage} px-3`}>
                        {formik.errors.fee}
                      </p>
                    )}
                  </Form.Group>
                </Col>

                <Col lg="5" className=" mb-3">
                  <Form.Group>
                    <Form.Label
                      htmlFor="Degree"
                      className={`${styles.label} ml-3`}
                    >
                      Degree
                    </Form.Label>
                    <FormSelect
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.degree}
                      className={`${styles.input}  ml-3 `}
                      name="degree"
                      style={
                        formik.touched.degree &&
                        formik.errors.degree &&
                        errorStyle
                      }
                    >
                      <option value="">Select degree</option>
                      <option value="MSC">Masters degree</option>
                      <option value="BSC">Bachelor degree</option>
                      <option value="diploma">Diploma</option>
                    </FormSelect>
                    {/* <Form.Control
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} 
                                        value={formik.values.degree}
                                        type="text" className={`${styles.input}  ml-3 `}
                                        name="fee" 
                                        style={formik.touched.degree && formik.errors.degree && errorStyle}
                                    /> */}

                    {formik.touched.degree && formik.errors.degree && (
                      <p className={`${styles.errorMessage} px-3`}>
                        {formik.errors.degree}
                      </p>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Row></Row>

              <Row>
                <Col lg="12" md="12" className=" mb-3">
                  <Form.Group>
                    <Form.Label
                      htmlFor="overview"
                      className={`${styles.label} ml-3`}
                    >
                      Course Overview
                    </Form.Label>
                    <Form.Control
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.courseOverview}
                      as="textarea"
                      rows={7}
                      type="text"
                      className={`${styles.input} ml-3 `}
                      name="courseOverview"
                      style={
                        formik.touched.courseOverview &&
                        formik.errors.courseOverview &&
                        errorStyle
                      }
                    />
                    {formik.touched.courseOverview &&
                      formik.errors.courseOverview && (
                        <p className={`${styles.errorMessage} px-3`}>
                          {formik.errors.courseOverview}
                        </p>
                      )}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col lg="12" md="12" className=" mb-3">
                  <Form.Group>
                    <Form.Label
                      htmlFor="funding"
                      className={`${styles.label} ml-3`}
                    >
                      Funding/fee
                    </Form.Label>
                    <Form.Control
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.funding}
                      as="textarea"
                      rows={7}
                      type="text"
                      className={`${styles.input} ml-3 `}
                      name="funding"
                      style={
                        formik.touched.funding &&
                        formik.errors.funding &&
                        errorStyle
                      }
                    />
                    {formik.touched.funding && formik.errors.funding && (
                      <p className={`${styles.errorMessage} px-3`}>
                        {formik.errors.funding}
                      </p>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col lg="12" md="12" className=" mb-3">
                  <Form.Group>
                    <Form.Label
                      htmlFor="about"
                      className={`${styles.label} ml-3`}
                    >
                      About School{" "}
                    </Form.Label>
                    <Form.Control
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.aboutSchool}
                      as="textarea"
                      rows={7}
                      type="text"
                      className={`${styles.input} ml-3 `}
                      name="aboutSchool"
                      style={
                        formik.touched.aboutSchool &&
                        formik.errors.aboutSchool &&
                        errorStyle
                      }
                    />
                    {formik.touched.aboutSchool &&
                      formik.errors.aboutSchool && (
                        <p className={`${styles.errorMessage} px-3`}>
                          {formik.errors.aboutSchool}
                        </p>
                      )}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col lg="12" md="12" className=" mb-3">
                  <Form.Group>
                    <Form.Label className={`${styles.label} ml-3`}>
                      Requirement{" "}
                    </Form.Label>
                    <Form.Control
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.requirement}
                      as="textarea"
                      rows={7}
                      type="text"
                      className={`${styles.input} ml-3 `}
                      name="requirement"
                      style={
                        formik.touched.requirement &&
                        formik.errors.requirement &&
                        errorStyle
                      }
                    />
                    {formik.touched.requirement &&
                      formik.errors.requirement && (
                        <p className={`${styles.errorMessage} px-3`}>
                          {formik.errors.requirement}
                        </p>
                      )}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col lg="12" md="12" className=" mb-3">
                  <Form.Group>
                    <Form.Label className={`${styles.label} ml-3`}>
                      Services{" "}
                    </Form.Label>
                    <Form.Control
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.services}
                      as="textarea"
                      rows={7}
                      type="text"
                      className={`${styles.input} ml-3 `}
                      name="services"
                      style={
                        formik.touched.services &&
                        formik.errors.services &&
                        errorStyle
                      }
                    />
                    {formik.touched.services && formik.errors.services && (
                      <p className={`${styles.errorMessage} px-3`}>
                        {formik.errors.services}
                      </p>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Button type="submit" style={{ width: "100%" }}>
                {isLoading ? (
                  <Spinner
                    className="mx-auto"
                    color="white"
                    radius={28}
                    stroke={2}
                  />
                ) : (
                  "Upload data"
                )}
              </Button>
            </form>
            <Button
              disabled={disableDraftBTN}
              onClick={() => saveAsDraft()}
              variant="secondary"
              className={`mt-3`}
            >
              {isLoadingDraft ? (
                <Spinner
                  className="mx-auto"
                  color="white"
                  radius={28}
                  stroke={2}
                />
              ) : (
                "Save as draft"
              )}
            </Button>
          </div>
        </Col>
        {/* <Col lg="3" className='hideOnMobile'>
                    <div className={styles.activities}>
                        <div>Recenet activities</div>
                        <div></div>
                    </div>
                </Col> */}
      </Row>
    </HomeLayout>
  );
};

export default NewRecord;
