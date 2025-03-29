package com.abastek.backend.management.config;


import com.abastek.backend.management.interceptor.TokenInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    // Registra o interceptor para todas as rotas sob "/api"
    registry.addInterceptor(new TokenInterceptor())
        .addPathPatterns("/api/**")
        .excludePathPatterns("/api/publico/**"); // Exemplo: rotas públicas
  }
}
