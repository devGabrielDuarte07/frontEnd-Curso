import { API } from "./api";

async function ListarCursos() 
{ 
    const response = await fetch(`${API}/Cursos`);
    const data = await response.json();
    return data.dados || [];
}

async function CadastrarCurso(curso: { nome: string, periodo: string }) {
    const response = await fetch(`${API}/Cursos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(curso)
    });
    const data = await response.json();
    return data;
}

async function ExcluirCurso(id: number) {
    const response = await fetch(`${API}/Cursos/${id}`, {
        method: "DELETE"
    });
    const data = await response.json();
    return data;
}

async function ObterCursoPorId(id: number) {
    const response = await fetch(`${API}/Cursos/${id}`);
    const data = await response.json();
    return data.dados;
}

async function EditarCurso(id: number, curso: { nome: string, periodo: string }) {
    const response = await fetch(`${API}/Cursos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(curso)
    });
    const data = await response.json();
    return data;
}

async function BuscarCursosPorNome(nome: string) {
    const response = await fetch(`${API}/Cursos/nome/${nome}`, 
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    return data.dados || [];
}

async function BuscarCursosPorPeriodo(periodo: string) {
    const response = await fetch(`${API}/Cursos/periodo/${periodo}`, 
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    return data.dados || [];
}

export const services = {
    listarCursos: ListarCursos,
    cadastrarCurso: CadastrarCurso,
    excluirCurso: ExcluirCurso,
    obterCursoPorId: ObterCursoPorId,
    editarCurso: EditarCurso,
    buscarCursosPorNome: BuscarCursosPorNome,
    buscarCursosPorPeriodo: BuscarCursosPorPeriodo
}

