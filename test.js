const mongoose = require('mongoose')
const Post = require('./models/Post')

mongoose.connect('mongodb://127.0.0.1:27017/nodeblog_test')
    .then(() => console.log('Connected!'));

/*
/// 1. Create Yöntemi
Post.create({
    title: 'Birinci Post Başlığım.',
    content: 'Birinci post içeriği, lorem ipsum.'
}).then(post => {
    console.log('Veri başarıyla oluşturuldu:', post);
})
    .catch(err => {
        console.error(err);
    });




/// 2. Create Yöntemi
(async () => {
    try {
        const document = await Post.create({
            title: 'İkinci Post Başlığım.',
            content: 'İkinci post içeriği, Lorem Ipsum.'
        });
        console.log('Veri başarıyla oluşturuldu:', document);
    } catch (error) {
        console.error('Hata oluştu:', error);
    }
})();



/// 1. Read Yöntemi
Post.find({
    title: 'İkinci Post Başlığım.'
}).then(post => {
    console.log(post);
}).catch(err => {
    console.error("Hata:", err)   // HATA YAZDIRMA İŞLEMLERİNDE KULLANIL
})


    /// 2. Read Yöntemi
    (async () => {
        try {
            const document = await Post.find({
                title: 'İkinci Post Başlığım.'
            });
            console.log('Veri başarıyla bulundu:', document);
        } catch (error) {
            console.error('Hata oluştu:', error);
        }
    })();



    /// 3. Read (All) Yöntemi
    (async () => {
        try {
            const document = await Post.find();
            console.log('Veri başarıyla bulundu:', document);
        } catch (error) {
            console.error('Hata oluştu:', error);
        }
    })();

    
    // 4. Read (Filter) Yöntemi
    (async () => {
        try {
            const document = await Post.findById('65109693d0b73eed30fa288f');
            console.log('Veri başarıyla bulundu:', document);
        } catch (error) {
            console.error('Hata oluştu:', error);
        }
    })();


    /// 5.Update Yöntemi
    (async () => {
        try{
            const document = await Post.findByIdAndUpdate('65109693d0b73eed30fa288f'
            , {$set:{title:'Düzenlenen Başlık'}} , {new : true});
            console.log('Veri güncellendi', document);
        } catch (error) {
            console.error('Hata oluştu:', error);
        }
    })();

    /// 6.Delete Yöntemi
    (async () => {
        try{
            const document = await Post.findByIdAndDelete('6510a1e27ff5cb652fe21635');
            console.log('Silme işlemi başarılı.', document);
        } catch (error){
            console.error('Hata oluştu:', error);Ü
        }
    })();

        */