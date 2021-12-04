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
    FormSelect,
} from "shards-react";

const TopReferrals = ({ title, referralData }) => (
    <Card small>
        <CardHeader className="border-bottom">
            <h6 className="m-0">{title}</h6>
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
    title: "Best graded dependencies",
    referralData: [
        {
            title: "org.cos.tam",
            value: "19,291",
        },
        {
            title: "org.cos.tam.123",
            value: "11,201",
        },
        {
            title: "org.cos.tam.456",
            value: "9,291",
        },
        {
            title: "org.cos.tam.51",
            value: "8,281",
        },
        {
            title: "cos.elo",
            value: "7,128",
        },
        {
            title: "elo.123",
            value: "6,218",
        },
        {
            title: "cos.341",
            value: "1,218",
        },
        {
            title: "Fasf.512",
            value: "1,171",
        },
    ],
};

export default TopReferrals;
