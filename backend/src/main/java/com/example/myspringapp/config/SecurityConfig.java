// package com.example.myspringapp.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// import java.util.List;
// import com.example.myspringapp.domain.JwtAuthenticationFilter;

// @Configuration
// @EnableWebSecurity
// // @EnableMethodSecurity
// public class SecurityConfig {


//     @Autowired
//     private JwtAuthenticationFilter jwtAuthenticationFilter;
    
//     @Autowired
//     private CustomUserDetails userDetails;
//        @Bean
//     SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//         http.csrf(csrf->csrf.disable())
//         // Jwtを使用する場合は、リクエストごとにセッションを確立する必要はない。
//         .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//         // "/api/auth/**"は認証時に使用するエンドポイントのため許可、
//         // その他のエンドポイントへのリクエストは認証が必要とした。
//         .authorizeHttpRequests(auth->auth.requestMatchers("/userApp/users/login").permitAll()
//         .anyRequest().authenticated())
//         // jwtAuthenticationFilterを先に配置することで、リクエストごとにJWTを解析して認証を済ませることができる。
//         .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

//         return http.build();
//     }

//     @Bean
//     AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
//         AuthenticationManagerBuilder auth = http.getSharedObject(AuthenticationManagerBuilder.class);
//         // AuthenticationProviderとしてDaoAuthenticationProviderを使用する
//         auth.authenticationProvider(authenticationProvider());
//         return auth.build();
//     }
    
//     @Bean
//     DaoAuthenticationProvider authenticationProvider() {
//     	DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
//     	authProvider.setUserDetailsService(userDetails);
//     	authProvider.setPasswordEncoder(passwordEncoder());
//     	return authProvider;
//     }

//     @Bean
//     PasswordEncoder passwordEncoder(){
//         return new BCryptPasswordEncoder();
//     }
// }
// //     @Bean
// //     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
// //         http
// //             .authorizeHttpRequests(auth -> auth
// //                 .requestMatchers("/userApp/users/login").permitAll() // ログインは認証不要
// //                 .requestMatchers("/app/threads").permitAll()
// //                 .requestMatchers("/app/comments").permitAll()
// //                 // .anyRequest().authenticated() // その他のリクエストは認証が必要
// //             )
// //             .formLogin(login -> login // フォームログインの有効化
// //                 .loginPage("/")
// //                 .permitAll()
// //                 .usernameParameter("name") // ログインフォームのユーザー名フィールド
// //                 .passwordParameter("password") // ログインフォームのパスワード
// //             )
// //             .logout(logout -> logout // ログアウトの設定
// //                 .logoutUrl("/")
// //                 .permitAll()
// //             );
// //         return http.build();
// //     }

// //     @Bean
// //     public PasswordEncoder passwordEncoder() {
// //         return new BCryptPasswordEncoder(); // パスワードのハッシュ化
// //     }

// //     @Bean
// //     public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
// //         return authenticationConfiguration.getAuthenticationManager();
// //     }
// // JWTを使う}


// //     @Bean
// //     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
       
// //         http

// //             .cors(cors -> cors.configurationSource(corsConfigurationSource())) // CORS設定を適用
// //             .csrf(csrf -> csrf.disable()) // CSRFを無効化（必要なら）
// //             .authorizeHttpRequests(auth -> auth
// //                 .requestMatchers("/userApp/users/login").permitAll() // ログインは認証不要
// //                 // .anyRequest().authenticated() // それ以外は認証が必要
// //                 .requestMatchers("/app/comments/post").permitAll()// ログイン済みユーザーのみ
// //                 .requestMatchers("/app/comments/{id}").permitAll()
// //                 .requestMatchers("/app/comments/update").permitAll()
// //                 .requestMatchers("/app/comments").authenticated()//.hasAuthority("ROLE_USER") // ログイン済みユーザーのみアクセスOK
// //                 .requestMatchers("/app/threads").authenticated()
// //                 .requestMatchers("/app/threads/create").permitAll() // ログイン済みユーザーのみ
// //                 .requestMatchers("/app/threads/delete/{id}").permitAll()
// //                 .requestMatchers("/app/threads/update").permitAll()
            
// //             )

// //             .formLogin(login -> login
// //                 .loginPage("/") // ログインページのパス
// //                 .loginProcessingUrl("/")//ログインフォームが送信されるURLを指定。このURLへのPOSTリクエストをSpring Securityが処理suru.
// //                 .defaultSuccessUrl("/home", true) // 成功後の遷移先
// //                 .permitAll()
// //                 .failureUrl("/?error=true")
// //                 .usernameParameter("name")//ログインフォームのユーザー名フィールドのnameを指定
// //                 .passwordParameter("password")//ログインフォームのパスワードフィールドのnameを指定
// //             )

// //             .logout(logout -> logout
// //                 .logoutSuccessUrl("/") // ログアウト後の遷移先
// //                 .permitAll()
// //             );

// //         return http.build();
// //     }

// //     @Bean
// //     public BCryptPasswordEncoder passwordEncoder() {
// //         return new BCryptPasswordEncoder();
// //     }
    
// //     // CORS設定を追加
// //     @Bean
// //     public CorsConfigurationSource corsConfigurationSource() {
// //         CorsConfiguration config = new CorsConfiguration();
// //         config.setAllowedOrigins(List.of("http://localhost:3000")); // フロントエンドのドメイン
// //         config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
// //         config.setAllowedHeaders(List.of("*"));
// //         config.setAllowCredentials(true); // Cookieや認証情報を含むリクエストを許可
// //        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
// //         source.registerCorsConfiguration("/**", config);
// //         return source;
// //     }


// // }


