import { useEffect, useState } from "react";
import { toast } from "sonner";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import useAuthStore from "../../store/useAuthStore";
import SideNavBarProfile from "../../components/SideNavBarProfile";
import { userService } from "../../services/userService";

const ProfilePage = () => {
  const { user } = useAuthStore();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    birthday: "",
    gender: "",
  });

  // Populate form with user data from store on mount + on remote fetch
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await userService.getProfile();
        const data = res.data;
        setForm({
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || "",
          birthday: data.birthday || "",
          gender: data.gender || "",
        });
      } catch {
        // Fallback to store data
        setForm({
          username: user?.username || "",
          email: user?.email || "",
          phone: "",
          birthday: "",
          gender: "",
        });
      }
    };
    loadProfile();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!form.username.trim()) {
      toast.error("Tên người dùng không được để trống!");
      return;
    }
    setIsSaving(true);
    try {
      const res = await userService.updateProfile({
        username: form.username,
        phone: form.phone,
        birthday: form.birthday,
        gender: form.gender,
      });
      // Update global auth store so the name shows in header, etc.
      if (user) {
        useAuthStore.setState({ user: { ...user, username: res.data.username } });
      }
      toast.success("Cập nhật thông tin thành công!");
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Cập nhật thất bại. Vui lòng thử lại.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to fetched values
    setForm(f => ({ ...f }));
  };

  const inputClass =
    "form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark h-12 placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark px-4 py-2 text-base font-normal leading-normal";
  const readonlyClass = inputClass + " opacity-70 cursor-not-allowed";

  return (
    <div>
      <Header />
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="flex-grow w-full max-w-screen-2xl mx-auto flex">
          {/* <!-- SideNavBar --> */}
          <SideNavBarProfile />
          {/* <!-- Main Content --> */}
          <main className="flex-1 p-6 bg-background">
            <div className="flex flex-col gap-6">
              {/* <!-- PageHeading --> */}
              <header className="flex flex-wrap justify-center md:justify-between items-center gap-4">
                <h1 className="text-foreground text-4xl font-black font-heading leading-tight tracking-tight">
                  Profile Dashboard
                </h1>
              </header>
              {/* <!-- Personal Information Card --> */}
              <section className="bg-card p-6 rounded-lg shadow-sm border border-border">
                <h2 className="text-card-foreground text-2xl font-bold font-heading leading-tight tracking-tight pb-6 flex justify-center md:justify-between">
                  PERSONAL INFORMATION
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <label className="flex flex-col">
                    <p className="text-text-light dark:text-text-dark text-sm font-medium leading-normal pb-2">
                      Full Name
                    </p>
                    <input
                      name="username"
                      className={isEditing ? inputClass : readonlyClass}
                      readOnly={!isEditing}
                      value={form.username}
                      onChange={handleChange}
                      placeholder="Nhập họ và tên"
                    />
                  </label>
                  {/* Email (always readonly - can't change email) */}
                  <label className="flex flex-col">
                    <p className="text-text-light dark:text-text-dark text-sm font-medium leading-normal pb-2">
                      Email
                    </p>
                    <input
                      name="email"
                      className={readonlyClass}
                      readOnly
                      value={form.email}
                    />
                  </label>
                  {/* Phone */}
                  <label className="flex flex-col">
                    <p className="text-text-light dark:text-text-dark text-sm font-medium leading-normal pb-2">
                      Phone
                    </p>
                    <input
                      name="phone"
                      className={isEditing ? inputClass : readonlyClass}
                      readOnly={!isEditing}
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Nhập số điện thoại"
                    />
                  </label>
                  {/* Birthday */}
                  <label className="flex flex-col">
                    <p className="text-text-light dark:text-text-dark text-sm font-medium leading-normal pb-2">
                      Birthday
                    </p>
                    <input
                      name="birthday"
                      type="date"
                      className={isEditing ? inputClass : readonlyClass}
                      readOnly={!isEditing}
                      value={form.birthday}
                      onChange={handleChange}
                    />
                  </label>
                  {/* Gender */}
                  <label className="flex flex-col">
                    <p className="text-text-light dark:text-text-dark text-sm font-medium leading-normal pb-2">
                      Gender
                    </p>
                    <select
                      name="gender"
                      className={isEditing ? inputClass : readonlyClass}
                      disabled={!isEditing}
                      value={form.gender}
                      onChange={handleChange}
                    >
                      <option value="">-- Chọn giới tính --</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Prefer not to say</option>
                    </select>
                  </label>
                </div>

                <div className="flex items-center gap-4 pt-6 mt-6 border-t border-border-light dark:border-border-dark">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-5 py-2.5 rounded-lg text-sm font-semibold text-primary border border-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-colors disabled:opacity-60"
                      >
                        {isSaving ? "Đang lưu..." : "Save Changes"}
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-5 py-2.5 rounded-lg text-sm font-semibold text-text-light dark:text-text-dark border border-border-light dark:border-border-dark hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
