//CORSとビュー設定

package com.example.myspringapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**") // すべてのエンドポイントに適用
        .allowedOrigins("http://localhost:3000") // フロントエンドのURLを許可
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 許可するHTTPメソッド
        .allowedHeaders("*"); // すべてのヘッダーを許可
        // .allowCredentials(true); // 認証情報付きリクエストを許可
        
    }

    // public void addViewControllers(ViewControllerRegistry registry) {
	// 	registry.addViewController("/home").setViewName("Home");
	// 	registry.addViewController("/newThreads").setViewName("NewThreads");
	// 	registry.addViewController("/updateUse").setViewName("User");
    //     registry.addViewController("/UserRegistration").setViewName("UsersRegistration");
	// 	registry.addViewController("/").setViewName("Login");
    //     registry.addViewController("/PickupThread/:id").setViewName("PickupThread");
	// }
  
}
