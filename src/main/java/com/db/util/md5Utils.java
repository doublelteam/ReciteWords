package com.db.util;

import org.springframework.util.DigestUtils;

public class md5Utils {

    public static void main(String[] args){
       String a="123456";
       System.out.println(encode(a));
    }

    public static String encode(String s) {
        if (s == null) {
            return null;
        }
        return DigestUtils.md5DigestAsHex(s.getBytes());
    }
}
