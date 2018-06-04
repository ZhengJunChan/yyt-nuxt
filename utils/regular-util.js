/**
 * 封装正则验证接口
 * Created by 郑君婵 on 2017-05-24
 */

// 正则表达式
let reg = {
    // 密码
    password: /^\S{6,16}$/,
    // 手机
    mobile: /^1[23456789]\d{9}$/,
    // 邮箱
    email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
};

export default {
    /**
     * [isEmail 检查字段是否是密码]
     * @Author   郑君婵
     * @DateTime 2017-08-11
     * @param    {[string]}   password [密码]
     * @return   {Boolean}             [密码]
     */
    isPassword(password) {
        return password && reg.password.test(password);
    },
    /**
     * [isMobile 检查字段是否是手机号码]
     * @Author   郑君婵
     * @DateTime 2017-08-11
     * @param    {[string]}   mobile [手机号码]
     * @return   {Boolean}           [是否是手机号码]
     */
    isMobile(mobile) {
        return mobile && reg.mobile.test(mobile);
    },
    /**
     * [isEmail 检查字段是否是邮箱]
     * @Author   郑君婵
     * @DateTime 2017-08-11
     * @param    {[string]}   email [邮箱]
     * @return   {Boolean}          [是否是邮箱]
     */
    isEmail(email) {
        return email && reg.email.test(email);
    }
};
