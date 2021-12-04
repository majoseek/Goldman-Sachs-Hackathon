import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";
import UpdateFreqChart from "../components/blog/UpdateFreqChart";
import VersionCompatibility from "../components/blog/VersionCompatibility";
import DependenciesGrades from "../components/common/DependenciesGrades";
import Slider from "react-slick";

const BlogOverview = ({ smallStats }) => (
    <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
            <PageTitle
                title="Project overview"
                subtitle="Dashboard"
                className="text-sm-left mb-3"
            />
        </Row>

        {/* Small Stats Blocks */}
        <Row>
            {smallStats.map((stats, idx) => (
                <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
                    <SmallStats
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
                <Slider>
                    <UpdateFreqChart
                        title="costam.456"
                        chartData={{
                            labels: Array.from(new Array(30), (_, i) =>
                                i === 0 ? 1 : i
                            ),
                            datasets: [
                                {
                                    label: "Number of updates",
                                    fill: "start",
                                    data: [
                                        500, 800, 320, 180, 240, 320, 230, 650,
                                        590, 1200, 750, 940, 1420, 1200, 960,
                                        1450, 1820, 2800, 2102, 1920, 3920,
                                        3202, 3140, 2800, 3200, 3200, 3400,
                                        2910, 3100, 4250,
                                    ],
                                    backgroundColor: "rgba(0,123,255,0.1)",
                                    borderColor: "rgba(0,123,255,1)",
                                    pointBackgroundColor: "#ffffff",
                                    pointHoverBackgroundColor: "rgb(0,123,255)",
                                    borderWidth: 1.5,
                                    pointRadius: 0,
                                    pointHoverRadius: 3,
                                },
                            ],
                        }}
                    />
                    <UpdateFreqChart
                        title={"jakis.123"}
                        chartData={{
                            labels: Array.from(new Array(30), (_, i) =>
                                i === 0 ? 1 : i
                            ),
                            datasets: [
                                {
                                    label: "Number of updates",
                                    fill: "start",
                                    data: [
                                        900, 1000, 320, 580, 740, 820, 530, 150,
                                        620, 1200, 750, 940, 1420, 1200, 960,
                                        150, 150, 2800, 2102, 1920, 3920, 5202,
                                        3140, 2500, 3200, 3200, 3400, 2910,
                                        3100, 4250,
                                    ],
                                    backgroundColor: "rgba(0,123,255,0.1)",
                                    borderColor: "rgba(0,123,255,1)",
                                    pointBackgroundColor: "#ffffff",
                                    pointHoverBackgroundColor: "rgb(0,123,255)",
                                    borderWidth: 1.5,
                                    pointRadius: 0,
                                    pointHoverRadius: 3,
                                },
                            ],
                        }}
                    />
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

BlogOverview.propTypes = {
    /**
     * The small stats dataset.
     */
    smallStats: PropTypes.array,
};

BlogOverview.defaultProps = {
    smallStats: [
        {
            label: "Average grade",
            value: "2,390",
            percentage: "4.7%",
            increase: true,
            chartLabels: [null, null, null, null, null, null, null],
            attrs: { md: "6", sm: "6" },
            datasets: [
                {
                    label: "Today",
                    fill: "start",
                    borderWidth: 1.5,
                    backgroundColor: "rgba(0, 184, 216, 0.1)",
                    borderColor: "rgb(0, 184, 216)",
                    data: [1, 2, 1, 3, 5, 4, 7],
                },
            ],
        },
        {
            label: "Version compatibility",
            value: "182",
            percentage: "12.4",
            increase: true,
            chartLabels: [null, null, null, null, null, null, null],
            attrs: { md: "6", sm: "6" },
            datasets: [
                {
                    label: "Today",
                    fill: "start",
                    borderWidth: 1.5,
                    backgroundColor: "rgba(23,198,113,0.1)",
                    borderColor: "rgb(23,198,113)",
                    data: [1, 2, 3, 3, 3, 4, 4],
                },
            ],
        },
        {
            label: "Usages",
            value: "8,147",
            percentage: "3.8%",
            increase: true,
            chartLabels: [null, null, null, null, null, null, null],
            attrs: { md: "4", sm: "6" },
            datasets: [
                {
                    label: "Today",
                    fill: "start",
                    borderWidth: 1.5,
                    backgroundColor: "rgba(255,180,0,0.1)",
                    borderColor: "rgb(255,180,0)",
                    data: [2, 3, 3, 3, 4, 3, 3],
                },
            ],
        },
        {
            label: "Connected dependencies",
            value: "29",
            percentage: "2.71%",
            increase: true,
            chartLabels: [null, null, null, null, null, null, null],
            attrs: { md: "4", sm: "6" },
            datasets: [
                {
                    label: "Today",
                    fill: "start",
                    borderWidth: 1.5,
                    backgroundColor: "rgba(255,65,105,0.1)",
                    borderColor: "rgb(255,65,105)",
                    data: [1, 7, 1, 3, 1, 4, 8],
                },
            ],
        },
    ],
};

export default BlogOverview;
