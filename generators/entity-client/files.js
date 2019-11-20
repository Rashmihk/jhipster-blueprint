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

 
/* Constants use throughout */
const VUE_DIR = 'src/main/webapp/app/';
const CLIENT_VUE_TEMPLATES_DIR = 'vue';

/* Constants use throughout  angular */
const ANGULAR_DIR = 'src/main/webapp/app/';
const CLIENT_NG2_TEMPLATES_DIR = 'angular';
const path = require('path');

/**
* The default is to use a file path string. It implies use of the template method.
* For any other config an object { file:.., method:.., template:.. } can be used
*/

const angularFiles = {
    client: [
        {
            path: ANGULAR_DIR,
            templates: [
                {
                    file: 'entities/_entity-management-list.component.html',
                    renameTo: generator => `entities/${generator.entityFolderName}/${generator.entityFileName}-list.component.html`
                },
                {
                    file: 'entities/_entity-management-edit.component.html',
                    renameTo: generator => `entities/${generator.entityFolderName}/${generator.entityFileName}-edit.component.html`
                },
                {
                    file: 'entities/_entity-management.module.ts',
                    renameTo: generator => `entities/${generator.entityFolderName}/${generator.entityFileName}.module.ts`
                },
                {
                    file: 'entities/_entity-management.route.ts',
                    renameTo: generator => `entities/${generator.entityFolderName}/${generator.entityFileName}.route.ts`
                },
                {
                    file: 'entities/_entity.model.ts',
                    renameTo: generator => `entities/${generator.entityFolderName}/${generator.entityFileName}.model.ts`
                },
                {
                    file: 'entities/_entity-management-list.component.ts',
                    renameTo: generator => `entities/${generator.entityFolderName}/${generator.entityFileName}-list.component.ts`
                },
                {
                    file: 'entities/_entity-management-edit.component.ts',
                    renameTo: generator => `entities/${generator.entityFolderName}/${generator.entityFileName}-edit.component.ts`
                },
                {
                    file: 'entities/_entity.service.ts',
                    renameTo: generator => `entities/${generator.entityFolderName}/${generator.entityServiceFileName}.service.ts`
                } 
            ]
        }
    ]
    
};


module.exports = {
    writeFiles
};

function writeFiles() {
    if (this.skipClient) return;
    // write client side files for Vue.js
    this.writeFilesToDisk(angularFiles, this, false, `${CLIENT_NG2_TEMPLATES_DIR}`);
}
