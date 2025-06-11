package com.example.myspringapp.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.myspringapp.repository.UsersRepository;
import com.example.myspringapp.entity.Users;
import java.util.Optional;
import java.util.Objects;
import java.util.Collection;
import java.util.List; 
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// // import com.example.myspringapp.domain.LoginAdministrator;
// import org.springframework.security.core.userdetails.UserDetailsService;
import com.example.myspringapp.dto.LoginUserDto;
 
@Service
public class UsersService {

    @Autowired
    public UsersRepository usersRepository;

    public List<Users> getUsers() {
         return usersRepository.findAll();
        //getUsersは、スレッドリポジトリのfindUserの中身を返す
    }

    public Users postUsers(String name, String mailadress, String password, String phoneNumber) {
        
        if (mailadress == null && phoneNumber == null) {//&&で右かつ左（つまり電話番号もアドレスもNull）
            throw new IllegalStateException("メールアドレスか電話番号のどちらかは必須です。");
        }

        if(mailadress != null){
            if(!mailadress.contains("@gmail.com")) {//「!」つけると含まないになるらしい.
                throw new IllegalStateException("@gmail.comが含まれてません"); 
            }

            if(usersRepository.existsByMailadress(mailadress)) {//existsByIdでそのidが存在してるかチェックできる
            throw new IllegalStateException("このアドレスは既に登録されています。頑張ってパスワードを思い出すか諦めてください。");
            }
        }

        if(phoneNumber != null){
            if (usersRepository.existsByPhoneNumber(phoneNumber)) {
                throw new IllegalStateException("この電話番号は既に登録されてるので諦めてください。");
            }
        }

        Users users = new Users();
        users.setName(name);
        users.setMailadress(mailadress);
        users.setPassword(password);
        users.setPhoneNumber(phoneNumber);

        return usersRepository.save(users);
    }

    public void delete(Integer id){//voidは戻り値なしでOK。削除して何も返さない。
        usersRepository.deleteById(id);
    }
   
    public Users putUsers(Integer id, String name,String mailadress, String password, String phoneNumber) {
        Users users = usersRepository.findById(id).get();

        users.setName(name);
        users.setMailadress(mailadress); 
        users.setPassword(password);
        users.setPhoneNumber(phoneNumber);
        return usersRepository.save(users); 
    }

    public Users UsersLogin(String name,String password){
        //indByName(name) を使って、ユーザー名に一致する Users を検索
         Optional<Users> userOptional = usersRepository.findByName(name);
        //見つかった場合は、パスワードが一致するかどうかをチェック。
        //一致すれば Users を返し、一致しなければエラーを投げる
        if (userOptional.isPresent()) {
            Users user = userOptional.get();
            if (user.getPassword().equals(password)) {
                return user; // 認証成功
            }
            throw new IllegalStateException("ユーザー名またはパスワードが間違っています");
        }
        return null;// ユーザーが見つからなかった場合
      
    }


}
