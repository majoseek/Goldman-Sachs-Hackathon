const express = require("express");
const app = express();
const { spawn } = require("child_process");
const { exec } = require("child_process");
const fs = require("fs");
const readline = require("readline");

const pom_location = "C:/Users/Mati/Desktop/goldmansachshackathon/__mocks__";
const depTreeFileName = "depTree.txt";

new Promise((resolve, reject) => {
    //creates dependencyTreeFile
    exec(
        `mvn dependency:tree -f ${pom_location}/pom.xml -DoutputFile=${__dirname}/${depTreeFileName} -DoutputType=dot`,
        (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else if (stderr) {
                reject(stderr);
            } else {
                resolve(`Dependency tree generated to file ${depTreeFileName}`);
            }
        }
    );
})
    .then((result) => {
        new Promise((resolve1, reject1) => {
            console.log(result);
            let line_counter = 0;
            let dependencies = new Set();
            let tree_dependencies = new Set();
            const readInterface = readline.createInterface({
                input: fs.createReadStream(`${__dirname}/${depTreeFileName}`),
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
                let data_to_process = {
                    dependencies: [...result[0]],
                    tree_dependencies: [...result[1]].filter((value) => {
                        return !result[0].has(value);
                    }),
                };
                fs.writeFile(
                    "data_to_process.json",
                    JSON.stringify(data_to_process),
                    (err) => {
                        if (err) console.log(err);
                    }
                );
                console.log("Saved to data_to_process.json");
            })
            .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
