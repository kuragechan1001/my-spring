// package com.example.myspringapp.service;

// import com.example.myspringapp.repository.UsersRepository;

// @Service
// public class AuthService {

//    @Autowired
//    private UsersRepository usersRepository;

//    @Autowired
//    private PasswordEncoder passwordEncoder;

//    @Autowired
//    private AuthenticationManager authenticationManager;

//    @Autowired
//    private JwtTokenProvider jwtTokenProvider;

//    public User signup(SignupRequestDto signupRequestDto){
//        String username = signupRequestDto.getUsername();
//        String email = signupRequestDto.getEmail();
//        String hashedPassword = passwordEncoder.encode(signupRequestDto.getPassword());
//        if(userRepository.existsByUsername(username)){
//            throw new CustomException("Conflict","this username is already in use!",HttpStatus.CONFLICT);
//        }

//        if(userRepository.existsByEmail(email)){
//            	throw new CustomException("Conflict","this email is already in use!",HttpStatus.CONFLICT);
//        }

//        User user = new User();
//        user.setUsername(username);
//        user.setEmail(email);
//        user.setPassword(hashedPassword);

//        return userRepository.save(user);
//    }

//    public ResponseDto authenticateUser(LoginRequestDto loginRequestDto){
//        try {
//            // DaoAuthenticationProviderでの認証
//            Authentication auth = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                    loginRequestDto.getUsername(), loginRequestDto.getPassword()
//                )
//            );
//            SecurityContextHolder.getContext().setAuthentication(auth);
//            // 認証成功時にJwtを生成しクライアントへ返す
//            String jwt = jwtTokenProvider.generateToken(auth);

//            ResponseDto response = new ResponseDto();
//            response.setToken(jwt);
//            response.setExpiresIn(jwtTokenProvider.getExpirationMs());
//            return response;

//        } catch (AuthenticationException e) {
//            // 認証失敗時の処理
//            throw new CustomException("Authentication Error","Invalid username or password",HttpStatus.UNAUTHORIZED);
//        } 
//    }
// }

// // import com.example.myspringapp.entity.Users;
// // import com.example.myspringapp.repository.UsersRepository;
// // import org.springframework.security.core.userdetails.UserDetails;
// // import org.springframework.security.core.userdetails.UserDetailsService;
// // import org.springframework.security.core.userdetails.UsernameNotFoundException;
// // import org.springframework.stereotype.Service;
// // import java.util.List;
// // import org.springframework.security.core.authority.SimpleGrantedAuthority;

// // @Service
// // public class UserDetailsServiceImpl implements UserDetailsService {

// //     private final UsersRepository userRepository;

// //     public UserDetailsServiceImpl(UsersRepository userRepository) {
// //         this.userRepository = userRepository;
// //     }

// //     @Override
// //     public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
// //         Users user = userRepository.findByName(name)
// //             .orElseThrow(() -> new UsernameNotFoundException("ユーザーが見つかりません: " + name));

// //         return org.springframework.security.core.userdetails.User.builder()
// //         .username(user.getName())
// //         .password(user.getPassword())
// //         // .authorities(List.of(new SimpleGrantedAuthority("ROLE_USER"))) // 権限を設定
// //         .build();
// //     }
// // }