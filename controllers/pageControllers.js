//Avout Page

exports.getAboutPage = (req, res) => {
   
    res.render('about');
  };

//Add Page

exports.getAddPage = (req, res) => {
    /* res.send('merhaba') */
    res.render('add');
  };


//Edit page
  exports.getEditPage =  async (req, res) => {
    const photo = await  Photo.findOne({_id: req.params.id});
    res.render('edit', {
      photo
    });
  };
