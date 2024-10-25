import { useState, useEffect } from "react";
import { getEquipos } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Equipo.css"; // Importar el CSS

const Equipo = () => {
  const [equipos, setEquipos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getEquipos()
      .then((equipo) => {
        setEquipos(equipo.data);
      })
      .catch((err) => {
        console.error("Error en getEquipos:", err);
        setEquipos([]);
      });
  }, []);

  const handleLogoClick = (equipo) => {
    const nombreFormateado = equipo.nombre.replace(/\s+/g, "-").toLowerCase();
    navigate(`/jugadores/${nombreFormateado}`, {
      state: { equipoId: equipo.equipoCod },
    });
  };

  return (
    <div className="container">
      <table className="equipos-table">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {equipos.length > 0 ? (
            equipos.map((equipo) => (
              <tr
                key={equipo.equipoCod}
                onClick={() => handleLogoClick(equipo)}
              >
                <td>
                  <img
                    src={`http://localhost:8080/${equipo.fotoEscudo}`}
                    alt={`${equipo.nombre} Logo`}
                    className="equipo-logo"
                  />
                </td>
                <td>{equipo.nombre}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="no-equipos">
                No hay equipos disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Equipo;
