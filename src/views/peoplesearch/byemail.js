import React from "react";
import { Col, Row, FloatingLabel, Form, Accordion } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const ByEmail = () => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Required"),
  });
  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={console.log}
        initialValues={{
          email: "",
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
          dirty,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md>
                <FloatingLabel controlId="floatingInputGrid" label="Email">
                  <Form.Control
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email ? "is-invalid" : ""
                    }
                  />
                  {errors.email && touched.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </FloatingLabel>
              </Col>
            </Row>
            <Row
              className="g-3 mt-2 d-block text-end"
              style={{ margin: "1rem 0px 2rem" }}
            >
              <p className="credit-p d-inline">
                A match costs{" "}
                <span style={{ color: "rgb(88, 183, 47)" }}> 2 credits</span>
              </p>
              <button
                className="btn-submit"
                type="submit"
                onClick={handleSubmit}
                disabled={!(isValid && dirty)}
              >
                Search information
              </button>
            </Row>
          </Form>
        )}
      </Formik>
      <hr></hr>
      <Row className="mt-2">
        <p>Frequently Asked Questions</p>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>How will I be charged?</Accordion.Header>
            <Accordion.Body>
              A match costs 2 credits.<br></br>
              You may get many results for one search. We will only charge you 2
              credits per search.
              <br></br>You will not charged if your search yields no results.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              What is included in a person profile?
            </Accordion.Header>
            <Accordion.Body>
              Our results usually include Name, Gender, Age, Address, Mobile
              Phone, Email Address, Landline Phone, Username, Images,
              Associates, Social Profile URLs, Career and Education.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>How accurate is our data?</Accordion.Header>
            <Accordion.Body>
              In short, very accurate. Though we do not have any effective way
              to verify the accuracy of each data field in over 10 billion
              records, we manage to achieve a very high accuracy compared to
              other people-data providers by combining and cross-referencing
              over one million publicly available sources.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
    </>
  );
};

export default ByEmail;
