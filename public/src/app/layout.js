import FitMeLayout from "@/components/fitme/FitMeLayout";

export default function AppLayout({ children }) {
  return <FitMeLayout>{children}</FitMeLayout>;
}
<html lang="pl">
      <body>
        <header>
          <nav><strong>Moja Aplikacja</strong></nav>
        </header>
        {children}
      </body>
    </html>
  );
}