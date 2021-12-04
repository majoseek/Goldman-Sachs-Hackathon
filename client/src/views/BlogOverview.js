import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import PageTitle from "./../components/PageTitle";
import SmallStats from "./../components/SmallStats";
import UpdateFreqChart from "../components/UpdateFreqChart";
import VersionCompatibility from "../components/VersionCompatibility";
import DependenciesGrades from "../components/DependenciesGrades";
import Slider from "react-slick";

function BlogOverview(props) {
    return (
        <Container fluid className="main-content-container px-4">
            {/* Page Header */}
            <Row noGutters className="page-header py-4">
                <PageTitle
                    title="Project overview"
                    subtitle="SecuRank"
                    className="text-sm-left mb-3"
                />
            </Row>

            {/* Small Stats Blocks */}
            <Row>
                {props.smallStats.map((stats, idx) => (
                    <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
                        <SmallStats
                            key={`small-stats-${idx}`}
                            id={`small-stats-${idx}`}
                            variation="1"
                            chartData={stats.datasets}
                            chartLabels={stats.chartLabels}
                            label={stats.label}
                            value={stats.value}
                        />
                    </Col>
                ))}
            </Row>

            <Row>
                {/* Update frequency chart */}
                <Col lg="8" md="12" sm="12" className="mb-4">
                    <Slider dots={true} slidesToScroll={1} slidesToShow={1}>
                        {props.data_chart.map((data) => {
                            return (
                                <UpdateFreqChart
                                    key={data.title}
                                    chartData={data}
                                />
                            );
                        })}
                    </Slider>
                </Col>
                {/* Worst graded dependencies */}
                <Col lg="3" md="12" sm="12" className="mb-4">
                    <DependenciesGrades />
                </Col>

                {/* Discussions */}
                <Col lg="5" md="12" sm="12" className="mb-4">
                    <VersionCompatibility />
                </Col>
            </Row>
        </Container>
    );
}

export default BlogOverview;
