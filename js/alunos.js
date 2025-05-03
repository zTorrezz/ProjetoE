document.addEventListener('DOMContentLoaded', function() {
  // Adicionar aluno
  const addAlunoBtn = document.getElementById('addAluno');
  if (addAlunoBtn) {
    addAlunoBtn.addEventListener('click', function() {
      document.getElementById('modalTitle').textContent = 'Adicionar Novo Aluno';
      document.getElementById('alunoForm').reset();
      document.getElementById('alunoModal').style.display = 'block';
      
      // Resetar tabs para a primeira
      document.querySelector('.tab-btn').click();
    });
  }
  
  // Buscar aluno
  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', buscarAlunos);
  }
  
  const searchInput = document.getElementById('searchAluno');
  if (searchInput) {
    searchInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') buscarAlunos();
    });
  }
  
  function buscarAlunos() {
    const termo = document.getElementById('searchAluno').value.toLowerCase();
    const linhas = document.querySelectorAll('#alunosTable tbody tr');
    
    linhas.forEach(linha => {
      const nome = linha.cells[1].textContent.toLowerCase();
      const matricula = linha.cells[0].textContent.toLowerCase();
      
      if (nome.includes(termo) || matricula.includes(termo)) {
        linha.style.display = '';
      } else {
        linha.style.display = 'none';
      }
    });
  }
  
  // Editar aluno (exemplo com dados mockados)
  document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', function() {
      document.getElementById('modalTitle').textContent = 'Editar Aluno';
      
      // Preencher formulário com dados do aluno (simulado)
      const linha = this.closest('tr');
      document.getElementById('nomeAluno').value = linha.cells[1].textContent;
      document.getElementById('dataNascimento').value = '2005-03-15'; // Simulado
      document.getElementById('cpfAluno').value = '123.456.789-00'; // Simulado
      
      // Definir turma baseada no texto da tabela
      const turmaText = linha.cells[3].textContent;
      if (turmaText.includes('1º Ano')) {
        document.getElementById('turmaAluno').value = '1';
      } else if (turmaText.includes('2º Ano')) {
        document.getElementById('turmaAluno').value = '2';
      } else if (turmaText.includes('3º Ano')) {
        document.getElementById('turmaAluno').value = '3';
      }
      
      // Definir status
      const statusText = linha.cells[4].textContent.trim();
      document.getElementById('statusAluno').value = statusText === 'Ativo' ? 'ativo' : 'inativo';
      
      document.getElementById('alunoModal').style.display = 'block';
      document.querySelector('.tab-btn').click();
    });
  });
  
  // Remover aluno
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', function() {
      if (confirm('Tem certeza que deseja remover este aluno?')) {
        this.closest('tr').remove();
        alert('Aluno removido com sucesso!');
      }
    });
  });
});