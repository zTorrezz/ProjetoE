document.addEventListener('DOMContentLoaded', function() {
  // Adicionar professor
  const addProfessorBtn = document.getElementById('addProfessor');
  if (addProfessorBtn) {
    addProfessorBtn.addEventListener('click', function() {
      document.getElementById('modalTitle').textContent = 'Adicionar Novo Professor';
      document.getElementById('professorForm').reset();
      document.getElementById('professorModal').style.display = 'block';
      
      // Resetar tabs para a primeira
      document.querySelector('.tab-btn').click();
    });
  }
  
  // Buscar professor
  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', buscarProfessores);
  }
  
  const searchInput = document.getElementById('searchProfessor');
  if (searchInput) {
    searchInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') buscarProfessores();
    });
  }
  
  function buscarProfessores() {
    const termo = document.getElementById('searchProfessor').value.toLowerCase();
    const linhas = document.querySelectorAll('#professoresTable tbody tr');
    
    linhas.forEach(linha => {
      const nome = linha.cells[1].textContent.toLowerCase();
      const id = linha.cells[0].textContent.toLowerCase();
      
      if (nome.includes(termo) || id.includes(termo)) {
        linha.style.display = '';
      } else {
        linha.style.display = 'none';
      }
    });
  }
  
  // Editar professor (exemplo com dados mockados)
  document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', function() {
      document.getElementById('modalTitle').textContent = 'Editar Professor';
      
      // Preencher formulário com dados do professor (simulado)
      const linha = this.closest('tr');
      document.getElementById('nomeProfessor').value = linha.cells[1].textContent;
      document.getElementById('formacaoProfessor').value = linha.cells[2].textContent;
      
      // Simular disciplinas (pegar do texto da tabela)
      const disciplinasText = linha.cells[3].textContent;
      const checkboxes = document.querySelectorAll('input[name="disciplinas"]');
      
      checkboxes.forEach(checkbox => {
        const disciplina = checkbox.value;
        if (
          (disciplina === 'matematica' && disciplinasText.includes('Matemática')) ||
          (disciplina === 'portugues' && disciplinasText.includes('Português')) ||
          (disciplina === 'historia' && disciplinasText.includes('História')) ||
          (disciplina === 'geografia' && disciplinasText.includes('Geografia')) ||
          (disciplina === 'ciencias' && disciplinasText.includes('Ciências')) ||
          (disciplina === 'ingles' && disciplinasText.includes('Inglês'))
        ) {
          checkbox.checked = true;
        } else {
          checkbox.checked = false;
        }
      });
      
      // Definir status
      const statusText = linha.cells[4].textContent.trim();
      document.getElementById('statusProfessor').value = 
        statusText === 'Ativo' ? 'ativo' : 
        statusText === 'Afastado' ? 'afastado' : 'inativo';
      
      document.getElementById('professorModal').style.display = 'block';
      document.querySelector('.tab-btn').click();
    });
  });
  
  // Remover professor
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', function() {
      if (confirm('Tem certeza que deseja remover este professor?')) {
        this.closest('tr').remove();
        alert('Professor removido com sucesso!');
      }
    });
  });
});