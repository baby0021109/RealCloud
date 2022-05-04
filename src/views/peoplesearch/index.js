import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Tabs, Tab, FloatingLabel, Form, Accordion, Card} from 'react-bootstrap';
import { CountryRegionData } from 'react-country-region-selector';
import { useDispatch, useSelector } from 'react-redux'
import { API_URL } from '../../constants/default';

const PeopleSearch = ({}) => {

    const dispatch = useDispatch();
    const { histories } = useSelector(state => state.historyReducer)
    useEffect(() => {
        fetch(`${API_URL}/api/histories`).then(async (data) => {
            let histories = await data.json();
            dispatch({type:'ADD', payload: histories});
        }).catch(err => {
            console.log(err);
        });
    }, [])

    return (
        <Container fluid>
            <Row className="left-panel-row">
                <Col sm = {4} className="left-side">
                    <Tabs defaultActiveKey="Search-History" id="left-panel" >
                        <Tab eventKey="Search-Result" title="Search Result">
                            <div>ssddddfdf</div>
                        </Tab>
                        <Tab eventKey="Search-History" id="search-history" title="Search History">
                            {
                                histories.map((history, index) => (
                                    <Row key={index}>
                                        <Card>
                                            <Card.Body>
                                                <div class = "d-flex align-items-center">
                                                    <div class="cardlogo">
                                                        <img
                                                            src="./../Cardlogo.png"
                                                            className="d-inline-block align-top"
                                                        />
                                                    </div>
                                                    <p>{`${history.firstName} ${history.lastName}`}</p>
                                                </div>
                                                <div class="d-flex align-items-center mt-1">
                                                    <span class="detail-content-dot"></span>
                                                    <p class="m-0 detail-content"> &nbsp; Country: {history.countryCode}</p>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Row>
                                ))
                            }
                        </Tab>
                    </Tabs>
                </Col>
                <Col sm = {8} className="right-side">
                    <h3>People Search</h3>
                    <Tabs defaultActiveKey="ByName" id="rightside-tab">
                        <Tab eventKey="ByName" title="By Name">
                            <Row className="g-3" style={{'marginTop': '40px'}}>
                                <Col md>
                                    <FloatingLabel controlId="floatingInputGrid" label="First Name (Required)">
                                    <Form.Control type="text" placeholder="name@example.com" />
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel controlId="floatingInputGrid" label="Last Name (Required)">
                                    <Form.Control type="text" placeholder="name@example.com" />
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel controlId="floatingInputGrid" label="Middle Name (Required)">
                                    <Form.Control type="text" placeholder="name@example.com" />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <hr></hr>
                            <Row>
                                <Col md>
                                    <p>Address is optional. For common names it can help narrow down the results.</p>
                                </Col>
                            </Row>
                            <Row className="g-3 mt-3">
                                <Col md>
                                    <FloatingLabel controlId="floatingInputGrid" label="City">
                                        <Form.Control type="text" placeholder="name@example.com" />
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel controlId="floatingInputGrid" label="Zip Code">
                                        <Form.Control type="text" placeholder="name@example.com" />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row className='g-3 mt-2'>
                                <Col md>
                                    <FloatingLabel controlId="floatingInputGrid" label="State Code (2 characters)">
                                        <Form.Control type="text" placeholder="name@example.com" />
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <Form.Select aria-label="Default select example">
                                        <option>Open this select menu</option>
                                        {
                                            CountryRegionData.map((item, i)=>{
                                                return <option key = {i} >{item[0]}</option>;
                                            })
                                        }
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Row className='g-3 mt-2 d-block text-end' style={{margin: '1rem 0px 2rem'}}>
                                    <p class="credit-p d-inline">A match costs {' '}<span style={{color: 'rgb(88, 183, 47)'}}> 2 credits</span></p>
                                    <button class = "btn-submit">Search information</button>
                            </Row>
                            <hr></hr>
                            <Row className='mt-2'>
                                <p>Frequently Asked Questions</p>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>How will I be charged?</Accordion.Header>
                                        <Accordion.Body>
                                            A match costs 2 credits.<br></br>
                                            You may get many results for one search. We will only charge you 2 credits per search.
                                            <br></br>You will not charged if your search yields no results.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>What is included in a person profile?</Accordion.Header>
                                        <Accordion.Body>
                                            Our results usually include Name, Gender, Age, Address, Mobile Phone, Email Address, Landline Phone, Username, Images, Associates, Social Profile URLs, Career and Education.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>How accurate is our data?</Accordion.Header>
                                        <Accordion.Body>
                                            In short, very accurate. Though we do not have any effective way to verify the accuracy of each data field in over 10 billion records, we manage to achieve a very high accuracy compared to other people-data providers by combining and cross-referencing over one million publicly available sources.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Row>
                        </Tab>
                        <Tab eventKey="By Phone" title="By Phone">
                            <Row className="g-3">
                                <Col md>
                                    <FloatingLabel controlId="floatingInputGrid" label="Phone">
                                    <Form.Control type="text" placeholder="name@example.com" />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row className='g-3 mt-2 d-block text-end' style={{margin: '1rem 0px 2rem'}}>
                                    <p class="credit-p d-inline">A match costs {' '}<span style={{color: 'rgb(88, 183, 47)'}}> 2 credits</span></p>
                                    <button class = "btn-submit">Search information</button>
                            </Row>
                            <hr></hr>
                            <Row className='mt-2'>
                                <p>Frequently Asked Questions</p>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>How will I be charged?</Accordion.Header>
                                        <Accordion.Body>
                                            A match costs 2 credits.<br></br>
                                            You may get many results for one search. We will only charge you 2 credits per search.
                                            <br></br>You will not charged if your search yields no results.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>What is included in a person profile?</Accordion.Header>
                                        <Accordion.Body>
                                            Our results usually include Name, Gender, Age, Address, Mobile Phone, Email Address, Landline Phone, Username, Images, Associates, Social Profile URLs, Career and Education.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>How accurate is our data?</Accordion.Header>
                                        <Accordion.Body>
                                            In short, very accurate. Though we do not have any effective way to verify the accuracy of each data field in over 10 billion records, we manage to achieve a very high accuracy compared to other people-data providers by combining and cross-referencing over one million publicly available sources.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Row>
                        </Tab>
                        <Tab eventKey="By Email" title="By Email">
                            <Row className="g-3">
                                <Col md>
                                    <FloatingLabel controlId="floatingInputGrid" label="Email">
                                    <Form.Control type="text" placeholder="name@example.com" />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row className='g-3 mt-2 d-block text-end' style={{margin: '1rem 0px 2rem'}}>
                                    <p class="credit-p d-inline">A match costs {' '}<span style={{color: 'rgb(88, 183, 47)'}}> 2 credits</span></p>
                                    <button class = "btn-submit">Search information</button>
                            </Row>
                            <hr></hr>
                            <Row className='mt-2'>
                                <p>Frequently Asked Questions</p>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>How will I be charged?</Accordion.Header>
                                        <Accordion.Body>
                                            A match costs 2 credits.<br></br>
                                            You may get many results for one search. We will only charge you 2 credits per search.
                                            <br></br>You will not charged if your search yields no results.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>What is included in a person profile?</Accordion.Header>
                                        <Accordion.Body>
                                            Our results usually include Name, Gender, Age, Address, Mobile Phone, Email Address, Landline Phone, Username, Images, Associates, Social Profile URLs, Career and Education.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>How accurate is our data?</Accordion.Header>
                                        <Accordion.Body>
                                            In short, very accurate. Though we do not have any effective way to verify the accuracy of each data field in over 10 billion records, we manage to achieve a very high accuracy compared to other people-data providers by combining and cross-referencing over one million publicly available sources.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Row>
                        </Tab>
                        <Tab eventKey="Advanced" title="Advanced">
                            <Row>
                                <p class = "content">Please enter all the information you have about the person you're searching for.<br></br>
                                At least one field is required: Email/Phone/Username/Name (First + Last).</p>
                            </Row>
                            <Row>
                                <Col md className="border-end">
                                    <Row>
                                        <FloatingLabel controlId="floatingInputGrid" label="First Name (Required)">
                                        <Form.Control type="text" placeholder="name@example.com" />
                                        </FloatingLabel>
                                    </Row>
                                    <Row>
                                        <FloatingLabel controlId="floatingInputGrid" label="Last Name (Required)">
                                        <Form.Control type="text" placeholder="name@example.com" />
                                        </FloatingLabel>
                                    </Row>
                                    <Row>
                                        <FloatingLabel controlId="floatingInputGrid" label="Middle Name (Required)">
                                        <Form.Control type="text" placeholder="name@example.com" />
                                        </FloatingLabel>
                                    </Row>
                                </Col>
                                <Col md>
                                    <Row>
                                        <FloatingLabel controlId="floatingInputGrid" label="Email">
                                        <Form.Control type="text" placeholder="name@example.com" />
                                        </FloatingLabel>
                                    </Row>
                                    <Row>
                                        <FloatingLabel controlId="floatingInputGrid" label="Phone">
                                        <Form.Control type="text" placeholder="name@example.com" />
                                        </FloatingLabel>
                                    </Row>
                                    <Row>
                                        <FloatingLabel controlId="floatingInputGrid" label="User Name">
                                        <Form.Control type="text" placeholder="name@example.com" />
                                        </FloatingLabel>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className = 'mt-4'>
                                <p>Address information</p>
                            </Row>
                            <Row>
                                <Col md className="border-end">
                                    <Row>
                                        <FloatingLabel controlId="floatingInputGrid" label="City">
                                        <Form.Control type="text" placeholder="name@example.com" />
                                        </FloatingLabel>
                                    </Row>
                                    <Row>
                                        <FloatingLabel controlId="floatingInputGrid" label="State Code (2 characters)">
                                        <Form.Control type="text" placeholder="name@example.com" />
                                        </FloatingLabel>
                                    </Row>
                                </Col>
                                <Col md>
                                    <Row>
                                        <FloatingLabel controlId="floatingInputGrid" label="Zip Code">
                                        <Form.Control type="text" placeholder="name@example.com" />
                                        </FloatingLabel>
                                    </Row>
                                    <Row>
                                        <FloatingLabel controlId="floatingInputGrid" label="Country">
                                        <Form.Control type="text" placeholder="name@example.com" />
                                        </FloatingLabel>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className='g-3 mt-2 d-block text-end' style={{margin: '1rem 0px 2rem'}}>
                                    <p class="credit-p d-inline">A match costs {' '}<span style={{color: 'rgb(88, 183, 47)'}}> 2 credits</span></p>
                                    <button class = "btn-submit">Search information</button>
                            </Row>
                            <hr></hr>
                            <Row className='mt-2'>
                                <p>Frequently Asked Questions</p>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>How will I be charged?</Accordion.Header>
                                        <Accordion.Body>
                                            A match costs 2 credits.<br></br>
                                            You may get many results for one search. We will only charge you 2 credits per search.
                                            <br></br>You will not charged if your search yields no results.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>What is included in a person profile?</Accordion.Header>
                                        <Accordion.Body>
                                            Our results usually include Name, Gender, Age, Address, Mobile Phone, Email Address, Landline Phone, Username, Images, Associates, Social Profile URLs, Career and Education.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>How accurate is our data?</Accordion.Header>
                                        <Accordion.Body>
                                            In short, very accurate. Though we do not have any effective way to verify the accuracy of each data field in over 10 billion records, we manage to achieve a very high accuracy compared to other people-data providers by combining and cross-referencing over one million publicly available sources.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Row>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    )
}

export default PeopleSearch;