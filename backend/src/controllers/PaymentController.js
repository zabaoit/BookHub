import Order from "../models/OrderModel.js";
import Payment from "../models/PaymentModel.js";
import { createVNPayPaymentUrl, verifyVNPayCallback } from "../libs/vnpayHelper.js";
import { createMoMoPaymentUrl, verifyMoMoCallback } from "../libs/momoHelper.js";

/**
 * [POST] /api/payment/vnpay/create - Tạo URL thanh toán VNPay
 */
const createVNPayPayment = async (req, res) => {
    try {
        const { orderId } = req.body;
        const userId = req.user._id;

        // Validate
        if (!orderId) {
            return res.status(400).json({ message: 'Vui lòng cung cấp orderId!' });
        }

        // Kiểm tra order
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng!' });
        }

        // Kiểm tra quyền sở hữu
        if (order.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Bạn không có quyền thanh toán đơn hàng này!' });
        }

        // Kiểm tra trạng thái đơn hàng
        if (order.status === 'CANCELLED') {
            return res.status(400).json({ message: 'Đơn hàng đã bị hủy!' });
        }

        // Kiểm tra đã thanh toán chưa
        if (order.paymentStatus === 'PAID') {
            return res.status(400).json({ message: 'Đơn hàng đã được thanh toán!' });
        }

        // Lấy thông tin từ env
        const vnpTmnCode = process.env.VNP_TMN_CODE;
        const vnpHashSecret = process.env.VNP_HASH_SECRET;
        const vnpUrl = process.env.VNP_URL;
        const returnUrl = process.env.VNP_RETURN_URL;

        if (!vnpTmnCode || !vnpHashSecret || !vnpUrl || !returnUrl) {
            return res.status(500).json({ message: 'Chưa cấu hình VNPay! Vui lòng kiểm tra file .env' });
        }

        // Lấy IP address
        const ipAddr = req.headers['x-forwarded-for'] || 
                       req.connection.remoteAddress || 
                       req.socket.remoteAddress ||
                       req.ip ||
                       '127.0.0.1';

        // Tạo URL thanh toán
        const amount = order.totalAmount;
        const orderInfo = `Thanh toan don hang ${orderId}`;
        
        const paymentUrl = createVNPayPaymentUrl(
            orderId,
            amount,
            orderInfo,
            ipAddr,
            returnUrl,
            vnpTmnCode,
            vnpHashSecret,
            vnpUrl
        );

        // Lưu thông tin payment vào DB
        const existingPayment = await Payment.findOne({ order: orderId });
        if (existingPayment) {
            return res.status(400).json({ message: 'Đơn hàng đã có phương thức thanh toán!' });
        }

        await Payment.create({
            order: orderId,
            provider: 'VNPAY',
            amount: amount,
            status: 'UNPAID'
        });

        return res.status(200).json({
            message: 'Tạo URL thanh toán VNPay thành công!',
            paymentUrl
        });

    } catch (error) {
        console.error('Create VNPay payment error:', error);
        return res.status(500).json({ message: `Lỗi server: ${error.message}` });
    }
};

/**
 * [GET] /api/payment/vnpay/callback - Xử lý callback từ VNPay
 */
const vnpayCallback = async (req, res) => {
    try {
        
        const vnpParams = req.query; // VNPay trả về qua GET params
        console.log('VNPay callback params:', vnpParams);

        const vnpHashSecret = process.env.VNP_HASH_SECRET;

        // Kiểm tra chữ ký bằng hàm helper mới sửa
        const isValid = verifyVNPayCallback(vnpParams, vnpHashSecret);

        if (!isValid) {
            return res.status(400).json({ message: 'Chữ ký không hợp lệ!' });
        }

        const orderId = vnpParams.vnp_TxnRef;
        const responseCode = vnpParams.vnp_ResponseCode;
        const transactionNo = vnpParams.vnp_TransactionNo;

        // Tìm order
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng!' });
        }

        // Tìm payment
        const payment = await Payment.findOne({ order: orderId });

        if (responseCode === '00') {
            // Thanh toán thành công
            order.paymentStatus = 'PAID';
            await order.save();

            if (payment) {
                payment.status = 'PAID';
                payment.providerId = transactionNo;
                payment.paidAt = new Date();
                await payment.save();
            }

            // Redirect về frontend với success
            // const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
            // return res.redirect(`${frontendUrl}/payment/success?orderId=${orderId}`);

            return res.status(200).json({ message: 'Thanh toán thành công!', data: vnpParams });

        } else {
            // Thanh toán thất bại
            if (payment) {
                payment.status = 'FAILED';
                await payment.save();
            }

            // Redirect về frontend với failure
            // const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
            // return res.redirect(`${frontendUrl}/payment/failure?orderId=${orderId}`);
            return res.status(400).json({ 
                message: 'Thanh toán thất bại', 
                data: vnpParams 
            });
        }

    } catch (error) {
        console.error('VNPay callback error:', error);
        return res.status(500).json({ message: `Lỗi server: ${error.message}` });
    }
};

/**
 * [POST] /api/payment/momo/create - Tạo URL thanh toán MoMo
 */
const createMoMoPayment = async (req, res) => {
    try {
        const { orderId } = req.body;
        const userId = req.user._id;

        // Validate
        if (!orderId) {
            return res.status(400).json({ message: 'Vui lòng cung cấp orderId!' });
        }

        // Kiểm tra order
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng!' });
        }

        // Kiểm tra quyền sở hữu
        if (order.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Bạn không có quyền thanh toán đơn hàng này!' });
        }

        // Kiểm tra trạng thái đơn hàng
        if (order.status === 'CANCELLED') {
            return res.status(400).json({ message: 'Đơn hàng đã bị hủy!' });
        }

        // Kiểm tra đã thanh toán chưa
        if (order.paymentStatus === 'PAID') {
            return res.status(400).json({ message: 'Đơn hàng đã được thanh toán!' });
        }

        // Lấy thông tin từ env
        const partnerCode = process.env.MOMO_PARTNER_CODE;
        const accessKey = process.env.MOMO_ACCESS_KEY;
        const secretKey = process.env.MOMO_SECRET_KEY;
        const momoApiUrl = process.env.MOMO_API_URL;
        const returnUrl = process.env.MOMO_RETURN_URL;
        const notifyUrl = process.env.MOMO_NOTIFY_URL;

        if (!partnerCode || !accessKey || !secretKey || !momoApiUrl || !returnUrl || !notifyUrl) {
            return res.status(500).json({ message: 'Chưa cấu hình MoMo! Vui lòng kiểm tra file .env' });
        }

        // Tạo URL thanh toán
        const amount = order.totalAmount;
        const orderInfo = `Thanh toan don hang ${orderId}`;
        const momoOrderId = `${orderId}_${new Date().getTime()}`;
        const momoResponse = await createMoMoPaymentUrl(
            momoOrderId,
            amount,
            orderInfo,
            returnUrl,
            notifyUrl,
            partnerCode,
            accessKey,
            secretKey,
            momoApiUrl
        );

        if (momoResponse.resultCode !== 0) {
            return res.status(400).json({ 
                message: `Lỗi MoMo: ${momoResponse.message}`,
                resultCode: momoResponse.resultCode 
            });
        }

        // Lưu thông tin payment vào DB
        const existingPayment = await Payment.findOne({ order: orderId });
        if (existingPayment) {
            return res.status(400).json({ message: 'Đơn hàng đã có phương thức thanh toán!' });
        }

        await Payment.create({
            order: orderId,
            provider: 'MOMO',
            providerId: momoOrderId,
            amount: amount,
            status: 'UNPAID'
        });

        return res.status(200).json({
            message: 'Tạo URL thanh toán MoMo thành công!',
            paymentUrl: momoResponse.payUrl,
            deeplink: momoResponse.deeplink,
            qrCodeUrl: momoResponse.qrCodeUrl
        });

    } catch (error) {
        console.error('Create MoMo payment error:', error);
        return res.status(500).json({ message: `Lỗi server: ${error.message}` });
    }
};

/**
 * [POST] /api/payment/momo/callback - Xử lý callback từ MoMo (IPN)
 */
const momoCallback = async (req, res) => {
    try {
        const momoParams = req.body;
        const secretKey = process.env.MOMO_SECRET_KEY;
        const accessKey = process.env.MOMO_ACCESS_KEY;

        // Xác thực callback
        const isValid = verifyMoMoCallback(momoParams,accessKey, secretKey);

        if (!isValid) {
            return res.status(400).json({ message: 'Chữ ký không hợp lệ!' });
        }

        const rawOrderId = momoParams.orderId;
        // Cắt chuỗi để lấy ID gốc (Lấy phần trước dấu gạch dưới)
        const orderId = rawOrderId.split('_')[0];
        const resultCode = momoParams.resultCode;
        const transId = momoParams.transId;

        // Tìm order
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng!' });
        }

        // Tìm payment
        const payment = await Payment.findOne({ order: orderId });

        if (resultCode === 0) {
            // Thanh toán thành công
            order.paymentStatus = 'PAID';
            await order.save();

            if (payment) {
                payment.status = 'PAID';
                payment.providerId = transId;
                payment.paidAt = new Date();
                await payment.save();
            }

            return res.status(200).json({ message: 'Thanh toán thành công!' });

        } else {
            // Thanh toán thất bại
            if (payment) {
                payment.status = 'FAILED';
                await payment.save();
            }

            return res.status(200).json({ message: 'Thanh toán thất bại!' });
        }

    } catch (error) {
        console.error('MoMo callback error:', error);
        return res.status(500).json({ message: `Lỗi server: ${error.message}` });
    }
};

/**
 * [GET] /api/payment/momo/return - Xử lý return từ MoMo (redirect về frontend)
 */
const momoReturn = async (req, res) => {
    try {
        console.log('MoMo return query:', req.query);
        const momoParams = req.query;
        const secretKey = process.env.MOMO_SECRET_KEY;
        const accessKey = process.env.MOMO_ACCESS_KEY;
        // Xác thực callback
        const isValid = verifyMoMoCallback(momoParams,accessKey, secretKey);

        if (!isValid) {
            console.error('Invalid MoMo return signature');
            return res.status(400).json({ message: 'Chữ ký không hợp lệ!' });
        }
        
        const rawOrderId = momoParams.orderId;
        const orderId = rawOrderId.split('_')[0]; // Cắt bỏ đuôi timestamp
        const resultCode = momoParams.resultCode;
         const transId = momoParams.transId;

          // Tìm order
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng!' });
        }

        // Tìm payment
        const payment = await Payment.findOne({ order: orderId });
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

        if (resultCode == '0') { // Lưu ý: resultCode từ GET có thể là string '0'
            // Chỉ update nếu chưa PAID (tránh update lặp)
            if (order.paymentStatus !== 'PAID') {
                order.paymentStatus = 'PAID';
                await order.save();

                if (payment) {
                    payment.status = 'PAID';
                    payment.providerId = transId;
                    payment.paidAt = new Date();
                    await payment.save();
                }
            }
            // Thanh toán thành công
            // return res.redirect(`${frontendUrl}/payment/success?orderId=${orderId}`);
            return res.status(400).json({ 
         message: 'Thanh toán thành công!', 
            data: momoParams });
        } else {
            // Thanh toán thất bại
            if (payment) {
                payment.status = 'FAILED';
                await payment.save();
            }
            // return res.redirect(`${frontendUrl}/payment/failure?orderId=${orderId}`);
            return res.status(400).json({ 
                message: 'Thanh toán thất bại', 
                data: momoParams 
            });
        }


    } catch (error) {
        console.error('MoMo return error:', error);
        return res.status(500).json({ message: `Lỗi server: ${error.message}` });
    }
};

/**
 * [POST] /api/payment/cod - Tạo thanh toán COD (Ship COD)
 */
const createCODPayment = async (req, res) => {
    try {
        const { orderId } = req.body;
        const userId = req.user._id;

        // Validate
        if (!orderId) {
            return res.status(400).json({ message: 'Vui lòng cung cấp orderId!' });
        }

        // Kiểm tra order
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng!' });
        }

        // Kiểm tra quyền sở hữu
        if (order.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Bạn không có quyền thanh toán đơn hàng này!' });
        }

        // Kiểm tra trạng thái
        if (order.status === 'CANCELLED') {
            return res.status(400).json({ message: 'Đơn hàng đã bị hủy!' });
        }
        if (order.paymentStatus === 'PAID') {
            return res.status(400).json({ message: 'Đơn hàng đã được thanh toán!' });
        }
        // Lưu payment COD
        const existingPayment = await Payment.findOne({ order: orderId });
        if (existingPayment) {
            return res.status(400).json({ message: 'Đơn hàng đã có phương thức thanh toán!' });
        }

        await Payment.create({
            order: orderId,
            provider: 'COD',
            amount: order.totalAmount,
            status: 'UNPAID'
        });

        // Không cập nhật paymentStatus, chỉ khi nhận hàng mới chuyển sang PAID
        return res.status(200).json({
            message: 'Đặt hàng COD thành công! Vui lòng thanh toán khi nhận hàng.',
            data: {
                orderId: order._id,
                totalAmount: order.totalAmount,
                paymentMethod: 'COD'
            }
        });

    } catch (error) {
        console.error('Create COD payment error:', error);
        return res.status(500).json({ message: `Lỗi server: ${error.message}` });
    }
};

/**
 * [GET] /api/payment/:orderId - Lấy thông tin payment theo orderId
 */
const getPaymentByOrderId = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user._id;

        // Tìm order
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng!' });
        }

        // Kiểm tra quyền (user chỉ xem được payment của mình, admin xem được tất cả)
        if (order.user.toString() !== userId.toString() && req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Bạn không có quyền xem thông tin thanh toán này!' });
        }

        // Tìm payment
        const payment = await Payment.findOne({ order: orderId }).populate('order', 'totalAmount status paymentStatus');

        if (!payment) {
            return res.status(404).json({ message: 'Không tìm thấy thông tin thanh toán!' });
        }

        return res.status(200).json({
            message: 'Lấy thông tin thanh toán thành công!',
            data: payment
        });

    } catch (error) {
        console.error('Get payment error:', error);
        return res.status(500).json({ message: `Lỗi server: ${error.message}` });
    }
};

export {
    createVNPayPayment,
    vnpayCallback,
    createMoMoPayment,
    momoCallback,
    momoReturn,
    createCODPayment,
    getPaymentByOrderId
};
