const constants = require('generator-jhipster/generators/generator-constants');
const SERVER_MAIN_SRC_CUSTOM_DIR = `${constants.MAIN_DIR}java/`;

const INTERPOLATE_REGEX = constants.INTERPOLATE_REGEX;
const SERVER_MAIN_RES_DIR = constants.SERVER_MAIN_RES_DIR;

const customFiles = {
    server: [
        {
            path: SERVER_MAIN_SRC_CUSTOM_DIR,
            templates: [
                {
                    file: 'package/domain/_Entity.java',
                    renameTo: generator => `${generator.packageFolder}/domain/${generator.entityClass}.java`
                },
                {
                    file: 'package/repository/_EntityRepository.java',
                    renameTo: generator => `${generator.packageFolder}/repository/${generator.entityClass}Repository.java`
                },
                {
                    file: 'package/web/rest/_EntityResource.java',
                    renameTo: generator => `${generator.packageFolder}/web/rest/${generator.entityClass}Resource.java`
                }
            ]
        }
    ]
};

module.exports = {
    writeFiles
};

function writeFiles() {
    return {
        writeServerFilee() {
            if (this.skipServer) return;
            console.log("Overriding new entity picked up from template in " + SERVER_MAIN_SRC_CUSTOM_DIR)

            // write server side files
            this.writeFilesToDisk(customFiles, this, false);

        }
    };
}