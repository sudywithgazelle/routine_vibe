ROUTINE_VIBE — Study With Gazelle

این بسته، شروع پروژه مستقل routine_vibe است. نامی که داخل خود برنامه نمایش داده می‌شود Study With Gazelle است.

مهم:
- این پروژه به Supabase قدیمی متصل نیست؛ آدرس و کلید داخل index.html عمداً جای‌نگهدار هستند.
- هیچ تغییری در مخزن یا دیتابیس قبلی شما انجام نشده است.
- فایل supabase/setup.sql فقط برای پروژه Supabase جدید است. قبل از اجرای آن، مطمئن شوید در داشبورد پروژه جدید هستید.
- هرگز Service Role Key را در index.html قرار ندهید.

محتوای نسخه آغازین:
- رابط Pomodoro و تنظیمات زمان
- To-Do خصوصی با افزودن/ویرایش/حذف/یادداشت و پیشرفت
- ورود با ایمیل یا نام کاربری (ورود با نام کاربری به Edge Function نیاز دارد)
- شمارنده حضور زنده و تعداد اعضا (نیازمند Supabase/Realt ime)
- بخش‌هایی از Community و Leaderboard در این نسخه هنوز نمایشی/ناتمام هستند.

راه‌اندازی بعدی:
1) یک پروژه Supabase کاملاً جدید بسازید.
2) در SQL Editor همان پروژه جدید، فایل supabase/setup.sql را اجرا کنید.
3) از Project Settings > API، Project URL و Publishable key را بردارید.
4) در index.html فقط دو مقدار YOUR_NEW_SUPABASE_PROJECT_URL و YOUR_NEW_SUPABASE_PUBLISHABLE_KEY را با مقادیر پروژه جدید جایگزین کنید.
5) Edge Function مسیر supabase/functions/auth-username-login را با Supabase CLI در پروژه جدید deploy کنید و SUPABASE_SERVICE_ROLE_KEY را فقط به‌صورت secret سمت سرور تنظیم کنید.
6) سپس فایل‌ها را در ریشه مخزن GitHub به‌صورت Upload files بارگذاری کنید.

این بسته هنوز نسخه نهایی تمام امکانات درخواستی نیست؛ قبل از انتشار عمومی باید اتصال Supabase و بخش‌های ناتمام تکمیل و تست شوند.
