package com.example.myspringapp.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.myspringapp.repository.UsersRepository;
import com.example.myspringapp.entity.Users;
import java.util.Optional;
import java.util.Objects;
import java.util.Collection;
 
@Service
public class UsersService{

    @Autowired
    public UsersRepository usersRepository;

    public Users postUsers(String name, String mailadress, String password, String phoneNumber) {
        
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
        users.setName(name);
        users.setMailadress(mailadress);
        users.setPassword(password);
        users.setPhoneNumber(phoneNumber);

        return usersRepository.save(users);
    }

    public void delete(Integer id){//voidは戻り値なしでOK。削除して何も返さない。
        usersRepository.deleteById(id);
    }
   
    public Users putUsers(Integer id, String name) {
        Users users = usersRepository.findById(id).get();

        users.setName(name);

        return usersRepository.save(users); 
    }
}
