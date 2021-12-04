import React from "react";
import PropTypes from "prop-types";
import {
    Card,
    CardHeader,
    CardBody,
    ListGroup,
    ListGroupItem,
    CardFooter,
    Row,
    Col,
} from "shards-react";

const TopReferrals = ({ title, referralData }) => (
    <Card small>
        <CardHeader className="border-bottom">
            <h6 className="m-0">Worst graded dependencies</h6>
            <div className="block-handle" />
        </CardHeader>

        <CardBody className="p-0">
            <ListGroup small flush className="list-group-small">
                {referralData.map((item, idx) => (
                    <ListGroupItem key={idx} className="d-flex px-3">
                        <span className="text-semibold text-fiord-blue">
                            {item.title}
                        </span>
                        <span className="ml-auto text-right text-semibold text-reagent-gray">
                            {item.value}
                        </span>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </CardBody>

        <CardFooter className="border-top">
            <Row>
                {/* View Full Report */}
                <Col className="text-right view-report">
                    {/* eslint-disable-next-line */}
                    <a href="#">Full report &rarr;</a>
                </Col>
            </Row>
        </CardFooter>
    </Card>
);

TopReferrals.propTypes = {
    /**
     * The component's title.
     */
    title: PropTypes.string,
    /**
     * The referral data.
     */
    referralData: PropTypes.array,
};

TopReferrals.defaultProps = {
    title: "Worst graded dependencies",
    referralData: [
        {
            title: "jakarta.annotation-api",
            value: "1",
        },
        {
            title: "jackson-module-parameter-names",
            value: "2",
        },
        {
            title: "spring-expression",
            value: "2",
        },
        {
            title: "jakarta.xml.bind-api",
            value: "1",
        },
        {
            title: "jsonassert",
            value: "1",
        },
        {
            title: "xmlunit-core",
            value: "1",
        },
        {
            title: "junit-jupiter-api",
            value: "1",
        },
        {
            title: "rest-assured",
            value: "1",
        },
    ],
};

export default TopReferrals;
