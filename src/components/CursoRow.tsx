import styles from "../pages/Curso/styles.module.css";
import { Trash2, Pencil } from "lucide-react";

interface Props  {
    nome: string;
    periodo: string;
    onEdit: () => void;
    onDelete: () => void;
}

export function CursoRow({ nome, periodo, onEdit, onDelete }: Props ) {
    return (
    <tr className={styles.tableRow}>
        <td className={styles.rowCurso}>{nome}</td>
        <td className={styles.rowPeriodo}><span className={styles.badge}>{periodo}</span></td>
        <td className={styles.rowAcoes}>
            <div className={styles.actionButtons}>
                <button className={styles.btnEditar} onClick={onEdit}><Pencil size={18}/>Editar</button>
                <button className={styles.btnExcluir} onClick={onDelete}><Trash2 size={18}/>Excluir</button>
            </div>
        </td>
    </tr>
    );
}