import { useState, useEffect } from "react";

import styles from "./styles.module.css"

export default function Curso(){
    return <>
        <div className={styles.Header}>
            <h1>Cadastrar novo curso</h1>
            <h3>Gerenciar cursos</h3>    
        </div>
        <div className={styles.cadastrarCurso}>
            <h1>Cadastrar novo Curso</h1>
            <p>Nome do Curso</p>
            <input type="text" placeholder="Digite o nome do curso"/>
            <p>Período</p>
            <select>
                <option value="MATUTINO">Manhã</option>
                <option value="VESPERTINO">Tarde</option>
                <option value="NOTURNO">Noite</option>
                <option value="INTEGRAL">Integral</option>
            </select>
            <button>Inserir Curso</button>
        </div>
    </>
}
