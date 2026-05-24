import { useEffect, useState } from "react";

const API = "http://34.134.29.48:5000";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700&family=DM+Sans:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0d0d0d; font-family: 'DM Sans', sans-serif; color: #f0ede8; }

  .app { max-width: 480px; margin: 60px auto; padding: 0 20px; }

  h1 { font-family: 'Syne', sans-serif; font-size: 1.6rem; letter-spacing: -0.5px;
       border-bottom: 1px solid #2a2a2a; padding-bottom: 16px; margin-bottom: 32px; }
  h1 span { color: #c8ff3e; }
  .card { background: #161616; border: 1px solid #222; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
//ab -n 20000 -c 200 http://34.134.29.48:5000/
  .row { display: flex; gap: 10px; margin-bottom: 12px; }
  input { flex: 1; background: #0d0d0d; border: 1px solid #2a2a2a; border-radius: 8px;
          padding: 10px 14px; color: #f0ede8; font-size: 0.9rem; outline: none;
          transition: border-color 0.2s; }
  input:focus { border-color: #c8ff3e; }
  input::placeholder { color: #444; }

  button { background: #c8ff3e; color: #0d0d0d; border: none; border-radius: 8px;
           padding: 10px 20px; font-weight: 700; font-size: 0.85rem; cursor: pointer;
           transition: opacity 0.2s; width: 100%; }
  button:hover { opacity: 0.85; }

  .label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px;
           color: #555; margin-bottom: 14px; }

  ul { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  li { display: flex; justify-content: space-between; align-items: center;
       padding: 12px 14px; background: #0d0d0d; border: 1px solid #1e1e1e;
       border-radius: 8px; font-size: 0.9rem; }
  li span { color: #555; font-size: 0.8rem; }
  .empty { color: #333; font-size: 0.85rem; text-align: center; padding: 20px 0; }
`;

export default function App() {
  const [nom, setNom] = useState("");
  const [age, setAge] = useState("");
  const [etudiants, setEtudiants] = useState([]);

 const fetchEtudiants = () => {
  fetch(`${API}/etudiants`)
    .then(r => r.json())
    .then(data => {
      if (Array.isArray(data)) {
        setEtudiants(data);
      } else {
        console.log("Erreur API :", data);
        setEtudiants([]);
      }
    })
    .catch(console.error);
};

  useEffect(() => { fetchEtudiants(); }, []);

  const ajouter = () => {
    if (!nom || !age) return;
    fetch(`${API}/etudiants`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, age }),
    }).then(() => { setNom(""); setAge(""); fetchEtudiants(); }).catch(console.error);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <h1>MERN <span>K8s</span> TP 🚀</h1>

        <div className="card">
          <p className="label">Nouvel étudiant</p>
          <div className="row">
            <input placeholder="Nom" value={nom} onChange={e => setNom(e.target.value)} />
            <input placeholder="Âge" value={age} onChange={e => setAge(e.target.value)} type="number" style={{ maxWidth: 80 }} />
          </div>
          <button onClick={ajouter}>+ Ajouter</button>
        </div>

        <div className="card">
          <p className="label">{etudiants.length} étudiant{etudiants.length !== 1 ? "s" : ""}</p>
          {etudiants.length === 0
            ? <p className="empty">Aucun étudiant enregistré</p>
            : <ul>{etudiants.map((e, i) => (
                <li key={i}>{e.nom} <span>{e.age} ans</span></li>
              ))}</ul>
          }
        </div>
      </div>
    </>
  );
}