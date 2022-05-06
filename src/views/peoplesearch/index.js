import React, { useEffect, useState } from "react";
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
  const [searchResult, setSearchResult] = useState([]);
  const [key, setKey] = useState("Search-Result");
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
  const handleClick = async (index) => {
    try {
      let res = await fetch(`${API_URL}/api/searchresult`);
      let searchresult = await res.json();
      setSearchResult(searchresult);
      console.log(searchresult[0].possible_persons);
      handleSelect("Search-Result");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelect = (key) => {
    setKey(key);
    if (key == "Search-History") setSearchResult([]);
  };

  return (
    <Container fluid>
      <Row className="left-panel-row">
        <Col md={4} className="left-side">
          <Tabs activeKey={key} id="left-panel" onSelect={handleSelect}>
            <Tab eventKey="Search-Result" title="Search Result">
              <p className="result-cnt-p">
                {searchResult[0]
                  ? `Result of searching:${searchResult[0]["@persons_count"]}`
                  : ""}
              </p>
              {searchResult[0]
                ? searchResult[0].possible_persons.map((person, index) => (
                    <Row key={index}>
                      <Card>
                        <Card.Body>
                          <div className="search-result-card-body">
                            <div className="logo-name-weak-div">
                              <div className="d-flex">
                                <div className="cardlogo">
                                  <img
                                    alt="Real Cloud"
                                    src="./../Cardlogo.png"
                                    className="d-inline-block align-top"
                                  />
                                </div>
                                <div style={{ marginLeft: "0.7rem" }}>
                                  <h3>
                                    {person["names"]
                                      ? person["names"][0]["display"]
                                      : ""}
                                  </h3>
                                  <p>
                                    {person["gender"]
                                      ? person["gender"]["content"]
                                      : ""}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <div className="match-level-weak">
                                  weak match
                                </div>
                              </div>
                            </div>
                            {person["phones"] ? (
                              <div className="personal-property-div">
                                <p>
                                  <span className="detail-content-dot"></span>
                                  &nbsp;
                                  <b>Phone:</b>
                                  &nbsp;
                                  <a href="tel:2139238797">
                                    {person["phones"][0]["display"]}
                                  </a>
                                </p>
                              </div>
                            ) : (
                              ""
                            )}
                            {person["addresses"] ? (
                              <div className="personal-property-div">
                                <p>
                                  <span className="detail-content-dot"></span>
                                  &nbsp;
                                  <b>country:</b>
                                  &nbsp; {person["addresses"][0]["country"]}
                                </p>
                              </div>
                            ) : (
                              ""
                            )}
                            {person["addresses"] ? (
                              <div className="personal-property-div">
                                <p>
                                  <span className="detail-content-dot"></span>
                                  &nbsp;
                                  <b>State:</b>
                                  &nbsp;{" "}
                                  {person["addresses"][0]["state"]
                                    ? person["addresses"][0]["state"]
                                    : ""}
                                </p>
                              </div>
                            ) : (
                              ""
                            )}
                            {person["addresses"] ? (
                              <div className="personal-property-div">
                                <p>
                                  <span className="detail-content-dot"></span>
                                  &nbsp;
                                  <b>City:</b>
                                  &nbsp;{" "}
                                  {person["addresses"][0]["city"]
                                    ? person["addresses"][0]["city"]
                                    : ""}
                                </p>
                              </div>
                            ) : (
                              ""
                            )}
                            {person["addresses"] ? (
                              <div className="personal-property-div address-div">
                                <p>
                                  <span className="detail-content-dot"></span>
                                  &nbsp;
                                  <b>Address:</b>
                                  &nbsp;{" "}
                                  {person["addresses"][0]["display"]
                                    ? person["addresses"][0]["display"]
                                    : ""}
                                </p>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </Card.Body>
                      </Card>
                    </Row>
                  ))
                : null}
            </Tab>
            <Tab
              eventKey="Search-History"
              id="search-history"
              title="Search History"
            >
              {histories.map((history, index) => (
                <Row key={index}>
                  <Card onClick={(e) => handleClick(index)} key={index}>
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
