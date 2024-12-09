import Link from "next/link";
import { redirect } from "next/navigation";

import { verifySession } from "./lib/dal";
import "./globals.css";

export const metadata = {
  title: "Gestor de Finanzas",
};

export default async function RootLayout({ children }) {
  const session = await verifySession();
  return (
    <html lang="es">
      <body>
        <header>
          <div className="logo">
            <h1>
              Mis Finanzas{session.isAuth ? ": " : ""}
              {session.isAuth && <span>{session.username}</span>}
            </h1>
          </div>
          {session.isAuth ? <UserNav /> : <LoginNav />}
        </header>
        {children}
        <footer>
          <p>&copy; 2024 • Jair Sánchez • Alexia Liñán</p>
        </footer>
      </body>
    </html>
  );
}

function LoginNav() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/login">Iniciar Sesión</Link>
        </li>
        <li>
          <Link href="/signup">Registrarse</Link>
        </li>
      </ul>
    </nav>
  );
}

function UserNav() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/dashboard">Inicio</Link>
        </li>
        <li>
          <Link href="/add">Agregar</Link>
        </li>
        <li>
          <a href="/logout">Salir</a>
        </li>
      </ul>
    </nav>
  );
}
