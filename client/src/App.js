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
    const [dep_grades, set_dep_grades] = useState([]);
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
                    const obj_dep = JSON.parse(response.data.dataString);
                    for (var key in obj_dep) {
                        if (obj_dep.hasOwnProperty(key)) {
                            const new_elem = {
                                title: key,
                                labels: Array.from(
                                    new Array(6),
                                    (_, i) => i + 1
                                ),
                                datasets: [
                                    {
                                        label: "Number of updates",
                                        fill: "start",
                                        data: obj_dep[key],
                                        backgroundColor: "rgba(0,123,255,0.1)",
                                        borderColor: "rgba(0,123,255,1)",
                                        pointBackgroundColor: "#ffffff",
                                        pointHoverBackgroundColor:
                                            "rgb(0,123,255)",
                                        borderWidth: 1.5,
                                        pointRadius: 0,
                                        pointHoverRadius: 3,
                                    },
                                ],
                            };
                            set_dep_grades((dep_grades) => [
                                ...dep_grades,
                                new_elem,
                            ]);
                        }
                    }
                    const obj = JSON.parse(response.data.jsonString);
                    for (var key in obj.project_grade) {
                        if (obj.project_grade.hasOwnProperty(key)) {
                            const new_elem = {
                                label: key,
                                value: obj.project_grade[key].toString(),
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
            <BlogOverview data_chart={dep_grades} smallStats={project_grades} />
        </div>
    );
}

export default App;
