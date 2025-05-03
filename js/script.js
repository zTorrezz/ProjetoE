document.addEventListener('DOMContentLoaded', function() {
  // Menu Hamburguer
  const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');
  
  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', function() {
      this.classList.toggle('open');
      sidebar.classList.toggle('open');
      
      // Bloquear scroll do body quando o menu está aberto
      if (this.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 992) {
          menuBtn.classList.remove('open');
          sidebar.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    });
  }
  
  // Fechar menu ao redimensionar a tela para desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 992 && menuBtn && sidebar) {
      menuBtn.classList.remove('open');
      sidebar.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
  
  // Abrir/fechar modais
  const modals = document.querySelectorAll('.modal');
  
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal');
      document.getElementById(modalId).style.display = 'block';
    });
  });
  
  document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
      this.closest('.modal').style.display = 'none';
    });
  });
  
  window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });
  
  // Navegação por tabs nos formulários
  document.querySelectorAll('.tab-btn').forEach(tab => {
    tab.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // Remove active de todas as tabs e conteúdos
      document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      // Adiciona active na tab clicada e no conteúdo correspondente
      this.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Navegação entre tabs com botões anterior/próximo
  if (document.getElementById('nextTab')) {
    document.getElementById('nextTab').addEventListener('click', function() {
      const activeTab = document.querySelector('.tab-btn.active');
      const nextTab = activeTab.nextElementSibling;
      
      if (nextTab && nextTab.classList.contains('tab-btn')) {
        nextTab.click();
      }
    });
    
    document.getElementById('prevTab').addEventListener('click', function() {
      const activeTab = document.querySelector('.tab-btn.active');
      const prevTab = activeTab.previousElementSibling;
      
      if (prevTab && prevTab.classList.contains('tab-btn')) {
        prevTab.click();
      }
    });
  }
  
  // Validação de formulários
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validação básica - verificar campos obrigatórios
      const requiredFields = this.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = 'var(--danger)';
          isValid = false;
        } else {
          field.style.borderColor = '';
        }
      });
      
      if (isValid) {
        // Simular envio do formulário
        alert('Formulário enviado com sucesso!');
        this.reset();
        this.closest('.modal').style.display = 'none';
      } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
      }
    });
  });
  
  // Inicializar primeira tab como ativa
  if (document.querySelector('.tab-btn')) {
    document.querySelector('.tab-btn').click();
  }
});