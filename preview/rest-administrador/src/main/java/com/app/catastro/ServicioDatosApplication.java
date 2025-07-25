package com.app.catastro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class, HibernateJpaAutoConfiguration.class})
public class ServicioDatosApplication extends SpringBootServletInitializer {
  protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
    return builder.sources(new Class[] { com.app.catastro.ServicioDatosApplication.class });
  }
  
  public static void main(String[] args) {
    SpringApplication.run(com.app.catastro.ServicioDatosApplication.class, args);
  }
}