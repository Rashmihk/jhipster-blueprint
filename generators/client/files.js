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
const mkdirp = require('mkdirp');
const constants = require('generator-jhipster/generators/generator-constants');
const utils = require('../utils');

const MAIN_SRC_DIR = constants.CLIENT_MAIN_SRC_DIR;
const TEST_SRC_DIR = constants.CLIENT_TEST_SRC_DIR;
const ANGULAR_DIR = constants.ANGULAR_DIR;
const CLIENT_VUE_TEMPLATES_DIR = 'angular';



const angularFiles = {
    common: [
        {
            templates: [
                'package.json',
                'proxy.conf.json',
                'tsconfig.json',
                'tsconfig-aot.json',
                'tslint.json',
                'angular.json',
                '.npmrc',
                'webpack/utils.js',
                'webpack/webpack.common.js',
                'webpack/webpack.dev.js',
                'webpack/webpack.prod.js',
                { file: 'webpack/logo-jhipster.png', method: 'copy' }
            ]
        }
    ],
    sass: [
        {
            path: MAIN_SRC_DIR,
            templates: [
                'content/scss/_bootstrap-variables.scss',
                'content/scss/global.scss',
                'content/scss/vendor.scss',
                'content/scss/button.scss'
            ]
        },
        {
            condition: generator =>  generator.enableI18nRTL,
            path: MAIN_SRC_DIR,
            templates: [
                'content/scss/rtl.scss',
            ]
        },
        {
            condition: generator => generator.useSass,
            templates: [
                '_postcss.config.js'
            ]
        }
    ],
    angularApp: [
        {
            path: ANGULAR_DIR,
            templates: [
                'app.main.ts',
                'app.route.ts',
                'app.module.ts',
                'app-routing.module.ts',
                'app.constants.ts',
                'polyfills.ts',
                'vendor.ts',
                'blocks/config/prod.config.ts',
                'blocks/config/uib-pagination.config.ts',
                // interceptors
                'blocks/interceptor/errorhandler.interceptor.ts',
                'blocks/interceptor/notification.interceptor.ts',
                'blocks/interceptor/auth-expired.interceptor.ts'
            ]
        }
    ],
    angularMain: [
        {
            path: ANGULAR_DIR,
            templates: [
                // entities
                'entities/entity.module.ts',
                // home module
                'home/index.ts',
                { file: 'home/home.module.ts', method: 'processJs' },
                { file: 'home/home.route.ts', method: 'processJs' },
                { file: 'home/home.component.ts', method: 'processJs' },
                { file: 'home/home.component.html', method: 'processHtml' },
                // layouts
                'layouts/index.ts',
                'layouts/profiles/page-ribbon.component.ts',
                'layouts/profiles/profile.service.ts',
                'layouts/profiles/profile-info.model.ts',
                'layouts/main/main.component.ts',
                'layouts/main/main.component.html',
                'layouts/main/topbar.config.ts',
                { file: 'layouts/navbar/navbar.component.ts', method: 'processJs' },
                { file: 'layouts/navbar/navbar.component.html', method: 'processHtml' },
                'layouts/navbar/navbar.route.ts',
                'layouts/footer/footer.component.ts',
                { file: 'layouts/footer/footer.component.html', method: 'processHtml' },
                 /** Altered with Error Component from fhlbny-ui-commons error component */
                /*
                { file: 'layouts/error/_error.route.ts', method: 'processJs' },
                { file: 'layouts/error/_error.component.ts', method: 'processJs' },
                { file: 'layouts/error/_error.component.html', method: 'processHtml' }
                */
            ]
        },
        {
            condition: generator => generator.enableTranslation,
            path: ANGULAR_DIR,
            templates: ['layouts/navbar/active-menu.directive.ts']
        },
        {
            path: ANGULAR_DIR,
            templates: ['layouts/profiles/page-ribbon.scss', 'layouts/navbar/navbar.scss', 'home/home.scss']
        }
    ],
    angularShared: [
        {
            path: ANGULAR_DIR,
            templates: [
                'shared/index.ts',
                'shared/shared.module.ts',
                'shared/shared-libs.module.ts',
                'shared/shared-common.module.ts',
                'shared/constants/error.constants.ts',
                'shared/constants/input.constants.ts',
                'shared/constants/pagination.constants.ts',
                // models
                'shared/util/request-util.ts',
                'shared/model/request-util.ts',
                //new added
                'shared/model/base-entity.ts',
                'shared/user/account.model.ts',
                'shared/utilities/observable-unsubscription-utils.ts',
                'shared/utilities/date-utils.ts',
                'shared/pipes/property-value.pipe.ts',
                'shared/directives/sort-by.directive.ts',
                'shared/directives/sort.directive.ts',
                'shared/components/list/list.component.ts',
                'shared/components/list/list.service.ts',
                'shared/components/decorator/decorator.component.html',
                'shared/components/decorator/decorator.component.ts',
                'shared/components/decorator/layout.model.ts',  
                  /**
 * imported dummy auth server provider, it will replace by ui common auth server provider
 */
                //auth
                'shared/auth/auth.service.ts',
                // alert service code
                'shared/alert/alert.component.ts',
                'shared/alert/alert-error.component.ts',
                // dates
                'shared/util/datepicker-adapter.ts',
                // login
                'shared/login/login.service.ts',
            ]
        },

        {
            condition: generator => generator.enableTranslation,
            path: ANGULAR_DIR,
            templates: ['shared/language/find-language-from-key.pipe.ts']
        },
        {
            condition: generator => !generator.skipUserManagement || generator.authenticationType === 'oauth2',
            path: ANGULAR_DIR,
            templates: [
                'shared/user/user.model.ts',
                'shared/user/user.service.ts'
            ]
        }
    ]
};

module.exports = {
    writeFiles
};

function writeFiles() {
    return {
        writeClientFilee() {
            mkdirp(MAIN_SRC_DIR);
            // write Vue.js files
            this.writeFilesToDisk(angularFiles, this, false, `${CLIENT_VUE_TEMPLATES_DIR}`);
        }
    };
}
