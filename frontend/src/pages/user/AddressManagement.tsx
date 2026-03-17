import { useEffect, useState } from "react";
import { toast } from "sonner";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SideNavBarProfile from "../../components/SideNavBarProfile";
import { userService } from "../../services/userService";

interface Address {
  _id: string;
  fullName: string;
  phone: string;
  address: string;
  isDefault: boolean;
}

const emptyForm = { fullName: "", phone: "", address: "" };

const AddressManagement = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state for add/edit
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [isSaving, setIsSaving] = useState(false);

  const fetchAddresses = async () => {
    try {
      const res = await userService.getAddresses();
      setAddresses(res.data);
    } catch {
      toast.error("Không thể tải danh sách địa chỉ.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (addr: Address) => {
    setForm({ fullName: addr.fullName, phone: addr.phone, address: addr.address });
    setEditingId(addr._id);
    setShowForm(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.fullName.trim() || !form.phone.trim() || !form.address.trim()) {
      toast.error("Vui lòng điền đầy đủ thông tin địa chỉ!");
      return;
    }
    setIsSaving(true);
    try {
      if (editingId) {
        await userService.updateAddress(editingId, form);
        toast.success("Cập nhật địa chỉ thành công!");
      } else {
        await userService.createAddress({ ...form });
        toast.success("Thêm địa chỉ thành công!");
      }
      setShowForm(false);
      await fetchAddresses();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Thao tác thất bại. Vui lòng thử lại.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc muốn xóa địa chỉ này không?")) return;
    try {
      await userService.deleteAddress(id);
      toast.success("Đã xóa địa chỉ!");
      await fetchAddresses();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Xóa thất bại.");
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      await userService.setDefaultAddress(id);
      toast.success("Đã đặt làm địa chỉ mặc định!");
      await fetchAddresses();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Thao tác thất bại.");
    }
  };

  const inputClass =
    "form-input flex w-full rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark h-11 placeholder:text-subtle-light dark:placeholder:text-subtle-dark px-4 py-2 text-sm";

  return (
    <div>
      <Header />
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="flex-grow w-full max-w-screen-2xl mx-auto flex">
          <SideNavBarProfile />
          <main className="flex-1 p-6 bg-background-light dark:bg-background-dark">
            <div className="flex flex-col gap-6">
              <header className="flex flex-wrap justify-center md:justify-between items-center gap-4">
                <h1 className="text-text-light dark:text-text-dark text-4xl font-black font-heading leading-tight tracking-tight">
                  Address Management
                </h1>
              </header>

              {/* Address List */}
              <div className="flex flex-col gap-4">
                {loading ? (
                  <div className="flex justify-center py-10">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                  </div>
                ) : addresses.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center p-10 border-2 border-dashed border-border-light dark:border-border-dark rounded-lg">
                    <span className="material-symbols-outlined text-6xl text-subtle-light dark:text-subtle-dark mb-4">location_off</span>
                    <h3 className="text-xl font-bold font-heading text-text-light dark:text-text-dark">Chưa có địa chỉ</h3>
                    <p className="text-subtle-light dark:text-subtle-dark mt-2 mb-0 max-w-sm">Thêm địa chỉ giao hàng để thanh toán nhanh hơn!</p>
                  </div>
                ) : (
                  addresses.map((addr) => (
                    <div key={addr._id} className="flex flex-col gap-2 bg-card-light dark:bg-card-dark p-4 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
                      <div className="flex gap-4 justify-between">
                        <div className="flex items-start gap-4">
                          <div className={`flex items-center justify-center rounded-lg shrink-0 size-12 ${addr.isDefault ? "text-primary bg-primary/20" : "text-text-light dark:text-text-dark bg-black/5 dark:bg-white/5"}`}>
                            <span className="material-symbols-outlined">{addr.isDefault ? "home" : "location_on"}</span>
                          </div>
                          <div className="flex flex-1 flex-col justify-center">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-text-light dark:text-text-dark text-base font-bold leading-normal">
                                {addr.fullName}
                              </p>
                              {addr.isDefault && (
                                <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/40 px-2.5 py-0.5 text-xs font-semibold text-green-700 dark:text-green-400">
                                  Mặc định
                                </span>
                              )}
                            </div>
                            <p className="text-subtle-light dark:text-subtle-dark text-sm">{addr.phone}</p>
                            <p className="text-subtle-light dark:text-subtle-dark text-sm">{addr.address}</p>
                          </div>
                        </div>
                      </div>
                      {/* Button Group */}
                      <div className="flex justify-end pt-2 gap-2 flex-wrap">
                        {!addr.isDefault && (
                          <button
                            onClick={() => handleSetDefault(addr._id)}
                            className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-md h-9 px-3 text-primary text-sm font-semibold hover:bg-primary/10 transition-colors"
                          >
                            Đặt mặc định
                          </button>
                        )}
                        <button
                          onClick={() => openEditForm(addr)}
                          className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-md h-9 px-3 bg-black/5 dark:bg-white/10 text-text-light dark:text-text-dark text-sm font-semibold hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
                        >
                          Chỉnh sửa
                        </button>
                        <button
                          onClick={() => handleDelete(addr._id)}
                          className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-md h-9 px-3 text-red-500 text-sm font-semibold hover:bg-red-500/10 transition-colors"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Add/Edit Form */}
              {showForm && (
                <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
                  <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-4">
                    {editingId ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-text-light dark:text-text-dark">Họ và tên *</span>
                      <input name="fullName" className={inputClass} placeholder="Nguyễn Văn A" value={form.fullName} onChange={handleFormChange} />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-text-light dark:text-text-dark">Số điện thoại *</span>
                      <input name="phone" className={inputClass} placeholder="0901234567" value={form.phone} onChange={handleFormChange} />
                    </label>
                    <label className="flex flex-col gap-1 md:col-span-2">
                      <span className="text-sm font-medium text-text-light dark:text-text-dark">Địa chỉ đầy đủ *</span>
                      <input name="address" className={inputClass} placeholder="Số nhà, tên đường, phường, quận, tỉnh/thành phố" value={form.address} onChange={handleFormChange} />
                    </label>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={handleSubmit}
                      disabled={isSaving}
                      className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors disabled:opacity-60"
                    >
                      {isSaving ? "Đang lưu..." : editingId ? "Lưu thay đổi" : "Thêm địa chỉ"}
                    </button>
                    <button
                      onClick={() => setShowForm(false)}
                      className="px-5 py-2.5 rounded-lg text-sm font-semibold border border-border-light dark:border-border-dark text-text-light dark:text-text-dark hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      Huỷ
                    </button>
                  </div>
                </div>
              )}

              {/* Add New Address Button */}
              {!showForm && (
                <div>
                  <button
                    onClick={openAddForm}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal shadow-sm hover:bg-primary/90 transition-colors"
                  >
                    <span className="material-symbols-outlined">add</span>
                    <span className="truncate">Thêm địa chỉ mới</span>
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddressManagement;
