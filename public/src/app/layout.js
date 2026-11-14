import FitMeLayout from "@/components/fitme/FitMeLayout";

export const metadata = {
  title: "FitMe",
  description: "Training dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>
        <FitMeLayout>{children}</FitMeLayout>
      </body>
    </html>
  );
}