import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Col, Container, Row, Tabs, Tab, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../constants/default";
import ByAdvance from "./byadvance";
import ByEmail from "./byemail";
import ByName from "./byname";
import ByPhone from "./byphone";
import cardlogo from "../../assets/Cardlogo.png";

const PeopleSearch = ({ personDetail }) => {
  const dispatch = useDispatch();
  const { histories } = useSelector((state) => state.historyReducer);
  const [searchResult, setSearchResult] = useState([]);
  const [key, setKey] = useState("Search-Result");
  const [currentResult, setCurrentResult] = useState([]);
  const navigate = useNavigate();
  console.log(personDetail);
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
  const detailhandleClick = (index) => {
    setCurrentResult(index);
    navigate(`/prospect/people-search/person-detail/${index}`, { state: {} });
  };
  const handleSelect = (key) => {
    setKey(key);
    if (key == "Search-History") {
      setSearchResult([]);
      navigate("/prospect/people-search");
    }
  };

  let person_info = {};
  if (searchResult.length > 0) {
    person_info = searchResult[0].possible_persons[currentResult];
  }
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
                      <Card
                        onClick={(e) => detailhandleClick(index)}
                        key={index}
                        className={
                          currentResult === index ? "selected-result-bg" : ""
                        }
                      >
                        <Card.Body>
                          <div className="search-result-card-body">
                            <div className="logo-name-weak-div">
                              <div className="d-flex">
                                <div className="cardlogo">
                                  <img
                                    alt="Real Cloud"
                                    src={cardlogo}
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
                            src={cardlogo}
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
          {personDetail ? (
            <div>
              <div className="cross-btn">
                <svg viewBox="0 0 40 40">
                  <g>
                    <path d="m31.6 10.7l-9.3 9.3 9.3 9.3-2.3 2.3-9.3-9.3-9.3 9.3-2.3-2.3 9.3-9.3-9.3-9.3 2.3-2.3 9.3 9.3 9.3-9.3z"></path>
                  </g>
                </svg>
              </div>
              <div className="user-info-section">
                <div
                  className="d-flex justify-content-between"
                  style={{ marginBottom: "1.5rem" }}
                >
                  <div className="content d-flex align-items-center">
                    <div className="cardlogo">
                      <img
                        alt="Real Cloud"
                        src={cardlogo}
                        className="d-inline-block align-top"
                      />
                    </div>
                    <div className="profile">
                      <h3 className="user-name">
                        {person_info.names && person_info.names[0].display}
                      </h3>
                      <p className="phonenumber">
                        Main Phone Number:
                        <a
                          href={`tel:${person_info.phones &&
                            person_info.phones[0].numbers}`}
                        >
                          <b>
                            {person_info.phones &&
                              person_info.phones[0].display}
                          </b>
                        </a>
                      </p>
                    </div>
                  </div>
                  <button className="copy-info-button">
                    <span>Copy all user information</span>
                  </button>
                </div>
                <div className="names-field">
                  <div className="d-flex">
                    <h3>Names</h3>
                    <div className="h-0">
                      <span className="cpy-to-clipboard-span">
                        Copy to clipboard
                      </span>
                      <img
                        className="cpy-to-clipboard-img"
                        src="data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Crect x='7.75' y='2.75' width='8.5' height='10.5' rx='1.25' stroke='%239EA1A8' stroke-width='1.5'/%3E %3Crect x='3.75' y='6.75' width='8.5' height='10.5' rx='1.25' fill='white' stroke='%239EA1A8' stroke-width='1.5'/%3E %3C/svg%3E"
                      ></img>
                    </div>
                  </div>
                  {person_info.names &&
                    person_info.names.map((person, index) => (
                      <div className="field" key={index}>
                        <div className="display-content">{person.display}</div>
                        <div className="seen-field">
                          Valid Since{" "}
                          {person["@valid_since"] ? person["@valid_since"] : ""}
                          {person["@last_seen"]
                            ? "Last Seen" + person["@last_seen"]
                            : ""}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="names-field">
                  <div className="d-flex">
                    <h3>Phones</h3>
                    <div className="h-0">
                      <span className="cpy-to-clipboard-span">
                        Copy to clipboard
                      </span>
                      <img
                        className="cpy-to-clipboard-img"
                        src="data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Crect x='7.75' y='2.75' width='8.5' height='10.5' rx='1.25' stroke='%239EA1A8' stroke-width='1.5'/%3E %3Crect x='3.75' y='6.75' width='8.5' height='10.5' rx='1.25' fill='white' stroke='%239EA1A8' stroke-width='1.5'/%3E %3C/svg%3E"
                      ></img>
                    </div>
                  </div>
                  {person_info.phones &&
                    person_info.phones.map((person, index) => (
                      <div className="field" key={index}>
                        <div className="display-content1">
                          <a href={`tel:${person.numbers}`}>
                            <span style={{ color: "rgb(48, 151, 233)" }}>
                              {person.display}
                            </span>
                            <span style={{ color: "rgb(252, 151, 95)" }}>
                              {person["@type"]}
                            </span>
                          </a>
                        </div>
                        <div className="seen-field">
                          Valid Since{" "}
                          {person["@valid_since"] ? person["@valid_since"] : ""}
                          {person["@last_seen"]
                            ? "Last Seen" + person["@last_seen"]
                            : ""}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="names-field">
                  <div className="d-flex">
                    <div className="h-0">
                      <span className="cpy-to-clipboard-span">
                        Copy to clipboard
                      </span>
                      <img
                        className="cpy-to-clipboard-img"
                        src="data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Crect x='7.75' y='2.75' width='8.5' height='10.5' rx='1.25' stroke='%239EA1A8' stroke-width='1.5'/%3E %3Crect x='3.75' y='6.75' width='8.5' height='10.5' rx='1.25' fill='white' stroke='%239EA1A8' stroke-width='1.5'/%3E %3C/svg%3E"
                      ></img>
                    </div>
                  </div>
                  {person_info.gender && person_info.dob && (
                    <div className="field">
                      <div className="display-content2">
                        <h3>Phones</h3>
                        <p>{person_info.gender.content}</p>
                      </div>
                      <div className="display-content2">
                        <h3>Age</h3>
                        <p>{person_info.dob.display}</p>
                      </div>
                      <div className="display-content2">
                        <h3>DoB</h3>
                        <p>
                          {person_info.dob.date_range.start}~
                          {person_info.dob.date_range.end}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="names-field">
                  <div className="d-flex">
                    <h3>Usernames</h3>
                    <div className="h-0">
                      <span className="cpy-to-clipboard-span">
                        Copy to clipboard
                      </span>
                      <img
                        className="cpy-to-clipboard-img"
                        src="data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Crect x='7.75' y='2.75' width='8.5' height='10.5' rx='1.25' stroke='%239EA1A8' stroke-width='1.5'/%3E %3Crect x='3.75' y='6.75' width='8.5' height='10.5' rx='1.25' fill='white' stroke='%239EA1A8' stroke-width='1.5'/%3E %3C/svg%3E"
                      ></img>
                    </div>
                  </div>
                  {person_info.usernames &&
                    person_info.usernames.map((person, index) => (
                      <div className="field" key={index}>
                        <div className="display-content">{person.content}</div>
                        <div className="seen-field">
                          Valid Since{" "}
                          {person["@valid_since"] ? person["@valid_since"] : ""}
                          {person["@last_seen"]
                            ? "Last Seen" + person["@last_seen"]
                            : ""}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="names-field">
                  <div className="d-flex">
                    <h3>User IDs</h3>
                    <div className="h-0">
                      <span className="cpy-to-clipboard-span">
                        Copy to clipboard
                      </span>
                      <img
                        className="cpy-to-clipboard-img"
                        src="data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Crect x='7.75' y='2.75' width='8.5' height='10.5' rx='1.25' stroke='%239EA1A8' stroke-width='1.5'/%3E %3Crect x='3.75' y='6.75' width='8.5' height='10.5' rx='1.25' fill='white' stroke='%239EA1A8' stroke-width='1.5'/%3E %3C/svg%3E"
                      ></img>
                    </div>
                  </div>
                  {person_info.user_ids &&
                    person_info.user_ids.map((person, index) => (
                      <div className="field" key={index}>
                        <div className="display-content">{person.content}</div>
                        <div className="seen-field">
                          Valid Since{" "}
                          {person["@valid_since"] ? person["@valid_since"] : ""}
                          {person["@last_seen"]
                            ? "Last Seen" + person["@last_seen"]
                            : ""}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="names-field">
                  <div className="d-flex">
                    <h3>Address</h3>
                    <div className="h-0">
                      <span className="cpy-to-clipboard-span">
                        Copy to clipboard
                      </span>
                      <img
                        className="cpy-to-clipboard-img"
                        src="data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Crect x='7.75' y='2.75' width='8.5' height='10.5' rx='1.25' stroke='%239EA1A8' stroke-width='1.5'/%3E %3Crect x='3.75' y='6.75' width='8.5' height='10.5' rx='1.25' fill='white' stroke='%239EA1A8' stroke-width='1.5'/%3E %3C/svg%3E"
                      ></img>
                    </div>
                  </div>
                  {person_info.addresses &&
                    person_info.addresses.map((person, index) => (
                      <div className="field" key={index}>
                        <div className="display-content">{person.display}</div>
                        <div className="seen-field">
                          Valid Since{" "}
                          {person["@valid_since"] ? person["@valid_since"] : ""}
                          {person["@last_seen"]
                            ? "Last Seen" + person["@last_seen"]
                            : ""}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="names-field">
                  <div className="d-flex">
                    <h3>Education</h3>
                    <div className="h-0">
                      <span className="cpy-to-clipboard-span">
                        Copy to clipboard
                      </span>
                      <img
                        className="cpy-to-clipboard-img"
                        src="data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Crect x='7.75' y='2.75' width='8.5' height='10.5' rx='1.25' stroke='%239EA1A8' stroke-width='1.5'/%3E %3Crect x='3.75' y='6.75' width='8.5' height='10.5' rx='1.25' fill='white' stroke='%239EA1A8' stroke-width='1.5'/%3E %3C/svg%3E"
                      ></img>
                    </div>
                  </div>
                  {person_info.educations &&
                    person_info.educations.map((person, index) => (
                      <div className="field" key={index}>
                        <div className="display-content">{person.display}</div>
                        <div className="seen-field">
                          Valid Since{" "}
                          {person["@valid_since"] ? person["@valid_since"] : ""}
                          {person["@last_seen"]
                            ? "Last Seen" + person["@last_seen"]
                            : ""}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="names-field">
                  <div className="d-flex">
                    <h3>Jobs</h3>
                    <div className="h-0">
                      <span className="cpy-to-clipboard-span">
                        Copy to clipboard
                      </span>
                      <img
                        className="cpy-to-clipboard-img"
                        src="data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Crect x='7.75' y='2.75' width='8.5' height='10.5' rx='1.25' stroke='%239EA1A8' stroke-width='1.5'/%3E %3Crect x='3.75' y='6.75' width='8.5' height='10.5' rx='1.25' fill='white' stroke='%239EA1A8' stroke-width='1.5'/%3E %3C/svg%3E"
                      ></img>
                    </div>
                  </div>
                  {person_info.jobs &&
                    person_info.jobs.map((person, index) => (
                      <div className="field" key={index}>
                        <div className="display-content">{person.display}</div>
                        <div className="seen-field">
                          Valid Since{" "}
                          {person["@valid_since"] ? person["@valid_since"] : ""}
                          {person["@last_seen"]
                            ? "Last Seen" + person["@last_seen"]
                            : ""}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="names-field">
                  <div className="d-flex">
                    <h3>Relationships</h3>
                    <div className="h-0">
                      <span className="cpy-to-clipboard-span">
                        Copy to clipboard
                      </span>
                      <img
                        className="cpy-to-clipboard-img"
                        src="data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Crect x='7.75' y='2.75' width='8.5' height='10.5' rx='1.25' stroke='%239EA1A8' stroke-width='1.5'/%3E %3Crect x='3.75' y='6.75' width='8.5' height='10.5' rx='1.25' fill='white' stroke='%239EA1A8' stroke-width='1.5'/%3E %3C/svg%3E"
                      ></img>
                    </div>
                  </div>
                  {person_info.relationships &&
                    person_info.relationships.map((person, index) => (
                      <div className="field" key={index}>
                        <div className="display-content2">
                          {person.names[0].display}
                        </div>
                        <div className="display-content2">
                          {person["@type"]}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="names-field">
                  <div className="d-flex">
                    <h3>Photo</h3>
                    <div className="h-0">
                      <span className="cpy-to-clipboard-span">
                        Copy to clipboard
                      </span>
                      <img
                        className="cpy-to-clipboard-img"
                        src="data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Crect x='7.75' y='2.75' width='8.5' height='10.5' rx='1.25' stroke='%239EA1A8' stroke-width='1.5'/%3E %3Crect x='3.75' y='6.75' width='8.5' height='10.5' rx='1.25' fill='white' stroke='%239EA1A8' stroke-width='1.5'/%3E %3C/svg%3E"
                      ></img>
                    </div>
                  </div>
                  {person_info.images && (
                    <div className="field">
                      <div className="display-content2">
                        <img
                          src={person_info.images[0].url}
                          style={{
                            width: "160px",
                            height: "160px",
                            background: "black",
                          }}
                        ></img>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
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
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PeopleSearch;
