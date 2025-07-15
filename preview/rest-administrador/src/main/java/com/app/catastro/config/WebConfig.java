package com.app.catastro.config;



import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.io.IOException;
import java.util.Collections;

import javax.sql.DataSource;
import javax.xml.parsers.ParserConfigurationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.xml.sax.SAXException;

import com.app.catastro.model.utils.config;
import com.app.catastro.util.ConfigXML;


@Configuration
@RefreshScope
@EnableSwagger2
public class WebConfig {
	
	@Autowired
	private ConfigXML conf;	
	

	public DataSource masterDataSourcePsql(String user, String pass) throws SAXException, IOException, ParserConfigurationException {
    	config f = conf.getXML();
    	
    	DriverManagerDataSource ds2 = new DriverManagerDataSource();
		ds2.setDriverClassName(f.getDataSourceClass1());
		ds2.setUrl(f.getDataSourceURL2());
		ds2.setUsername("postgres");
		ds2.setPassword("SedaCusco$$2025...");
        return ds2;
    }
	
 
}