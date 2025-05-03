document.addEventListener('DOMContentLoaded', function() {
    // Banco de dados mockado
    const db = {
        disciplinas: [
            { id: 1, nome: 'Matemática', cargaHoraria: 80, professorId: 1 },
            { id: 2, nome: 'Português', cargaHoraria: 60, professorId: 2 },
            { id: 3, nome: 'História', cargaHoraria: 40, professorId: null }
        ],
        professores: [
            { id: 1, nome: 'Carlos Silva' },
            { id: 2, nome: 'Ana Oliveira' },
            { id: 3, nome: 'Pedro Santos' }
        ]
    };

    // Elementos da página
    const disciplinaForm = document.getElementById('disciplinaForm');
    const disciplinasTable = document.getElementById('disciplinasTable').querySelector('tbody');
    const professorSelect = document.getElementById('professorDisciplina');
    const modalTitle = document.getElementById('modalDisciplinaTitle');
    let editMode = false;
    let currentEditId = null;

    // Função para gerar IDs
    function generateId() {
        return db.disciplinas.length > 0 ? Math.max(...db.disciplinas.map(d => d.id)) + 1 : 1;
    }

    // Carregar professores no select
    function loadProfessores() {
        professorSelect.innerHTML = '<option value="">Selecione um professor</option>';
        db.professores.forEach(professor => {
            const option = document.createElement('option');
            option.value = professor.id;
            option.textContent = professor.nome;
            professorSelect.appendChild(option);
        });
    }

    // Carregar disciplinas na tabela
    function loadDisciplinas() {
        disciplinasTable.innerHTML = '';
        db.disciplinas.forEach(disciplina => {
            const professor = db.professores.find(p => p.id === disciplina.professorId) || { nome: 'Não atribuído' };
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${disciplina.nome}</td>
                <td>${disciplina.cargaHoraria}h</td>
                <td>${professor.nome}</td>
                <td class="actions-cell">
                    <button class="btn-edit" data-id="${disciplina.id}"><i class="icon-edit"></i> Editar</button>
                    <button class="btn-delete" data-id="${disciplina.id}"><i class="icon-delete"></i> Excluir</button>
                </td>
            `;
            disciplinasTable.appendChild(row);
        });
        
        // Adicionar eventos aos botões
        addEditDeleteEvents();
    }

    // Adicionar eventos de edição e exclusão
    function addEditDeleteEvents() {
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                editDisciplina(id);
            });
        });
        
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                deleteDisciplina(id);
            });
        });
    }

    // Editar disciplina
    function editDisciplina(id) {
        const disciplina = db.disciplinas.find(d => d.id === id);
        if (!disciplina) return;
        
        editMode = true;
        currentEditId = id;
        modalTitle.textContent = 'Editar Disciplina';
        
        document.getElementById('nomeDisciplina').value = disciplina.nome;
        document.getElementById('cargaHoraria').value = disciplina.cargaHoraria;
        document.getElementById('professorDisciplina').value = disciplina.professorId || '';
        
        openModal('disciplinaModal');
    }

    // Excluir disciplina
    function deleteDisciplina(id) {
        if (confirm('Tem certeza que deseja excluir esta disciplina?')) {
            db.disciplinas = db.disciplinas.filter(d => d.id !== id);
            loadDisciplinas();
            alert('Disciplina excluída com sucesso!');
        }
    }

    // Adicionar/editar disciplina
    if (disciplinaForm) {
        disciplinaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('nomeDisciplina').value;
            const cargaHoraria = document.getElementById('cargaHoraria').value;
            const professorId = document.getElementById('professorDisciplina').value;
            
            if (editMode) {
                // Editar disciplina existente
                const index = db.disciplinas.findIndex(d => d.id === currentEditId);
                if (index !== -1) {
                    db.disciplinas[index] = {
                        id: currentEditId,
                        nome,
                        cargaHoraria,
                        professorId: professorId ? parseInt(professorId) : null
                    };
                }
                editMode = false;
                currentEditId = null;
            } else {
                // Adicionar nova disciplina
                const novaDisciplina = {
                    id: generateId(),
                    nome,
                    cargaHoraria,
                    professorId: professorId ? parseInt(professorId) : null
                };
                db.disciplinas.push(novaDisciplina);
            }
            
            loadDisciplinas();
            closeModal('disciplinaModal');
            disciplinaForm.reset();
        });
    }

    // Buscar disciplinas
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', buscarDisciplinas);
    }
    
    const searchInput = document.getElementById('searchDisciplina');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') buscarDisciplinas();
        });
    }
    
    function buscarDisciplinas() {
        const termo = document.getElementById('searchDisciplina').value.toLowerCase();
        const linhas = document.querySelectorAll('#disciplinasTable tbody tr');
        
        linhas.forEach(linha => {
            const nome = linha.cells[0].textContent.toLowerCase();
            const professor = linha.cells[2].textContent.toLowerCase();
            
            if (nome.includes(termo) || professor.includes(termo)) {
                linha.style.display = '';
            } else {
                linha.style.display = 'none';
            }
        });
    }

    // Botão para adicionar disciplina
    const addDisciplinaBtn = document.getElementById('addDisciplina');
    if (addDisciplinaBtn) {
        addDisciplinaBtn.addEventListener('click', function() {
            editMode = false;
            currentEditId = null;
            modalTitle.textContent = 'Cadastrar Disciplina';
            disciplinaForm.reset();
            openModal('disciplinaModal');
        });
    }

    // Fechar modal ao clicar no X
    document.querySelector('.close').addEventListener('click', function() {
        closeModal('disciplinaModal');
    });

    // Carregar dados iniciais
    loadProfessores();
    loadDisciplinas();

    // Funções para abrir/fechar modal (deveriam estar em script.js)
    function openModal(id) {
        document.getElementById(id).style.display = 'block';
    }

    function closeModal(id) {
        document.getElementById(id).style.display = 'none';
    }
});