document.addEventListener('DOMContentLoaded', function() {
    const notaForm = document.getElementById('notaForm');
    const notasTable = document.getElementById('notasTable').querySelector('tbody');
    const selectTurma = document.getElementById('selectTurma');
    const selectDisciplina = document.getElementById('selectDisciplina');
    const alunoNotaSelect = document.getElementById('alunoNota');
    const disciplinaNotaSelect = document.getElementById('disciplinaNota');

    // Carregar turmas nos selects
    function loadTurmas() {
        selectTurma.innerHTML = '<option value="">Todas as turmas</option>';
        alunoNotaSelect.innerHTML = '<option value="">Selecione um aluno</option>';
        
        db.turmas.forEach(turma => {
            const option = document.createElement('option');
            option.value = turma.id;
            option.textContent = turma.nome;
            selectTurma.appendChild(option);
        });
    }

    // Carregar disciplinas nos selects
    function loadDisciplinas() {
        selectDisciplina.innerHTML = '<option value="">Todas as disciplinas</option>';
        disciplinaNotaSelect.innerHTML = '<option value="">Selecione uma disciplina</option>';
        
        db.disciplinas.forEach(disciplina => {
            const option1 = document.createElement('option');
            option1.value = disciplina.id;
            option1.textContent = disciplina.nome;
            selectDisciplina.appendChild(option1);
            
            const option2 = document.createElement('option');
            option2.value = disciplina.id;
            option2.textContent = disciplina.nome;
            disciplinaNotaSelect.appendChild(option2);
        });
    }

    // Carregar alunos no select
    function loadAlunos() {
        alunoNotaSelect.innerHTML = '<option value="">Selecione um aluno</option>';
        db.alunos.forEach(aluno => {
            const option = document.createElement('option');
            option.value = aluno.id;
            option.textContent = aluno.nome;
            alunoNotaSelect.appendChild(option);
        });
    }

    // Carregar notas na tabela
    function loadNotas(turmaId = null, disciplinaId = null) {
        notasTable.innerHTML = '';
        
        let notasFiltradas = db.notas;
        
        if (turmaId) {
            notasFiltradas = notasFiltradas.filter(nota => {
                const aluno = db.alunos.find(a => a.id === nota.alunoId);
                return aluno && aluno.turmaId === parseInt(turmaId);
            });
        }
        
        if (disciplinaId) {
            notasFiltradas = notasFiltradas.filter(nota => 
                nota.disciplinaId === parseInt(disciplinaId)
            );
        }
        
        notasFiltradas.forEach(nota => {
            const aluno = db.alunos.find(a => a.id === nota.alunoId) || { nome: 'Aluno não encontrado' };
            const disciplina = db.disciplinas.find(d => d.id === nota.disciplinaId) || { nome: 'Disciplina não encontrada' };
            const media = ((nota.nota1 || 0) + (nota.nota2 || 0) + (nota.nota3 || 0)) / 3;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${aluno.nome}</td>
                <td>${disciplina.nome}</td>
                <td>${nota.nota1 !== undefined ? nota.nota1.toFixed(1) : '-'}</td>
                <td>${nota.nota2 !== undefined ? nota.nota2.toFixed(1) : '-'}</td>
                <td>${nota.nota3 !== undefined ? nota.nota3.toFixed(1) : '-'}</td>
                <td>${media.toFixed(1)}</td>
                <td>
                    <button class="btn-edit" data-id="${nota.id}">Editar</button>
                </td>
            `;
            notasTable.appendChild(row);
        });
    }

    // Adicionar/editar nota
    if (notaForm) {
        notaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const alunoId = document.getElementById('alunoNota').value;
            const disciplinaId = document.getElementById('disciplinaNota').value;
            const nota1 = parseFloat(document.getElementById('nota1').value) || undefined;
            const nota2 = parseFloat(document.getElementById('nota2').value) || undefined;
            const nota3 = parseFloat(document.getElementById('nota3').value) || undefined;
            
            // Verificar se já existe nota para este aluno e disciplina
            const notaExistenteIndex = db.notas.findIndex(n => 
                n.alunoId === parseInt(alunoId) && 
                n.disciplinaId === parseInt(disciplinaId)
            );
            
            const novaNota = {
                id: notaExistenteIndex === -1 ? generateId() : db.notas[notaExistenteIndex].id,
                alunoId: parseInt(alunoId),
                disciplinaId: parseInt(disciplinaId),
                nota1,
                nota2,
                nota3
            };
            
            if (notaExistenteIndex === -1) {
                db.notas.push(novaNota);
            } else {
                db.notas[notaExistenteIndex] = novaNota;
            }
            
            loadNotas();
            closeModal('notaModal');
            notaForm.reset();
        });
    }

    // Botão para filtrar notas
    const filterNotasBtn = document.getElementById('filterNotas');
    if (filterNotasBtn) {
        filterNotasBtn.addEventListener('click', function() {
            const turmaId = selectTurma.value;
            const disciplinaId = selectDisciplina.value;
            loadNotas(turmaId, disciplinaId);
        });
    }

    // Carregar dados iniciais
    loadTurmas();
    loadDisciplinas();
    loadAlunos();
    loadNotas();
});