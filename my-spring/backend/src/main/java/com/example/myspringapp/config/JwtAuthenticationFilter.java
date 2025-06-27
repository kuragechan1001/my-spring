//　認証処理を行うFilterクラスリクエストごとにトークンチェック
package com.example.myspringapp.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import com.example.myspringapp.entity.JwtUtil;
import com.example.myspringapp.service.MyUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import com.example.myspringapp.repository.UsersRepository;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
private final JwtUtil jwtUtil;
private final MyUserDetailsService myUserDetailsService;

@Autowired
private UsersRepository usersRepository;

@Autowired
public JwtAuthenticationFilter(JwtUtil jwtUtil, MyUserDetailsService myUserDetailsService) {
    this.jwtUtil = jwtUtil;
    this.myUserDetailsService = myUserDetailsService;
}

@Override
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {

    String token = request.getHeader("Authorization");//JWT（トークン）を取得.HTTPリクエストの Authorization ヘッダーからJWTを取得。通常、JWTは "Bearer <TOKEN>" という形式で送られてくる。
    if (token != null && jwtUtil.validateToken(token.replace("Bearer ", ""))) {//トークンが存在するかチェック & 検証。token が null ではなく、かつ jwtUtil.validateToken() で正しいトークンかどうか検証。.replace("Bearer ", "") で "Bearer " を削除し、純粋なJWTの文字列を取得。
        String tokenValue = token.replace("Bearer ", "");
        String userIdStr = jwtUtil.extractUserId(tokenValue);
      
        // String userIdStr  = jwtUtil.extractUserId(token.replace("Bearer ", ""));//ユーザー名を抽出
        Long userId = Long.parseLong(userIdStr);//ユーザー情報の取得。UserDetailsService を使って、userid に該当する ユーザー情報（権限など） を取得。
        UserDetails userDetails = myUserDetailsService.loadUserById(userId);// ← ここで変換

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(//認証オブジェクトを作成
                userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);
    }
    filterChain.doFilter(request, response);//フィルタの継続
    
}

// @Override
// public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//     Users user = usersRepository.findByUsername(username)
//         .orElseThrow(() -> new UsernameNotFoundException("User not found"));
//     return new MyUserDetails(user);
// }
}
