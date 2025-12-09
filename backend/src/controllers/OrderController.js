
import Book from "../models/BookModel.js";
import Cart from "../models/CartModel.js";
import Order from "../models/OrderModel.js";

const postOrder = async (req, res) => {
    try {
        const userId = req.user._id;

         const { shippingAddress, buyerName, buyerEmail, buyerPhone, note } = req.body;
        // validate
        if(!shippingAddress || !buyerName || !buyerPhone) {
            return res.status(400).json({message: 'Vui lòng điền đầy đủ thông tin'});
        }

        const cart = await Cart.findOne({user: userId}).populate('items.book');
        if(!cart || cart.items.length === 0){
            return res.status(400).json({message: 'Giỏ hàng của bạn đang trống'});
        }

        // tính tổng tiền và kiểm tra số lượng
        let totalAmount = 0;
        const orderItems = [];

        for(const item of cart.items){
            const book = await Book.findById(item.book._id);
            if(!book){
                return res.status(404).json({message: `Sách ${item.book.title} không tồn tại`});
            }
            
            if(book.stock < item.quantity){
                return res.status(400).json({ 
                    message: `Sách "${book.title}" không đủ hàng! Còn lại: ${book.stock}` 
                });
            }
            // Tinh tổng tiền
            totalAmount += book.price * item.quantity;
            // Chuẩn bị dữ liệu cho order items
            orderItems.push({
                book: book._id,
                quantity: item.quantity,
                priceAtPurchase: book.price,
            })
        }         
        
        // Tạo đơn hàng
        const newOrder = await Order.create({
            user: userId,
            items: orderItems,
            totalAmount,
            shippingAddress,
            buyerName,
            buyerEmail: buyerEmail || req.user.email,
            buyerPhone,
            note,
            status: "PENDING",
            paymentStatus: "UNPAID",
        })

        // Giảm số lượng trong kho
        for(const item of cart.items){
            await Book.findByIdAndUpdate(item.book._id, {
                $inc: {stock: -item.quantity}
            })
        };
        // Xoá giỏ hàng
        cart.items = [];
        await cart.save();

        await newOrder.populate({path: 'items.book', select: 'title price images slug'});

        return res.status(201).json({message: 'Đặt hàng thành công!', data: newOrder});  

    } catch (error) {
        return res.status(500).json({message: `Create order error: ${error.message}`});
    }
}

const getUserOrders = async (req, res) => {
    try {
        const userId = req.user._id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;   
        const skip = (page - 1) * limit;

        // Lọc đơn hàng theo người dùng và trạng thái (nếu có)
        const filter = {user: userId};
        if (req.query.status) {
            filter.status = req.query.status;
        }
        // Lấy danh sách đơn hàng với phân trang
        const orders = await Order.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate({path: 'items.book', select: 'title price images slug'});

        
        const total = await Order.countDocuments(filter);
        // console.log('total orders:', total);

        const totalPages = Math.ceil(total / limit) || 1;

        return res.status(200).json({message: 'Lấy đơn hàng thành công!', data: orders, total, page, limit, totalPages});
    } catch (error) {
        return res.status(500).json({message: `Get user orders error: ${error.message}`});

    }
}

const getOrderById = async (req, res) => {
    try {
        // Lấy thông tin người dùng và ID đơn hàng từ request
        const userId = req.user._id;
        const {id} = req.params;
        // Tìm đơn hàng theo ID
        const order = await Order.findById(id).populate({path: 'items.book', select: 'title price images slug'}).populate({path: 'user', select: 'name email'});
        
        if(!order) {
            return res.status(404).json({message: 'Không tìm thấy đơn hàng'});
        }
        // kiem tra quyen truy cap
        if(order.user._id.toString() !== userId.toString() && req.user.role !== 'ADMIN'){
            return res.status(403).json({message: 'Bạn không có quyền truy cập đơn hàng này'});
        }
       // console.log(req.user.role);
        // Trả về kết quả
        return res.status(200).json({message: 'Lấy thông tin đơn hàng thành công!', data: order});
    } catch (error) {
        return res.status(500).json({message: `Get order by id error: ${error.message}`});

    }
}

const cancelOrderById =  async (req, res) => {
    try {
        const userId  = req.user._id;
        const {id} = req.params;
        const {cancelReason} = req.body;
        // console.log(cancelReason);
        // tim don hang
        const order = await Order.findById(id);
        if(!order){
            return res.status(404).json({message: 'Không tìm thấy đơn hàng'});
        }

        // kiem tra quyen truy cap
        if(order.user._id.toString() !== userId.toString() && req.user.role !== 'ADMIN'){
            return res.status(403).json({message: 'Bạn không có quyền truy cập đơn hàng này'});
        }
        // chỉ hủy đơn hàng đang chờ xử lý
        if(order.status !== 'PENDING'){
            return res.status(400).json({message: 'Chỉ có thể hủy đơn hàng ở trạng thái Đang chờ xử lý'});
        }
        // cập nhật trạng thái đơn hàng
        order.status = 'CANCELLED';
        order.cancelReason = cancelReason || 'Người dùng hủy đơn hàng';
        // console.log('Cancel reason:', order.cancelReason);
        await order.save();

        // trả lại số lượng trong kho
        for(const item of order.items){
            await Book.findByIdAndUpdate(item.book, {
                $inc: {stock: item.quantity}
            });
        }
        
        return res.status(200).json({message: 'Hủy đơn hàng thành công!', data: order});
    } catch (error) {
         return res.status(500).json({message: `Cancel order error: ${error.message}`});
    }
}

const getALlOrders = async (req, res) => {
    try {
        const pasge = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (pasge - 1) * limit;
        // Loc theo trang thai
        const filter = {};
        if(req.query.status){
            filter.status = req.query.status;
        }
        // lọc theo trạng thái thanh toán
        if(req.query.paymentStatus){
            filter.paymentStatus = req.query.paymentStatus;
        }
        // Lấy danh sách đơn hàng
        const order = await Order.find(filter).populate({path: 'items.book', select: 'title price images slug'}).populate({path: 'user', select: 'name email'}).sort({createdAt: -1}).skip(skip).limit(limit);

        const total = await Order.countDocuments(filter);
        const totalPages = Math.ceil(total / limit) || 1;
        // Trả về kết quả
        return res.status(200).json({message: "Lấy danh sách đơn hàng thành công!", data: order, total, pasge, limit, totalPages});
    } catch (error) {
         return res.status(500).json({message: `Get all orders error: ${error.message}`});

    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const {id} = req.params;
        const {status, paymentStatus} = req.body;
        
        const order = await Order.findById(id);

        if(!order){
            return res.status(404).json({message: 'Không tìm thấy đơn hàng'});
        }
        // Cập nhật trạng thái đơn hàng
        if(status){
            const validStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'COMPLETED', 'CANCELLED'];
            if(!validStatuses.includes(status)){
                return res.status(400).json({message: 'Trạng thái đơn hàng không hợp lệ'});
            }
            // hoan tra so luong neu huy don
            if(order.status !== 'CANCELLED' && status === 'CANCELLED'){
                // trả lại số lượng trong kho
                for(const item of order.items){
                    await Book.findByIdAndUpdate(
                        item.book, {
                            $inc: {stock: item.quantity}
                        }
                    )
                }
            }

            order.status = status;
            // cap nhat ngay giao hang neu da giao
            if(status === 'COMPLETED'){
                order.deliveredAt = new Date();
            } 
        }
        // cap nhat trang thai thanh toan
        if(paymentStatus){
            const validPaymentStatuses = ['UNPAID', 'PAID', 'REFUNDED'];
            if(!validPaymentStatuses.includes(paymentStatus)){
                return res.status(400).json({message: 'Trạng thái thanh toán không hợp lệ'});
            }
            order.paymentStatus = paymentStatus;

            if(paymentStatus === 'PAID'){
                order.paidAt = new Date();
            }
        }

        // luu don hang
        await order.save();
        await order.populate('user', 'username email');
        await order.populate('items.book', 'title price');

        return  res.status(200).json({message: 'Cập nhật trạng thái đơn hàng thành công!', data: order});

    } catch (error) {
        return res.status(500).json({message: `Update order status error: ${error.message}`});
    }
}
export {postOrder, getUserOrders, getOrderById, cancelOrderById, getALlOrders, updateOrderStatus};