package com.loga.k8stest01;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/test")
public class TestController {

    @Value("${config.env1}")
    private String configEnv1;

    @Value("${secret.env1}")
    private String secretEnv1;

    @GetMapping
    public Map<String, String> all() {
        Map<String, String> json = new HashMap<>();
        json.put("version", version());
        json.put("hostname", hostname());
        json.put("configEnv1", configEnv1());
        json.put("secretEnv1", secretEnv1());
        return json;
    }

    @GetMapping("version")
    public String version() {
        return "v0.0.1";
    }

    @GetMapping("hostname")
    public String hostname() {
        try {
            InetAddress id = InetAddress.getLocalHost();
            return id.getHostName();
        } catch (UnknownHostException e) {
            return "Error";
        }
    }

    @GetMapping("configEnv1")
    public String configEnv1() {
        return configEnv1;
    }

    @GetMapping("secretEnv1")
    public String secretEnv1() {
        return secretEnv1;
    }

}
