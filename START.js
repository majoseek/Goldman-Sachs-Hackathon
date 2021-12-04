const express = require("express");
const app = express();
const { spawn } = require("child_process");
const { exec } = require("child_process");
const fs = require("fs");
const readline = require("readline");

app.use(express.json());
app.post("/grades", (req, res) => {
    const project_location = req.body.project_location; //C:/Users/Mati/Desktop/goldmansachshackathon/__mocks__
    const depTreeFileName = "depTree.txt";
    if (
        project_location == null ||
        project_location == undefined ||
        project_location == ""
    )
        res.status(400).send("1Wrong project location");
    else if (!fs.existsSync(project_location))
        res.status(400).send("2Wrong project location");
    console.log(project_location);
    new Promise((resolve, reject) => {
        //creates dependencyTreeFile
        exec(
            `mvn dependency:tree -f ${project_location}/pom.xml -DoutputFile=${__dirname}/${depTreeFileName} -DoutputType=dot`,
            (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                } else if (stderr) {
                    reject(stderr);
                } else {
                    resolve(
                        `Dependency tree generated to file ${depTreeFileName}`
                    );
                }
            }
        );
    })
        .then((result) => {
            new Promise((resolve1, reject1) => {
                //grep proper data from mvn tree command
                console.log(result);
                let line_counter = 0;
                let dependencies = new Set();
                let tree_dependencies = new Set();
                const readInterface = readline.createInterface({
                    input: fs.createReadStream(
                        `${__dirname}/${depTreeFileName}`
                    ),
                });
                readInterface.on("line", function (line) {
                    line_counter++;
                    if (line_counter > 1 && line.length > 4) {
                        let dependency = line
                            .substring(0, line.indexOf("->") - 1)
                            .replace(/"/g, "");
                        let dependency_tree = line
                            .substring(line.indexOf("->") + 2, line.length - 2)
                            .replace(/"/g, "");
                        dependencies.add(dependency.trim());
                        tree_dependencies.add(dependency_tree.trim());
                    }
                    if (line.length <= 3)
                        resolve1([dependencies, tree_dependencies]);
                });
            })
                .then((result) => {
                    new Promise((resolve, reject) => {
                        //save data_to_process for python script
                        let data_to_process = {
                            dependencies: [...result[0]],
                            tree_dependencies: [...result[1]].filter(
                                (value) => {
                                    return !result[0].has(value);
                                }
                            ),
                        };
                        fs.writeFile(
                            "data_to_process.json",
                            JSON.stringify(data_to_process),
                            (err) => {
                                if (err) reject(err);
                                resolve("Saved to data_to_process.json");
                            }
                        );
                    })
                        .then((result) => {
                            console.log(result);
                            new Promise((resolve, reject) => {
                                //run python script (generates output.json)
                                const { spawn } = require("child_process");
                                const bat = spawn("python", [
                                    "./data_processing/main.py",
                                ]);

                                bat.on("exit", (code) => {
                                    resolve("Python code executed");
                                });
                            })
                                .then((result) => {
                                    console.log(result);
                                    //python script generated output.json
                                    fs.readFile(
                                        "./output.json",
                                        "utf8",
                                        (err, jsonString) => {
                                            if (err) res.send(err);
                                            else {
                                                fs.readFile(
                                                    "./data.json",
                                                    "utf8",
                                                    (err, dataString) => {
                                                        if (err) res.send(err);
                                                        else
                                                            res.send({
                                                                jsonString:
                                                                    jsonString,
                                                                dataString:
                                                                    dataString,
                                                            });
                                                    }
                                                );
                                            }
                                        }
                                    );
                                    //
                                })
                                .catch((err) => res.send(err));
                        })
                        .catch((err) => res.send(err));
                })
                .catch((err) => res.send(err));
        })
        .catch((err) => res.send(err));
});
app.listen(3001, () => {
    console.log("Server listening on port 3001");
});
