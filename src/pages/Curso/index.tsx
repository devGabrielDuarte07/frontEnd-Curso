import { useState, useEffect } from "react";
import { CalendarDays, GraduationCap } from "lucide-react";
import { Search } from "lucide-react";
import { Funnel } from "lucide-react";
import styles from "./styles.module.css"
import { CursoRow } from "../../components/CursoRow";
import { services } from "../../services/cursoService";
import type { CursoType } from "../../types/CursoType";

export default function Curso() {

    const [cursos, setCursos] = useState<CursoType[]>([]);
    const [nomeCurso, setNomeCurso] = useState("");
    const [periodoCurso, setPeriodoCurso] = useState("");
    const [cursoEditando, setCursoEditando] = useState("");
    const [filtroNome, setFiltroNome] = useState("");
    const [filtroPeriodo, setFiltroPeriodo] = useState("");
    const [mostrarFiltros, setMostrarFiltros] = useState(false);

    async function handleSearch() {
        if (filtroNome.trim() === "") {
            CarregarCursos();
        } else {
            const resposta = await services.buscarCursosPorNome(filtroNome);
            setCursos(resposta);
        }
    }
    async function handleFiltroPeriodo(periodo: string) {
        setFiltroPeriodo(periodo);

        if (periodo === "") {
            CarregarCursos();
            return;
        }

        const resposta = await services.buscarCursosPorPeriodo(periodo);

        setCursos(resposta);
    }
    useEffect(() => {
        handleSearch();
    }, [filtroNome]);


    async function handleEdit(id: number) {
        const data = await services.obterCursoPorId(id);
        // Lógica para editar o curso
        setNomeCurso(data.nome);
        setPeriodoCurso(data.periodo);
        setCursoEditando(id.toString());

    }

    async function handleDelete(id: number) {
        await services.excluirCurso(id);
        CarregarCursos();
    }


    async function handleSubmit() {
        if (cursoEditando) {
            await services.editarCurso(parseInt(cursoEditando), { nome: nomeCurso, periodo: periodoCurso });
            setCursoEditando("");
        }
        else {
            await services.cadastrarCurso({ nome: nomeCurso, periodo: periodoCurso });
        }
        CarregarCursos();
        setNomeCurso("");
        setPeriodoCurso("");
        setCursoEditando("");
    }


    async function CarregarCursos() {
        const resposta = await services.listarCursos();
        setCursos(resposta);
    }

    useEffect(() => {
        CarregarCursos();
    }, []);


    return <>
        <div className={styles.Header}>
            <div className={styles.headerContent}>
                <GraduationCap size={32} />
                <div className={styles.headerText}>
                    <h1>Cadastrar novo curso</h1>
                    <h3>Gerenciar cursos</h3>
                </div>
            </div>
        </div>

        <div className={styles.container}>

            <div className={styles.cadastrarCurso}>
                <div className={styles.cadastrarCursoHeader}>
                    <h1>Cadastrar novo Curso</h1>
                </div>

                <div className={styles.cadastrarCursoBody}>
                    <div className={styles.inputGroup}>
                        <p>Nome do Curso</p>
                        <input type="text" value={nomeCurso} onChange={(e) => setNomeCurso(e.target.value)} className={styles.input} placeholder="Digite o nome do curso" />
                    </div>
                    <div className={styles.inputGroup}>
                        <p>Período</p>
                        <select value={periodoCurso} onChange={(e) => setPeriodoCurso(e.target.value)} className={styles.input}>
                            <option value="">Selecione o período</option>
                            <option value="MATUTINO">Manhã</option>
                            <option value="VESPERTINO">Tarde</option>
                            <option value="NOTURNO">Noite</option>
                            <option value="INTEGRAL">Integral</option>
                        </select>
                    </div>
                </div>
                <div className={styles.cadastrarCursoFooter}>
                    <button className={styles.button} onClick={handleSubmit}>{cursoEditando ? "Atualizar Curso" : "+ Inserir Curso"}</button>
                </div>
            </div>

            <div className={styles.listarCursos}>
                <div className={styles.listarCursosHeader}>
                    <h1>Lista de cursos</h1>
                </div>

                <div className={styles.listarCursosBody}>
                    <div className={styles.listarCursosSearch}>
                        <div className={styles.searchInput}>
                            <input
                                type="text"
                                onChange={(e) => setFiltroNome(e.target.value)}
                                placeholder="Pesquisar curso"
                            />

                            <button onClick={() => setMostrarFiltros(!mostrarFiltros)}>
                                <Funnel size={18} />
                                Filtrar
                            </button>
                            {
                                mostrarFiltros && (
                                    <div className={styles.filtrosContainer}>
                                        <button onClick={() => handleFiltroPeriodo("MATUTINO")}>
                                            Manhã
                                        </button>

                                        <button onClick={() => handleFiltroPeriodo("VESPERTINO")}>
                                            Tarde
                                        </button>

                                        <button onClick={() => handleFiltroPeriodo("NOTURNO")}>
                                            Noite
                                        </button>

                                        <button onClick={() => handleFiltroPeriodo("INTEGRAL")}>
                                            Integral
                                        </button>

                                        <button onClick={() => handleFiltroPeriodo("")}>
                                            Todos
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    <table className={styles.table}>
                        <thead>
                            <tr >
                                <th className={styles.tableHeader}>CURSO</th>
                                <th className={styles.tableHeader}>PERÍODO</th>
                                <th className={styles.tableHeader}>AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cursos.map(curso => (
                                    <CursoRow
                                        key={curso.id}
                                        nome={curso.nome}
                                        periodo={curso.periodo}
                                        onEdit={() => handleEdit(curso.id)}
                                        onDelete={() => handleDelete(curso.id)}
                                    />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
}
