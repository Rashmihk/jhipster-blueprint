/**
 * Copyright 2013-2019 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const constants = require('generator-jhipster/generators/generator-constants');
const SERVER_MAIN_KOTLIN_SRC_DIR = `${constants.MAIN_DIR}kotlin/`;

const INTERPOLATE_REGEX = constants.INTERPOLATE_REGEX;
const DOCKER_DIR = constants.DOCKER_DIR;
const SERVER_MAIN_RES_DIR = constants.SERVER_MAIN_RES_DIR;




/**
 * The default is to use a file path string. It implies use of the template method.
 * For any other config an object { file:.., method:.., template:.. } can be used
 */
const serverFiles = {
    serverJavaApp: [
        {
            path: SERVER_MAIN_KOTLIN_SRC_DIR,
            templates: [
                {
                    file: '_pom.xml'
                }
            ]
        }
    ],
};

/* eslint-disable no-template-curly-in-string */
function writeFiles() {
    return {
        writeFiles() {
            // this.writeFilesToDisk(serverFiles, this, false, this.fetchFromInstalledJHipster('server/templates'));
           // this.template('pom.xml', 'pom.xml', null, { interpolate: INTERPOLATE_REGEX });
            this.copy('mvnw', 'mvnw');
            this.copy('mvnw.cmd', 'mvnw.cmd');
            this.copy('.mvn/wrapper/maven-wrapper.jar', '.mvn/wrapper/maven-wrapper.jar');
            this.copy('.mvn/wrapper/maven-wrapper.properties', '.mvn/wrapper/maven-wrapper.properties');
            this.template('pom.xml', 'pom.xml', null, { interpolate: INTERPOLATE_REGEX });
           
        }
    };
}




module.exports = {
    writeFiles,
    serverFiles
};