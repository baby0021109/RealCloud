import React, { useEffect } from "react";
import { Col, Container, Row, Tabs, Tab, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../constants/default";
import ByAdvance from "./byadvance";
import ByEmail from "./byemail";
import ByName from "./byname";
import ByPhone from "./byphone";

const PeopleSearch = () => {
  const dispatch = useDispatch();
  const { histories } = useSelector((state) => state.historyReducer);
  useEffect(() => {
    fetch(`${API_URL}/api/histories`)
      .then(async (data) => {
        let histories = await data.json();
        dispatch({ type: "ADD", payload: histories });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container fluid>
      <Row className="left-panel-row">
        <Col md={4} className="left-side">
          <Tabs defaultActiveKey="Search-History" id="left-panel">
            <Tab eventKey="Search-Result" title="Search Result">
              <div>ssddddfdf</div>
            </Tab>
            <Tab
              eventKey="Search-History"
              id="search-history"
              title="Search History"
            >
              {histories.map((history, index) => (
                <Row key={index}>
                  <Card>
                    <Card.Body>
                      <div className="d-flex align-items-center">
                        <div className="cardlogo">
                          <img
                            alt="Real Cloud"
                            src="./../Cardlogo.png"
                            className="d-inline-block align-top"
                          />
                        </div>
                        <p>{`${history.firstName} ${history.lastName}`}</p>
                      </div>
                      <div className="d-flex align-items-center mt-1">
                        <span className="detail-content-dot"></span>
                        <p className="m-0 detail-content">
                          {" "}
                          &nbsp; Country: {history.countryCode}
                        </p>
                      </div>
                    </Card.Body>
                  </Card>
                </Row>
              ))}
            </Tab>
          </Tabs>
        </Col>
        <Col md={8} className="right-side">
          <h3>People Search</h3>
          <Tabs defaultActiveKey="ByName" id="rightside-tab">
            <Tab eventKey="ByName" title="By Name">
              <ByName />
            </Tab>
            <Tab eventKey="By Phone" title="By Phone">
              <ByPhone />
            </Tab>
            <Tab eventKey="By Email" title="By Email">
              <ByEmail />
            </Tab>
            <Tab eventKey="Advanced" title="Advanced">
              <ByAdvance />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default PeopleSearch;
