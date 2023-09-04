package br.com.ifba.gotransit.infrastructure.util;

public class Session {
    
    private static int recoveryCode;
    private static String userName;
    private static Long userId;

    public static int getRecoveryCode() {
        return recoveryCode;
    }

    public static void setRecoveryCode(int recoveryCode) {
        Session.recoveryCode = recoveryCode;
    }

    public static String getUserName() {
        return userName;
    }

    public static void setUserName(String userName) {
        Session.userName = userName;
    }

    public static Long getUserId() {
        return userId;
    }

    public static void setUserId(Long userId) {
        Session.userId = userId;
    }

}
