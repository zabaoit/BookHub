import crypto from 'crypto';
import axios from 'axios'; // Nhớ: npm install axios

const createMoMoPaymentUrl = async (orderId, amount, orderInfo, returnUrl, notifyUrl, partnerCode, accessKey, secretKey, apiEndpoint) => {
    try {
        const requestId = orderId; // Có thể dùng luôn orderId làm requestId
        const requestType = "payWithATM";
        const extraData = ""; // Pass empty string if not used

        // 1. Tạo chuỗi Raw Signature (Bắt buộc đúng thứ tự này)
        // accessKey -> amount -> extraData -> ipnUrl -> orderId -> orderInfo -> partnerCode -> redirectUrl -> requestId -> requestType
        const rawSignature = 
            `accessKey=${accessKey}` +
            `&amount=${amount}` +
            `&extraData=${extraData}` +
            `&ipnUrl=${notifyUrl}` +
            `&orderId=${orderId}` +
            `&orderInfo=${orderInfo}` +
            `&partnerCode=${partnerCode}` +
            `&redirectUrl=${returnUrl}` +
            `&requestId=${requestId}` +
            `&requestType=${requestType}`;

        console.log("--------------------");
        console.log("MoMo Raw Signature:", rawSignature);

        // 2. Tạo Signature (HMAC SHA256)
        const signature = crypto.createHmac('sha256', secretKey)
            .update(rawSignature)
            .digest('hex');

        console.log("MoMo Signature:", signature);
        console.log("--------------------");

        // 3. Tạo Body request
        const requestBody = {
            partnerCode: partnerCode,
            accessKey: accessKey,
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: returnUrl,
            ipnUrl: notifyUrl,
            extraData: extraData,
            requestType: requestType,
            signature: signature,
            lang: 'vi'
        };

        // 4. Gửi sang MoMo
        const response = await axios.post(apiEndpoint, requestBody);
        
        return response.data;

    } catch (error) {
        // Log chi tiết lỗi từ MoMo trả về để debug
        if (error.response) {
            console.error("MoMo Error Response:", JSON.stringify(error.response.data, null, 2));
            throw new Error(`MoMo API error: ${JSON.stringify(error.response.data)}`);
        }
        throw error;
    }
};

const verifyMoMoCallback = (params, accessKey, secretKey) => {
    const {

        requestId,
        amount,
        orderId,
        orderInfo,
        orderType,
        transId,
        resultCode,
        message,
        payType,
        responseTime,
        extraData
    } = params;

    // --- SỬA LỖI Ở ĐÂY: Gán mặc định = "" nếu dữ liệu bị undefined ---
    const _extraData = extraData || ""; 
    const _message = message || "";
    // ----------------------------------------------------------------

    // Thứ tự fields bắt buộc của MoMo:
    // accessKey -> amount -> extraData -> message -> orderId -> orderInfo 
    // -> orderType -> partnerCode -> payType -> requestId -> responseTime 
    // -> resultCode -> transId
    
    const rawSignature = 
        `accessKey=${accessKey}` +
        `&amount=${amount}` +
        `&extraData=${_extraData}` +
        `&message=${_message}` +
        `&orderId=${orderId}` +
        `&orderInfo=${orderInfo}` +
        `&orderType=${orderType}` +
        `&partnerCode=${params.partnerCode}`+
        `&payType=${payType}` +
        `&requestId=${requestId}` +
        `&responseTime=${responseTime}` +
        `&resultCode=${resultCode}` +
        `&transId=${transId}`;

    console.log("--------------------");
    console.log("Verify Signature Debug:");
    console.log("Raw string to hash:", rawSignature);

    const signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');
    
    console.log("My Signature:", signature);
    console.log("MoMo Signature:", params.signature);
    console.log("--------------------");

    return signature === params.signature;
};

export { createMoMoPaymentUrl, verifyMoMoCallback };