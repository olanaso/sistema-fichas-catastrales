package com.servicio.datos.config;


import com.servicio.datos.model.config;
import com.servicio.datos.util.ConfigXML;

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
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.xml.sax.SAXException;

@Configuration
@RefreshScope
@EnableSwagger2
public class WebConfig {
  @Bean(name = {"dsMaster"})
  @Primary
  public DataSource masterDataSource() throws SAXException, IOException, ParserConfigurationException {
    DriverManagerDataSource ds = new DriverManagerDataSource();
    ConfigXML conf = new ConfigXML();
    config f = conf.getXML();
    ds.setDriverClassName(f.getDataSourceClass());
    ds.setUrl(f.getDataSourceURL());
    ds.setUsername("postgres");
    //ds.setPassword("SedaCusco$$2025...");
    ds.setPassword("159753");
    return (DataSource)ds;
  }

  
  @Bean(name = {"jdbcMaster"})
  public JdbcTemplate masterJdbcTemplate(@Qualifier("dsMaster") DataSource dsMaster) {
    return new JdbcTemplate(dsMaster);
  }
  
	
 private ApiInfo getApiInfo() {
		return new ApiInfo(
				"Order Service API",
				"Order Service API Description",
				"1.0",
				"http://APPMOVIL.COM/terms",
				new Contact("APPMOVIL", "https://codmind.com", "apis@codmind.com"),
				"LICENSE",
				"LICENSE URL",
				Collections.emptyList()
				);
	}
}