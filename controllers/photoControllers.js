<<<<<<< HEAD
const Photo = require ('../models/Photo');
const fs = require('fs');
=======
const Photo = require ('../models/Photo'); //İnclude Photo here
>>>>>>> refs/remotes/origin/main


exports.getAllPhotos = async (req, res) => {
    const photos = await Photo.find({}).sort('-dateCreated');
  
    res.render('index', {
      photos,
    });
  };

  exports.getPhoto = async (req, res) => {
    //asenkron yapı
    /* res.send('merhaba') */
    /*  console.log(req.params.id) */
    const photo = await Photo.findById(req.params.id);
    res.render('photo', {
      photo,
    });
  };

  exports.createPhoto = async (req, res) => {
    /* await Photo.create(req.body);
    res.redirect('/'); */
  
    const uploadDir = 'public/uploads';  //Create file
  
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
  
    let uploadeImage = req.files.image;
    let uploadPath = __dirname + '/../public/uploads' + uploadeImage.name;
  
    uploadeImage.mv(uploadPath, async () => {
      await Photo.create({
        ...req.body,
        image: '/uploads' + uploadeImage.name,
      });
      res.redirect('/');
    });
  };


  exports.updatePhoto = async (req, res) => {
    const photo = await  Photo.findOne({_id: req.params.id});
    photo.title = req.body.title
    photo.description = req.body.description
    photo.save()
    res.redirect(`/photos/${req.params.id}`)
  };
   //Delete Photos 
  exports.deletePhoto = async (req, res) => {
    const photo = await Photo.findOne({_id:req.params.id});
    let deletedImage = __dirname + '/../public' + photo.image;
    fs.unlinkSync(deletedImage);
    await Photo.findByIdAndRemove(req.params.id);
    res.redirect('/');
  };
