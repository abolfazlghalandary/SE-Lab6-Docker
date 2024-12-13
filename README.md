# SE-Lab6-Docker
پاسخ به سوالات : 
سوال یک : مفهوم stateless در کامپیوتر به ویژه در طراحی سیستم هایی با معماری rest، به این معناست که هر درخواست از سمت کلاینت به سرور باید مستقل باشد و اطلاعات و وضعیت های درخواست های قبلی در جایی ذخیره نشود. یعنی هیچ وضعیت ماندگاری برای کلاینت حفظ نمی شود و تمام اطلاعات لازم برای پردازش هر درخواست باید به‌صورت کامل در همان درخواست ارسال شود. در این آزمایش، عملیات crud از حالت stateless برخوردار می باشد. به عبارتی، هر درخواست put یا update یا create یا read شامل تمام اطلاعاتی است که سرور برای پردازش نیاز دارد. برای مثال در تابع updateUser پارامتر های age و name و id و email را داریم که به طور کامل از سمت کلاینت به سرور درخواست می شود.







برای انجام پروژه ابتدا دو سرویس interface و backend را ایجاد کردیم که از طریق API call بتوانیم با آنها در ارتباط باشیم با این تفاوت که interface درخواست را برای backend ارسال می‌کند و backend با دیتابیس تعامل می‌کند. (تصویر متد GET در زیر آورده شده):
![image](https://github.com/user-attachments/assets/17a7eb2f-0171-4ae1-891c-89978070c64c)

![image](https://github.com/user-attachments/assets/1b0b09ec-e189-4a69-8fd4-1a287e2e8ef6)

برای بالا آوردن سرویس‌ها با داکر برای هر کدام داکر فایل ساده‌ای نوشتیم و در کنار یک کانتینر شامل postgres در یک docker compose گذاشتیم:
![image](https://github.com/user-attachments/assets/1c976b96-526d-4851-957f-4b396f1111e4)

این docker compose سرویس‌ها را بالا آورده (البته پس از اطمینان از بالا آمدن postgres که به مشکل connection نخوریم) و پورت‌ها را به گونه‌ای مپ می‌کند که به مشکلی نخوریم.
پس از بالا آرودن کانتینرها می‌توانیم با درخواست دادن به پورت 4000 لوکال اعمال crud را انجام دهیم. این درخواست وارد سرویس interface می‌شود که درخواست را برای سرویس backend می‌فرستد که در انتها درخواست را برای دیتابیس فرستاده و پاسخ مناشب را بر می‌گرداند.

![image](https://github.com/user-attachments/assets/b0598ca3-0a3c-4472-b7f0-dd8e2dd25f4a)

سرویس‌ها پس از دادن یک درخواست POST:
postman:

![image](https://github.com/user-attachments/assets/7e4176b5-5aa7-4cfe-aae6-8e87f90309d0)

interface:

![Screenshot from 2024-12-13 21-28-17](https://github.com/user-attachments/assets/e2f3f191-9f15-4147-9787-e2613c846e71)

backend:

![Screenshot from 2024-12-13 21-29-57](https://github.com/user-attachments/assets/41ebc2c7-53f7-4168-85f9-63835771a93b)


و گرفتن موجودیت اینزرت شده در ادامه:

![image](https://github.com/user-attachments/assets/bd0aa211-ebe7-4244-9213-cf4b47a48f73)

