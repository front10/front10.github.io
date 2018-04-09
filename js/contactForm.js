(function($){
  console.log(123);
  function getEndPoint(event){
    return 'https://maker.ifttt.com/trigger/' + event + '/with/key/dFOibtTrDh8pCZ9laeYno';
  }

  function bindUI(){
    $('.js-contact-form__call-to-action').click(function(){
      var $contactForm = $('.js-contact-form');
      var formData = normalizeFormData($contactForm.serializeArray());
      var endPoint = getEndPoint('front10_contactform');
      setFormToLoadingState($contactForm);
      postForm(endPoint, formData, $contactForm);
    });
  }

  function setFormToLoadingState($contactForm){
    $contactForm.find('.js-contact-form__call-to-action').toggleClass('tada animated infinite');
    $contactForm.find('.js-contact-form__call-to-action .js-call-to-action-message').html('Sending');
  }

  function setFormToRegularState($contactForm){
    $contactForm.find('.js-contact-form__call-to-action').toggleClass('tada animated infinite');
    $contactForm.find('.js-contact-form__call-to-action .js-call-to-action-message').html('Send message');
    $contactForm.find('.js-contact-form__alert__container').html('<div class="js-contact-form__alert alert alert-success col-sm-12 col-xs-12">Your message has been received, We will get back to you ASAP.</div>');
  }
  
  function postForm(endPoint, formData, $contactForm){
    $.ajax({
      type: "POST",
      url: endPoint,
      data: formData
    })
    .done(function(response) {
      console.log(response);
    })
    .fail(function(err) {
      console.log(err);
    })
    .always(function() {
      console.log('done');
      setFormToRegularState($contactForm);
    });;
  }

  function normalizeFormData(formData){
    var obj = {};
    formData.forEach(function(item, index) {
        var key = 'value'+(index+1);
        obj[key] = item.value;
    });
    return obj;
  }

  bindUI();

})($)
