import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { PortalHeader } from "@/components/PortalHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Sidetrade - Portal",
	description: "Sidetrade portal to manage the products and orders.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<PortalHeader />
				{children}
			</body>
		</html>
	);
}
