import {useState} from "react";
import axios from "axios";

function App() {
    const [cep, setCep] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchCepData = () => {
        if (cep.trim() === "" || cep.length !== 8) {
            setError("Por favor, insira um CEP válido com 8 dígitos.");
            setData(null);
            return;
        }

        setError(null);
        setData(null);
        axios
            .get(`https://viacep.com.br/ws/${cep}/json/`)
            .then((response) => {
                if (response.data.erro) {
                    setError("CEP não encontrado.");
                } else {
                    setData(response.data);
                }
            })
            .catch((error) => {
                setError("Erro ao buscar informações. Tente novamente.");
                console.error(error);
            });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            fetchCepData();
        }
    };

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px"}}>
            <h1>Busca de Endereço via CEP</h1>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                marginBottom: "20px"
            }}>
                <input
                    type="text"
                    placeholder="Digite o CEP (apenas números)"
                    value={cep}
                    onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
                    onKeyDown={handleKeyDown}
                    style={{
                        padding: "10px",
                        fontSize: "16px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        width: "200px",
                    }}
                />
                <button
                    onClick={fetchCepData}
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        backgroundColor: "#007BFF",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Buscar
                </button>
            </div>
            {error && <p style={{color: "red"}}>{error}</p>} { }
            {data && (
                <div
                    style={{
                        backgroundColor: "#fff",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        marginTop: "20px",
                        width: "300px",
                    }}
                >
                    <h2 style={{marginBottom: "10px", fontSize: "18px", textAlign: "center"}}>Endereço Encontrado</h2>
                    <ul style={{listStyleType: "none", padding: 0, fontSize: "14px"}}>
                        <li><strong>CEP:</strong> {data.cep}</li>
                        <li><strong>Logradouro:</strong> {data.logradouro}</li>
                        <li><strong>Complemento:</strong> {data.complemento}</li>
                        <li><strong>Bairro:</strong> {data.bairro}</li>
                        <li><strong>Cidade:</strong> {data.localidade}</li>
                        <li><strong>Estado:</strong> {data.uf}</li>
                        <li><strong>IBGE:</strong> {data.ibge}</li>
                        <li><strong>DDD:</strong> {data.ddd}</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default App;
