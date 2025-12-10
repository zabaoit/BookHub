import crypto from 'crypto';
import qs from 'qs';
import moment from 'moment';

/**
 * Sắp xếp object theo thứ tự alphabet VÀ encode dữ liệu chuẩn VNPay
 * (Quan trọng: chuyển dấu cách thành dấu +)
 */
const sortObject = (obj) => {
    const sorted = {};
    const str = [];
    let key;
    
    // 1. Lấy danh sách key và encode key
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    
    // 2. Sắp xếp key
    str.sort();

    // 3. Duyệt qua từng key đã sort để gán giá trị và encode
    for (key = 0; key < str.length; key++) {
        // VNPay yêu cầu: Encode URI và thay thế %20 bằng dấu cộng (+)
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
};

/**
 * Tạo URL thanh toán VNPay
 */
const createVNPayPaymentUrl = (orderId, amount, orderInfo, ipAddr, returnUrl, vnpTmnCode, vnpHashSecret, vnpUrl) => {
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    
    const date = new Date();
    const createDate = moment(date).format('YYYYMMDDHHmmss');
    
    // Fix lỗi IPv6 trên localhost
    if (ipAddr && ipAddr.includes('::')) {
        ipAddr = '127.0.0.1';
    }

    let vnpParams = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        vnp_TmnCode: vnpTmnCode,
        vnp_Locale: 'vn',
        vnp_CurrCode: 'VND',
        vnp_TxnRef: orderId,
        vnp_OrderInfo: orderInfo,
        vnp_OrderType: 'other',
        vnp_Amount: amount * 100,
        vnp_ReturnUrl: returnUrl,
        vnp_IpAddr: ipAddr,
        vnp_CreateDate: createDate
    };

    // 1. Sắp xếp params và Encode ngay tại đây
    vnpParams = sortObject(vnpParams);

    // 2. Tạo chuỗi ký (encode: false vì hàm sortObject đã tự encode rồi)
    const signData = qs.stringify(vnpParams, { encode: false });
    
    // 3. Tạo secure hash
    const hmac = crypto.createHmac('sha512', vnpHashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    
    vnpParams['vnp_SecureHash'] = signed;

    // 4. Tạo URL thanh toán
    // Lưu ý: encode: false để tránh double encode
    const paymentUrl = vnpUrl + '?' + qs.stringify(vnpParams, { encode: false });

    return paymentUrl;
};

/**
 * Xác thực callback từ VNPay
 */
const verifyVNPayCallback = (vnpParams, vnpHashSecret) => {
    // Copy ra object mới để xử lý
    let params = { ...vnpParams };
    
    // Lấy secure hash từ params gửi về
    const secureHash = params['vnp_SecureHash'];
    
    // Xóa các field hash để tính toán lại
    delete params['vnp_SecureHash'];
    delete params['vnp_SecureHashType'];

    // Sắp xếp và Encode lại params theo chuẩn như lúc tạo
    const sortedParams = sortObject(params);
    
    // Tạo chuỗi ký
    const signData = qs.stringify(sortedParams, { encode: false });
    
    // Tạo secure hash để so sánh
    const hmac = crypto.createHmac('sha512', vnpHashSecret);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    console.log("Check Chữ ký:");
    console.log("VNPay gửi về:", secureHash);
    console.log("Server tính:", signed);

    return secureHash === signed;
};

export { createVNPayPaymentUrl, verifyVNPayCallback, sortObject };