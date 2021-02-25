$(document).ready(() => {
  auth();

  $('#register-btn').on('click', e => {
    e.preventDefault();
    registerButton();
  });

  $('#login-btn').on('click', e => {
    e.preventDefault();
    loginButton();
  });

  $('#login-form').on('submit', e => {
    e.preventDefault();
    login();
  });

  $('#register-form').on('submit', e => {
    e.preventDefault();
    register();
  });

  $('#create-btn').on('click', e => {
    e.preventDefault();
    createButton();
  });

  $('#home-btn').on('click', e => {
    e.preventDefault();
    homeButton();
  });

  $('#create-form').on('submit', e => {
    e.preventDefault();
    create();
  });

  $('#finish-btn').on('click', e => {
    e.preventDefault();
    finished_todo();
  });

  $('#logout-btn').on('click', e => {
    e.preventDefault();
    logout();
  });
});

$(document).on('click', '.check-btn', e => {
  e.preventDefault();
  finish_btn($('.check-btn').data('id'));
}); 

$(document).on('click', '.edit-btn', e => {
  e.preventDefault();
  edit_btn($('.edit-btn').data('id'));
}); 

$(document).on('submit', '#edit-form', e => {
  e.preventDefault();
  edit($('.edit-btn').data('id'));
}); 

$(document).on('click', '.delete-btn', e => {
  e.preventDefault();
  deleteTodo($('.delete-btn').data('id'));
});
