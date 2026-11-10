document.querySelectorAll('.view_all').forEach(function (button) {
  button.addEventListener('click', function () {
    var section = button.closest('section');
    section.querySelectorAll('li').forEach(function (li) { li.classList.add('visible'); });
    button.parentElement.remove();
  });
});
