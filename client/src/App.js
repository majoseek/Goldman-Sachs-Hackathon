import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/shards-dashboards.1.1.0.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BlogOverview from "./views/BlogOverview";
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return null;
}
function App() {
    const [dep_grades, set_dep_grades] = useState({});
    const [project_grades, set_proj_grades] = useState([]);
    useEffect(() => {
        const project_location = getQueryVariable("project_location");
        if (
            project_location !== null &&
            project_location !== undefined &&
            project_location !== ""
        ) {
            axios
                .post("/grades", {
                    project_location: project_location,
                })
                .then((response) => {
                    console.log(response.data.project_grade);

                    for (var key in response.data.project_grade) {
                        if (response.data.project_grade.hasOwnProperty(key)) {
                            const new_elem = {
                                label: key,
                                value: response.data.project_grade[
                                    key
                                ].toString(),
                                percentage: "2.71%",
                                increase: true,
                                chartLabels: [
                                    null,
                                    null,
                                    null,
                                    null,
                                    null,
                                    null,
                                    null,
                                ],
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
                            };
                            set_proj_grades((project_grades) => [
                                ...project_grades,
                                new_elem,
                            ]);
                        }
                    }
                })
                .catch((err) =>
                    console.log("There was an error fetching project structure")
                );
        }
    }, []);
    return (
        <div>
            <BlogOverview
                data_chart={[
                    {
                        title: "cos",
                        labels: Array.from(new Array(12), (_, i) => i + 1),
                        datasets: [
                            {
                                label: "Number of updates",
                                fill: "start",
                                data: [
                                    500, 800, 320, 180, 240, 320, 230, 650, 590,
                                    1200, 750, 940,
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
                    },
                    {
                        title: "cos2",
                        labels: Array.from(new Array(30), (_, i) =>
                            i === 0 ? 1 : i
                        ),
                        datasets: [
                            {
                                label: "Number of updates",
                                fill: "start",
                                data: [
                                    900, 1000, 320, 580, 740, 820, 530, 150,
                                    620, 1200, 750, 940, 1420, 1200, 960, 150,
                                    150, 2800, 2102, 1920, 3920, 5202, 3140,
                                    2500, 3200, 3200, 3400, 2910, 3100, 4250,
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
                    },
                ]}
                smallStats={project_grades}
            />
        </div>
    );
}

export default App;
