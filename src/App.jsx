import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import './App.css';

function App() {
  const [carros, setCarros] = useState([]);
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [preco, setPreco] = useState('');

  const adicionarCarro = (e) => {
    e.preventDefault();
    if (!modelo || !marca || !preco) return;

    const novoCarro = {
      modelo,
      marca,
      preco: parseFloat(preco).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    };

    setCarros([...carros, novoCarro]);
    setModelo('');
    setMarca('');
    setPreco('');
  };

  const exportarExcel = () => {
    if (carros.length === 0) return;

    const dados = [
      ['Modelo', 'Marca', 'Preço'],
      ...carros.map(carro => [carro.modelo, carro.marca, carro.preco])
    ];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(dados);
    
    // Estilização da planilha
    worksheet['!cols'] = [
      { width: 20 }, // Modelo
      { width: 15 }, // Marca
      { width: 15 }  // Preço
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Carros');
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'tabela_carros.xlsx');
  };

  return (
    <div className="container">
      <h1>Gerador de Planilha de Carros</h1>
      
      <form onSubmit={adicionarCarro}>
        <input
          type="text"
          placeholder="Modelo (ex: Onix)"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          required
        />
        
        <input
          type="text"
          placeholder="Marca (ex: Chevrolet)"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          required
        />
        
        <input
          type="number"
          placeholder="Preço (ex: 85000)"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          min="0"
          step="0.01"
          required
        />
        
        <button type="submit">Adicionar Carro</button>
      </form>

      {carros.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                <th>Modelo</th>
                <th>Marca</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              {carros.map((carro, index) => (
                <tr key={index}>
                  <td>{carro.modelo}</td>
                  <td>{carro.marca}</td>
                  <td>{carro.preco}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <button onClick={exportarExcel} className="export-btn">
            Exportar para Excel
          </button>
        </>
      )}
    </div>
  );
}

export default App;