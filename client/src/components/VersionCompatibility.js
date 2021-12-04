import React from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardBody, CardFooter } from "shards-react";

const VersionCompatibility = ({ title, discussions }) => (
    <Card small className="blog-comments">
        <CardHeader className="border-bottom">
            <h6 className="m-0">{title}</h6>
        </CardHeader>

        <CardBody className="p-0">
            {discussions.map((discussion, idx) => (
                <div key={idx} className="blog-comments__item d-flex p-3">
                    {/* Content */}
                    <div className="blog-comments__content">
                        {/* Content :: Title */}
                        <div className="blog-comments__meta text-mutes">
                            <span className="text-mutes">
                                boot-starter-tomcat : 2.5.0
                            </span>
                        </div>

                        {/* Content :: Body */}
                        <p className="m-0 my-1 mb-2 text-muted">
                            Latest version : 2.5.4 !
                        </p>
                    </div>
                </div>
            ))}
        </CardBody>

        <CardFooter className="border-top"></CardFooter>
    </Card>
);

VersionCompatibility.propTypes = {
    /**
     * The component's title.
     */
    title: PropTypes.string,
    /**
     * The discussions dataset.
     */
    discussions: PropTypes.array,
};

VersionCompatibility.defaultProps = {
    title: "Wrong version compatibility",
    discussions: [
        {
            id: 1,
            date: "3 days ago",
            author: {
                name: "John Doe",
                url: "#",
            },
            post: {
                title: "Hello World!",
                url: "#",
            },
            body: "Well, the way they make shows is, they make one show ...",
        },
    ],
};

export default VersionCompatibility;
