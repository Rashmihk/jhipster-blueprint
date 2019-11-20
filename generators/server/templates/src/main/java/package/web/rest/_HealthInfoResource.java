<%#
 Copyright 2013-2018 the original author or authors from the JHipster project.

 This file is part of the JHipster project, see http://www.jhipster.tech/
 for more information.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-%>

package <%=packageName%>.web.rest;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.AbstractEnvironment;
import org.springframework.core.env.Environment;
import org.springframework.core.env.MapPropertySource;
import org.springframework.core.env.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.jhipster.config.JHipsterProperties;

@RestController
@RequestMapping("/api")
public class HealthInfoResource {
	  private final Environment env;
	  private final Logger log = LoggerFactory.getLogger(HealthInfoResource.class);
	    public HealthInfoResource(Environment env, JHipsterProperties jHipsterProperties) {
	        this.env = env;
	    }
	    
	    @GetMapping("/server-info/{datasource}")
		public ResponseEntity<Object> getServerInfo(@PathVariable String datasource) {			
			String server[] = null;
			Map<String, String> dbDetails = new HashMap<String, String>();
			if(datasource.contains("lawson")) {
				String lawson_server = env.getProperty("spring.lawson.datasource.url");
				server = lawson_server.split("[;/=]+");
				dbDetails.put("databaseServer", "Lawson Database");
			} else if(datasource.contains("oracle")) {
				String oracle_server = env.getProperty("spring.oracle.datasource.url");
				server = oracle_server.split("[;@/=:]+");
				dbDetails.put("databaseServer", "Oracle Database");
			} else {
				String default_server = env.getProperty("spring.datasource.url");
				server = default_server.split("[;/=]+");
				dbDetails.put("databaseServer", "SQL Database");
			}		
			dbDetails.put("server", server[1]);
			dbDetails.put("database", server[3]);
			return new ResponseEntity<>(dbDetails, HttpStatus.OK);
	    }
	    
}