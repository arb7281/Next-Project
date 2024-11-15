import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "Promptopia",
  description: "Discover & share AI prompts"
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        {/* using provider to have access to session all across pages */}
        <Provider>
            <div className="main">
            <div className="gradient" />
            </div>
            <main className="app">
            <Nav/>
            {children}
            </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
