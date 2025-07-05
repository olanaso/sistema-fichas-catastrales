package org.catastro.sistemafichacatastral;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SistemaFichaCatastralApplication {

    public static void main(String[] args) {
        SpringApplication.run(SistemaFichaCatastralApplication.class, args);
    }

}
