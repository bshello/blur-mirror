package com.blur.service;

import com.blur.entity.User;
import com.blur.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class PasswordService {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    JavaMailSender emailSender;

    public static final String tPw = createTempPassword();

    @Autowired
    private final BCryptPasswordEncoder encoder;

    public static String createTempPassword() {

        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3); // 0~2 까지 랜덤

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    //  a~z  (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    //  A~Z
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    // 0~9
                    break;
            }
        }
        return key.toString();
    }

    private MimeMessage createMessage(String to)throws Exception{
        System.out.println("보내는 대상 : "+ to);
        System.out.println("인증 번호 : "+tPw);
        MimeMessage  message = emailSender.createMimeMessage();

        message.addRecipients(Message.RecipientType.TO, to);//보내는 대상
        message.setSubject("임시 비밀번호 테스트");//제목

        String msgg="";
        msgg+= "<div style='margin:20px;'>";
        msgg+= "<h1> 안녕하세요 Blur입니다. </h1>";
        msgg+= "<br>";
        msgg+= "<p>임시 비밀번호로 로그인 해주세요.<p>";
        msgg+= "<br>";
        msgg+= "<p>감사합니다.<p>";
        msgg+= "<br>";
        msgg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgg+= "<h3 style='color:blue;'>임시 비밀번호입니다.</h3>";
        msgg+= "<div style='font-size:130%'>";
        msgg+= "CODE : <strong>";
        msgg+= tPw+"</strong><div><br/> ";
        msgg+= "</div>";
        message.setText(msgg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress("blurb307@gmail.com","Blur"));//보내는 사람

        return message;
    }

    public void sendTempPassword(String userId)throws Exception {
        User user = userRepository.findByUserId(userId);
        String to = user.getEmail();
        MimeMessage message = createMessage(to);
        try{//예외처리
            emailSender.send(message);
            user.updatePassword(encoder.encode(tPw));
            userRepository.save(user);
            System.out.println("임시비번 발급");
        }catch(MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
    }

    public void updatePassword(String userId, String newPassword)throws Exception {
        User user = userRepository.findByUserId(userId);
        user.updatePassword(encoder.encode(newPassword));
        userRepository.save(user);
        System.out.println("비밀번호 변경");
    }
}
