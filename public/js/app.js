console.log('yo');
//Modal
$(() => {
  const $openBtn = $('#Modalopen');
  const $modal = $('#modal');
  const $closeBtn = $('#close');


  const openModal = () => {
      $modal.css('display', 'block');
  }

  const closeModal = () => {
      $modal.css('display', 'none');
  }

  $openBtn.on('click', openModal);
  $closeBtn.on('click', closeModal);

})
