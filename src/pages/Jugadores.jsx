import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getJugadores } from "../services/api"; // Cambia esto si necesitas obtener jugadores
import { getEquipos } from "../services/api";
import "./Jugadores.css";

const Jugadores = () => {
  const location = useLocation();
  const equipoId = location.state?.equipoId;

  const [equipo, setEquipo] = useState({});
  const [jugadoresFiltradosOrdenados, setJugadoresFiltradosOrdenados] =
    useState([]);

  useEffect(() => {
    if (equipoId) {
      getJugadores()
        .then((response) => {
          const jugadoresDelEquipo = response.data.filter(
            (jugador) => jugador.equipoCod === equipoId
          );

          const jugadoresOrdenados = jugadoresDelEquipo.sort((a, b) => {
            return a.numeroCamiseta - b.numeroCamiseta; // Orden ascendente
          });

          setJugadoresFiltradosOrdenados(jugadoresOrdenados);
          console.log("Jugadores filtrados:", jugadoresDelEquipo);
        })
        .catch((err) => {
          console.error("Error en getJugadores:", err);
        });

      getEquipos()
        .then((response) => {
          const equipoFiltrado = response.data.find(
            (equipo) => equipo.equipoCod === equipoId
          );
          console.log("Equipo Filtrado:", equipoFiltrado);
          setEquipo(equipoFiltrado);
        })
        .catch((err) => {
          console.error("Error en getEquipo:", err);
        });
    } else {
      console.error("ID del equipo no encontrado.");
    }
  }, [equipoId]);

  return (
    <div className="container">
      {equipo ? (
        <div>
          <h2>Equipo: {equipo.nombre}</h2>
          <img
            src={`http://localhost:8080/${equipo.fotoEscudo}`}
            alt={`${equipo.nombre} Escudo`}
          />
          <img
            src={`http://localhost:8080/${equipo.fotoEquipo}`}
            alt={`${equipo.nombre} Equipo`}
          />

          {jugadoresFiltradosOrdenados.length > 0 ? (
            <table className="jugadores-table">
              <thead>
                <tr>
                  <th>Número de Camiseta</th>
                  <th>Nombre del Jugador</th>
                  <th>Apellidos del Jugador</th>
                </tr>
              </thead>
              <tbody>
                {jugadoresFiltradosOrdenados.map((jugador) => (
                  <tr key={jugador.jugadorCod}>
                    <td>{jugador.numeroCamiseta}</td>
                    <td>{jugador.nombre}</td>
                    <td>{jugador.apellidos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay jugadores disponibles para este equipo.</p>
          )}
        </div>
      ) : (
        <p>Cargando información del equipo...</p>
      )}
    </div>
  );
};

export default Jugadores;
