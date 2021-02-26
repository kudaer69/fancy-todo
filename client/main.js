const base_URL = 'http://localhost:3000/';

const auth = () => {
  if (!localStorage.getItem('token')) {
    $('#main-page').show();
    $('#register').hide();
    $('#home-page').hide();
    $('#main-error').hide();
    $('#main-success').hide();
  } else {
    $('#main-page').hide();
    $('#home-page').show();
    $('#create').hide();
    $('#done').hide();
    $('#quotes').hide();
    read();
  }
};

const login = () => {
  $.ajax({
    url: base_URL + `login`,
    method: 'POST',
    data: { email: $('#email-login').val(), password: $('#password-login').val() }
  })
    .done(data => {
      localStorage.setItem('token', data.token);
      auth();
      $('#home-success').show();
      $('#home-success').text(data.message);
    })
    .fail(err => {
      $('#main-error').text(err.responseJSON[0]);
      $('#main-error').show();
      $('#main-success').hide();
    })
    .always(_ => $('#login-form').trigger('reset'))
};

const register = () => {
  const password = $('#password-register').val();
  const repassword = $('#re-password').val();

  if (password != repassword) {
    $('#main-error').show();
    $('#main-error').text(`Password didn't match`);
    $('#main-success').hide();
  }
  $.ajax({
    url: base_URL + `register`,
    method: 'POST',
    data: { username: $('#username-register').val(), email: $('#email-register').val(), password: password }
  })
  .done(data => {
      console.log('masuk');
      $('#main-success').show();
      $('#main-success').text(data.message);
      $('#register').hide();
      $('#login').show();
    })
    .fail(err => {
      $('#main-error').show();
      $('#main-error').text(err.responseJSON);
      $('#main-success').hide();
    })
};

const registerButton = () => {
  $('#register-form').trigger('reset')
  $('#main-error').hide();
  $('#main-success').hide();
  $('#register').show();
  $('#login').hide();
};

const loginButton = () => {
  $('#main-error').hide();
  $('#main-success').hide();
  $('#register').hide();
  $('#login').show();
};

const read = () => {
  $('#home-error').hide();
  $('#home-success').hide();

  $.ajax({
    url: base_URL + `todos/f`,
    method: 'GET',
    headers: {
      token : localStorage.getItem('token')
    }
  })
    .done(todo => {
      $('#home-error').hide();
      $('#home-success').hide();
      let html = '';
      if (todo.data.length) {
        todo.data.forEach(el => {
          if (!el.description) el.description = 'tidak ada deskripsi'

          html += `
          <div class="todo">
            <div class="container">
              <div class="row">
                <div class="col-9"><h4 class="title-main" style="cursor: pointer;">${el.title}</h4></div>
                <div class="col-3"><h6>${el.due_date}</h6></div>
              </div>
            </div>
            <p>${el.description}</p>
            <img src="./public//img/check-icon.png" class="check-btn" data-id="${el.id}" alt="done" style="cursor: pointer;">
            <img src="./public/img/edit-icon.png" class="edit-btn" data-id="${el.id}" alt="edit" style="cursor: pointer;">
            <img src="./public/img/delete-icon.png" class="delete-btn" data-id="${el.id}" alt="delete" style="cursor: pointer;">
          </div>
          `
        });
      } else html = `<h2>Todo Kosong</h2>`

      $('#main').html(html);
    })
    .fail(err => {
      console.log(err.responseJSON);
    })
};

const createButton = () => {
  $('#home-error').hide();
  $('#home-success').hide();
  $('#create').show();
  $('#main').hide();
  $('#done').hide();
  $('#edit').hide();
};

const homeButton = () => {
  $('#create').hide();
  $('#done').hide();
  $('#edit').hide();
  $('#main').show();
  $('#quotes').hide();
  read();
};

const create = () => {
  $.ajax({
    url: base_URL + `todos/`,
    method: 'POST',
    data: { title: $('#title-create').val(), description: $('#description-create').val(), due_date: $('#due_date-create').val() },
    headers: {
      token : localStorage.getItem('token')
    }
  })
    .done(data => {
      homeButton();
      $('#home-success').text(data.message);
      $('#home-success').show();
    })
    .fail(err => {
      $('#home-error').text(err.responseJSON);
      $('#home-error').show();
    })
};

const finished_todo = () => {
  $('#home-error').hide();
  $('#home-success').hide();
  $('#create').hide();
  $('#main').hide();
  $('#done').show();
  $('#edit').hide();

  $.ajax({
    url: base_URL + `todos/t`,
    method: 'GET',
    headers: {
      token : localStorage.getItem('token')
    }
  })
    .done(todo => {
      $('#home-error').hide();
      $('#home-success').hide();
      let html = '';

      if (todo.data.length) {
        todo.data.forEach(el => {
          if (!el.description) el.description = 'tidak ada deskripsi'

          html += `
          <div class="todo">
            <div class="container">
              <div class="row">
                <div class="col-9"><h4>${el.title}</h4></div>
                <div class="col-3"><h6>${el.due_date}</h6></div>
              </div>
            </div>
            <p>${el.description}</p>
            <img src="./public/img/delete-icon.png" data-id="${el.id}" alt="delete" style="cursor: pointer;">
          </div>
          `
        });
      } else html = `<h2>Todo Kosong</h2>`

      $('#done').html(html);
    })
    .fail(err => {
      console.log(err.responseJSON);
    })
};

const logout = () => {
  localStorage.clear();
  auth();
};

const finish_btn = (id) => {
  $.ajax({
    url: base_URL + `todos/${id}`,
    method: 'PATCH',
    data: {
      status: true
    },
    headers: {
      token : localStorage.getItem('token')
    }
  })
    .then(data => {
      homeButton();
      $('#home-success').text(data.message);
      $('#home-success').show();
    })
    .fail(err => {
      console.log(err.responseJSON);
    })
};

const edit_btn = (id) => {
  $('#home-error').hide();
  $('#home-success').hide();
  $('#create').hide();
  $('#main').hide();
  $('#done').hide();
  $('#edit').show();
  $.ajax({
    url: base_URL + `todos/${id}`,
    method: 'GET',
    headers: {
      token : localStorage.getItem('token')
    }
  })
    .then(data => {
      $('#edit').html(`
        <form id="edit-form">
          <input type="text" id="title-edit" value="${data.data.title}"><br>
          <input type="text" id="description-edit" value="${data.data.description}"><br>
          <input type="date" id="due_date-edit" value="${data.data.due_date}"><br>
          <input type="submit" value="edit"><br>
        </form>
      `)
    }) 
    .fail(err => {
      $('#edit').html(err.responseJSON)
    })
};

const edit = (id) => {
  $.ajax({
    url: base_URL + `todos/${id}`,
    method: 'PUT',
    data: {
      title: $('#title-edit').val(),
      description: $('#description-edit').val(),
      due_date: $('#due_date-edit').val(),
    },
    headers: {
      token : localStorage.getItem('token')
    }
  })
    .done(data => {
      homeButton();
      $('#home-success').text(data.message);
      $('#home-success').show();
    })
    .fail(err => {
      $('#home-error').text(err.responseJSON);
      $('#home-error').show();
    })
};

const deleteTodo = (id) => {
  $.ajax({
    url: base_URL + `todos/${id}`,
    method: 'DELETE',
    headers: {
      token : localStorage.getItem('token')
    }
  })
    .done(data => {
      homeButton();
      $('#home-success').text(data.message);
      $('#home-success').show();
    })
    .fail(err => {
      $('#home-error').text(err.responseJSON);
      $('#home-error').show();
    })
};

const gSignIn = (user) => {
  $.ajax({
    url: base_URL + `loginOauth`,
    method: 'POST',
    data: {
      token: googleUser.getAuthResponse().id_token
    }
  })
    .done(res => {
      localStorage.setItem('token', res.token);
      auth();
    })
    .fail(err => {
      $('#main-error').show();
      $('#main-error').text(err.responseJSON);
      $('#main-success').hide();
    })
};

const quotes = () => {
  $.ajax({
    url: base_URL + 'quotes',
    method: 'GET',
    headers: {
      token : localStorage.getItem('token')
    }
  })
    .done(res => {
      $('#quotes').show();
      $('#home-error').hide();
      $('#home-success').hide();
      $('#create').hide();
      $('#main').hide();
      $('#done').hide();
      $('#edit').hide();
      $('#quotes').html(`
      <div class="container">
        <h4>${res.data.content}</h4>
        <h6>${res.data.originator.name}</h6>
      </div>
      `)
    })
    .fail(err => {
      $('#home-error').text(err.responseJSON);
      $('#home-error').show();
    })
};

