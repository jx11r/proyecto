import "./globals.css";

export const metadata = {
  title: "Gestor de Finanzas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <header>
          <div className="logo">
            <h1>Mis Finanzas</h1>
          </div>
          <nav>
            <ul>
              <li>
                <a href="#">Inicio</a>
              </li>
              <li>
                <a href="#">Agregar</a>
              </li>
              <li>
                <a href="#">Cuenta</a>
              </li>
            </ul>
          </nav>
        </header>
        {children}
        <footer>
          <p>&copy; 2024 • Jair Sánchez • Alexia Liñán</p>
        </footer>
      </body>
    </html>
  );
}
