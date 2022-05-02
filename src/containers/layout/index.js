import React, { Switch } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from '../header';
import Footer from '../footer';
import Content from '../content';

import PeopleSearch from '../../views/peoplesearch';

const Layout = ({}) => {
    return (
        <>
            <Header></Header>
            <Content>
                <Routes>
                    <Route path='/people-search' element={<PeopleSearch />} />
                    <Route path='/search' element={<PeopleSearch />} />
                    <Route path='/my-properties' element={<PeopleSearch />} />
                </Routes>
            </Content>
            <Footer></Footer>
        </>
    )
}

export default Layout