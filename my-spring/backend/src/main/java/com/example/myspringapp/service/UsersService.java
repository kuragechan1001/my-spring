package com.example.myspringapp.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.myspringapp.repository.UsersRepository;
import com.example.myspringapp.entity.Users;
import java.util.Optional;
import java.util.Objects;
import java.util.Collection;
import java.util.List; 
import com.example.myspringapp.dto.LoginUserDto;
 import com.example.myspringapp.dto.UserListDto;
 
@Service
public class UsersService {

    @Autowired
    public UsersRepository usersRepository;

    public List<UserListDto> getUsers(Integer id) {
         return usersRepository.getUsers(id);
    }

    public Users postUsers(String username, String mailadress, String password, String phoneNumber) {
        
        if (mailadress == null && phoneNumber == null) {//&&で右かつ左（つまり電話番号もアドレスもNull）
            throw new IllegalStateException("メールアドレスか電話番号のどちらかは必須です。");
        }

        if(mailadress != null){
            if(!mailadress.contains("@baroque-w.jp")) {//「!」つけると含まないになるらしい.
                throw new IllegalStateException("@baroque-w.jpが含まれてません"); 
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
        users.setUsername(username);
        users.setMailadress(mailadress);
        users.setPassword(password);
        users.setPhoneNumber(phoneNumber);

        return usersRepository.save(users);
    }

    public void delete(Integer id){//voidは戻り値なしでOK。削除して何も返さない。
        // usersRepository.deleteById(id.longValue());これは物理削除
        Users users = usersRepository.findById(id.longValue()).get();//既存内容を取得
        users.setDeleted(true);
        usersRepository.save(users); //idを見つけて、falseからtrueに変えて更新！（保存
    }
   


    public Users putUsers(Integer id, String username,String mailadress, String password, String phoneNumber) {
        Users users = usersRepository.findById(id.longValue()).get();//.longValue()でImtengerからLong型に

        users.setUsername(username);
        users.setMailadress(mailadress); 
        users.setPassword(password);
        users.setPhoneNumber(phoneNumber);
        return usersRepository.save(users); 
    }

    public Users UsersLogin(String username,String password){
        //indByName(name) を使って、ユーザー名に一致する Users を検索
         Optional<Users> userOptional = usersRepository.findByUsername(username);
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
