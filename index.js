const express = require("express");
const app = express();
const { spawn } = require("child_process");
const { exec } = require("child_process");
const { resolve } = require("path");

const pom_location = "C:/Users/Mati/Desktop/goldmansachshackathon/__mocks__";
const depTreeFileName = "depTree.txt";

new Promise((resolve, reject) => {  //creates dependencyTreeFile
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
}).then((result) => {
    console.log(result);

});
