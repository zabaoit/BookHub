import { useEffect, useState } from "react";
import { toast } from "sonner";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SideNavBarProfile from "../../components/SideNavBarProfile";
import { userService } from "../../services/userService";

// Vietnamese Provinces
const PROVINCES = [
  "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu",
  "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước",
  "Bình Thuận", "Cà Mau", "Cần Thơ", "Cao Bằng", "Đà Nẵng",
  "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp",
  "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh",
  "Hải Dương", "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên",
  "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng",
  "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An",
  "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình",
  "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng",
  "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa",
  "Thừa Thiên Huế", "Tiền Giang", "TP. Hồ Chí Minh", "Trà Vinh",
  "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái",
];

// Example wards (generic — in a real app this would depend on the city selection)
const WARDS = [
  "Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5",
  "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10",
  "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15",
  "Phường Bến Nghé", "Phường Bến Thành", "Phường Cầu Kho", "Phường Cầu Ông Lãnh",
  "Phường Cô Giang", "Phường Nguyễn Cư Trinh", "Phường Nguyễn Thái Bình",
  "Phường Phạm Ngũ Lão", "Phường Tân Định", "Phường Đa Kao",
  "Xã An Phú", "Xã Bình An", "Xã Bình Trưng", "Xã Long Phước",
  "Thị trấn Bến Lức", "Thị trấn Cần Giuộc", "Thị trấn Đức Hòa",
];

interface Address {
  _id: string;
  fullName: string;
  phone: string;
  city: string;
  ward: string;
  specificAddress: string;
  isDefault: boolean;
}

const emptyForm = { fullName: "", phone: "", city: "", ward: "", specificAddress: "" };

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (typeof error === "object" && error !== null) {
    const err = error as { response?: { data?: { message?: unknown } } };
    const apiMessage = err.response?.data?.message;
    if (typeof apiMessage === "string" && apiMessage.trim() !== "") {
      return apiMessage;
    }
  }

  if (error instanceof Error && error.message.trim() !== "") {
    return error.message;
  }

  return fallback;
};

const AddressManagement = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => { fetchAddresses(); }, []);

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (addr: Address) => {
    setForm({
      fullName: addr.fullName,
      phone: addr.phone,
      city: addr.city,
      ward: addr.ward,
      specificAddress: addr.specificAddress,
    });
    setEditingId(addr._id);
    setShowForm(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.fullName.trim() || !form.phone.trim() || !form.city || !form.specificAddress.trim()) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }
    setIsSaving(true);
    try {
      if (editingId) {
        await userService.updateAddress(editingId, {
          fullName: form.fullName,
          phone: form.phone,
          city: form.city,
          ward: form.ward,
          specificAddress: form.specificAddress,
        });
        toast.success("Cập nhật địa chỉ thành công!");
      } else {
        await userService.createAddress({
          fullName: form.fullName,
          phone: form.phone,
          city: form.city,
          ward: form.ward,
          specificAddress: form.specificAddress,
        });
        toast.success("Thêm địa chỉ thành công!");
      }
      setShowForm(false);
      await fetchAddresses();
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Thao tác thất bại."));
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
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Xóa thất bại."));
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      await userService.setDefaultAddress(id);
      toast.success("Đã đặt làm địa chỉ mặc định!");
      await fetchAddresses();
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Thao tác thất bại."));
    }
  };

  const inputClass =
    "form-input flex w-full rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-white dark:bg-zinc-800 h-11 placeholder:text-subtle-light dark:placeholder:text-subtle-dark px-4 text-sm";
  const selectClass =
    "flex w-full rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-white dark:bg-zinc-800 h-11 px-4 text-sm cursor-pointer appearance-none";

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
                    <p className="text-subtle-light dark:text-subtle-dark mt-2 max-w-sm">Thêm địa chỉ giao hàng để thanh toán nhanh hơn!</p>
                  </div>
                ) : (
                  addresses.map(addr => (
                    <div key={addr._id} className="flex flex-col gap-2 bg-card-light dark:bg-card-dark p-4 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
                      <div className="flex items-start gap-4">
                        <div className={`flex items-center justify-center rounded-lg shrink-0 size-12 ${addr.isDefault ? "text-primary bg-primary/20" : "text-text-light dark:text-text-dark bg-black/5 dark:bg-white/5"}`}>
                          <span className="material-symbols-outlined">{addr.isDefault ? "home" : "location_on"}</span>
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-text-light dark:text-text-dark text-base font-bold">{addr.fullName}</p>
                            {addr.isDefault && (
                              <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/40 px-2.5 py-0.5 text-xs font-semibold text-green-700 dark:text-green-400">
                                Mặc định
                              </span>
                            )}
                          </div>
                          <p className="text-subtle-light dark:text-subtle-dark text-sm">{addr.phone}</p>
                          <p className="text-subtle-light dark:text-subtle-dark text-sm">
                            {[addr.specificAddress, addr.ward, addr.city].filter(Boolean).join(", ")}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end pt-2 gap-2 flex-wrap">
                        {!addr.isDefault && (
                          <button onClick={() => handleSetDefault(addr._id)} className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-md h-9 px-3 text-primary text-sm font-semibold hover:bg-primary/10 transition-colors">
                            Đặt mặc định
                          </button>
                        )}
                        <button onClick={() => openEditForm(addr)} className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-md h-9 px-3 bg-black/5 dark:bg-white/10 text-text-light dark:text-text-dark text-sm font-semibold hover:bg-black/10 dark:hover:bg-white/20 transition-colors">
                          Chỉnh sửa
                        </button>
                        <button onClick={() => handleDelete(addr._id)} className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-md h-9 px-3 text-red-500 text-sm font-semibold hover:bg-red-500/10 transition-colors">
                          Xóa
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Add New Address Button */}
              <button
                onClick={openAddForm}
                className="flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal shadow-sm hover:bg-primary/90 transition-colors"
              >
                <span className="material-symbols-outlined">add</span>
                <span className="truncate">Thêm địa chỉ mới</span>
              </button>

            </div>
          </main>
        </div>
      </div>

      {/* Modal Popup */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}
        >
          <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 relative animate-in fade-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined text-xl text-subtle-light dark:text-subtle-dark">close</span>
            </button>

            <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-6">
              {editingId ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-text-light dark:text-text-dark">Full Name</label>
                <input name="fullName" className={inputClass} placeholder="Jane Doe" value={form.fullName} onChange={handleChange} />
              </div>
              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-text-light dark:text-text-dark">Phone Number</label>
                <input name="phone" className={inputClass} placeholder="0901 234 567" value={form.phone} onChange={handleChange} />
              </div>
              {/* Province / City */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-text-light dark:text-text-dark">Province / City</label>
                <select name="city" className={selectClass} value={form.city} onChange={handleChange}>
                  <option value="">Add a new Province / City</option>
                  {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              {/* Ward / Commune */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-text-light dark:text-text-dark">Ward / Commune</label>
                <select name="ward" className={selectClass} value={form.ward} onChange={handleChange}>
                  <option value="">Add a new Ward / Commune</option>
                  {WARDS.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
              {/* Specific Address */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-sm font-semibold text-text-light dark:text-text-dark">Specific Address</label>
                <input name="specificAddress" className={inputClass} placeholder="123 Storybook Street" value={form.specificAddress} onChange={handleChange} />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={handleSubmit} disabled={isSaving} className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors disabled:opacity-60">
                {isSaving ? "Đang lưu..." : editingId ? "Lưu thay đổi" : "Thêm địa chỉ"}
              </button>
              <button onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-lg text-sm font-semibold border border-border-light dark:border-border-dark text-text-light dark:text-text-dark hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                Huỷ
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AddressManagement;
