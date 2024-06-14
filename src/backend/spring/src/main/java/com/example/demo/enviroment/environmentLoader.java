package com.example.demo.enviroment;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class environmentLoader {
    public static void load() {
        try {
            Properties properties = new Properties();
            String projectRoot = System.getProperty("user.dir");
            String envFilePath = projectRoot + "/../../../.env";
            FileInputStream fis = new FileInputStream(envFilePath);
            properties.load(fis);
            fis.close();

            for (String key : properties.stringPropertyNames()) {
                String value = properties.getProperty(key);
                System.setProperty(key, value);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

