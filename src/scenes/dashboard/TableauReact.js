import React, { Component, useEffect, useRef } from 'react';
const { tableau } = window;

function TableauReact() {
    const ref = useRef(null);
    console.log('ref', ref);
    const url = "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard";

    const initViz = () => {
        new tableau.Viz(ref.current, url, {
            width: "70%", height: "90vh"
        });
    }

    useEffect(initViz, []);


    return (
        <div ref={ref} > </div>
    );
}

export default TableauReact;