import axios from "axios";

const instanceEquipos = axios.create({ baseURL: 'http://localhost:8080/equipos' });
const instanceJugadores = axios.create({ baseURL: 'http://localhost:8080/jugadores' });

export const getEquipos = async () => await instanceEquipos.get('');
export const getJugadores = async () => await instanceJugadores.get('');



