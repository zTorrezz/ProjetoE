document.addEventListener('DOMContentLoaded', function() {
  // Adicionar turma
  const addTurmaBtn = document.getElementById('addTurma');
  if (addTurmaBtn) {
    addTurmaBtn.addEventListener('click', function() {
      document.getElementById('modalTitle').textContent = 'Adicionar Nova Turma';
      document.getElementById('turmaForm').reset();
      document.getElementById('turmaModal').style.display = 'block';
    });
  }
  
  // Buscar turma
  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', buscarTurmas);
  }
  
  const searchInput = document.getElementById('searchTurma');
  if (searchInput) {
    searchInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') buscarTurmas();
    });
  }
  
  function buscarTurmas() {
    const termo = document.getElementById('searchTurma').value.toLowerCase();
    const linhas = document.querySelectorAll('#turmasTable tbody tr');
    
    linhas.forEach(linha => {
      const nome = linha.cells[1].textContent.toLowerCase();
      const codigo = linha.cells[0].textContent.toLowerCase();
      
      if (nome.includes(termo) || codigo.includes(termo)) {
        linha.style.display = '';
      } else {
        linha.style.display = 'none';
      }
    });
  }
  
  // Editar turma (exemplo com dados mockados)
  document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', function() {
      document.getElementById('modalTitle').textContent = 'Editar Turma';
      
      // Preencher formulário com dados da turma (simulado)
      const linha = this.closest('tr');
      document.getElementById('nomeTurma').value = linha.cells[1].textContent;
      
      // Definir série baseada no texto da tabela
      const serieText = linha.cells[2].textContent;
      if (serieText.includes('1º Ano')) {
        document.getElementById('serieTurma').value = '1';
      } else if (serieText.includes('2º Ano')) {
        document.getElementById('serieTurma').value = '2';
      } else if (serieText.includes('3º Ano')) {
        document.getElementById('serieTurma').value = '3';
      }
      
      // Definir turno
      const turnoText = linha.cells[3].textContent;
      document.getElementById('turnoTurma').value = 
        turnoText === 'Manhã' ? 'manha' : 
        turnoText === 'Tarde' ? 'tarde' : 'noite';
      
      // Definir professor responsável
      const professorText = linha.cells[5].textContent;
      if (professorText.includes('Carlos Mendes')) {
        document.getElementById('professorTurma').value = '1';
      } else if (professorText.includes('Ana Paula Silva')) {
        document.getElementById('professorTurma').value = '2';
      } else if (professorText.includes('Roberto Almeida')) {
        document.getElementById('professorTurma').value = '3';
      }
      
      document.getElementById('turmaModal').style.display = 'block';
    });
  });
  
  // Remover turma
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', function() {
      if (confirm('Tem certeza que deseja remover esta turma?')) {
        this.closest('tr').remove();
        alert('Turma removida com sucesso!');
      }
    });
  });
});