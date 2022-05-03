exports.getAboutPage = (req, res) => {
    /* res.send('merhaba') */
    res.render('about');
  };



exports.getAddPage = (req, res) => {
    /* res.send('merhaba') */
    res.render('add');
  };

  exports.getEditPage =  async (req, res) => {
    const photo = await  Photo.findOne({_id: req.params.id});
    res.render('edit', {
      photo
    });
  };