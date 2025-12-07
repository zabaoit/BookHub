import Cart from "../models/CartModel.js";
import Book from "../models/BookModel.js";

const postCart = async (req, res) => {
    try {
        const userId = req.user._id;

        const {bookId, quantity} = req.body;
        // validate
        if(!bookId || !quantity) {
            return res.status(400).json({message: 'Sách không tồn tại trong giỏ hàng'});
        }
        const quantityInt = parseInt(quantity);
        if(quantityInt < 1){
            return res.status(400).json({message: 'Số lượng phải lớn hơn hoặc bằng 1'});
        }
        // kiem tra sach ton tai
        const book = await Book.findById(bookId);
        if(!book){
            return res.status(404).json({message: 'Không tìm thấy sách'});
        }

        // kiểm tra số lượng trong kho
        if(book.stock < +quantity){
            return res.status(400).json({message: `Số lượng trong kho không đủ! Còn lại: ${book.stock}, bạn muốn mua: ${quantity}`});
        }

        // tìm giỏ hàng của user
        let cart = await Cart.findOne({user: userId});
        // 
        if(!cart){
            cart = await Cart.create({
                user: userId,
                items: [],
            })
        }
        
        // kiểm tra sách đã có trong giỏ hàng chưa
        const existingItemIndex = cart.items.findIndex(
            item => item.book.toString() === bookId
        );
        
        // console.log(existingItemIndex);
        if(existingItemIndex > -1){
            // cập nhật số lượng
            const newQuantity = cart.items[existingItemIndex].quantity + quantityInt;
            if(book.stock < newQuantity){
                return res.status(400).json({message: `Số lượng trong kho không đủ! Còn lại: ${book.stock}, tổng cần: ${newQuantity}`});
            }
            cart.items[existingItemIndex].quantity = newQuantity;
        } else {
            // thêm sách vào giỏ hàng
            cart.items.push({
                book: bookId,
                quantity: quantityInt,
            })
        }
        // lưu giỏ hàng
        await cart.save();
        // populate thông tin sách
        await cart.populate({path: 'items.book', select: 'title price stock images slug'});
        // trả về kết quả
        return res.status(200).json({message: 'Thêm sách vào giỏ hàng thành công!', data: cart} );
    }
    catch (error) {
        return res.status(500).json({message: `Post cart error: ${error.message}`});
    }
}

const getCart = async (req, res) => {
    try {
        const userId = req.user._id;

        let cart = await Cart.findOne({user: userId}).populate({path: 'items.book', select: 'title price stock images slug'}); 

        if(!cart) {
          cart = await Cart.create({
            user: userId,
            items: [],
          })
        }

        const totalAmount = cart.items.reduce((total, item) => {
            console.log(item);
            return total + item.book.price * item.quantity;
        }, 0);
        // console.log(totalAmount);
        return res.status(200).json({message: 'Lấy giỏ hàng thành công!', data: {cart, totalAmount, totalItems: cart.items.length}});
    } catch (error) {
        return res.status(500).json({message: `Get cart error: ${error.message}`});
    }
}
// cap nhat so luong sach trong gio hang
const updateCartItem = async (req, res) => {
    try {
        console.log('updateCartItem');
        const userId = req.user._id;

        const {bookId, quantity} = req.body;
        // validate
        if(!bookId || !quantity) {
            return res.status(400).json({message: 'Sách không tồn tại trong giỏ hàng'});
        }
        const quantityInt = parseInt(quantity);
        // check quantity valid
        if(quantityInt < 0){
            return res.status(400).json({message: 'Số lượng phải lớn hơn hoặc bằng 1'});
        }

        const cart = await Cart.findOne({user: userId});
        if(!cart){
            return res.status(404).json({message: 'Giỏ hàng không tồn tại'});
        }

        if(quantityInt === 0){
            // xoa sach khoi gio hang
            cart.items = cart.items.filter(item => item.book.toString() !== bookId);
        } else {
            // kiem tra sach ton tai trong gio hang
            const book = await Book.findById(bookId);
            if(!book){
                return res.status(404).json({message: 'Không tìm thấy sách'});
            } 
            // kiem tra so luong trong kho
            if(book.stock < quantityInt){
                return res.status(400).json({message: `Số lượng trong kho không đủ! Còn lại: ${book.stock}, bạn muốn mua: ${quantity}`});
            }
            const existingItemIndex = cart.items.findIndex(
            item => item.book.toString() === bookId
            );
            if(existingItemIndex === -1){
                return res.status(404).json({message: 'Sách không tồn tại trong giỏ hàng'});
            }
            // cập nhật số lượng
            cart.items[existingItemIndex].quantity = quantityInt;
            }
        // lưu giỏ hàng
        await cart.save();
        // populate thông tin sách
        await cart.populate({path: 'items.book', select: 'title price stock images slug'});
        // trả về kết quả
        return res.status(200).json({message: 'Cập nhật giỏ hàng thành công!', data: cart} );   
    } catch (error) {
        return res.status(500).json({message: `Update cart error: ${error.message}`});
    }
}

const removeCartItem = async (req, res) => {
    try {
        const userId = req.user._id;
        const {bookId} = req.params;

        const cart =  await Cart.findOne({user: userId});
        if(!cart){
            return res.status(404).json({message: 'Giỏ hàng không tồn tại'});
        }
        // remove item from cart
        const initialLength = cart.items.length;
        cart.items = cart.items.filter(item => item.book.toString() !== bookId);
        
        if(initialLength === cart.items.length){
            return res.status(404).json({message: 'Sách không tồn tại trong giỏ hàng'});
        }
        
        await cart.save();
        // populate thông tin sách
        await cart.populate({path: 'items.book', select: 'title price stock images slug'});
        return res.status(200).json({message: 'Xoá sách khỏi giỏ hàng thành công!', data: cart} );
    } catch (error) {
        return res.status(500).json({message: `Remove cart error: ${error.message}`});
    }
}

const clearCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart =  await Cart.findOne({user: userId});
        if(!cart){
            return res.status(404).json({message: 'Giỏ hàng không tồn tại'});
        }
        // clear all items in the cart
        cart.items = [];
        await cart.save();
        return res.status(200).json({message: 'Xoá tất cả sách khỏi giỏ hàng thành công!', data: cart} );
    } catch (error) {
        return res.status(500).json({message: `Clear cart error: ${error.message}`});
    }
}
export { postCart, getCart, updateCartItem, removeCartItem, clearCart };