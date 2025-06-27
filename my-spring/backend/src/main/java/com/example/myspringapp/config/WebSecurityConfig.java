//WebSecurityConfig クラスは Spring Security を使って、アプリケーションのセキュリティ設定を定義しる。 
// 特に、JWT認証、CORS設定、エンドポイントのアクセス制御 を設定している重要なクラス
package com.example.myspringapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import com.example.myspringapp.config.JwtAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;
import java.util.List; 
import java.util.Arrays;
import com.example.myspringapp.entity.JwtUtil;
import com.example.myspringapp.service.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.Customizer;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {

    private final JwtAuthenticationFilter jwtauthenticationFilter;

    public WebSecurityConfig(JwtAuthenticationFilter jwtauthenticationFilter){
        this.jwtauthenticationFilter = jwtauthenticationFilter; }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf((csrf) -> csrf.disable());
        http.cors(Customizer.withDefaults());
        http.authorizeHttpRequests((requests) -> requests
                .requestMatchers( "/app/users/login","app/users/create").permitAll()
                .requestMatchers("/app/comments/**").authenticated()
                .requestMatchers("/app/threads/**").authenticated()
                .requestMatchers("/app/users/**").authenticated()
                .anyRequest().authenticated());
        http.addFilterBefore(jwtauthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, MyUserDetailsService userDetailsService) throws Exception {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder()); // ここで passwordEncoder() を使用
        return new ProviderManager(List.of(provider));
    }
    @Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}

   
}



// @Configuration//Spring の設定クラスとして認識
// @EnableWebSecurity//Spring Security を有効化
// @EnableMethodSecurity//メソッド単位のセキュリティ制御を有効化

// public class WebSecurityConfig {
    
//     private final JwtUtil jwtUtil;//JWTの生成・検証を行うユーティリティクラス
//     private final MyUserDetailsService myUserDetailsService;//JWTを使った認証フィルター（クラス内では未使用だが、DIのため定義）
//     private final JwtAuthenticationFilter jwtAuthenticationFilter;//ここでJWTを使った認証フィルターを定義。
//     private final AuthenticationManager authenticationManager;//認証マネージャーを設定（ユーザーの認証を管理。インポートするだけでいい）
//     //JwtAuthenticationFilterとAuthenticationManagerを使って、JWT認証の処理を適用する。

//     @Autowired
//     public WebSecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter,JwtUtil jwtUtil, 
//     MyUserDetailsService myUserDetailsService,AuthenticationManager authenticationManager){
//         this.jwtAuthenticationFilter = jwtAuthenticationFilter;
//         this.authenticationManager = authenticationManager;
//         this.jwtUtil = jwtUtil;
//         this.myUserDetailsService = myUserDetailsService;
//     }


//    @Bean
//     SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         // http.csrf(csrf -> csrf.disable())// CSRF対策を無効化（JWTなら不要）
//         //authorizeHttpRequests(auth -> auth ...) の中でリクエストごとのアクセス制御を設定できる。すべてのリクエストに 認証の要否を決めるメインのブロック。
//         http.authorizeHttpRequests(auth -> auth
//             .requestMatchers("/app/users/login","app/users/create").permitAll()  // ログインは誰でもOK
//             .requestMatchers("/app/comments","/app/comments/post","/app/comments/{id}","/app/comments/update").authenticated()  // コメント一覧は認証必須
//             .requestMatchers("/app/threads","/app/threads/update","/app/threads/create","/app/threads/delete/{id}").authenticated() //Spring Securityこのメソッドを使って、特定のエンドポイント（API）へのアクセスルールを決める
//             .requestMatchers("/app/users/delete/{id}","/app/users/update").authenticated()
//         )
//             // .anyRequest().authenticated())
//         .authenticationManager(authenticationManager)// 認証管理を設定。@Beanで定義しないと使えないで定義しないと使えない
//         .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); // 順序を指定

//         return http.build();
//     }

//     @Bean
//     public CorsConfigurationSource corsConfigurationSource() {
//         CorsConfiguration configuration = new CorsConfiguration();
//         configuration.setAllowedOrigins(List.of("http://localhost:3000")); // フロント側のURLを許可
//         configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//         configuration.setAllowedHeaders(List.of("*")); // すべてのヘッダーを許可
//         configuration.setAllowCredentials(true); // Cookieや認証情報を許可

//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         source.registerCorsConfiguration("/**", configuration);
//         return source;
//     }
//     @Bean
//     public AuthenticationManager authenticationManager(MyUserDetailsService userDetailsService) {
//         DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
//         provider.setUserDetailsService(userDetailsService);
//         provider.setPasswordEncoder(passwordEncoder());
//         return new ProviderManager(List.of(provider)); //Listのインポートも確認
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder(); // パスワードの暗号化
//     }
    

// }

// @Configuration
// @EnableWebSecurity
// @EnableMethodSecurity
// public class WebSecurityConfig {

//     private final JwtUtil jwtUtil;
//     private final MyUserDetailsService myUserDetailsService;



//     @Autowired
//     public WebSecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter,JwtUtil jwtUtil,JwtAuthenticationFilter jwtAuthenticationFilter, 
//     MyUserDetailsService myUserDetailsService,AuthenticationManager authenticationManager){
//         this.jwtAuthenticationFilter = jwtAuthenticationFilter;//ここでJWTを使った認証フィルターを定義。
//         this.authenticationManager = authenticationManager;//認証マネージャーを設定（ユーザーの認証を管理。インポートするだけでいい）
//         this.jwtUtil = jwtUtil;//JWTの生成・検証を行うユーティリティクラス
//         this.myUserDetailsService = myUserDetailsService;//JWTを使った認証フィルター（クラス内では未使用だが、DIのため定義）
//         //JwtAuthenticationFilterとAuthenticationManagerを使って、JWT認証の処理を適用する。
//     @Bean
//         public JwtAuthenticationFilter jwtAuthenticationFilter(JwtUtil jwtUtil, MyUserDetailsService myUserDetailsService) {
//         return new JwtAuthenticationFilter(jwtUtil, myUserDetailsService);
//     }

//     @Bean
//     SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         // http.csrf(csrf -> csrf.disable()); // CSRFを無効化（JWTなら不要）
//         http.authorizeHttpRequests(auth -> auth
//                 .requestMatchers("/app/users/login", "/app/users/create").permitAll()  // ログインは誰でもOK
//                 .requestMatchers("/app/comments", "/app/comments/post", "/app/comments/{id}", "/app/comments/update").authenticated()
//                 .requestMatchers("/app/threads", "/app/threads/update", "/app/threads/create", "/app/threads/delete/{id}").authenticated()
//                 .requestMatchers("/app/users/delete/{id}", "/app/users/update").authenticated()
//             );
//             .authenticationManager(authenticationManager); //  認証マネージャーを設定
//        http.addFilterBefore(jwtAuthenticationFilter(jwtUtil, myUserDetailsService), UsernamePasswordAuthenticationFilter.class);  //  JWT認証フィルターを適用
//         return http.build();
//     }

//     @Bean
//     public CorsConfigurationSource corsConfigurationSource() {
//         CorsConfiguration configuration = new CorsConfiguration();
//         configuration.setAllowedOrigins(List.of("http://localhost:3000")); // フロント側のURLを許可
//         configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//         configuration.setAllowedHeaders(List.of("*")); // すべてのヘッダーを許可
//         configuration.setAllowCredentials(true); //  Cookieや認証情報を許可

//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         source.registerCorsConfiguration("/**", configuration);
//         return source;
//     }

//     @Bean
//     public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
//         return authenticationConfiguration.getAuthenticationManager();
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder(); // パスワードの暗号化
//     }
// }
