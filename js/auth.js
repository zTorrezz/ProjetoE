document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const btnText = document.querySelector('.btn-text');
      const btnLoading = document.querySelector('.btn-loading');
      
      // Validar campos
      if (!username || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
      }
      
      // Simular loading
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline-block';
      
      // Simular requisição de login
      setTimeout(function() {
        // Aqui seria a chamada AJAX para o servidor
        console.log('Tentativa de login:', { username, password });
        
        // Simular resposta do servidor
        const loginSuccess = username === 'admin' && password === 'admin';
        
        if (loginSuccess) {
          // Redirecionar para a página home após login bem-sucedido
          window.location.href = 'home.html';
        } else {
          alert('Usuário ou senha incorretos.');
          btnText.style.display = 'inline-block';
          btnLoading.style.display = 'none';
        }
      }, 1500);
    });
  }
});