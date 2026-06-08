const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB متصل: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ خطأ في الاتصال بقاعدة البيانات: ${error.message}`);
    // لا ننهي العملية هنا لكي نسمح لـ Vercel بإكمال الـ build
    // سيظهر الخطأ في السجلات عند محاولة التشغيل الفعلي
    if (process.env.NODE_ENV === 'production') {
      console.warn('⚠️ تحذير: فشل الاتصال بقاعدة البيانات في بيئة الإنتاج. تأكد من إعداد MONGODB_URI');
    } else {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
