import React, { useEffect, useState } from "react";
import { Col, Container, Row, Tabs, Tab, Card, Table } from "react-bootstrap";
import { API_URL } from "../../constants/default";
import ColumnResizer from "react-table-column-resizer";
import $ from 'jquery';
import CsvDownload from 'react-json-to-csv'
import classNames from "classnames";

const initialSearchField = {
    address: "",
    bedroomsCount: "",
    bathCount: "",
    yearBuilt: "",
    owners: "",
    isOwnerDeepInfoPurchased: "",
}

const MyProperties = () => {
    const [loaded, setLoaded] = useState(false);
    const [myproperties, setMyProperties] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [data, setData] = useState([]);
    const [propertyFlags, setPropertyFlags] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState();
    const [rows, setRows] = useState(5);
    const [sortField, setSortField] = useState(null);
    const [searchField, setSearchField] = useState(initialSearchField)
    const [pagenum, setPageNum] = useState(1);
    const [curpagenum, setCurPageNum] = useState(1);

    useEffect(() => {
        if (!loaded) {
            fetch(`${API_URL}/api/myproperties`)
                .then(async (data) => {
                    let myproperties = await data.json(), pagecnt;
                    setMyProperties(myproperties);
                    pagecnt = (myproperties.length - 0.5) / 5;
                    setPageNum(parseInt(pagecnt) + 1);
                })
                .catch((err) => {
                    console.log(err);
                });
            setLoaded(true);
        }
    }, [loaded]);

    useEffect(() => {
        let searchedProps = myproperties.filter((prop) => {
            let okay = true;
            for (let filterKey in searchField) {
                let val = searchField[filterKey];
                let propVal = prop[filterKey];
                let propValType = typeof (propVal);
                switch (propValType) {
                    case 'number':
                    case 'object':
                        propVal = propVal.toString();
                        break;
                    case 'boolean':
                        propVal = propVal ? 'yes' : 'no';
                        break;
                }
                if (propVal.toLowerCase().indexOf(val.toLowerCase()) < 0) {
                    okay = false;
                    break;
                }
            }
            return okay;
        })
        setSearchData(searchedProps);
    }, [myproperties, searchField]);

    useEffect(() => {
        let tempFlags = [];
        let length, pagecnt;
        length = searchData.length;
        pagecnt = (length - 0.5) / 5;
        setPageNum(parseInt(pagecnt) + 1);
        searchData.forEach((property, index) => {
            tempFlags.push(false);
        })
        setPropertyFlags(tempFlags);
        let temp = [], st, en;
        if (length > 0) {
            st = 0;
            setStart(0);
            if (length >= rows) {
                en = rows - 1;
                setEnd(rows - 1);
            }
            else {
                en = length - 1;
                setEnd(length - 1);
            }
        }
        for (var i = st; i <= en; i++)
            temp.push(searchData[i]);
        setData(temp);
    }, [searchData])

    useEffect(() => {
        if (sortField) {
            let key, dir;
            if (sortField[0] == '-') {
                key = sortField.substr(1);
                dir = 'desc';
            }
            else {
                key = sortField;
                dir = 'asc';
            }
            setMyProperties([...myproperties.sort((a, b) => {
                if (dir == 'asc') {
                    if (a[key] < b[key])
                        return -1;
                    else if (a[key] > b[key])
                        return 1;
                    return 0;
                }
                else {
                    if (a[key] < b[key])
                        return 1;
                    else if (a[key] > b[key])
                        return -1;
                    return 0;
                }
            })]);
        }
    }, [sortField]);

    const nextpage = () => {
        let st, en, temp = [], length = searchData.length;
        if (start + rows < length) {
            st = start + rows;
            if (end + rows < length)
                en = end + rows;
            else
                en = length - 1;
        }
        else {
            st = start;
            en = end;
        }
        for (var i = st; i <= en; i++)
            temp.push(searchData[i]);
        setStart(st);
        setEnd(en);
        setData(temp);
    }

    const previouspage = () => {
        let st, en, temp = [], length = searchData.length;
        if (start - rows >= 0) {
            st = start - rows;
            if (st + rows <= length)
                en = st + rows - 1;
            else
                en = length - 1;
        }
        else {
            st = start;
            en = end;
        }
        for (var i = st; i <= en; i++)
            temp.push(searchData[i]);
        setStart(st);
        setEnd(en);
        setData(temp);
    }

    const selectchange = (index) => {

        let st = 0, en, length = searchData.length, temp = [], pagecnt;
        if (index > length)
            en = length - 1;
        else en = index - 1;
        for (var i = st; i <= en; i++)
            temp.push(searchData[i]);
        pagecnt = (length - 0.5) / index;
        setPageNum(parseInt(pagecnt) + 1)
        setStart(st);
        setEnd(en);
        setRows(parseInt(index));
        setData(temp);
    }
    const showDetail = (index) => {
        $(`i.dropdown-${index}`).toggleClass("drop_down");
        let tempFlags = propertyFlags;
        tempFlags[index] = !tempFlags[index];
        setPropertyFlags([...tempFlags]);
    }
    const handleSort = (e, key) => {
        if (!sortField) {
            setSortField(key);
        }
        else {
            if (sortField[0] == '-' && sortField.substr(1) == key) {
                setSortField(key);
            }
            else if (sortField == key) {
                setSortField("-" + key);
            }
            else {
                setSortField(key);
            }
        }
    }
    
    const setChangeSearchField = (key, val) => {
        let newField = Object.assign({}, searchField);
        newField[key] = val;
        setSearchField(newField);
    }

    const pagenumchanged = (e) =>{
        let temp;
        temp = e.target.value;
        if(temp < 1)
        {
            setCurPageNum(1);
            temp = 1;
        }
        else if ( temp > pagenum)
        {
            setCurPageNum(pagenum);
            temp = pagenum;
        }
        else setCurPageNum(temp);

        let st, en, temp1 = [];
        if(temp < pagenum)
        {
            st = (temp - 1) * rows;
            en = temp * rows - 1;
        }
        else{
            st = (temp - 1) * rows;
            en = searchData.length - 1;
        }
        setStart(st);
        setEnd(en);
        for (var i = st; i <= en; i++)
            temp1.push(searchData[i]);
        setData(temp1);
    }

    return (
        <Container fluid className="myproperties">
            <h1 className="my-properties">My Properties</h1>
            <div className="download-btn">
                <CsvDownload data={myproperties} className="btn-download">
                    <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 40 40" className="download-btn-svg">
                        <g>
                            <path d="m35.8 8.5q0.6 0.6 1 1.7t0.5 1.9v25.8q0 0.8-0.6 1.5t-1.6 0.6h-30q-0.9 0-1.5-0.6t-0.6-1.5v-35.8q0-0.8 0.6-1.5t1.5-0.6h20q0.9 0 2 0.4t1.7 1.1z m-9.9-5.5v8.4h8.4q-0.3-0.6-0.5-0.9l-7-7q-0.3-0.2-0.9-0.5z m8.5 34.1v-22.8h-9.3q-0.9 0-1.5-0.6t-0.6-1.6v-9.2h-17.1v34.2h28.5z m-21.8-5.2v2.4h6.2v-2.4h-1.6l2.3-3.6q0.1-0.1 0.2-0.3t0.2-0.3 0-0.1h0.1q0 0.1 0.1 0.2 0 0.1 0.1 0.2t0.1 0.1 0.2 0.2l2.4 3.6h-1.7v2.4h6.5v-2.4h-1.6l-4.2-6.1 4.3-6.3h1.5v-2.4h-6.2v2.4h1.6l-2.3 3.6q-0.1 0.1-0.2 0.3t-0.2 0.3l0 0.1h-0.1q0-0.1-0.1-0.2-0.1-0.3-0.4-0.5l-2.3-3.6h1.7v-2.4h-6.5v2.4h1.5l4.2 6.1-4.3 6.3h-1.5z">
                            </path>
                        </g>
                    </svg>
                    <span className="download-btn-span">Download .CSV file (Excel)</span>
                </CsvDownload>
            </div>
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr className="header-namefield">
                            <th>    </th>
                            <th className={classNames({ "sort-asc": sortField && sortField == 'address' }, { "sort-desc": sortField && sortField == '-address' })} onClick={(e) => handleSort(e, "address")}>Address</th>
                            <ColumnResizer className="columnResizer border-thin" minWidth={0} />
                            <th className={classNames({ "sort-asc": sortField && sortField == 'bedroomsCount' }, { "sort-desc": sortField && sortField == '-bedroomsCount' })} onClick={(e) => handleSort(e, "bedroomsCount")}>Beds</th>
                            <ColumnResizer className="columnResizer border-thin" minWidth={0} />
                            <th className={classNames({ "sort-asc": sortField && sortField == 'bathCount' }, { "sort-desc": sortField && sortField == '-bathCount' })} onClick={(e) => handleSort(e, "bathCount")}>Baths</th>
                            <ColumnResizer className="columnResizer border-thin" minWidth={0} />
                            <th className={classNames({ "sort-asc": sortField && sortField == 'yearBuilt' }, { "sort-desc": sortField && sortField == '-yearBuilt' })} onClick={(e) => handleSort(e, "yearBuilt")}>Year Built</th>
                            <ColumnResizer className="columnResizer border-thin" minWidth={0} />
                            <th className={classNames({ "sort-asc": sortField && sortField == 'owners' }, { "sort-desc": sortField && sortField == '-owners' })} onClick={(e) => handleSort(e, "owners")}>Owners</th>
                            <ColumnResizer className="columnResizer border-thin" minWidth={0} />
                            <th className={classNames({ "sort-asc": sortField && sortField == 'isOwnerDeepInfoPurchased' }, { "sort-desc": sortField && sortField == '-isOwnerDeepInfoPurchased' })} onClick={(e) => handleSort(e, "isOwnerDeepInfoPurchased")}>Owner Searched?</th>
                            <ColumnResizer className="columnResizer border-thin" minWidth={0} />
                            <th>Detailed View</th>
                        </tr>
                        <tr className="search-panel">
                            <th>    </th>
                            <th><input onChange={(e) => setChangeSearchField("address", e.target.value)}></input></th>
                            <th className="border-thin" />
                            <th><input onChange={(e) => setChangeSearchField("bedroomsCount", e.target.value)}></input></th>
                            <th className="border-thin" />
                            <th><input onChange={(e) => setChangeSearchField("bathCount", e.target.value)}></input></th>
                            <th className="border-thin" />
                            <th><input onChange={(e) => setChangeSearchField("yearBuilt", e.target.value)}></input></th>
                            <th className="border-thin" />
                            <th><input onChange={(e) => setChangeSearchField("owners", e.target.value)}></input></th>
                            <th className="border-thin" />
                            <th><input onChange={(e) => setChangeSearchField("isOwnerDeepInfoPurchased", e.target.value)}></input></th>
                            <th className="border-thin" />
                            <th><input></input></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((property, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td className="drop_downtd" onClick={(event) => showDetail(index)}><i className={`dropdown-${index} material-icons drop_down`}>arrow_drop_down</i></td>
                                    <td>{property["address"]}</td>
                                    <td className="border-thin"></td>
                                    <td>{property["bedroomsCount"]}</td>
                                    <td className="border-thin"></td>
                                    <td>{property["bathCount"]}</td>
                                    <td className="border-thin"></td>
                                    <td>{property["yearBuilt"]}</td>
                                    <td className="border-thin"></td>
                                    <td>{property["owners"]}</td>
                                    <td className="border-thin"></td>
                                    <td>{property["isOwnerDeepInfoPurchased"] ? "yes" : "no"}</td>
                                    <td className="border-thin"></td>
                                    <td>
                                        <div className="d-flex justify-content-center">
                                            <button className="detail-btn"><span className="detail-span">Details</span></button>
                                        </div>
                                    </td>
                                </tr>
                                {propertyFlags[index] ? (
                                    <tr>
                                        <td colSpan={14} className="p-4">
                                            Property Note: n/a<br></br><br></br>
                                            Follow up Note: n/a
                                        </td>
                                    </tr>
                                ) : null}
                            </React.Fragment>
                        ))}
                    </tbody>
                </Table>
                <div className="row align-items-center">
                    <div className="col-sm-3">
                        <button className="w-100 p-2 border-0" onClick={() => previouspage()}>Previous</button>
                    </div>
                    <div className="col-sm-3 text-center">
                        <span>Page</span>
                        <input type="number" style={{ width: 50 }} min = {1} max= {pagenum} value = {curpagenum} onChange = {(e) => pagenumchanged(e)}/>
                        <span>  &nbsp; of {pagenum}</span>
                    </div>
                    <div className="col-sm-3 text-center">
                        <select onChange={(e) => selectchange(e.target.value)}>
                            <option value={5}>5 rows</option>
                            <option value={10}>10 rows</option>
                            <option value={25}>25 rows</option>
                            <option value={50}>50 rows</option>
                            <option value={100}>100 rows</option>
                        </select>
                    </div>
                    <div className="col-sm-3">
                        <button className="w-100 p-2 border-0" onClick={() => nextpage()}>Next</button>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default MyProperties;
