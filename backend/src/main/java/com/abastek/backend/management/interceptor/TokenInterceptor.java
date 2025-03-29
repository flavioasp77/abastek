package com.abastek.backend.management.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.HandlerInterceptor;

public class TokenInterceptor implements HandlerInterceptor {

  private static final String TOKEN_VALIDO = "Bearer abc123"; // Token fixo (do seu projeto)

  @Override
  public boolean preHandle(
      HttpServletRequest request,
      HttpServletResponse response,
      Object handler) throws Exception {

    String token = request.getHeader("Authorization");

    if (token == null || !token.equals(TOKEN_VALIDO)) {
      response.sendError(HttpServletResponse.SC_FORBIDDEN, "Token inválido ou ausente");
      return false; // Bloqueia a requisição
    }

    return true; // Requisição pode prosseguir
  }
}
